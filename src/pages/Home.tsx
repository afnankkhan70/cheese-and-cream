import { useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MenuSection from '../components/MenuSection'
import Contact from '../components/Contact'
import CartDrawer, { CartItem } from '../components/CartDrawer'
import { MenuItem } from '../menuData'

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + delta } : i).filter((i) => i.quantity > 0))
  }, [])

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0a'}}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <MenuSection onAddToCart={addToCart} />
      <Contact />
      <footer style={{textAlign:'center',padding:'32px 24px',fontSize:12,color:'#4b5563',borderTop:'1px solid #1a1a1a'}}>
        2025 Cheese and Cream. All rights reserved. | @cheese.n.creamcafe
      </footer>
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onOrderPlaced={() => setCart([])}
      />
    </div>
  )
}
