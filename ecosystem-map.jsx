// Animated USA ↔ DR ecosystem map
const { useState, useEffect } = React;

const FS_CSS = `
  .eco-fs {
    position: fixed; inset: 0; z-index: 9999; background: #FAFAF7;
    display: flex; flex-direction: column; padding: 20px 32px 16px; box-sizing: border-box;
  }
  .eco-fs .ecosystem-wrap {
    flex: 1; min-height: 0; display: flex; align-items: stretch;
  }
  .eco-fs .ecosystem-wrap svg {
    width: 100%; height: 100%; max-height: none;
  }
  .eco-fs .eco-detail {
    flex-shrink: 0;
  }
`;

function EcosystemMap() {
  const [active, setActive] = useState('whatsapp');
  const [isPlaying, setIsPlaying] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!document.getElementById('eco-fs-css')) {
      const s = document.createElement('style');
      s.id = 'eco-fs-css';
      s.textContent = FS_CSS;
      document.head.appendChild(s);
    }
    const onKey = (e) => { if (e.key === 'Escape') setFullscreen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Viewport 1000 x 560
  const nodes = {
    debit:    { x: 180, y: 170, side: 'usa', label: 'Tarjeta Débito' },
    credit:   { x: 180, y: 250, side: 'usa', label: 'Tarjeta Crédito' },
    bank:     { x: 180, y: 330, side: 'usa', label: 'Cuenta Bancaria' },
    app:      { x: 340, y: 250, side: 'usa', label: 'Transi USA', primary: true },
    cash:     { x: 820, y: 90,  side: 'dr',  label: 'Retiro en Efectivo' },
    whatsapp: { x: 580, y: 210, side: 'dr',  label: 'WhatsApp', isNew: true, hub: true, image: 'assets/whatsapp.png' },
    puntos:   { x: 820, y: 170, side: 'dr',  label: 'Puntos Transi', image: 'assets/avatar.png' },
    atm:      { x: 820, y: 250, side: 'dr',  label: 'ATM', isNew: true },
    wallet:   { x: 820, y: 330, side: 'dr',  label: 'Transi Wallet', image: 'assets/avatar.png' },
    bankdep:  { x: 820, y: 410, side: 'dr',  label: 'Depósito Bancario' },
    home:     { x: 820, y: 490, side: 'dr',  label: 'Entrega a Domicilio' },
  };

  const fundingFlows = ['debit','credit','bank'].map(k => ({ from: nodes[k], to: nodes.app, id: `f-${k}` }));
  const payoutFlows  = ['bankdep','home'].map(k => ({ from: nodes.app, to: nodes[k], id: `p-${k}`, key: k }));

  const directCash   = { from: nodes.app, to: nodes.cash };
  const directPuntos = { from: nodes.app, to: nodes.puntos };
  const directWallet = { from: nodes.app, to: nodes.wallet };
  const viaWhats     = { leg1: { from: nodes.app, to: nodes.whatsapp }, leg2: { from: nodes.whatsapp, to: nodes.cash } };
  const toPuntos     = { from: nodes.whatsapp, to: nodes.puntos };
  const toAtm        = { from: nodes.whatsapp, to: nodes.atm };

  const detail = {
    app:      { title: 'Transi USA',                            body: 'El remitente en Estados Unidos abre su app Transi USA, selecciona su método de fondeo (débito, crédito o banco), el canal de pago en DR y a quién enviar.' },
    debit:    { title: 'Fondear con Débito',                    body: 'Conectar una tarjeta de débito para enviar en segundos.' },
    credit:   { title: 'Fondear con Crédito',                   body: 'Acepta las principales tarjetas, con protección total.' },
    bank:     { title: 'Fondear con Banco',                     body: 'Transferencia directa desde la cuenta bancaria.' },
    cash:     { title: 'Pago del Envío en Efectivo',            body: 'Red amplia de bancos, tiendas y puntos de pago Transi.' },
    puntos:   { title: 'Pago en Puntos Transi',                 body: 'Puntos de pago Transi en toda la República Dominicana — retira sin costos adicionales y con la garantía de que hay fondos para pagar el envío.' },
    bankdep:  { title: 'Depósito del Envío en Cuenta Bancaria', body: 'Depósito directo en los principales bancos dominicanos.' },
    home:     { title: 'Entrega del Envío a Domicilio',         body: 'Llevamos el dinero a la puerta, en dólares o pesos.' },
    whatsapp: { title: 'Pago Asistido por WhatsApp',            body: 'El beneficiario VALIDA el envío por WhatsApp y recibe una clave de 6 dígitos (OTP) para retirar el efectivo en cualquier punto de la red o en un ATM.' },
    atm:      { title: 'Retiro del Envío en ATM',               body: 'Con el código de 6 dígitos (OTP) recibido por WhatsApp, el beneficiario retira efectivo en cajeros automáticos participantes — sin tarjeta.' },
    wallet:   { title: 'Transi Wallet',                         body: 'Cuenta digital con tarjeta de débito virtual para pagar, guardar o recibir envíos.' },
  };

  const btnBase = {
    background: 'transparent', border: '1px solid var(--rule-2)',
    padding: '6px 14px', borderRadius: 999,
    fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
    letterSpacing: '0.08em', cursor: 'pointer', color: 'var(--ink-2)',
  };

  const animStyle = (delay = '0s') => ({
    animation: isPlaying ? `dashFlow calc(4s / var(--anim-speed)) linear infinite` : 'none',
    animationDelay: delay,
    transition: 'opacity 320ms, stroke 320ms, stroke-width 320ms',
  });

  const mapContent = (
    <>
      {/* Controls row */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:12}}>
        <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
          <span className="pill blue"><span className="dot"></span>ORIGEN · USA</span>
          <span className="pill red"><span className="dot"></span>DESTINO · REPÚBLICA DOMINICANA</span>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={() => setIsPlaying(p => !p)} style={btnBase}>
            {isPlaying ? '⏸ PAUSAR' : '▶ REPRODUCIR'}
          </button>
          <button
            data-interactive
            onClick={() => setFullscreen(f => !f)}
            style={{
              ...btnBase,
              background: fullscreen ? '#0B1C4E' : 'transparent',
              color: fullscreen ? '#FAFAF7' : 'var(--ink-2)',
              borderColor: fullscreen ? '#0B1C4E' : 'var(--rule-2)',
              fontWeight: 600,
            }}
          >
            {fullscreen ? '✕  SALIR PANTALLA COMPLETA' : '⛶  PANTALLA COMPLETA'}
          </button>
        </div>
      </div>

      {/* SVG map */}
      <div className="ecosystem-wrap">
        <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet">
          {/* Backgrounds */}
          <rect x="0"   y="0" width="460" height="560" fill="#F7F6F1" />
          <rect x="460" y="0" width="540" height="560" fill="#FAFAF7" />
          <line x1="460" y1="0" x2="460" y2="560" stroke="#D6D2C6" strokeDasharray="2 4" />

          {/* Column headers */}
          <text x="230" y="32" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="15" fill="#5B626C" letterSpacing="2">USA · ORIGEN</text>
          <text x="730" y="32" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="15" fill="#5B626C" letterSpacing="2">REPÚBLICA DOMINICANA · DESTINO</text>

          {/* ── Funding flows (left col → Transi app) ── */}
          {fundingFlows.map((f, i) => (
            <path
              key={f.id}
              d={`M ${f.from.x + 20} ${f.from.y} C ${f.from.x + 140} ${f.from.y}, ${f.to.x - 100} ${f.to.y}, ${f.to.x - 30} ${f.to.y}`}
              className={`flow-path ${isPlaying ? 'animated' : ''}`}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}

          {/* ── Payout flows (app → bankdep / home) ── */}
          {payoutFlows.map((f, i) => {
            const isActive = active === f.key;
            const exitY = f.key === 'bankdep' ? f.from.y + 16 : f.from.y + 22;
            const path = `M ${f.from.x + 30} ${exitY} C ${f.from.x + 180} ${exitY + 10}, ${f.to.x - 180} ${f.to.y}, ${f.to.x - 30} ${f.to.y}`;
            return (
              <g key={f.id}>
                <path d={path} fill="none"
                  stroke={isActive ? '#C89B3C' : '#0B1C4E'}
                  strokeWidth={isActive ? 3 : 2}
                  strokeDasharray="5 4"
                  opacity={isActive ? 1 : (isPlaying ? 0.5 : 0.3)}
                  style={animStyle(`${i * 0.2}s`)}
                />
                {isPlaying && isActive && (
                  <circle r="5" fill="#C89B3C">
                    <animateMotion dur="3s" repeatCount="indefinite" path={path} />
                  </circle>
                )}
              </g>
            );
          })}

          {/* ── Direct: Transi USA → Cash ── */}
          {(() => {
            const isActive = active === 'cash';
            const path = `M ${directCash.from.x + 26} ${directCash.from.y - 14} C ${directCash.from.x + 180} 85, ${directCash.to.x - 180} 85, ${directCash.to.x - 30} ${directCash.to.y}`;
            return (
              <g key="direct-cash">
                <path d={path} fill="none"
                  stroke={isActive ? '#C89B3C' : '#0B1C4E'}
                  strokeWidth={isActive ? 3 : 2}
                  strokeDasharray="5 4"
                  opacity={isActive ? 1 : (isPlaying ? 0.55 : 0.3)}
                  style={animStyle()}
                />
                {isPlaying && isActive && <circle r="5" fill="#C89B3C"><animateMotion dur="3s" repeatCount="indefinite" path={path} /></circle>}
              </g>
            );
          })()}

          {/* ── Direct: Transi USA → Puntos ── */}
          {(() => {
            const isActive = active === 'puntos';
            const path = `M ${directPuntos.from.x + 26} ${directPuntos.from.y - 14} C ${directPuntos.from.x + 160} 120, ${directPuntos.to.x - 180} 100, ${directPuntos.to.x - 30} ${directPuntos.to.y}`;
            return (
              <g key="direct-puntos">
                <path d={path} fill="none"
                  stroke={isActive ? '#C89B3C' : '#0B1C4E'}
                  strokeWidth={isActive ? 3 : 2}
                  strokeDasharray="5 4"
                  opacity={isActive ? 1 : (isPlaying ? 0.55 : 0.3)}
                  style={animStyle()}
                />
                {isPlaying && isActive && <circle r="5" fill="#C89B3C"><animateMotion dur="3s" repeatCount="indefinite" path={path} /></circle>}
              </g>
            );
          })()}

          {/* ── Via WhatsApp: Transi → WhatsApp → Cash ── */}
          {(() => {
            const hi = active === 'whatsapp' || active === 'cash';
            const color = hi ? '#C89B3C' : '#25D366';
            const op = hi ? 1 : 0.75;
            const sw = hi ? 3 : 2;
            const leg1 = `M ${viaWhats.leg1.from.x + 28} ${viaWhats.leg1.from.y - 8} C ${viaWhats.leg1.from.x + 120} ${viaWhats.leg1.from.y - 30}, ${viaWhats.leg1.to.x - 120} ${viaWhats.leg1.to.y - 30}, ${viaWhats.leg1.to.x - 22} ${viaWhats.leg1.to.y - 2}`;
            const leg2 = `M ${viaWhats.leg2.from.x + 22} ${viaWhats.leg2.from.y - 14} C ${viaWhats.leg2.from.x + 120} ${viaWhats.leg2.from.y - 60}, ${viaWhats.leg2.to.x - 130} ${viaWhats.leg2.to.y + 30}, ${viaWhats.leg2.to.x - 30} ${viaWhats.leg2.to.y + 10}`;
            return (
              <g key="via-whats">
                <path d={leg1} fill="none" stroke={color} strokeWidth={sw} strokeDasharray="4 5" opacity={op} style={animStyle()} />
                <path d={leg2} fill="none" stroke={color} strokeWidth={sw} strokeDasharray="4 5" opacity={op} style={animStyle()} />
                {isPlaying && hi && <>
                  <circle r="5" fill="#C89B3C"><animateMotion dur="2.2s" repeatCount="indefinite" path={leg1} /></circle>
                  <circle r="5" fill="#C89B3C"><animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite" path={leg2} /></circle>
                </>}
              </g>
            );
          })()}

          {/* ── WhatsApp → Puntos ── */}
          {(() => {
            const hi = active === 'whatsapp' || active === 'puntos';
            const path = `M ${toPuntos.from.x + 22} ${toPuntos.from.y - 4} C ${toPuntos.from.x + 80} ${toPuntos.from.y - 20}, ${toPuntos.to.x - 80} ${toPuntos.to.y + 10}, ${toPuntos.to.x - 22} ${toPuntos.to.y}`;
            return (
              <g key="to-puntos">
                <path d={path} fill="none" stroke={hi ? '#C89B3C' : '#25D366'} strokeWidth={hi ? 3 : 2} strokeDasharray="4 5" opacity={hi ? 1 : 0.75} style={animStyle()} />
                {isPlaying && hi && <circle r="5" fill="#C89B3C"><animateMotion dur="2.4s" repeatCount="indefinite" path={path} /></circle>}
              </g>
            );
          })()}

          {/* ── WhatsApp → ATM ── */}
          {(() => {
            const hi = active === 'whatsapp' || active === 'atm';
            const path = `M ${toAtm.from.x + 22} ${toAtm.from.y + 12} C ${toAtm.from.x + 80} ${toAtm.from.y + 40}, ${toAtm.to.x - 80} ${toAtm.to.y - 10}, ${toAtm.to.x - 22} ${toAtm.to.y}`;
            return (
              <g key="to-atm">
                <path d={path} fill="none" stroke={hi ? '#C89B3C' : '#25D366'} strokeWidth={hi ? 3 : 2} strokeDasharray="4 5" opacity={hi ? 1 : 0.75} style={animStyle()} />
                {isPlaying && hi && <circle r="5" fill="#C89B3C"><animateMotion dur="2.4s" repeatCount="indefinite" path={path} /></circle>}
              </g>
            );
          })()}

          {/* ── Direct: Transi USA → Wallet ── */}
          {(() => {
            const isActive = active === 'wallet';
            const f = directWallet;
            const path = `M ${f.from.x + 30} ${f.from.y + 8} C ${f.from.x + 180} ${f.from.y + 20}, ${f.to.x - 180} ${f.to.y - 10}, ${f.to.x - 30} ${f.to.y}`;
            return (
              <g key="direct-wallet">
                <path d={path} fill="none"
                  stroke={isActive ? '#C89B3C' : '#0B1C4E'}
                  strokeWidth={isActive ? 3 : 2}
                  strokeDasharray="5 4"
                  opacity={isActive ? 1 : (isPlaying ? 0.5 : 0.3)}
                  style={animStyle()}
                />
                {isPlaying && isActive && <circle r="5" fill="#C89B3C"><animateMotion dur="3s" repeatCount="indefinite" path={path} /></circle>}
              </g>
            );
          })()}

          {/* ── Nodes ── */}
          {Object.entries(nodes).map(([key, n]) => {
            const isActive = active === key;
            const r = n.primary ? 32 : (n.hub ? 28 : 22);
            return (
              <g key={key} className={`node ${isActive ? 'active' : ''}`} onClick={() => setActive(key)} transform={`translate(${n.x}, ${n.y})`}>
                <circle className="node-ring" r={r + 8} fill="none"
                  stroke={isActive ? '#C89B3C' : 'transparent'}
                  strokeWidth="1.5" strokeDasharray="2 3" />
                <circle r={r}
                  fill={n.primary ? '#FFFFFF' : (n.image ? '#FFFFFF' : (isActive ? '#C89B3C' : '#FFFFFF'))}
                  stroke={(n.image || n.primary) && !isActive ? 'none' : (isActive ? '#C89B3C' : '#0E1116')}
                  strokeWidth="1.5" />
                {(n.primary || n.image) && (
                  <>
                    <defs>
                      <clipPath id={`avatar-clip-${key}`}>
                        <circle r={r - 1} />
                      </clipPath>
                    </defs>
                    <image
                      href={n.primary ? 'assets/avatar.png' : n.image}
                      x={-r} y={-r} width={r * 2} height={r * 2}
                      clipPath={`url(#avatar-clip-${key})`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </>
                )}
                {n.primary ? (
                  <>
                    <text textAnchor="middle" x="0" y={-(r + 10)} fontFamily="Space Grotesk, sans-serif" fontSize="15" fontWeight="600" fill={isActive ? '#C89B3C' : '#0E1116'} style={{transition:'fill 320ms'}}>Transi</text>
                    <text textAnchor="middle" x="0" y={r + 20}   fontFamily="Space Grotesk, sans-serif" fontSize="15" fontWeight="600" fill={isActive ? '#C89B3C' : '#0E1116'} style={{transition:'fill 320ms'}}>USA</text>
                  </>
                ) : n.hub ? (
                  <text textAnchor="middle" x="0" y={-(r + 18)} fontFamily="Space Grotesk, sans-serif" fontSize="14" fontWeight="600" fill={isActive ? '#C89B3C' : '#0E1116'} style={{transition:'fill 320ms'}}>{n.label}</text>
                ) : (
                  <text
                    textAnchor={n.side === 'usa' ? 'end' : 'start'}
                    x={n.side === 'usa' ? -(r + 14) : (r + 14)}
                    y="5"
                    fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="500"
                    fill={isActive ? '#C89B3C' : '#0E1116'}
                    style={{transition:'fill 320ms'}}
                  >
                    {n.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail strip */}
      {detail[active] && (
        <div className="eco-detail" style={{
          marginTop: 20, padding: '22px 28px',
          borderLeft: '2px solid var(--oro)',
          background: 'var(--paper-2)',
          display: 'grid', gridTemplateColumns: '200px 1fr auto',
          gap: 32, alignItems: 'center',
        }}>
          <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:10,letterSpacing:'0.12em',color:'var(--ink-3)',textTransform:'uppercase'}}>
            Seleccionado ·<br/>
            <span style={{color:'var(--oro)'}}>{nodes[active].side === 'usa' ? 'ORIGEN' : 'DESTINO'}</span>
          </div>
          <div>
            <h4 style={{fontFamily:'Space Grotesk, sans-serif',fontSize:22,fontWeight:500,letterSpacing:'-0.02em',marginBottom:4}}>{detail[active].title}</h4>
            <p style={{color:'var(--ink-2)',fontSize:15,lineHeight:1.5}}>{detail[active].body}</p>
          </div>
          <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:32,color:'var(--ink-4)',letterSpacing:'-0.02em'}}>
            {String(Object.keys(nodes).indexOf(active) + 1).padStart(2, '0')}
          </div>
        </div>
      )}
    </>
  );

  if (fullscreen) {
    return (
      <div className="eco-fs" data-interactive>
        {mapContent}
      </div>
    );
  }

  return <div>{mapContent}</div>;
}

Object.assign(window, { EcosystemMap });
