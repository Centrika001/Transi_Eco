// WhatsApp animated chat — Transi offers & processes extra products/services (Dominican lingo)

const SERVICES_SCRIPT = [
  { who:'bot', text:'¡Tu envío ya quedó listo, María! 🎉\n\nY desde aquí mismo tú puede\' resolver otra\' vainita\' sin salir de WhatsApp. ¿Qué necesita\'?', delay:1500, typing:900,
    options:[
      {label:'📱 Recarga a celular', sub:'Claro · Altice · Viva'},
      {label:'🧾 Pagar un servicio',  sub:'Luz · agua · internet'},
      {label:'🏍️ Envío a domicilio', sub:'Te llevamo\' el efectivo'},
    ] },
  { who:'user', text:'📱 Recarga a celular', delay:800 },
  { who:'bot', text:'¡Vamo\' a darle! ¿A qué número y de cuánto la quiere\'? 📲', delay:1100, typing:800 },
  { who:'user', text:'809-501-2233 · RD$ 200', delay:1000 },
  { who:'bot', text:'Dale, confirmando con Claro…', delay:1000, typing:1100 },
  { who:'bot', text:'✅ ¡Recarga aplicada al instante!', delay:1300, typing:600,
    receipt:{ title:'RECARGA · CLARO', rows:[['Número','809-501-2233'],['Monto','RD$ 200.00'],['Ref','RC-5521']] } },
  { who:'bot', text:'¿Seguimo\' resolviendo, mi\'ja? 😊', delay:1100, typing:800,
    options:[
      {label:'🧾 Pagar un servicio',  sub:'Luz · agua · internet'},
      {label:'🏍️ Envío a domicilio', sub:'Te llevamo\' el efectivo'},
    ] },
  { who:'user', text:'🧾 Pagar un servicio', delay:800 },
  { who:'bot', text:'¿Cuál factura vamo\' a pagar? 🔌', delay:1100, typing:800,
    options:[
      {label:'⚡ Edesur · Luz',     sub:'Vence en 3 días'},
      {label:'💧 CAASD · Agua',     sub:'Al día'},
      {label:'🌐 Altice · Internet', sub:'Vence en 8 días'},
    ] },
  { who:'user', text:'⚡ Edesur · Luz', delay:900 },
  { who:'bot', text:'Perfecto. Mándame una foto de la factura y yo te leo lo\' datos 📸', delay:1100, typing:900 },
  { who:'user', invoice:true, delay:1700 },
  { who:'bot', text:'Leyendo la factura…', delay:1000, typing:1100 },
  { who:'bot', text:'¡Listo! Ya saqué tus datos 👇 ¿La pago ahora?', delay:1200, typing:900,
    receipt:{ title:'EDESUR · FACTURA', rows:[['NIC','7785421'],['Periodo','Mayo 2026'],['Total','RD$ 1,340.00']] },
    options:[
      {label:'✅ Sí, págala'},
      {label:'Ahora no'},
    ] },
  { who:'user', text:'✅ Sí, págala', delay:900 },
  { who:'bot', text:'Procesando el pago con Edesur…', delay:1000, typing:1100 },
  { who:'bot', text:'✅ ¡Factura pagada! Ya tiene\' luz pa\' rato. 💡', delay:1300, typing:600,
    receipt:{ title:'PAGO · EDESUR', rows:[['Recibo','PG-9043'],['Monto','RD$ 1,340.00'],['Estado','Aprobado']] } },
  { who:'bot', text:'Y el resto de tu efectivo te lo puedo mandar a la casa. ¿Te lo llevo a domicilio? 🏍️', delay:1300, typing:900,
    options:[
      {label:'🏍️ Sí, a mi casa', sub:'C/ Duarte #45, Los Mina'},
      {label:'🏪 No, lo busco yo'},
    ] },
  { who:'user', text:'🏍️ Sí, a mi casa', delay:900 },
  { who:'bot', text:'¡Resuelto! Un mensajero Transi va\' pa\' allá con tu efectivo. Llega en 45 min aprox. 🛵💨\n\nCualquier otra vaina, aquí estoy. ¡Que Dios te bendiga! 🇩🇴', delay:1400, typing:900 },
];

function WhatsappServices() {
  const Anim = window.WhatsappAnimation;
  return <Anim script={SERVICES_SCRIPT} fsLabel="TRANSI · SERVICIOS Y PRODUCTOS · CANAL 05" />;
}

Object.assign(window, { WhatsappServices });
