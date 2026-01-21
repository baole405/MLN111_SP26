#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

async function main(){
  // Try env var first
  let key = process.env.GOOGLE_API_KEY
  if (!key) {
    // Try to read Project/.env
    const envPath = path.resolve(process.cwd(), '.env')
    if (fs.existsSync(envPath)) {
      const txt = fs.readFileSync(envPath, 'utf8')
      const m = txt.match(/^\s*GOOGLE_API_KEY\s*=\s*(.+)\s*$/m)
      if (m) key = m[1].trim()
    }
  }

  if (!key) {
    console.error('GOOGLE_API_KEY not set in environment or Project/.env')
    process.exit(1)
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`
  try {
    const res = await fetch(url)
    const txt = await res.text()
    if (!res.ok) {
      console.error('Request failed:', res.status, res.statusText)
      try { console.error(JSON.stringify(JSON.parse(txt), null, 2)) } catch(e){ console.error(txt) }
      process.exit(1)
    }
    let j
    try { j = JSON.parse(txt) } catch (e) { j = txt }
    console.log(JSON.stringify(j, null, 2))
  } catch (err) {
    console.error('Fetch error:', err)
    process.exit(1)
  }
}

main()
