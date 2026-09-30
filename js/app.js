// ---------------------------------------------------------------
// Plantín — lógica compartida (navbar, footer, carrito, helpers)
// Sin backend: el carrito vive en localStorage del navegador.
// ---------------------------------------------------------------

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

const fmt = n => '$' + n.toLocaleString('es-AR');
const byId = (arr, id) => arr.find(x => x.id === id);
const vivero = id => byId(VIVEROS, id);
const categoria = id => byId(CATEGORIAS, id);
const planta = id => byId(PLANTAS, id);
// 'ilus-…' son ilustraciones SVG (productos sin foto); el resto, fotos en dos tamaños.
const img = (name, size = 'sm') => (name.startsWith('ilus-') ? `img/${name}.svg` : `img/${name}-${size}.jpg`);
// Para tarjetas grandes: el navegador elige la foto chica o la grande según el ancho de pantalla.
const srcset = name => (name.startsWith('ilus-') ? '' : `srcset="${img(name)} 600w, ${img(name, 'lg')} 1200w"`);
const param = k => new URLSearchParams(location.search).get(k);
const page = () => (location.pathname.split('/').pop() || 'index.html').replace('.html', '');

const ICON = {
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 8.5H7.5L6 6z"/><path d="M6 6L5 3H2"/><circle cx="9" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3.1 4.4c-.2 0-.5 0-.8.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.4-.5-.6-.5h-.6z"/></svg>',
  filtro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2.2"/><circle cx="10" cy="17" r="2.2"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};

// El logo (las cuatro familias) lo dibuja js/logo.js adentro de cada .brand.
const BRAND = 'Plantín';

// ---------- Zona ----------
const Zona = {
  get() { try { return localStorage.getItem('plantin_zona') || 'todas'; } catch { return 'todas'; } },
  set(z) { try { localStorage.setItem('plantin_zona', z); } catch {} },
  label(z) { return z === 'todas' ? 'CABA y Zona Norte' : ZONAS[z]; },
};

// ---------- Carrito ----------
// Cada línea es { id, t, qty }: t es el índice del tamaño elegido (null si la planta no tiene tamaños).
const lineKey = (id, t) => (t == null ? id : `${id}@${t}`);
function lineInfo(it) {
  const p = planta(it.id); if (!p) return null;
  const v = p.tamanos && it.t != null ? p.tamanos[it.t] : null;
  return { p, qty: it.qty, key: lineKey(it.id, it.t), precio: v ? v.precio : p.precio, tam: v ? v.tam : p.tam, variante: v ? v.n : null };
}
const Cart = {
  read() { try { return JSON.parse(localStorage.getItem('plantin_cart') || '[]'); } catch { return []; } },
  write(items) { try { localStorage.setItem('plantin_cart', JSON.stringify(items)); } catch {} renderCartCount(); },
  add(id, qty = 1, t = null) {
    const items = this.read();
    const it = items.find(x => lineKey(x.id, x.t) === lineKey(id, t));
    if (it) it.qty += qty; else items.push({ id, t, qty });
    this.write(items);
  },
  setQty(key, qty) {
    let items = this.read();
    if (qty <= 0) items = items.filter(x => lineKey(x.id, x.t) !== key);
    else { const it = items.find(x => lineKey(x.id, x.t) === key); if (it) it.qty = qty; }
    this.write(items);
  },
  remove(key) { this.write(this.read().filter(x => lineKey(x.id, x.t) !== key)); },
  count() { return this.read().reduce((a, x) => a + x.qty, 0); },
  clear() { this.write([]); },
};

function renderCartCount() {
  const n = Cart.count();
  $$('.cart-count').forEach(el => { el.textContent = n; el.dataset.n = n; });
}

// ---------- Navbar + footer ----------
const NAV = [
  ['index', 'Inicio'],
  ['quienes-somos', 'Quiénes somos'],
  ['como-funciona', 'Cómo funciona'],
  ['viveros', 'Viveros'],
  ['comunidad', 'Comunidad'],
];

function renderChrome() {
  const cur = page();
  const isActive = id => id === cur || (id === 'viveros' && cur === 'vivero') || (id === 'index' && ['categoria', 'planta'].includes(cur));
  const links = NAV.map(([id, t]) => `<li><a href="${id}.html" class="${isActive(id) ? 'active' : ''}">${t}</a></li>`).join('');

  const nav = document.createElement('header');
  nav.className = 'nav';
  nav.innerHTML = `
    <div class="wrap">
      <a class="brand" href="index.html">${BRAND}</a>
      <ul class="nav-links">${links}</ul>
      <div class="nav-right">
        <a class="cart-btn" href="carrito.html" aria-label="Carrito">${ICON.cart}<span class="label">Carrito</span><span class="cart-count" data-n="0">0</span></a>
        <button class="burger" aria-label="Menú"><span></span></button>
      </div>
    </div>`;
  document.body.prepend(nav);

  // Cinta que corre arriba de la barra: lo que es Plantín, en una línea.
  const frases = ['Viveros de barrio, no depósitos', 'Le escribís directo al vivero', 'Sin comisiones', 'CABA y Zona Norte', 'El precio lo pone el vivero', 'Plantas criadas por gente'];
  const sep = ['star', 'wavy', 'scallop', 'clover'], col = ['#D4A03A', '#F4F2ED', '#C98A5E', '#8fa88f'];
  const tira = frases.map((f, i) => `<span>${typeof forma === 'function' ? forma(sep[i % 4], col[i % 4]) : '·'}${f}</span>`).join('');
  const ticker = document.createElement('div');
  ticker.className = 'ticker';
  ticker.setAttribute('aria-hidden', 'true');
  ticker.innerHTML = `<div class="ticker-track">${tira}${tira}</div>`;
  document.body.prepend(ticker);

  const menu = document.createElement('div');
  menu.className = 'mobile-menu';
  menu.innerHTML = `
    <div class="top"><span class="brand">${BRAND}</span><button class="close" aria-label="Cerrar">×</button></div>
    <ul>${links}<li><a href="carrito.html">Carrito</a></li></ul>
    <div class="foot">El mundo de las plantas. Viveros de CABA y Zona Norte.</div>`;
  document.body.appendChild(menu);
  $('.burger', nav).onclick = () => menu.classList.add('open');
  $('.close', menu).onclick = () => menu.classList.remove('open');

  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="wrap">
      <div class="top">
        <div>
          <a class="brand" href="index.html">${BRAND}</a>
          <p class="tag">El mundo de las plantas. El catálogo de los viveros de Buenos Aires: elegís, y le pedís directo al vivero por WhatsApp.</p>
        </div>
        <div>
          <h4>Navegar</h4>
          <ul>${NAV.map(([id, t]) => `<li><a href="${id}.html">${t}</a></li>`).join('')}<li><a href="carrito.html">Carrito</a></li></ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul>
            <li>CABA y Zona Norte</li>
            <li><a href="mailto:hola@plantin.com.ar">hola@plantin.com.ar</a></li>
            <li><a href="https://wa.me/${PLANTIN_WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href="quienes-somos.html#sumate">Agregá tu vivero →</a></li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <span>© ${new Date().getFullYear()} Plantín · Buenos Aires</span>
        <span>Sitio de muestra. Los viveros y precios son ejemplos.</span>
      </div>
    </div>`;
  document.body.appendChild(footer);

  const toast = document.createElement('div');
  toast.className = 'toast'; toast.id = 'toast';
  document.body.appendChild(toast);

  renderCartCount();
}

let toastTimer;
function toast(html, ms = 3200) {
  const t = $('#toast');
  t.innerHTML = html; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

// ---------- Helpers de render ----------
// Etiqueta "Ejemplo" para viveros inventados y sus productos (ejemplo: true en js/data.js).
const esEjemplo = x => !!(x && (x.ejemplo || (x.vivero && (vivero(x.vivero) || {}).ejemplo)));
const tagEjemplo = (x, cls = '') => (esEjemplo(x) ? `<span class="tag-ejemplo ${cls}" title="Vivero de ejemplo: todavía no es real">Ejemplo</span>` : '');

function plantCard(p) {
  const v = vivero(p.vivero), c = categoria(p.cat);
  const dot = typeof forma === 'function' ? `<span class="cat-dot" title="${c.nombre}">${forma(c.forma, c.color)}</span>` : '';
  return `
    <a class="card" href="planta.html?id=${p.id}" style="--cat:${c.color}">
      <div class="ph"><img src="${img(p.img)}" ${srcset(p.img)} sizes="(max-width: 700px) 50vw, 440px" alt="${p.nombre}" loading="lazy"><span class="zona">${ZONAS[v.zona]}</span>${tagEjemplo(p, 'sobre-foto')}${dot}</div>
      <div class="info">
        <div class="name">${p.nombre}</div>
        ${p.servicio ? '<div class="serv-linea"><span class="serv-tag">Servicio</span> Se consulta por WhatsApp</div>' : ''}
        <div class="meta">${v.nombre} · ${v.barrio}${Orden.get() === 'cerca' && kmAlVivero(v) != null ? ` · a ${Math.max(1, Math.round(kmAlVivero(v)))} km` : ''}</div>
      </div>
    </a>`;
}

function plantGrid(list, emptyMsg = 'No encontramos plantas con ese filtro.') {
  if (!list.length) return `<div class="empty"><h3>Nada por acá todavía.</h3><p class="muted">${emptyMsg}</p></div>`;
  return `<div class="grid">${list.map(plantCard).join('')}</div>`;
}

// Las tarjetas de vivero (viveroCard) viven en js/carteles.js.

// Rangos de precio para filtrar catálogos (min incluido, max excluido)
const RANGOS_PRECIO = [
  { id: 'hasta-10', nombre: 'Hasta $10.000', max: 10000 },
  { id: '10-25', nombre: '$10.000 a $25.000', min: 10000, max: 25000 },
  { id: 'mas-25', nombre: 'Más de $25.000', min: 25000 },
];
const enRango = (precio, r) => precio != null && (r.min == null || precio >= r.min) && (r.max == null || precio < r.max);
const vendeMayorista = v => PLANTAS.some(p => p.vivero === v.id && p.mayorista);

// ---------- Barra de filtros ----------
// Un botón "Filtros" que abre un panel con los grupos, y al lado los filtros activos como chips con ×.
// grupos: [{ key, label, opciones: [{ v, t, href? }], toggle? }] — la primera opción de cada grupo es "sin filtro".
// Los grupos toggle tienen una sola opción que se prende y se apaga (estado[key] = true/false).
function barraFiltros(host, { grupos, estado, onChange, derecha = '' }) {
  const g0 = g => g.opciones[0].v;
  const activos = () => grupos.flatMap(g => g.toggle
    ? (estado[g.key] ? [{ g, t: g.opciones[0].t }] : [])
    : (estado[g.key] !== g0(g) ? [{ g, t: (g.opciones.find(o => o.v === estado[g.key]) || {}).t }] : []));
  let abierto = false;

  function pintar() {
    const act = activos();
    host.innerHTML = `
      <div class="fbar">
        <button class="fbtn ${abierto ? 'on' : ''}" aria-expanded="${abierto}">${ICON.filtro}<span>Filtros</span>${act.length ? `<b>${act.length}</b>` : ''}</button>
        <div class="fchips">${act.map(a => `<button class="fchip" data-quitar="${a.g.key}" aria-label="Quitar ${a.t}">${a.t}<i>×</i></button>`).join('')}</div>
        <div class="fder">${derecha}</div>
      </div>
      <div class="fpanel" ${abierto ? '' : 'hidden'}>
        ${grupos.map(g => `
          <div class="fgrupo"><span>${g.label}</span><div>${g.opciones.map(o => {
            const on = g.toggle ? !!estado[g.key] : estado[g.key] === o.v;
            return o.href
              ? `<a class="fop ${on ? 'on' : ''}" href="${o.href}">${o.t}</a>`
              : `<button class="fop ${on ? 'on' : ''}" data-g="${g.key}" data-v="${o.v}">${o.t}</button>`;
          }).join('')}</div></div>`).join('')}
        <div class="fpie">
          <button class="flimpiar" ${act.length ? '' : 'disabled'}>Limpiar filtros</button>
          <button class="fcerrar">Listo</button>
        </div>
      </div>`;
  }
  function cambiar() { onChange(); pintar(); }
  host.onclick = e => {
    const t = e.target;
    if (t.closest('.fbtn')) { abierto = !abierto; pintar(); return; }
    if (t.closest('.fcerrar')) { abierto = false; pintar(); return; }
    const q = t.closest('[data-quitar]');
    if (q) { const g = grupos.find(x => x.key === q.dataset.quitar); estado[g.key] = g.toggle ? false : g0(g); cambiar(); return; }
    if (t.closest('.flimpiar')) { grupos.forEach(g => { estado[g.key] = g.toggle ? false : g0(g); }); cambiar(); return; }
    const b = t.closest('[data-g]');
    if (b) {
      const g = grupos.find(x => x.key === b.dataset.g); estado[g.key] = g.toggle ? !estado[g.key] : b.dataset.v;
      if (g.toggle ? estado[g.key] : estado[g.key] !== g0(g)) Metricas.registrar('filtro', { grupo: g.key, valor: g.toggle ? 'si' : b.dataset.v });
      cambiar();
    }
  };
  // composedPath se calcula al hacer clic: sirve aunque el panel se haya redibujado en el medio.
  document.addEventListener('click', e => { if (abierto && !e.composedPath().includes(host)) { abierto = false; pintar(); } });
  document.addEventListener('keydown', e => { if (abierto && e.key === 'Escape') { abierto = false; pintar(); } });
  pintar();
  return { pintar, setDerecha(html) { derecha = html; pintar(); } };
}

// Opciones de precio para la barra de filtros (solo los rangos que tienen productos en la lista).
const opcionesPrecio = lista => [{ v: 'todos', t: 'Todos' }, ...RANGOS_PRECIO.filter(r => lista.some(p => enRango(p.precio, r))).map(r => ({ v: r.id, t: r.nombre }))];

// ---------- Orden de resultados ----------
// Solo dos órdenes: "Destacados" (curado por Plantín) o "Cerca tuyo".
// A propósito NO existe ordenar por menor precio: no queremos que los viveros compitan por precio.
const Orden = {
  get() { try { return localStorage.getItem('plantin_orden') === 'cerca' ? 'cerca' : 'destacados'; } catch { return 'destacados'; } },
  set(o) { try { localStorage.setItem('plantin_orden', o); } catch {} },
};
// La ubicación queda solo en esta pestaña (sessionStorage) y nunca sale del navegador.
const Ubicacion = {
  get() { try { return JSON.parse(sessionStorage.getItem('plantin_ubic') || 'null'); } catch { return null; } },
  pedir() {
    return new Promise((ok, fail) => {
      if (!navigator.geolocation) return fail(new Error('sin geolocalización'));
      navigator.geolocation.getCurrentPosition(pos => {
        const u = [pos.coords.latitude, pos.coords.longitude];
        try { sessionStorage.setItem('plantin_ubic', JSON.stringify(u)); } catch {}
        ok(u);
      }, fail, { timeout: 10000, maximumAge: 600000 });
    });
  },
};
function distanciaKm([la1, lo1], [la2, lo2]) {
  const r = Math.PI / 180, dLa = (la2 - la1) * r, dLo = (lo2 - lo1) * r;
  const a = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * r) * Math.cos(la2 * r) * Math.sin(dLo / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(a));
}
const kmAlVivero = v => { const u = Ubicacion.get(); return u && v.coords ? distanciaKm(u, v.coords) : null; };

// Ordena plantas sin tocar el array original. Empates: se respeta el orden de carga.
function ordenar(list, modo = Orden.get()) {
  const dest = p => (p.destacado ? 0 : 1);
  const rows = list.map((p, i) => ({ p, i, km: modo === 'cerca' ? kmAlVivero(vivero(p.vivero)) : null }));
  rows.sort((a, b) => (a.km != null && b.km != null && a.km !== b.km ? a.km - b.km : 0) || dest(a.p) - dest(b.p) || a.i - b.i);
  return rows.map(r => r.p);
}

function filterByZona(list, z) {
  if (!z || z === 'todas') return list;
  return list.filter(p => vivero(p.vivero).zona === z);
}

function normalize(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
function searchPlantas(q) {
  const n = normalize(q.trim());
  if (n.length < 2) return [];
  return ordenar(PLANTAS.filter(p => {
    const v = vivero(p.vivero);
    return normalize(`${p.nombre} ${categoria(p.cat).nombre} ${v.nombre} ${v.barrio}`).includes(n);
  }));
}

// Mensaje de WhatsApp para un bloque de vivero
function waMessage(v, lines) {
  const total = lines.reduce((a, l) => a + l.precio * l.qty, 0);
  const items = lines.map(l => `- ${l.qty}x ${l.p.nombre}${l.variante ? ' ' + l.variante : ''} (${fmt(l.precio)}${l.qty > 1 ? ' c/u' : ''})`).join('\n');
  return `Hola ${v.nombre}! Vi su catálogo en Plantín y quiero pedir:\n${items}\nTotal: ${fmt(total)}.\n¿Cómo coordinamos el pago y la entrega?`;
}
function waLink(number, text) { return `https://wa.me/${number}?text=${encodeURIComponent(text)}`; }

// ---------- Métricas (para el panel admin, en pausa: proximamente/) ----------
// Eventos anónimos: nada de nombres, teléfonos ni ubicación. Cada navegador tiene un id al azar (visitante)
// y cada pestaña otro (visita). Si Supabase no está configurado, se guardan en este navegador.
const Metricas = {
  LOCAL: 'plantin_eventos',
  remoto: () => !!(typeof METRICAS !== 'undefined' && METRICAS.supabaseUrl && METRICAS.supabaseKey),
  activo: () => typeof METRICAS !== 'undefined' && METRICAS.activo && navigator.doNotTrack !== '1' && page() !== 'admin',
  id(store, key) {
    try { let v = store.getItem(key); if (!v) { v = Math.random().toString(36).slice(2, 12); store.setItem(key, v); } return v; } catch { return 'anon'; }
  },
  registrar(tipo, datos = {}) {
    if (!this.activo()) return;
    let ref = '';
    try { const r = document.referrer && new URL(document.referrer); if (r && r.host !== location.host) ref = r.host.replace(/^www\./, ''); } catch {}
    const ev = {
      v: this.id(localStorage, 'plantin_vid'), s: this.id(sessionStorage, 'plantin_sid'),
      tipo, pagina: page(), datos, ref, disp: matchMedia('(max-width: 700px)').matches ? 'movil' : 'compu',
    };
    if (this.remoto()) {
      // keepalive: el evento sale aunque el clic lleve a WhatsApp y se cierre la página
      fetch(`${METRICAS.supabaseUrl}/rest/v1/eventos`, {
        method: 'POST', keepalive: true,
        headers: { apikey: METRICAS.supabaseKey, Authorization: `Bearer ${METRICAS.supabaseKey}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify(ev),
      }).catch(() => {});
    } else {
      try {
        const lista = JSON.parse(localStorage.getItem(this.LOCAL) || '[]');
        lista.push({ ...ev, t: new Date().toISOString() });
        localStorage.setItem(this.LOCAL, JSON.stringify(lista.slice(-5000)));
      } catch {}
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
  renderChrome();
  if (typeof initPage === 'function') initPage();
  Metricas.registrar('vista');
});
