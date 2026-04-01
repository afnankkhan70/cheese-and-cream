import React from 'react'

export default function Admin() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 560, width: '100%', background: '#111', border: '1px solid #222', borderRadius: 8, padding: 32, textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Admin Unavailable</h1>
        <p style={{ color: '#9ca3af', fontSize: 16, marginBottom: 8 }}>Firebase has been removed from this project.</p>
        <p style={{ color: '#6b7280', fontSize: 14 }}>Order management is currently handled manually through WhatsApp messages from the front-end cart.</p>
      </div>
    </div>
  )
}
