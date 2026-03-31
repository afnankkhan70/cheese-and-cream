export default function Hero() {
  return (
    <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'80px 24px 40px'}}>
      <p style={{fontSize:11,letterSpacing:'0.3em',color:'#f97316',textTransform:'uppercase',marginBottom:24}}>Est. 2025</p>
      <h1 style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(48px, 10vw, 96px)',fontWeight:700,color:'white',lineHeight:1.1,marginBottom:24}}>
        Cheese <span style={{color:'#f97316'}}>&</span> Cream
      </h1>
      <p style={{color:'#9ca3af',fontSize:18,marginBottom:40,maxWidth:400}}>Your favorite cafe. Great food, great vibes.</p>
      <a href="#menu" style={{background:'#f97316',color:'white',padding:'12px 32px',fontSize:13,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.15em',textDecoration:'none',display:'inline-block'}}>
        View Menu
      </a>
    </section>
  )
}
