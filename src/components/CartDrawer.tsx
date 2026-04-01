import { useState } from 'react'
import { X, Minus, Plus } from 'lucide-react'
import { MenuItem } from '../menuData'

export interface CartItem extends MenuItem { quantity: number }

const WA_NUMBER = '923359634249'

interface Props {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQty: (id: string, delta: number) => void
  onOrderPlaced: () => void
}

export default function CartDrawer({ open, onClose, items, onUpdateQty, onOrderPlaced }: Props) {
  const [note, setNote] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const placeOrder = async () => {
    if (!items.length) {
      alert('Your cart is empty 🛒')
      return
    }

    if (!name.trim()) {
      alert('Please enter your name 👤')
      return
    }

    if (!address.trim()) {
      alert('Please enter your address 📍')
      return
    }

    if (!phone.trim()) {
      alert('Please enter your phone number 📞')
      return
    }

    setLoading(true)

    try {
      const lines = items
        .map((i) => `- ${i.name} x${i.quantity} = Rs. ${i.price * i.quantity}`)
        .join('\n')

      const msg = `*New Order from ${name}*\n*Phone: ${phone}*\n*Address: ${address}*\n\n${lines}\n\n*Total: Rs. ${total}*${note ? `\nNote: ${note}` : ''}`

      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')

      setSuccess(true)
      setNote('')
      setName('')
      setAddress('')
      setPhone('')

      setTimeout(() => {
        setSuccess(false)
        onOrderPlaced()
        onClose()
      }, 2000)

    } catch (err) {
      alert('Failed to place order.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 40
          }}
        />
      )}

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: 320,
          background: '#111',
          borderLeft: '1px solid #222',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
          <h4 style={{ color: 'white' }}>Your Cart</h4>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {!items.length && <p style={{ color: '#6b7280' }}>Cart is empty</p>}

          {items.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <p style={{ color: 'white' }}>{item.name}</p>
                <p style={{ color: '#6b7280' }}>Rs. {item.price}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button onClick={() => onUpdateQty(item.id, -1)}>
                  <Minus size={12} />
                </button>

                <span style={{ color: 'white' }}>{item.quantity}</span>

                <button onClick={() => onUpdateQty(item.id, 1)}>
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ padding: 20, borderTop: '1px solid #222' }}>
            <input
              type="text"
              placeholder="Your name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                marginBottom: 10,
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: 6,
                color: 'white',
                fontSize: 13,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

            <input
              type="text"
              placeholder="Delivery address *"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                marginBottom: 10,
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: 6,
                color: 'white',
                fontSize: 13,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

            <input
              type="tel"
              placeholder="Phone number *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                marginBottom: 10,
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: 6,
                color: 'white',
                fontSize: 13,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

            <textarea
              placeholder="Add a note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                marginBottom: 12,
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: 6,
                color: 'white',
                fontSize: 13,
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box',
              }}
            />

            <p style={{ color: 'orange' }}>Total: Rs. {total}</p>

            {success ? (
              <p style={{ color: 'green' }}>Order Placed!</p>
            ) : (
              <button
                onClick={placeOrder}
                disabled={loading || !name.trim() || !address.trim() || !phone.trim()}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#f97316',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  transition: '0.2s',
                  opacity: (loading || !name.trim() || !address.trim() || !phone.trim()) ? 0.6 : 1,
                }}
              >
                {loading ? 'Placing...' : 'Place Order'}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}