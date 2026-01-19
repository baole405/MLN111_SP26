import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const DOCS_DIR = path.resolve(process.cwd(), '../docs')
const OUT_DIR = path.resolve(process.cwd(), 'data')
const OUT_FILE = path.join(OUT_DIR, 'embeddings.json')

// Load .env file if present
try {
  const envPath = path.join(process.cwd(), '.env')
  if (fs.existsSync(envPath)) {
    const envText = fs.readFileSync(envPath, 'utf8')
    for (const line of envText.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_.-]+)\s*=\s*(.*)\s*$/)
      if (!m) continue
      let [, key, val] = m
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1)
      if (!process.env[key]) process.env[key] = val
    }
  }
} catch (err) {
  // ignore
}

if (!process.env.GOOGLE_API_KEY) {
  console.error('Please set GOOGLE_API_KEY in your environment or add it to .env')
  process.exit(1)
}

async function embed(text) {
  const key = process.env.GOOGLE_API_KEY
  const tryEndpoints = [
    { url: `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedText?key=${key}`, body: JSON.stringify({ text }) },
    { url: `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${key}`, body: JSON.stringify({ content: { parts: [{ text }] } }) },
  ]
  let lastErr = null
  for (const ep of tryEndpoints) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(ep.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: ep.body })
        const txt = await res.text()
        if (!res.ok) {
          lastErr = `status=${res.status} body=${txt}`
          if (res.status === 429 && attempt < 2) {
            await new Promise(r => setTimeout(r, 2000 * (attempt + 1)))
            continue
          }
          break
        }
        let j
        try { j = JSON.parse(txt) } catch (e) { j = txt }
        if (j && j.embeddings && j.embeddings[0] && j.embeddings[0].embedding) return j.embeddings[0].embedding
        if (j && j.data && j.data[0] && j.data[0].embedding) return j.data[0].embedding
        if (j && j.embedding) return j.embedding
        const found = (function findEmbedding(obj) {
          if (!obj || typeof obj !== 'object') return null
          if (Array.isArray(obj)) {
            for (const it of obj) {
              const f = findEmbedding(it)
              if (f) return f
            }
          } else {
            if (Array.isArray(obj.embedding) && typeof obj.embedding[0] === 'number') return obj.embedding
            for (const k of Object.keys(obj)) {
              const f = findEmbedding(obj[k])
              if (f) return f
            }
          }
          return null
        })(j)
        if (found) return found
        lastErr = `no-embedding-found body=${JSON.stringify(j).slice(0,200)}`
        break
      } catch (err) {
        lastErr = err.message
        if (attempt < 2) await new Promise(r => setTimeout(r, 1000))
      }
    }
  }
  throw new Error(lastErr || 'embed failed unknown')
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let files = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) files = files.concat(walk(full))
    else if (e.isFile() && /\.mdx?$|\.txt$|\.pdf$/i.test(e.name)) files.push(full)
  }
  return files
}

function chunkText(text, maxChars = 1000) {
  // Split by paragraphs first
  const paragraphs = text.split(/\n\n+/).map(p => p.trim()).filter(Boolean)
  const chunks = []
  let cur = ''
  
  for (const p of paragraphs) {
    // Split paragraph into sentences
    const sentences = p.match(/[^.!?]+[.!?]+/g) || [p]
    const cleanSentences = sentences.map(s => s.trim()).filter(Boolean)
    
    for (const sent of cleanSentences) {
      const testStr = cur ? cur + ' ' + sent : sent
      
      // If adding sentence exceeds limit, save current chunk and start new one
      if (testStr.length > maxChars && cur) {
        chunks.push(cur)
        cur = sent
      } else {
        cur = testStr
      }
    }
    
    // Add paragraph break after each paragraph (except last)
    if (cur && p !== paragraphs[paragraphs.length - 1]) {
      cur += '\n\n'
    }
  }
  
  if (cur) chunks.push(cur)
  return chunks
}

async function main() {
  if (!fs.existsSync(DOCS_DIR)) {
    console.error('Docs folder not found at', DOCS_DIR)
    process.exit(1)
  }
  
  const files = walk(DOCS_DIR)
  const out = []
  for (const f of files) {
    const rel = path.relative(DOCS_DIR, f)
    let text = ''
    try {
      if (/\.pdf$/i.test(f)) {
        try {
          text = execSync(`python scripts/extract_pdf.py "${f}"`, { encoding: 'utf8', cwd: process.cwd() })
        } catch (err) {
          throw new Error('PDF extraction failed: ' + err.message)
        }
      } else {
        text = fs.readFileSync(f, 'utf8')
      }
    } catch (err) {
      console.error('Failed to read', f, err.message || err)
      continue
    }
    const chunks = chunkText(text, 1200)
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      try {
        const embedding = await embed(chunk)
        out.push({ id: `${rel}#${i}`, text: chunk, source: rel, embedding })
        console.log('Embedded', rel, 'chunk', i)
        if (i < chunks.length - 1) await new Promise(r => setTimeout(r, 500))
      } catch (err) {
        console.error('Embedding failed for', f, 'chunk', i, ':', err.message || err)
      }
    }
  }
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), 'utf8')
  console.log('Wrote', OUT_FILE, 'entries=', out.length)
}

main().catch(err => { console.error(err); process.exit(1) })

