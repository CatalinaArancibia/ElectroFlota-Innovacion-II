/* =====================================================================
   ElectroFlota — Autenticación de DEMOSTRACIÓN (prototipo académico)

   ⚠️  ESTO NO ES SEGURIDAD REAL. Las credenciales están en texto plano en
   este archivo, que es visible para cualquiera en el navegador. El "login"
   y la separación por roles son solo del lado del cliente, para mostrar el
   flujo. En producción esto iría contra un backend con contraseñas
   hasheadas (bcrypt/argon2), tokens de sesión del servidor y autorización
   por rol también validada en el servidor.
   ===================================================================== */

// Usuarios de prueba (uno por rol)
const EF_USERS = [
  { user:'superadmin', pass:'super123', rol:'superadmin',  nombre:'Valentina Rivas', cargo:'Super administrador' },
  { user:'admin',      pass:'admin123', rol:'admin_buses', nombre:'Diego Tapia',     cargo:'Jefe de flota' },
  { user:'mecanico',   pass:'meca123',  rol:'mecanico',    nombre:'C. Vega',         cargo:'Mecánico · Baterías',
    taller:'Electro-Taller Coquimbo · Bahía 3', turno:'08:00 – 16:00' },
  { user:'conductor',  pass:'cond123',  rol:'conductor',   nombre:'Luis Fuentes',    cargo:'Conductor',
    bus:'BE-105' },
];

// Metadatos de rol (etiqueta + color del badge)
const EF_ROLES = {
  superadmin:  { label:'Super administrador', color:'#E10600' },
  admin_buses: { label:'Admin de buses',      color:'#0a4f8a' },
  mecanico:    { label:'Mecánico',            color:'#997404' },
  conductor:   { label:'Conductor',           color:'#0f5132' },
};

const EF_SESSION_KEY = 'ef_session';

// Valida credenciales y abre sesión. Devuelve la sesión o null.
function efLogin(user, pass){
  const u = EF_USERS.find(x => x.user === String(user).trim() && x.pass === pass);
  if(!u) return null;
  const sess = { user:u.user, rol:u.rol, nombre:u.nombre, cargo:u.cargo,
                 taller:u.taller||null, bus:u.bus||null, ts:Date.now() };
  localStorage.setItem(EF_SESSION_KEY, JSON.stringify(sess));
  return sess;
}

// Devuelve la sesión actual o null.
function efSession(){
  try { return JSON.parse(localStorage.getItem(EF_SESSION_KEY)); }
  catch(e){ return null; }
}

// Cierra sesión y vuelve al login (que ahora es index.html).
function efLogout(){
  localStorage.removeItem(EF_SESSION_KEY);
  location.href = 'index.html';
}

// Guard para páginas protegidas: si no hay sesión (o el rol no está permitido)
// redirige al login. allowedRoles es opcional (array de roles permitidos).
function efRequireSession(allowedRoles){
  const s = efSession();
  if(!s){ location.replace('index.html'); return null; }
  if(allowedRoles && allowedRoles.indexOf(s.rol) === -1){ location.replace('index.html'); return null; }
  return s;
}
