import { useEffect, useState } from 'react'
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../firebase'

interface OrderItem { id: string; name: string; price: number; quantity: number }
interface Order {
  id: string
  customerName: string
  items: OrderItem[]
  note: string
  total: number
  status: 'pending' | 'in-progress' | 'done'
  createdAt: { seconds: number } | null
}

export default function Admin() {
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'done'>('all')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return unsub
  }, [])

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order)))
    })
    return unsub
  }, [user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch {
      setLoginError('Invalid email or password.')
    }
  }

  const updateStatus = async (id: string, status: Order['status']) => {
    await updateDoc(doc(db, 'orders', id), { status })
  }

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  const statusColor: Record<string, string> = {
    pending: '#eab308',
    'in-progress': '#3b82f6',
    done: '#22c55e',
  }

  if (!user) {
    return (
      <div style={{minHeight:'100vh',background:'#0a0a0a',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
        <div style={{width:'100%',maxWidth:380,background:'#111',border:'1px solid #222',borderRadius:8,padding:32}}>
          <h1 style={{fontFamily:'Playfair Display, serif',fontSize:28,fontWeight:700,color:'white',marginBottom:4}}>Staff Login</h1>
          <p style={{color:'#6b7280',fontSize:14,marginBottom:24}}>Cheese & Cream Admin</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{width:'100%',padding:'10px 12px',marginBottom:10,background:'#0a0a0a',border:'1px solid #333',color:'white',fontSize:14,outline:'none',boxSizing:'border-box'}}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{width:'100%',padding:'10px 12px',marginBottom:10,background:'#0a0a0a',border:'1px solid #333',color:'white',fontSize:14,outline:'none',boxSizing:'border-box'}}
            />
            {loginError && <p style={{color:'#ef4444',fontSize:13,marginBottom:10}}>{loginError}</p>}
            <button
              type="submit"
              style={{width:'100%',padding:'12px',background:'#f97316',color:'white',border:'none',cursor:'pointer',fontSize:14,fontWeight:600}}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',padding:'32px 24px'}}>
      <div style={{maxWidth:800,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:32}}>
          <div>
            <h1 style={{fontFamily:'Playfair Display, serif',fontSize:28,fontWeight:700,color:'white'}}>Orders Dashboard</h1>
            <p style={{color:'#6b7280',fontSize:14}}>Cheese & Cream</p>
          </div>
          <button
            onClick={() => signOut(auth)}
            style={{padding:'8px 16px',background:'none',border:'1px solid #333',color:'#9ca3af',cursor:'pointer',fontSize:13}}
          >
            Logout
          </button>
        </div>
        <div style={{display:'flex',gap:8,marginBottom:24}}>
          {(['all','pending','in-progress','done'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding:'6px 16px',border:'1px solid',cursor:'pointer',fontSize:13,fontWeight:500,textTransform:'capitalize',
                background: filter === f ? '#f97316' : 'none',
                borderColor: filter === f ? '#f97316' : '#333',
                color: filter === f ? 'white' : '#9ca3af',
              }}
            >
              {f}
            </button>
          ))}
        </div>
        {!filtered.length && <p style={{color:'#6b7280',fontSize:14}}>No orders yet.</p>}
        <div>
          {filtered.map((order) => (
            <div key={order.id} style={{background:'#111',border:'1px solid #222',borderRadius:8,padding:20,marginBottom:16}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                <div>
                  <p style={{fontWeight:600,color:'white',fontSize:16}}>{order.customerName}</p>
                  <p style={{color:'#6b7280',fontSize:12}}>
                    {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleTimeString() : 'Just now'}
                  </p>
                </div>
                <span style={{fontSize:12,padding:'4px 10px',borderRadius:4,border:`1px solid ${statusColor[order.status]}`,color:statusColor[order.status],textTransform:'capitalize'}}>
                  {order.status}
                </span>
              </div>
              <div style={{marginBottom:12}}>
                {order.items.map((item) => (
                  <div key={item.id} style={{display:'flex',justifyContent:'space-between',fontSize:14,marginBottom:4}}>
                    <span style={{color:'#d1d5db'}}>{item.name} x{item.quantity}</span>
                    <span style={{color:'#9ca3af'}}>Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              {order.note && (
                <p style={{fontSize:12,color:'#eab308',background:'rgba(234,179,8,0.1)',border:'1px solid rgba(234,179,8,0.2)',borderRadius:4,padding:'8px 12px',marginBottom:12}}>
                  Note: {order.note}
                </p>
              )}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{fontWeight:700,color:'#f97316'}}>Total: Rs. {order.total}</span>
                <div style={{display:'flex',gap:8}}>
                  {order.status !== 'in-progress' && order.status !== 'done' && (
                    <button
                      onClick={() => updateStatus(order.id, 'in-progress')}
                      style={{padding:'6px 12px',background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.3)',color:'#60a5fa',cursor:'pointer',fontSize:12}}
                    >
                      In Progress
                    </button>
                  )}
                  {order.status !== 'done' && (
                    <button
                      onClick={() => updateStatus(order.id, 'done')}
                      style={{padding:'6px 12px',background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',color:'#4ade80',cursor:'pointer',fontSize:12}}
                    >
                      Done
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
