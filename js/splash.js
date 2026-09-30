// ---------------------------------------------------------------
// Splash: las cuatro familias del logo (1c) entran de a una, se mueven
// y se acomodan al lado de "Plantín" (tiempos y gestos en style.css).
// Las formas y colores salen de js/logo.js.
// ---------------------------------------------------------------
(function () {
  const splash = document.getElementById('splash');
  if (!splash || splash.hidden) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lockup = splash.querySelector('.lockup');
  const mk = splash.querySelector('.mk');

  // Las cuatro formas; cada una en su propio span para separar la entrada (span) del movimiento continuo (svg).
  const formas = typeof Logo !== 'undefined' && Logo.familias1c
    ? Logo.familias1c()
    : [['M50 8a42 42 0 1 0 0 84a42 42 0 1 0 0-84Z', '#D4A03A'], ['M50 8a42 42 0 1 0 0 84a42 42 0 1 0 0-84Z', '#F4F2ED'],
       ['M50 8a42 42 0 1 0 0 84a42 42 0 1 0 0-84Z', '#C98A5E'], ['M50 8a42 42 0 1 0 0 84a42 42 0 1 0 0-84Z', '#76866A']];
  mk.innerHTML = formas.map(([d, fill], i) =>
    `<span class="sh s${i + 1}"><svg viewBox="0 0 100 100"><path d="${d}" fill="${fill}"/></svg></span>`).join('');

  function go() {
    // Corrimiento para que el logo nazca en el centro de la pantalla (la palabra todavía está oculta).
    const lr = lockup.getBoundingClientRect(), mr = mk.getBoundingClientRect();
    const shift = (lr.left + lr.width / 2) - (mr.left + mr.width / 2);
    splash.style.setProperty('--shift', shift.toFixed(1) + 'px');

    splash.classList.add('go');
    if (reduce) splash.classList.add('reduce');

    // Debug: index.html?t=1500 congela la animación en ese milisegundo.
    const dbg = new URLSearchParams(location.search).get('t');
    if (dbg !== null) {
      setTimeout(() => document.getAnimations().forEach(a => { a.pause(); a.currentTime = Number(dbg); }), 50);
      return;
    }
    setTimeout(() => {
      splash.classList.add('out');
      splash.addEventListener('animationend', e => {
        if (e.animationName === 'splashOut') { splash.remove(); document.body.classList.remove('splash-on'); }
      });
    }, reduce ? 1200 : 3700);
  }

  // Espera la tipografía para medir bien, pero no más de 900 ms.
  let done = false;
  const once = () => { if (!done) { done = true; setTimeout(go, 0); } };
  if (document.fonts && document.fonts.load) {
    document.fonts.load('1em "Instrument Serif"').then(once, once);
    setTimeout(once, 900);
  } else once();
})();
