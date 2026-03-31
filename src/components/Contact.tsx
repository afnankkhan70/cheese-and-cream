export default function Contact() {
  return (
    <section id="contact" style={{maxWidth:720,margin:'0 auto',padding:'80px 24px',borderTop:'1px solid #1a1a1a'}}>
      <h2 style={{fontFamily:'Playfair Display, serif',fontSize:40,fontWeight:700,color:'white',textAlign:'center',marginBottom:48}}>
        Find <span style={{color:'#f97316'}}>Us</span>
      </h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))',gap:32,textAlign:'center'}}>
        <div>
          <p style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'#f97316',marginBottom:8}}>Address</p>
          <p style={{color:'#9ca3af',fontSize:14}}>Peshawar, Pakistan</p>
        </div>
        <div>
          <p style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'#f97316',marginBottom:8}}>Phone</p>
          <p style={{color:'#9ca3af',fontSize:14}}>0335-9634249</p>
        </div>
        <div>
          <p style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'#f97316',marginBottom:8}}>Instagram</p>
          <a href="https://instagram.com/cheese.n.creamcafe" target="_blank" rel="noreferrer" style={{color:'#9ca3af',fontSize:14,textDecoration:'none'}}>
            @cheese.n.creamcafe
          </a>
        </div>
      </div>
    </section>
  )
}
