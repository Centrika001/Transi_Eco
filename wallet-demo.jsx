// Transi Wallet interactive panel
const { useState: useStateW } = React;

function WalletDemo() {
  const [tab, setTab] = useStateW('balance');
  return (
    <div>
      <div className="wallet-card">
        <div className="wc-top">
          <div>
            <div className="wc-label">Transi Wallet</div>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:10,opacity:0.6,marginTop:4,letterSpacing:'0.1em'}}>
              VIRTUAL · RD
            </div>
          </div>
          <div className="wc-logo">Transi</div>
        </div>
        <div className="wc-balance">
          <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:10,opacity:0.6,letterSpacing:'0.15em',marginBottom:6}}>BALANCE DISPONIBLE</div>
          <span className="amt">24,380</span>
          <span className="cur"> .50 RD$</span>
        </div>
        <div className="wc-number">
          <span>•••• 4829</span>
          <span style={{opacity:0.6}}>12 / 29</span>
        </div>
      </div>

      <div style={{marginTop:32,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {[
          { k: 'recibe', title: 'Recibe', sub: 'Cobra transferencias directo a tu Wallet' },
          { k: 'paga',   title: 'Paga',   sub: 'Débito virtual en cualquier comercio' },
          { k: 'guarda', title: 'Guarda', sub: 'Deposita efectivo, mantén tu saldo' },
        ].map(t => (
          <div key={t.k}
               onClick={() => setTab(t.k)}
               style={{
                 padding:'20px 18px',
                 border: tab === t.k ? '1px solid var(--ink)' : '1px solid var(--rule)',
                 borderRadius: 8,
                 cursor: 'pointer',
                 background: tab === t.k ? 'var(--paper-2)' : 'var(--paper)',
                 transition: 'all 320ms'
               }}>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:10,color:'var(--ink-4)',letterSpacing:'0.12em',marginBottom:8}}>
              0{['recibe','paga','guarda'].indexOf(t.k)+1}
            </div>
            <h4 style={{fontFamily:'Space Grotesk, sans-serif',fontSize:20,fontWeight:500,letterSpacing:'-0.01em',marginBottom:4}}>{t.title}</h4>
            <p style={{fontSize:12.5,color:'var(--ink-3)',lineHeight:1.45}}>{t.sub}</p>
          </div>
        ))}
      </div>

      <div style={{marginTop:20,padding:'20px 24px',background:'var(--paper-2)',borderRadius:8,fontFamily:'JetBrains Mono, monospace',fontSize:11,letterSpacing:'0.06em',color:'var(--ink-3)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <span>FASE 2 · TARJETA PLÁSTICA PRÓXIMAMENTE</span>
        <span style={{color:'var(--oro)'}}>● PLANIFICADO 2026</span>
      </div>
    </div>
  );
}

Object.assign(window, { WalletDemo });
