import { Plus } from 'lucide-react'
import { MENU_ITEMS, MenuItem } from '../menuData'
interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void
}
export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const categories = [...new Set(MENU_ITEMS.map((i) => i.category))]
  return (
    <section id="menu" style={{maxWidth:720,margin:'0 auto',padding:'80px 24px'}}>
      <h2 style={{fontFamily:'Playfair Display, serif',fontSize:40,fontWeight:700,color:'white',textAlign:'center',marginBottom:64}}>
        Our <span style={{color:'#f97316'}}>Menu</span>
      </h2>
      {categories.map((cat) => (
        <div key={cat} style={{marginBottom:48}}>
          <h3 style={{fontSize:11,letterSpacing:'0.25em',textTransform:'uppercase',color:'#6b7280',marginBottom:16,paddingBottom:8,borderBottom:'1px solid #1a1a1a'}}>
            {cat}
          </h3>
          <div>
            {MENU_ITEMS.filter((i) => i.category === cat).map((item) => (
              <div key={item.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid #111'}}>
                <div style={{flex:1,marginRight:16}}>
                  <p style={{color:'white',fontWeight:500,fontSize:15}}>{item.name}</p>
                  {item.note && <p style={{color:'#6b7280',fontSize:12,marginTop:2}}>{item.note}</p>}
                </div>
                <div style={{display:'flex',alignItems:'center',gap:16}}>
                  <span style={{color:'#f97316',fontWeight:600,whiteSpace:'nowrap'}}>Rs. {item.price}</span>
                  <button
                    onClick={() => onAddToCart(item)}
                    style={{width:32,height:32,borderRadius:'50%',border:'1px solid #333',background:'none',cursor:'pointer',color:'#6b7280',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.2s'}}
                    onMouseEnter={(e) => { e.currentTarget.style.background='#f97316'; e.currentTarget.style.borderColor='#f97316'; e.currentTarget.style.color='white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background='none'; e.currentTarget.style.borderColor='#333'; e.currentTarget.style.color='#6b7280'; }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
