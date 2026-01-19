"use client"
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

function parseMarkdown(text: string) {
  const parts: (string | { type: string; text: string })[] = []
  let lastIdx = 0
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g
  let match
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index))
    }
    if (match[1]) {
      parts.push({ type: 'bold', text: match[1] })
    } else if (match[2]) {
      parts.push({ type: 'italic', text: match[2] })
    }
    lastIdx = regex.lastIndex
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx))
  }
  return parts.length === 0 ? [text] : parts
}

// Typing animation component
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 13 }}>
      <span style={{ color: '#2d4a3e' }}>Suy nghĩ</span>
      <span style={{ display: 'flex', gap: 3 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2d4a3e', animation: 'bounce 1.4s infinite', animationDelay: '0s' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2d4a3e', animation: 'bounce 1.4s infinite', animationDelay: '0.2s' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2d4a3e', animation: 'bounce 1.4s infinite', animationDelay: '0.4s' }} />
      </span>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { opacity: 0.5; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  async function send(e?: React.FormEvent) {
    if (e) e.preventDefault()
    const text = input.trim()
    if (!text) return
    const userMsg = { role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: text }), headers: { 'Content-Type': 'application/json' } })
      const txt = await res.text()
      let j: any = null
      try { j = JSON.parse(txt) } catch (err) { j = null }
      if (!res.ok) {
        const errMsg = j && j.error ? j.error : txt || `HTTP ${res.status}`
        setMessages(prev => [...prev, { role: 'assistant', text: `Error: ${errMsg}` }])
      } else {
        const display = j?.full_text || j?.answer || txt || 'No answer'
        setMessages(prev => [...prev, { role: 'assistant', text: display, raw: j }])
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Network error: ' + (err.message || String(err)) }])
    } finally { setLoading(false) }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <main style={{ 
      minHeight: '100vh',
      background: '#fdfbf7',
      fontFamily: '"Source Sans 3", "Segoe UI", sans-serif',
      color: '#333333',
      padding: '32px 20px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated sand/wind particles background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(45, 74, 62, 0.03) 0%, transparent 50%)',
        animation: 'windFlow 20s ease-in-out infinite'
      }} />
      
      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, maxWidth: 1200, margin: '0 auto 32px auto', width: '100%' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600, color: '#2d4a3e', letterSpacing: -0.5, marginBottom: 6 }}>
              Đối Thoại về Triết Học
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: '#666666', fontWeight: 400 }}>
              Cùng khám phá tư tưởng Mác - Lênin
            </p>
          </div>
          <Link href="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6,
            padding: '9px 16px',
            borderRadius: 6,
            background: '#f5f0e8',
            border: '1px solid #e8e2d9',
            color: '#2d4a3e',
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 500,
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2d4a3e'
            e.currentTarget.style.color = '#fdfbf7'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f5f0e8'
            e.currentTarget.style.color = '#2d4a3e'
          }}>
            ← Quay lại
          </Link>
        </div>

        {/* Chat Container */}
        <div style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        <div 
          ref={scrollRef} 
          style={{ 
            flex: 1,
            border: '1px solid #e8e2d9',
            borderRadius: 12,
            padding: 24,
            overflowY: 'auto',
            background: '#ffffff',
            marginBottom: 20,
            scrollBehavior: 'smooth'
          }}
        >
          {messages.length === 0 && !loading && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%',
              color: '#999999',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: 48, marginBottom: 16 }}>💭</div>
                <p style={{ margin: 0, fontSize: 16, color: '#666666' }}>
                  Hãy đặt câu hỏi của bạn về Chủ nghĩa Mác - Lênin
                </p>
              </div>
            </div>
          )}

          {messages.map((m: any, i: number) => {
            const isUser = m.role === 'user'
            return (
              <div key={i} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 16 }}>
                {!isUser && (
                  <div style={{ 
                    width: 36, 
                    height: 36, 
                    borderRadius: '50%', 
                    background: '#2d4a3e',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: 12, 
                    fontWeight: 600, 
                    color: '#fdfbf7',
                    flexShrink: 0,
                    fontSize: 16
                  }}>
                    A
                  </div>
                )}
                <div style={{ 
                  maxWidth: '70%', 
                  background: isUser ? '#f5f0e8' : '#ffffff',
                  color: isUser ? '#333333' : '#333333',
                  padding: 12,
                  borderRadius: 10,
                  border: `1px solid ${isUser ? '#e8e2d9' : '#e8e2d9'}`,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  lineHeight: 1.6,
                  fontSize: 13,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>
                  <div>
                    {parseMarkdown(m.text).map((part, j) => {
                      if (typeof part === 'string') return <span key={j}>{part}</span>
                      if (part.type === 'bold') return <strong key={j} style={{ color: '#8b5a3c', fontWeight: 700 }}>{part.text}</strong>
                      if (part.type === 'italic') return <em key={j} style={{ color: '#666666' }}>{part.text}</em>
                      return <span key={j}>{(part as { text: string }).text}</span>
                    })}
                  </div>
                </div>
                {isUser && (
                  <div style={{ 
                    width: 36, 
                    height: 36, 
                    borderRadius: '50%', 
                    background: '#2d4a3e',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginLeft: 12,
                    color: '#fdfbf7',
                    fontWeight: 600,
                    flexShrink: 0,
                    fontSize: 16
                  }}>
                    U
                  </div>
                )}
              </div>
            )
          })}

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
              <div style={{ 
                width: 36, 
                height: 36, 
                borderRadius: '50%', 
                background: '#2d4a3e',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginRight: 12,
                color: '#fdfbf7',
                fontWeight: 600,
                flexShrink: 0,
                fontSize: 16
              }}>
                A
              </div>
              <div style={{ 
                background: '#ffffff',
                color: '#2d4a3e',
                padding: 12,
                borderRadius: 10,
                border: '1px solid #e8e2d9',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <TypingIndicator />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={send} style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <textarea 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={onKeyDown} 
            placeholder="Đặt câu hỏi của bạn... (Enter để gửi, Shift+Enter xuống dòng)"
            disabled={loading}
            style={{ 
              flex: 1, 
              resize: 'vertical', 
              minHeight: 48, 
              maxHeight: 140, 
              padding: 12,
              borderRadius: 8, 
              border: '1px solid #e8e2d9',
              background: '#ffffff',
              color: '#333333',
              fontSize: 13,
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'text'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#2d4a3e'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e8e2d9'
            }}
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()}
            style={{ 
              background: loading || !input.trim() ? '#e8e2d9' : '#2d4a3e',
              color: loading || !input.trim() ? '#999999' : '#fdfbf7',
              border: 'none', 
              padding: '12px 22px', 
              borderRadius: 8, 
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: 13,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 90
            }}
            onMouseEnter={(e) => {
              if (!loading && input.trim()) {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(45, 74, 62, 0.15)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {loading ? '...' : 'Gửi'}
          </button>
        </form>
      </div>
      </div>

      <style>{`
        @keyframes windFlow {
          0% {
            opacity: 0.5;
            background: radial-gradient(ellipse at 20% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(45, 74, 62, 0.03) 0%, transparent 50%);
          }
          50% {
            opacity: 0.8;
            background: radial-gradient(ellipse at 40% 30%, rgba(212, 175, 55, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 60% 70%, rgba(45, 74, 62, 0.05) 0%, transparent 50%);
          }
          100% {
            opacity: 0.5;
            background: radial-gradient(ellipse at 80% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(45, 74, 62, 0.03) 0%, transparent 50%);
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f5f0e8;
        }
        ::-webkit-scrollbar-thumb {
          background: #d4c5b9;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #c4b5a9;
        }
      `}</style>
    </main>
  )
}
