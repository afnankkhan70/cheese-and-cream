import { useState } from 'react'
import { X, Minus, Plus } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
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
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const placeOrder = async () => {
    if (!items.length) return
    setLoading(true)
    try {
      await addDoc(collection(db, 'orders'), {
        customerName: name || 'Guest',
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        note: note || '',
        total,
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      const lines = items.map((i) => `- ${i.name} x${i.quantity} = Rs. ${i.price * i.quantity}`).join('\n')
      const msg = `*New Order from ${name || 'Guest'}*\n\n${lines}\n\n*Total: Rs. ${total}*${note ? `\nNote: ${note}` : ''}`
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
      setSuccess(true)
      setNote('')
      setName('')
      setTimeout(() => { setSuccess(false); onOrderPlaced(); onClose() }, 2000)
    } catch (err) {
      alert('Failed to place order.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {open && <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:40}} />}
      <div style={{
        position:'fixed',top:0,right:0,height:'100%',width:320,
        background:'#111',borderLeft:'1px solid #222',zIndex:50,
        display:'flex',flexDirection:'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition:'transform 0.3s ease'
      }}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px',borderBottom:'1px solid #222'}}>
          <h4 style={{fontFamily:'Playfair Display, serif',fontSize:20,fontWeight:700,color:'white'}}>Your Cart</h4>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:'#6b7280'}}>
            <X size={18} />
          </button>
        </div>
        <div style={{flex:1,overflowY:'auto',padding:20}}>
          {!items.length && <p style={{fontSize:14,color:'#6b7280'}}>Cart is empty</p>}
          {items.map((item) => (
            <div key={item.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
              <div style={{flex:1,marginRight:12}}>
                <p style={{fontSize:14,color:'white'}}>{item.name}</p>
                <p style={{fontSize:12,color:'#6b7280'}}>Rs. {item.price}</p>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <button onClick={() => onUpdateQty(item.id, -1)} style={{width:24,height:24,borderRadius:4,border:'1px solid #333',background:'none',cursor:'pointer',color:'#9ca3af',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Minus size={12} />
                </button>
                <span style={{fontSize:14,color:'white',width:16,textAlign:'center'}}>{item.quantity}</span>
                <button onClick={() => onUpdateQty(item.id, 1)} style={{width:24,height:24,borderRadius:4,border:'1px solid #333',background:'none',cursor:'pointer',color:'#9ca3af',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div style={{padding:20,borderTop:'1px solid #222'}}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{width:'100%',padding:'8px 12px',marginBottom:8,background:'#0a0a0a',border:'1px solid #333',color:'white',fontSize:13,outline:'none',boxSizing:'border-box'}}
            />
            <textarea
              placeholder="Add a note (e.g. extra ketchup)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              style={{width:'100%',padding:'8px 12px',marginBottom:12,background:'#0a0a0a',border:'1px solid #333',color:'white',fontSize:13,outline:'none',resize:'none',boxSizing:'border-box'}}
            />
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
              <span style={{color:'#9ca3af',fontSize:14}}>Total</span>
              <span style={{color:'#f97316',fontWeight:700,fontSize:16}}>Rs. {total}</span>
            </div>
            {success ? (
              <div style={{background:'#16a34a',color:'white',padding:'12px',textAlign:'center',fontSize:14,fontWeight:600}}>
                Order Placed!
              </div>
            ) : (
              <button
                onClick={placeOrder}
                disabled={loading}
                style={{width:'100%',padding:'12px',background:'#f97316',color:'white',border:'none',cursor:'pointer',fontSize:13,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',opacity: loading ? 0.6 : 1}}
              >
                {loading ? 'Placing...' : 'Place Order'}
              </button>
            )}
            <p style={{fontSize:11,color:'#4b5563',textAlign:'center',marginTop:8}}>
              Saves to dashboard + opens WhatsApp
            </p>
          </div>
        )}
      </div>
    </>
  )
}
