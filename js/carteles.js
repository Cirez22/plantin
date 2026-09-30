// ---------------------------------------------------------------
// Plantín — el "cartel" de cada vivero (imgs/Plantin - Viveros.html)
// Cada vivero tiene su propia pieza 4:5: tipografía, paleta e ilustración.
// Todo escala con cqw (ver bloque "Carteles" en css/style.css).
// Para sumar un vivero: agregá su función acá y su bloque .c-<id> en el CSS.
// ---------------------------------------------------------------

const CARTELES = {
  // Afiche suizo de nativas: filetes horizontales, círculos de color y ramas.
  'el-ombu': v => `
    <svg class="ilus" viewBox="0 0 100 125" aria-hidden="true">
      <circle cx="34" cy="26" r="20" fill="#F4A6D7"/>
      <circle cx="60" cy="40" r="20" fill="#F07A1A" style="mix-blend-mode: multiply"/>
      <circle cx="75" cy="97" r="19" fill="#E3C82A"/>
      <g stroke="#2F8A4C" fill="none" stroke-linecap="round">
        <path d="M-4 120 C18 102 28 84 24 64 C21 48 26 34 38 22" stroke-width="2.4"/>
        <path d="M24 82 C44 88 70 80 104 90" stroke-width="2.4"/>
        <path d="M22 60 C30 52 40 50 48 44" stroke-width="2"/>
      </g>
      <g fill="#2F8A4C">
        <ellipse cx="12" cy="50" rx="11" ry="4.5" transform="rotate(-35 12 50)"/>
        <ellipse cx="34" cy="66" rx="10" ry="4" transform="rotate(-60 34 66)"/>
        <ellipse cx="8" cy="84" rx="10" ry="4.2" transform="rotate(20 8 84)"/>
        <ellipse cx="50" cy="42" rx="9" ry="3.8" transform="rotate(-25 50 42)"/>
        <ellipse cx="46" cy="94" rx="9" ry="4" transform="rotate(35 46 94)"/>
        <ellipse cx="66" cy="76" rx="10" ry="4" transform="rotate(-20 66 76)"/>
        <ellipse cx="88" cy="80" rx="9" ry="3.6" transform="rotate(-40 88 80)"/>
        <ellipse cx="18" cy="104" rx="10" ry="4" transform="rotate(-50 18 104)"/>
      </g>
      <circle cx="5" cy="46" r="1.6" fill="#1B1B1B"/>
      <circle cx="5" cy="58" r="1.6" fill="#1B1B1B"/>
    </svg>
    <div class="filas">
      <div class="xl">—El Ombú</div>
      <div class="xl">Exterior</div>
      <div class="s">${v.barrio}</div>
      <div class="s">Lun a sáb · 8 a 18</div>
    </div>
    <div class="lista">
      <div><i>→</i>Nativas</div>
      <div><i>→</i>Árboles chicos</div>
      <div><i>→</i>Cubresuelos</div>
      <div><i>→</i>Y más</div>
    </div>
    <div class="vert">${v.barrio} — Buenos Aires</div>`,

  // Afiche naranja de hoja rara: papel recortado arriba, foto tramada abajo.
  'las-canitas': v => `
    <div class="foto"><img src="${img(v.cover, 'lg')}" alt="" loading="lazy"></div>
    <div class="papel"></div>
    <div class="badge">LAS CAÑITAS</div>
    <div class="nota">Calatheas y anthuriums.<br>Para deptos con poca luz.</div>
    <div class="titulo"><span>HOJA</span><span>RARA</span></div>
    <div class="sello">J.O.</div>
    <div class="firma"><b>LCP</b><span>${v.barrio.toUpperCase()}</span></div>`,

  // Mostaza y verde botella, minúsculas redondas y una phalaenopsis grande.
  'don-aurelio': v => `
    <div class="brillo"></div>
    <div class="pre">el vivero de</div>
    <div class="nombre">don aurelio</div>
    <div class="anio">${v.barrio}  —  desde ${new Date().getFullYear() - v.anios}</div>
    <svg class="ilus" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 92 C38 80 16 80 4 90 C18 99 38 99 50 92 Z" fill="#F3ECD9"/>
      <path d="M50 92 C62 78 86 78 97 86 C84 98 62 99 50 92 Z" fill="#F3ECD9"/>
      <path d="M50 64 C47 74 53 82 50 91 M50 76 C54 73 57 72 60 72" stroke="#F3ECD9" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <circle cx="61.5" cy="71.5" r="2.8" fill="#F3ECD9"/>
      <g transform="translate(11.6 0) scale(3.2)" fill="#F3ECD9" stroke="#E8B415" stroke-width=".32" stroke-linejoin="round">
        <path d="M12 10.5C10.6 8.6 10.4 4.8 12 2.8c1.6 2 1.4 5.8 0 7.7z"/>
        <path d="M12 10.5c-2.4 1.1-5.6 3.9-5.2 7.5 3.2-.2 5.2-3.8 5.2-7.5z"/>
        <path d="M12 10.5c2.4 1.1 5.6 3.9 5.2 7.5-3.2-.2-5.2-3.8-5.2-7.5z"/>
        <path d="M12 10.5C9.4 12 4.6 11.6 2.8 8.6 5 5.6 10.4 6.6 12 10.5z"/>
        <path d="M12 10.5c2.6 1.5 7.4 1.1 9.2-1.9-2.2-3-7.6-2-9.2 1.9z"/>
        <path d="M12 10.5c-1.4 2.1-1.6 6.1 0 9.9 1.6-3.8 1.4-7.8 0-9.9z"/>
        <circle cx="12" cy="10.9" r=".75" fill="#1E5A2B" stroke="none"/>
      </g>
    </svg>
    <div class="pie">orquídeas de invernadero<br>criadas en ${v.barrio}</div>
    <div class="pie der">Ruta 27 km 3,5<br>${ZONAS[v.zona]}</div>`,

  // Cartel de barrio: Londrina gruesa y un cactus a lunares en maceta con el horario.
  'flor-de-barrio': v => `
    <svg class="ilus" viewBox="0 0 100 118" aria-hidden="true">
      <defs>
        <pattern id="fdbDots" width="7" height="8" patternUnits="userSpaceOnUse"><ellipse cx="2" cy="2" rx=".8" ry="1.2" fill="#FFF3EA"/><ellipse cx="5.5" cy="6" rx=".8" ry="1.2" fill="#FFF3EA"/></pattern>
      </defs>
      <g fill="#E8383D">
        <rect x="38" y="4" width="26" height="80" rx="13"/>
        <path d="M40 60 H26 a9 9 0 0 1 -9 -9 V32 a8 8 0 0 1 16 0 V45 H40 Z"/>
        <path d="M62 50 H74 V24 a8 8 0 0 1 16 0 V46 a13 13 0 0 1 -13 13 H62 Z"/>
      </g>
      <g fill="url(#fdbDots)">
        <rect x="38" y="4" width="26" height="80" rx="13"/>
        <path d="M40 60 H26 a9 9 0 0 1 -9 -9 V32 a8 8 0 0 1 16 0 V45 H40 Z"/>
        <path d="M62 50 H74 V24 a8 8 0 0 1 16 0 V46 a13 13 0 0 1 -13 13 H62 Z"/>
      </g>
      <rect x="20" y="80" width="62" height="9" rx="2" fill="#6DB38E"/>
      <path d="M25 89 H77 L72 117 H30 Z" fill="#6DB38E"/>
      <text x="51" y="101" text-anchor="middle" font-family="'Londrina Solid', sans-serif" font-size="8" fill="#151515">LUN–SÁB</text>
      <text x="51" y="111" text-anchor="middle" font-family="'Londrina Solid', sans-serif" font-size="8" fill="#151515">10 A 20</text>
    </svg>
    <div class="titulo">Flor de<br>Barrio</div>
    <div class="bajada">con macetas de cemento hechas en el fondo</div>
    <div class="dir">PADILLA 830<br>${v.barrio.toUpperCase()}</div>
    <div class="firma"><b>F·D·B</b><span>${v.barrio} <em>DESDE ${new Date().getFullYear() - v.anios}</em></span></div>`,
};

// Cartel de un vivero; si todavía no tiene uno propio, cae en uno genérico con su foto.
function cartel(v) {
  const hacer = CARTELES[v.id];
  const inner = hacer ? hacer(v) : `
    <div class="foto"><img src="${img(v.cover, 'lg')}" alt="" loading="lazy"></div>
    <div class="nombre">${v.nombre}</div>`;
  return `<div class="cartel c-${hacer ? v.id : 'generico'}" role="img" aria-label="Cartel de ${v.nombre}">${inner}</div>`;
}

// Tarjeta del directorio: el cartel + nombre, especialidad y barrio.
function viveroCard(v) {
  return `
    <a class="vcard" href="vivero.html?id=${v.id}">
      ${cartel(v)}
      <div class="cap">
        <div><div class="n">${v.nombre} ${tagEjemplo(v)}</div><div class="m">${v.especialidad} · ${v.barrio}${vendeMayorista(v) ? ' · Por mayor' : ''}</div></div>
        <span class="go">Entrar →</span>
      </div>
    </a>`;
}

// Variables CSS con la identidad del vivero (fondo, tinta, acento, tipografías) para su página.
function marcaVars(v) {
  const m = v.marca || {};
  const vars = { bg: m.bg, ink: m.ink, accent: m.accent, on: m.on, tint: m.tint, display: m.display, body: m.body, size: m.size, caso: m.caso, peso: m.peso };
  return Object.entries(vars).filter(([, x]) => x != null).map(([k, x]) => `--c-${k}: ${x};`).join(' ');
}

// Tipografías de los carteles (se cargan solo en las páginas que los muestran).
const CARTEL_FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600&family=Dela+Gothic+One&family=Londrina+Solid:wght@400;900&family=Schibsted+Grotesk:wght@500;700&family=Young+Serif&display=swap';
(() => {
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.href = CARTEL_FONTS;
  document.head.appendChild(l);
})();
