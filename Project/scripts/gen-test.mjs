import fs from 'fs'
import path from 'path'

// Load .env simple
const envPath = path.join(process.cwd(), '.env')
let key = process.env.GOOGLE_API_KEY
if (!key && fs.existsSync(envPath)) {
  const txt = fs.readFileSync(envPath, 'utf8')
  const m = txt.match(/GOOGLE_API_KEY=(.*)/)
  if (m) key = m[1].trim().replace(/^"|"$/g, '')
}
if (!key) {
  console.error('GOOGLE_API_KEY not found in env or .env')
  process.exit(1)
}

const model = 'gemini-3-flash-preview'
const methods = ['generateContent','generate','generateText','createCachedContent','batchGenerateContent']


const message = 'Xin chào, giải thích về chủ nghĩa Mác-Lênin ngắn gọn'

const payloads = [
  // Preferred documented shape
  { systemInstruction: { parts: [{ text: 'You are a helpful assistant.' }] }, contents: [{ parts: [{ text: message }] }], generationConfig: { temperature: 0.2 } },
  { prompt: { text: message } },
  { messages: [{ author: 'user', content: [{ type: 'text', text: message }] }] },
  { input: message },
  { text: message },
  { instances: [{ prompt: message }] },
  { instances: [{ content: message }] },
  { instances: [{ input: message }] },
  { prompt: { messages: [{ author: 'user', content: [{ type: 'input_text', text: message }] }] } },
  { prompt: { messages: [{ author: 'user', content: [{ type: 'text', text: message }] }] } },
  { prompt: { messages: [{ author: 'user', content: message }] } },
]

async function tryEndpoint(ep, p) {
  try {
    const full = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${ep}?key=${key}`
    const res = await fetch(full, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
    const txt = await res.text()
    console.log('---')
    console.log('Endpoint:', ep)
    console.log('Payload:', JSON.stringify(p))
    console.log('Status:', res.status)
    console.log('Body:', txt)
    return res.status === 200
  } catch (err) {
    console.log('Error:', err)
    return false
  }
}

(async () => {
  for (const ep of methods) {
    for (let i = 0; i < payloads.length; i++) {
      const ok = await tryEndpoint(ep, payloads[i])
      if (ok) { console.log('Success with', ep, 'payload index', i); process.exit(0) }
    }
  }
  console.log('Done')
  process.exit(0)
})()
