import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.resolve(process.cwd(), 'data/embeddings.json')

// Map filename to nice display name
const SOURCE_DISPLAY_MAP: { [key: string]: string } = {
  'GIAO TRINH TRIET HOC MAC - LENIN (Quoc gia) (1).pdf': 'GIÁO TRÌNH TRIẾT HỌC MÁC - LÊNIN CỦA BỘ GIÁO DỤC VÀ ĐÀO TẠO\n(Nhà Xuất Bản Chính Trị Quốc Gia Sự Thật - Hà Nội - 2021)'
}

function formatSourceName(filename: string): string {
  return SOURCE_DISPLAY_MAP[filename] || filename
}

function toArray(x: any): number[] | null {
  if (!x) return null
  if (Array.isArray(x) && typeof x[0] === 'number') return x
  if (Array.isArray(x) && x.length > 0 && x[0] && typeof x[0] === 'number') return x
  // common shapes: { embedding: [..] } or { values: [..] }
  if (x.embedding && Array.isArray(x.embedding)) return x.embedding
  if (x.values && Array.isArray(x.values)) return x.values
  // earlier SDK shapes
  if (x.data && x.data[0] && Array.isArray(x.data[0].embedding)) return x.data[0].embedding
  return null
}

function dot(a: number[] | null, b: number[] | null) {
  const A = toArray(a)
  const B = toArray(b)
  if (!A || !B || A.length !== B.length) throw new Error('invalid-embedding-shape')
  return A.reduce((s, v, i) => s + v * B[i], 0)
}

function norm(a: number[] | null) { return Math.sqrt(dot(a, a)) }

function cosine(a: number[] | null, b: number[] | null) { return dot(a, b) / (norm(a) * norm(b) + 1e-12) }

async function embedText(text: string) {
  const key = process.env.GOOGLE_API_KEY
  if (!key) throw new Error('GOOGLE_API_KEY not set')
  // Try multiple endpoint/body shapes (some Google APIs accept different names)
  const tryEndpoints = [
    { url: `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedText?key=${key}`, body: JSON.stringify({ text }) },
    // Preferred REST shape: embedContent with a Content object containing parts
    { url: `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${key}`, body: JSON.stringify({ content: { parts: [{ text }] } }) },
  ]
  let lastErr = null
  for (const ep of tryEndpoints) {
    const res = await fetch(ep.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: ep.body })
    const txt = await res.text()
    if (!res.ok) {
      lastErr = `status=${res.status} body=${txt}`
      continue
    }
    let j
    try { j = JSON.parse(txt) } catch (e) { j = txt }
    if (j && j.embeddings && j.embeddings[0] && j.embeddings[0].embedding) return j.embeddings[0].embedding
    if (j && j.data && j.data[0] && j.data[0].embedding) return j.data[0].embedding
    if (j && j.embedding) return j.embedding
    const found = (function findEmbedding(obj: any): number[] | null {
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
  }
  throw new Error(lastErr || 'embed failed unknown')
}

function extractTextFromGenerateResponse(jj: any) {
  if (!jj) return ''
  // candidates path
  if (Array.isArray(jj.candidates) && jj.candidates.length > 0) {
    const cand = jj.candidates[0]
    let content = cand.content
    // content may be array or object
    if (Array.isArray(content)) {
      // try parts or text inside each element
      for (const item of content) {
        if (item && item.parts && Array.isArray(item.parts)) return item.parts.map((p: any) => p.text || '').join('')
        if (typeof item === 'string') return item
        if (item && typeof item.text === 'string') return item.text
      }
      return JSON.stringify(content)
    } else if (content && typeof content === 'object') {
      if (content.parts && Array.isArray(content.parts)) return content.parts.map((p: any) => p.text || '').join('')
      if (typeof content.text === 'string') return content.text
      // sometimes content may be nested differently
      return JSON.stringify(content)
    }
  }
  // output path
  if (Array.isArray(jj.output) && jj.output[0] && jj.output[0].content) {
    const content = jj.output[0].content
    if (Array.isArray(content)) {
      for (const item of content) {
        if (item && item.parts && Array.isArray(item.parts)) return item.parts.map((p: any) => p.text || '').join('')
        if (typeof item === 'string') return item
        if (item && typeof item.text === 'string') return item.text
      }
      return JSON.stringify(content)
    } else if (content && typeof content === 'object') {
      if (content.parts && Array.isArray(content.parts)) return content.parts.map((p: any) => p.text || '').join('')
      if (typeof content.text === 'string') return content.text
      return JSON.stringify(content)
    }
  }
  // result path
  if (jj.result && jj.result.output && jj.result.output[0] && jj.result.output[0].content) {
    const content = jj.result.output[0].content
    if (Array.isArray(content)) {
      for (const item of content) {
        if (item && item.parts && Array.isArray(item.parts)) return item.parts.map((p: any) => p.text || '').join('')
        if (typeof item === 'string') return item
        if (item && typeof item.text === 'string') return item.text
      }
      return JSON.stringify(content)
    } else if (content && typeof content === 'object') {
      if (content.parts && Array.isArray(content.parts)) return content.parts.map((p: any) => p.text || '').join('')
      if (typeof content.text === 'string') return content.text
      return JSON.stringify(content)
    }
  }
  if (typeof jj === 'string') return jj
  if (jj.outputText) return jj.outputText
  if (jj.text) return jj.text
  return JSON.stringify(jj)
}

function extractAllText(jj: any) {
  const acc: string[] = []
  function collect(obj: any, key?: string) {
    if (obj == null) return
    if (typeof obj === 'string') {
      // include only explicit text fields
      if (key === 'text') acc.push(obj)
      return
    }
    if (Array.isArray(obj)) {
      for (const it of obj) collect(it, key)
      return
    }
    if (typeof obj === 'object') {
      // Prefer explicit Content.parts arrays
      if (Array.isArray(obj.parts)) {
        for (const p of obj.parts) {
          if (p && typeof p.text === 'string') acc.push(p.text)
          else collect(p, 'parts')
        }
        return
      }
      // direct text field
      if (typeof obj.text === 'string') { acc.push(obj.text); return }
      // traverse children but skip common metadata keys
      for (const k of Object.keys(obj)) {
        if (/model|name|max|token|id|metadata|status|role|type/i.test(k)) continue
        collect(obj[k], k)
      }
    }
  }
  collect(jj)
  return acc.join('\n\n').trim()
}

export async function POST(req: Request) {
  const { message } = await req.json()
  if (!message) return NextResponse.json({ error: 'no message' }, { status: 400 })
  
  // Load embeddings file if present
  let items: any[] = []
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf8')
      items = JSON.parse(raw) || []
    } catch (e) {
      items = []
    }
  }

  // If we have no embeddings, skip retrieval and call model directly (fallback)
  if (!items || items.length === 0) {
    const system = `You are a Marxism-Leninism expert assistant. Answer in clear, natural Vietnamese with logical flow.

Response structure:
1. Start with your own explanation/reasoning about the concept
2. Provide examples from real life or theory to illustrate
3. If you reference any sources or knowledge, be natural and conversational
4. Make sure each paragraph flows naturally - don't just list facts

Write 3-4 short paragraphs total. Be thoughtful and engaging, not just informational.`
    // Use documented GenerateContentRequest shape: place system instruction in `systemInstruction`
    const body = {
      systemInstruction: { parts: [{ text: system }] },
      contents: [
        { parts: [{ text: message }] }
      ],
      generationConfig: { temperature: 1.0, maxOutputTokens: 4096 }
    }
    if (!process.env.GOOGLE_API_KEY) return NextResponse.json({ error: 'GOOGLE_API_KEY not set' }, { status: 500 })
    const key = process.env.GOOGLE_API_KEY
    const genUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${key}`
    // Try multiple request shapes for generation (some APIs accept different schemas)
    const genCandidates = [
      body,
      // alternate simple shapes (kept for robustness) — prefer `systemInstruction` + `contents`
      { systemInstruction: { parts: [{ text: system }] }, contents: [{ parts: [{ text: message }] }], generationConfig: { temperature: 0.8, maxOutputTokens: 4096 } },
      { contents: [{ parts: [{ text: message }] }], generationConfig: { temperature: 0.2 } },
      { prompt: { text: message }, temperature: 0.2 },
      { input: message, temperature: 0.2 },
      { text: message, temperature: 0.2 }
    ]
    let lastErr = ''
    for (const candidate of genCandidates) {
      try {
        const chatRes = await fetch(genUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(candidate) })
        const txt = await chatRes.text()
        if (!chatRes.ok) { lastErr = `status=${chatRes.status} body=${txt}`; continue }
        let j
        try { j = JSON.parse(txt) } catch (e) { j = txt }
        const text = extractTextFromGenerateResponse(j)
        return NextResponse.json({ answer: text, sources: [], raw: j, full_text: extractAllText(j) })
      } catch (err: any) {
        lastErr = (err && err.message) ? err.message : String(err)
        continue
      }
    }
    return NextResponse.json({ error: `generation failed: ${lastErr}` }, { status: 500 })
  }

  // get query embedding via Google
  let qv: number[]
  try {
    qv = await embedText(message)
  } catch (err: any) {
    return NextResponse.json({ error: 'embedding failed: ' + (err.message || err) }, { status: 500 })
  }

  let scored = []
  try {
    scored = items.map((it: any) => ({ score: cosine(qv, it.embedding), item: it })).sort((a: any, b: any) => b.score - a.score)
  } catch (err: any) {
    return NextResponse.json({ error: 'scoring failed: ' + (err.message || err) }, { status: 500 })
  }
  const top = scored.slice(0, 4).map((s: any) => s.item)

  // If top similarity is low, fall back to non-grounded generation so user still gets an answer.
  const bestScore = (scored && scored[0] && typeof scored[0].score === 'number') ? scored[0].score : 0
  const SCORE_THRESHOLD = 0.65
  if (bestScore < SCORE_THRESHOLD) {
    if (!process.env.GOOGLE_API_KEY) return NextResponse.json({ error: 'GOOGLE_API_KEY not set' }, { status: 500 })
    try {
      const key = process.env.GOOGLE_API_KEY
      const genUrlFallback = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${key}`
      const systemFallback = `You are a Marxism-Leninism expert assistant. Answer in clear, natural Vietnamese with logical flow.

Response structure:
1. Start with your own explanation/reasoning about the concept
2. Provide examples from real life or theory to illustrate
3. If you reference any sources or knowledge, be natural and conversational
4. Make sure each paragraph flows naturally - don't just list facts

Write 3-4 short paragraphs total. Be thoughtful and engaging, not just informational.`
      const genBody = {
        systemInstruction: { parts: [{ text: systemFallback }] },
        contents: [{ parts: [{ text: message }] }],
        generationConfig: { temperature: 1.0, maxOutputTokens: 4096 }
      }
      const r = await fetch(genUrlFallback, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(genBody) })
      const txt = await r.text()
      if (!r.ok) return NextResponse.json({ error: txt }, { status: 500 })
      let jr
      try { jr = JSON.parse(txt) } catch (e) { jr = txt }
      const answer = extractTextFromGenerateResponse(jr)
      return NextResponse.json({ answer, sources: [], raw: jr, full_text: extractAllText(jr) })
    } catch (err: any) {
      return NextResponse.json({ error: 'fallback generation failed: ' + (err.message || err) }, { status: 500 })
    }
  }

  const contextText = top.map((t: any, i: number) => `[Source ${i+1}] From "${t.source}":\n${t.text}`).join('\n\n---\n\n')

  const system = `You are a Marxism-Leninism expert assistant. You have access to textbook materials to support your answer.

How to answer:
1. Think through the question using your understanding of Marxism-Leninism
2. Structure your answer naturally: explain the concept first, then weave in textbook examples where relevant
3. When citing textbook materials, use smooth references like "(theo giáo trình)" or just explain naturally - don't break the flow with long filenames
4. Write in clear Vietnamese with 3-4 connected paragraphs, not just extracted quotes
5. Make each paragraph flow into the next - connect explanation, examples, and implications logically
6. If textbook doesn't cover the topic well, feel free to explain from your knowledge
7. At the very end of your answer, add a section "📚 Tham khảo:" with source names if you used them

Textbook materials for reference:
${contextText}`
  const userPrompt = `Question: ${message}`

  if (!process.env.GOOGLE_API_KEY) return NextResponse.json({ error: 'GOOGLE_API_KEY not set' }, { status: 500 })
  const key = process.env.GOOGLE_API_KEY
  const genUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${key}`
  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: [
      { parts: [{ text: userPrompt }] }
    ],
    generationConfig: { temperature: 1.0, maxOutputTokens: 4096 }
  }

  const chatRes = await fetch(genUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!chatRes.ok) {
    const t = await chatRes.text()
    return NextResponse.json({ error: t }, { status: 500 })
  }
  const j = await chatRes.json()
  // Try common response shapes
  let text = ''
  text = extractTextFromGenerateResponse(j)
  return NextResponse.json({ answer: text, sources: top.map((t: any) => formatSourceName(t.source)), raw: j, full_text: extractAllText(j) })
}
