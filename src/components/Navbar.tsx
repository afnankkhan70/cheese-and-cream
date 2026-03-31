import { ShoppingCart } from 'lucide-react'
interface NavbarProps {
  cartCount: number
  onCartClick: () => void
}
export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:40,background:'rgba(10,10,10,0.92)',backdropFilter:'blur(12px)',borderBottom:'1px solid #1a1a1a'}}>
      <div style={{maxWidth:900,margin:'0 auto',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="#" style={{fontFamily:'Playfair Display, serif',fontSize:20,fontWeight:700,color:'white',textDecoration:'none'}}>
          CHEESE <span style={{color:'#f97316'}}>&</span> CREAM
        </a>
        <div style={{display:'flex',alignItems:'center',gap:32}}>
          <a href="#menu" style={{fontSize:14,color:'#9ca3af',textDecoration:'none'}}>Menu</a>
          <a href="#contact" style={{fontSize:14,color:'#9ca3af',textDecoration:'none'}}>Contact</a>
          <button onClick={onCartClick} style={{position:'relative',background:'none',border:'none',cursor:'pointer',color:'#9ca3af',padding:8}}>
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span style={{position:'absolute',top:-4,right:-4,background:'#f97316',color:'white',fontSize:11,width:18,height:18,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600}}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
