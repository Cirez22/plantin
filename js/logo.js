// ---------------------------------------------------------------
// Plantín — el logo: las cuatro familias + "Plantín" en serif
// (diseño "Logo Plantin.dc.html", opción 1c). También exporta las formas
// que usa todo el sitio como íconos, stickers y decoración.
// ---------------------------------------------------------------

const Logo = (() => {
  // Formas del diseño: curvas polares normalizadas a un viewBox de 100×100.
  function poly(fn, n = 240) {
    let d = '';
    for (let k = 0; k <= n; k++) {
      const t = (k / n) * Math.PI * 2;
      const r = fn(t);
      const x = 50 + r * Math.cos(t - Math.PI / 2);
      const y = 50 + r * Math.sin(t - Math.PI / 2);
      d += (k === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2);
    }
    return d + 'Z';
  }
  const P = {
    wavy: poly(t => 42 * (1 + 0.075 * Math.cos(9 * t))),
    star: poly(t => 44 * (0.76 + 0.24 * Math.cos(8 * t))),
    scallop: poly(t => 46 * (0.83 + 0.17 * Math.abs(Math.cos(5 * t)))),
    clover: poly(t => 47 * (0.5 + 0.5 * Math.pow(Math.abs(Math.cos(2.5 * t)), 0.6))),
    spiky: poly(t => 45 * (0.8 + 0.2 * Math.cos(12 * t))),
    blob: poly(t => 44 * (1 + 0.1 * Math.sin(3 * t + 0.6) + 0.06 * Math.cos(5 * t))),
  };

  // Colores de las cuatro familias: suculentas, interior, orquídeas, exterior (+ versiones sobre fondo oscuro).
  const C = { star: '#D4A03A', wavy: '#2E6B3E', scallop: '#A9552F', clover: '#76866A', wavyDark: '#F4F2ED', scallopDark: '#C98A5E' };
  const orden = dark => [['star', C.star], ['wavy', dark ? C.wavyDark : C.wavy], ['scallop', dark ? C.scallopDark : C.scallop], ['clover', C.clover]];
  const shape = (d, fill) => `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${d}" fill="${fill}"/></svg>`;

  const marca = dark => `<span class="lg-mark lg-grid">${orden(dark).map(([f, c]) => shape(P[f], c)).join('')}</span>Plantín`;
  const favicon = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g transform="scale(.5)">${
    orden(false).map(([f, c], i) => `<path d="${P[f]}" fill="${c}" transform="translate(${(i % 2) * 100} ${Math.floor(i / 2) * 100})"/>`).join('')}</g></svg>`;

  // Pone el logo en la navbar, el menú mobile y el footer (sobre oscuro), y el favicon.
  function aplicar() {
    $$('.brand').forEach(el => { el.innerHTML = marca(!!el.closest('.footer, .mobile-menu')); });
    let fav = $('link[rel="icon"]');
    if (!fav) { fav = document.createElement('link'); fav.rel = 'icon'; document.head.appendChild(fav); }
    fav.href = 'data:image/svg+xml,' + encodeURIComponent(favicon());
  }

  // Las cuatro familias sobre fondo oscuro, para el splash del home.
  const familias1c = () => orden(true).map(([f, c]) => [P[f], c]);

  return { aplicar, familias1c, P };
})();

// Una forma de la familia como SVG inline (para íconos de categoría, stickers, decoración).
function forma(nombre, color, cls = '') {
  return `<svg class="forma ${cls}" viewBox="0 0 100 100" aria-hidden="true"><path d="${Logo.P[nombre] || Logo.P.blob}" fill="${color}"/></svg>`;
}

document.addEventListener('DOMContentLoaded', () => {
  // <span data-forma="star" data-color="#D4A03A"> en el HTML → se dibuja la forma adentro.
  $$('[data-forma]').forEach(el => { el.innerHTML = forma(el.dataset.forma, el.dataset.color || 'currentColor'); });
  Logo.aplicar();
});
