// WhatsApp animated chat — Dominican lingo
const { useState, useEffect, useRef } = React;

// Dominican Cédula mockup components
function CedulaFront() {
  return (
    <div className="cedula cedula-front">
      <div className="cedula-stripe">
        <div className="cedula-flag">
          <span style={{background:'#002D62'}}></span>
          <span style={{background:'#FFFFFF',position:'relative'}}>
            <span style={{position:'absolute',inset:0,background:'#CE1126',clipPath:'polygon(50% 50%, 100% 0, 100% 100%)'}}></span>
          </span>
          <span style={{background:'#CE1126'}}></span>
          <span style={{background:'#FFFFFF'}}></span>
        </div>
        <div className="cedula-title">
          <div className="r1">REPÚBLICA DOMINICANA</div>
          <div className="r2">Junta Central Electoral</div>
        </div>
      </div>
      <div className="cedula-body">
        <div className="cedula-photo">
          <svg viewBox="0 0 40 50" width="100%" height="100%">
            <circle cx="20" cy="18" r="8" fill="#9CA3AF"/>
            <path d="M4 50 Q4 32 20 32 Q36 32 36 50 Z" fill="#9CA3AF"/>
          </svg>
        </div>
        <div className="cedula-info">
          <div className="lbl">Nombres</div>
          <div className="val">MARÍA ALTAGRACIA</div>
          <div className="lbl">Apellidos</div>
          <div className="val">RODRÍGUEZ PEÑA</div>
          <div className="row">
            <div>
              <div className="lbl">Fecha Nac.</div>
              <div className="val sm">14-08-1987</div>
            </div>
            <div>
              <div className="lbl">Sexo</div>
              <div className="val sm">F</div>
            </div>
          </div>
        </div>
      </div>
      <div className="cedula-number">001-1234567-8</div>
    </div>
  );
}

function CedulaBack() {
  return (
    <div className="cedula cedula-back">
      <div className="cedula-stripe dark">
        <div className="cedula-title">
          <div className="r1">CÉDULA DE IDENTIDAD Y ELECTORAL</div>
        </div>
      </div>
      <div className="cedula-back-body">
        <div className="lbl">Lugar de Nacimiento</div>
        <div className="val sm">SANTO DOMINGO, D.N.</div>
        <div className="lbl">Dirección</div>
        <div className="val sm">C/ DUARTE #45, LOS MINA</div>
        <div className="row">
          <div>
            <div className="lbl">Expedida</div>
            <div className="val sm">12-03-2019</div>
          </div>
          <div>
            <div className="lbl">Vence</div>
            <div className="val sm">12-03-2029</div>
          </div>
        </div>
        <div className="barcode">
          {Array.from({length:42}).map((_,i) => (
            <span key={i} style={{width: (i%3===0?3:i%2===0?1:2)+'px'}}></span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Full conversation script
const SCRIPT = [
  // Step 1: Notification
  { who: 'bot', text: '¡Hola, María! 👋 Soy Transi, tu asistente de remesas.\n\n💸 Te llegó una transferencia de José Ramón desde Miami.\n\n💰 Monto: RD$ 12,500.00\n👤 De: José Ramón Peña\n🏷️ Ref: TR-8842-XQ', delay: 1400 },

  // Step 2: Receive now or later
  { who: 'bot', text: '¿Cómo quiere\' manejar este envío, mi\'ja? 🤔', delay: 1100, typing: 800,
    options: [
      { label: '⚡ Recibir ahora', sub: 'Busca\' el dinero hoy mismo' },
      { label: '🕐 Recibir después', sub: 'Te guardamos el envío hasta 72h' },
    ]
  },
  { who: 'user', text: '⚡ Recibir ahora', delay: 700 },

  // Step 3: Code verification
  { who: 'bot', text: 'Perfecto. Pa\' empezar, necesito que me pase\' la clave (código) que te envió José Ramón. 🔑', delay: 1100, typing: 800 },
  { who: 'user', text: 'TRANSI-2847', delay: 900 },
  { who: 'bot', text: '✅ ¡Código verificado! Coincide con el envío de José Ramón. Vamo\' pa\' lante. 🇩🇴', delay: 1000, typing: 700 },

  // Step 4: Cédula validation
  { who: 'bot', text: 'Ahora necesito validar tu identidad. Envíame una foto de tu cédula (frente y dorso) 📸', delay: 1200, typing: 800 },
  { who: 'user', cedulas: true, delay: 1800 },
  { who: 'bot', text: 'Verificando......', delay: 1000, typing: 1000 },

  // Step 5: Full name confirmation
  { who: 'bot', text: '✅ Identidad confirmada. ¿Confirma\' que tú ere\' esta persona?\n\n👤 María Altagracia Rodríguez Peña\n🪪 Cédula: 001-1234567-8', delay: 1300, typing: 900 },
  { who: 'user', text: 'Sí, soy yo. ✅', delay: 700 },

  // Step 6: Location confirmation
  { who: 'bot', text: '¿Dónde te queda mejor retirar? Te muestro los puntos más cerca de ti 📍', delay: 1100, typing: 800,
    options: [
      { label: 'Punto Transi · Colmado La Esquina', sub: '0.4 km · abierto ahora' },
      { label: 'Banco Popular · Sucursal 27', sub: '0.8 km · abierto' },
      { label: 'Farmacia Carol · Av. Independencia', sub: '1.1 km · abierto 24h' },
      { label: 'Cajero BHD · Plaza Central', sub: '1.4 km · sin tarjeta' },
    ]
  },
  { who: 'user', text: 'El Punto Transi del colmado 🏪', delay: 900 },
  { who: 'bot', text: '¡Tremendo! Ta\' aquí cerquita. Llegas, le muestras el código al cajero y listo. 🤙', delay: 1100, typing: 900 },

  // Step 7: OTP
  { who: 'bot', text: 'Aquí va tu código (OTP válido para un único uso):', delay: 900, otp: '4 8 7 2 9 1' },
  { who: 'bot', text: 'Cualquier cosa me escribe\', ¡que Dios te bendiga! 🇩🇴', delay: 1200, typing: 800 },
];

function WhatsappChat() {
  const [visible, setVisible] = useState([]);
  const [typing, setTyping] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speedTick, setSpeedTick] = useState(0);
  const bodyRef = useRef(null);
  const timerRef = useRef([]);

  // Listen for speed changes (from Tweaks slider) and restart animation
  useEffect(() => {
    let lastSpeed = getComputedStyle(document.documentElement).getPropertyValue('--anim-speed');
    const interval = setInterval(() => {
      const cur = getComputedStyle(document.documentElement).getPropertyValue('--anim-speed');
      if (cur !== lastSpeed) {
        lastSpeed = cur;
        setSpeedTick(t => t + 1);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const clearTimers = () => {
    timerRef.current.forEach(t => clearTimeout(t));
    timerRef.current = [];
  };

  const play = () => {
    clearTimers();
    setVisible([]);
    setTyping(false);

    // Read speed multiplier from CSS var (set by Tweaks panel). <1 = slower, >1 = faster
    const speedVar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anim-speed')) || 1;
    const mult = 1 / speedVar;

    let elapsed = 400 * mult;
    SCRIPT.forEach((msg, i) => {
      if (msg.who === 'bot' && msg.typing) {
        const typeStart = elapsed;
        timerRef.current.push(setTimeout(() => setTyping(true), typeStart));
        elapsed += msg.typing * mult;
        timerRef.current.push(setTimeout(() => setTyping(false), elapsed));
      }
      const showAt = elapsed;
      timerRef.current.push(setTimeout(() => {
        setVisible(v => [...v, i]);
      }, showAt));
      elapsed += msg.delay * mult;
    });

    // Loop — pause 10s before restarting
    timerRef.current.push(setTimeout(play, elapsed + 10000));
  };

  useEffect(() => {
    if (paused) {
      clearTimers();
      setTyping(false);
      // Show all messages when paused so user can scroll the full conversation
      setVisible(SCRIPT.map((_, i) => i));
    } else {
      play();
    }
    return () => clearTimers();
  }, [paused, speedTick]);

  useEffect(() => {
    if (bodyRef.current && !paused) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [visible, typing, paused]);

  const formatTime = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  };

  return (
    <div className="wa-frame">
      <div className="wa-header">
        <div className="avatar"><img src="assets/avatar.png" alt="Transi"/></div>
        <div>
          <div className="who">Transi · Asistente</div>
          <div className="status">en línea · respuesta instantánea</div>
        </div>
        <button
          onClick={() => setPaused(p => !p)}
          title={paused ? 'Reanudar animación' : 'Pausar y explorar conversación'}
          style={{
            marginLeft:'auto',
            background: paused ? '#C89B3C' : 'rgba(255,255,255,0.15)',
            color: paused ? '#0E1116' : '#FFFFFF',
            border: 'none',
            padding: '6px 12px',
            borderRadius: 999,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            transition: 'all 200ms'
          }}
        >
          {paused ? '▶ PLAY' : '❚❚ PAUSA'}
        </button>
      </div>
      <div className="wa-body" ref={bodyRef}>
        {SCRIPT.map((msg, i) => {
          if (!visible.includes(i)) return null;
          return (
            <div key={i} className={`wa-msg ${msg.who}`}>
              {msg.cedulas ? (
                <div className="cedula-pair">
                  <CedulaFront />
                  <CedulaBack />
                  <div style={{fontSize:11, color:'var(--ink-4)', marginTop:4}}>cedula_frente.jpg · cedula_dorso.jpg</div>
                </div>
              ) : (
                <div style={{whiteSpace:'pre-line'}}>{msg.text}</div>
              )}
              {msg.otp && <div className="otp">{msg.otp}</div>}
              {msg.options && (
                <div className="list">
                  {msg.options.map((o, j) => (
                    <div key={j} className="opt">
                      <span style={{fontWeight:500}}>{o.label}</span>
                      <span style={{color:'var(--ink-4)',fontSize:11}}>{o.sub}</span>
                    </div>
                  ))}
                </div>
              )}
              <span className="time">{formatTime()}</span>
            </div>
          );
        })}
        {typing && (
          <div className="wa-msg typing">
            <span></span><span></span><span></span>
          </div>
        )}
      </div>
      <div className="wa-footer">
        <div className="input">Escribe un mensaje…</div>
        <div className="mic">🎤</div>
      </div>
    </div>
  );
}

Object.assign(window, { WhatsappChat });
