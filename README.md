# Plantín — landing de validación

Sitio 100% estático (HTML + CSS + JS, sin backend). Se puede abrir con doble clic en `index.html`.

## Deploy

El sitio se publica en Netlify desde el repo https://github.com/Cirez22/plantin: una vez conectado, cada `git push` a `main` lo actualiza.
`netlify.toml` arma una carpeta `dist/` solo con las páginas, `css/`, `js/` e `img/`, así que nada más del repo queda público.
En Netlify: *Add new site → Import an existing project → GitHub → Cirez22/plantin* (toma la configuración de `netlify.toml` sola).

Fuera del repo (`.gitignore`): `proximamente/` (admin y roadmap, internos), `imgs/` y `diseño/` (originales pesados).

## Para la demo

- `js/data.js` → `DEMO_WHATSAPP`: poné tu número (formato `549...`, sin `+`) y los pedidos del carrito te llegan a vos.
- `js/data.js` → `PLANTIN_WHATSAPP`: número al que llega el formulario "Agregá tu vivero".
- Viveros, plantas y precios están en `js/data.js`; las fotos en `img/` (`-lg` para detalle/portadas, `-sm` para cards).
- `img/archivo-abuelo-lg.jpg` es un placeholder (foto de orquídeas pasada a B&N). Reemplazalo por la foto real del abuelo con el mismo nombre.
- `diseño/` tiene las referencias de diseño (las portadas de categoría del home salen de ahí).
- La carpeta `imgs/` son los originales (no los usa el sitio y no se suben al repo).

## Splash

- Se muestra una vez por sesión de navegador. `index.html?nosplash` lo saltea; `index.html?t=1500` lo congela en ese milisegundo (para revisar la animación).
- Tiempos y gestos: `css/style.css` (bloque "Splash"). Las cuatro formas del logo 1c (y sus colores) salen de `js/logo.js`; `js/splash.js` las arma y centra el logo antes de arrancar.

## Próximamente

En `proximamente/` quedó en pausa el panel admin (métricas de la web) y la especificación del CRM de viveros y pedidos.
Ver `proximamente/README.md`. Mientras tanto el sitio no registra ninguna actividad (`METRICAS.activo = false` en `js/data.js`).

## Ver en local

    python -m http.server 8000
    # http://localhost:8000
