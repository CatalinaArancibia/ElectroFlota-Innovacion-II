# ⚡ ElectroFlota — Coordinación de talleres de buses eléctricos

Plataforma web (con simulación 3D) que **centraliza y coordina la red de talleres**
especializados en micros / buses eléctricos de la **Región de Coquimbo, Chile**.
Su objetivo es **reducir el tiempo de inactividad de la flota**: devolver cada bus a la
ruta en el menor tiempo posible mediante diagnóstico digital, mantenimiento predictivo,
asignación inteligente de técnicos y coordinación multi-taller.

> Proyecto académico — **INACAP, Sede La Serena**. Datos operativos **simulados**
> (no hay acceso a datos reales de la flota).

### 🌐 Demo en vivo

**https://catalinaarancibia.github.io/ElectroFlota-Innovacion-II/**

---

## 👥 Integrantes del proyecto

- Catalina Arancibia
- Rafael Morales
- Thomas Boilet
- Alex Ibacache
- Roger Campos

---

## 🧩 Qué incluye

El sistema se organiza en **dos productos** que comparten el mismo dominio y look & feel:

### 1. Panel de gestión (`index.html` → `dashboard.html`)
Tablero web con **autenticación por roles** (login en `index.html`):

- **KPIs de la flota** (total, en ruta, en taller, alertas críticas).
- **Órdenes de trabajo** con estados y aprobación/rechazo *(D5)*.
- **Alertas predictivas** de mantenimiento *(A3 / A7)*.
- **Carga por taller** y **mapa** de talleres con Leaflet + OpenStreetMap *(H9 / J10 / G7)*.
- **Inventario de repuestos** con alertas de stock bajo *(B1)*.
- **Ficha / historial** por bus *(H2)*, **turnos** por especialidad *(J9)* y
  **reporte de fallas** en terreno *(G5)* según el rol.

### 2. Simulación 3D (`electroflota_3d_v3.html`)
"Sala de control" en vivo (Three.js): la flota circulando por la ciudad, telemetría,
**alerta predictiva → desvío al taller → reparación → retorno a ruta**, con modelos
3D reales del bus y cámara orbital. Usa modelos en `models/` (con respaldo automático
si faltan los archivos).

---

## 🔑 Credenciales de prueba (login)

> ⚠️ **Autenticación de demostración, NO segura.** Las credenciales viven en el cliente
> (`auth.js`) solo para mostrar el flujo. En producción iría contra un backend con
> contraseñas hasheadas y validación de rol en el servidor.

| Rol | Usuario | Contraseña | Acceso |
|-----|---------|------------|--------|
| **Super administrador** | `superadmin` | `super123` | Todo + gestión de usuarios y configuración |
| **Admin de buses** | `admin` | `admin123` | Gestión de la flota (sin usuarios/config) |
| **Mecánico** | `mecanico` | `meca123` | Sus órdenes, ficha/historial, repuestos, turnos |
| **Conductor** | `conductor` | `cond123` | Su bus, reporte de fallas, QR → historial |

En la pantalla de login hay un desplegable **"Cuentas de prueba"** que las autocompleta con un clic.

---

## ▶️ Cómo usarlo

### 🌐 En línea (GitHub Pages)

Abre la demo publicada:

**https://catalinaarancibia.github.io/ElectroFlota-Innovacion-II/**

Te lleva al **login**. Inicia sesión con alguna de las credenciales de prueba para entrar
al **dashboard**; desde el login también hay un enlace a la **simulación 3D**.

### 💻 En local (desarrollo)

El proyecto es front-end estático, pero **necesita un servidor local** porque la simulación
3D carga modelos (`.glb` / `.obj`) y los navegadores bloquean esa carga al abrir el HTML con
doble clic (`file://`):

```bash
cd "Proyecto Innovacion"
python -m http.server 8000      # con Python  (o:  npx serve  con Node)
```

Luego abre `http://localhost:8000/`.

---

## 📁 Estructura del proyecto

```
Proyecto Innovacion/
├── index.html                 # Login (punto de entrada)
├── dashboard.html             # Panel de gestión (protegido, vistas por rol)
├── auth.js                    # Sesión y roles (compartido, demo)
├── electroflota_3d_v3.html    # Simulación 3D (versión actual)
├── electroflota_3d_v2.html    # Simulación 3D (versión previa)
├── models/                    # Modelos 3D (bus.obj + texturas, car1.glb, ...)
│   └── README.md              # Cómo agregar/ajustar modelos
└── README.md                  # Este archivo
```

---

## 🛠️ Stack tecnológico

- **Front-end:** HTML + CSS + JavaScript (sin framework de build).
- **UI del dashboard:** [Bootstrap 5](https://getbootstrap.com/) + Bootstrap Icons.
- **3D:** [Three.js](https://threejs.org/) (r128) con `OBJLoader` / `GLTFLoader`.
- **Mapas:** [Leaflet](https://leafletjs.com/) + OpenStreetMap (gratis, sin API key).
- **Datos:** simulados (seed) con comunas reales de la Región de Coquimbo
  (La Serena, Coquimbo, Ovalle) y patentes/nombres plausibles.

---

## 🌱 Sostenibilidad (ODS)

El proyecto se alinea con tres Objetivos de Desarrollo Sostenible:

- **ODS 9** — Industria, innovación e infraestructura (tecnología limpia).
- **ODS 11** — Ciudades y comunidades sostenibles (transporte seguro y asequible).
- **ODS 13** — Acción por el clima (mantener operativa la flota eléctrica reduce emisiones).

**Impacto triple:** social (transporte confiable, empleo técnico), económico (menos costos
por inactividad) y ambiental (el beneficio cero emisiones solo se concreta cuando los buses circulan).

---

> Nombres de variables/funciones en inglés; UI y textos en español (es-CL).
> Todos los datos operativos mostrados son **simulados** con fines académicos.
