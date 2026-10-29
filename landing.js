/* =============================================
   LANDING.JS — FisioTeck
   Hero con imágenes que cambian y demostración
   animada del registro gratuito.
   ============================================= */
(function () {
  'use strict';
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- HERO ---------- */
  const hero = document.getElementById('inicio');
  if (hero) {
    const all = Array.from(hero.querySelectorAll('.hero-slide'));
    const markers = document.getElementById('hero-markers');
    const pauseBtn = document.getElementById('hero-pause');
    const FALLBACK = 'assets/img/banner/banner.jpg';
    let slides = [];
    let cur = 0, timer = null, paused = reduce;

    const show = (i) => {
      slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
      markers.querySelectorAll('.hero-dot').forEach((d, k) => {
        d.classList.toggle('is-current', k === i);
        d.setAttribute('aria-pressed', k === i ? 'true' : 'false');
      });
      cur = i;
    };
    const next = () => show((cur + 1) % slides.length);
    const play = () => { clearInterval(timer); if (!paused && slides.length > 1) timer = setInterval(next, 6500); };

    const build = () => {
      if (!slides.length) {
        // Sin imágenes propias todavía: banner de respaldo.
        const img = all[0];
        img.src = FALLBACK;
        slides = [img];
      }
      const activa = slides[cur] && slides[cur].classList.contains('is-active') ? slides[cur] : null;
      slides.sort((x, y) => all.indexOf(x) - all.indexOf(y));
      markers.innerHTML = '';
      slides.forEach((img, k) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'hero-dot';
        b.setAttribute('aria-label', 'Ver imagen ' + (k + 1));
        b.addEventListener('click', () => { show(k); play(); });
        markers.appendChild(b);
      });
      markers.hidden = slides.length < 2;
      pauseBtn.hidden = slides.length < 2;
      show(activa ? slides.indexOf(activa) : 0);
      play();
    };

    // La primera imagen que carga se muestra de inmediato; las demás se suman al carrusel conforme llegan.
    let pending = all.length;
    all.forEach((img) => {
      const probe = new Image();
      probe.onload = () => { img.src = img.dataset.src; slides.push(img); build(); done(); };
      probe.onerror = () => done();
      probe.src = img.dataset.src;
    });
    function done() {
      if (--pending) return;
      all.forEach((img) => { if (!slides.includes(img)) img.remove(); });
      if (!slides.length) build();
    }

    pauseBtn.textContent = paused ? 'Reanudar imágenes' : 'Pausar imágenes';
    pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    pauseBtn.addEventListener('click', () => {
      paused = !paused;
      pauseBtn.textContent = paused ? 'Reanudar imágenes' : 'Pausar imágenes';
      pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      hero.classList.toggle('hero-paused', paused);
      play();
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) clearInterval(timer); else play(); });
  }

  /* ---------- DEMO DE REGISTRO ---------- */
  const demo = document.getElementById('registration-demo');
  if (!demo) return;
  const scenes = Array.from(demo.querySelectorAll('.registration-scene'));
  const bars = Array.from(demo.querySelectorAll('.registration-progress span'));
  const stepBtns = Array.from(document.querySelectorAll('.registration-step'));
  const caption = document.getElementById('registration-caption');
  const pauseDemo = document.getElementById('registration-pause');
  const CAPTIONS = ['Crea tu cuenta con tus datos.', 'Tu cuenta personal queda lista.', 'Elige el curso de prueba que más te interese.'];
  const VALUES = { name: 'Alex Rivera', email: 'alex@ejemplo.com', password: '••••••••' };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  let run = 0, demoPaused = reduce, inView = false;

  function setStep(n) {
    scenes.forEach((s, k) => {
      s.classList.toggle('is-active', k === n);
      s.setAttribute('aria-hidden', k === n ? 'false' : 'true');
    });
    bars.forEach((b, k) => b.classList.toggle('is-active', k === n));
    stepBtns.forEach((b, k) => {
      b.classList.toggle('is-active', k === n);
      b.setAttribute('aria-pressed', k === n ? 'true' : 'false');
    });
    demo.dataset.step = String(n);
    caption.textContent = CAPTIONS[n];
    if (n === 1 && !reduce) confetti();
  }

  function confetti() {
    const host = scenes[1];
    const colores = ['#1DB898', '#4fe3c6', '#1A3E8F', '#f7cf5c', '#7aa7ee'];
    for (let k = 0; k < 18; k++) {
      const p = document.createElement('i');
      p.className = 'reg-confetti';
      const a = (Math.PI * 2 * k) / 18 + Math.random() * 0.4;
      const d = 90 + Math.random() * 80;
      p.style.setProperty('--dx', Math.cos(a) * d + 'px');
      p.style.setProperty('--dy', Math.sin(a) * d - 20 + 'px');
      p.style.setProperty('--rot', Math.round(Math.random() * 540 - 270) + 'deg');
      p.style.background = colores[k % colores.length];
      host.appendChild(p);
      setTimeout(() => p.remove(), 1400);
    }
  }

  function reset() {
    demo.dataset.pressed = 'false';
    demo.dataset.selected = 'false';
    demo.querySelectorAll('[data-demo]').forEach((b) => { b.textContent = ''; });
    demo.querySelectorAll('.registration-field').forEach((f) => f.classList.remove('is-typing'));
  }

  async function type(key, id) {
    const b = demo.querySelector('[data-demo="' + key + '"]');
    const f = b.closest('.registration-field');
    f.classList.add('is-typing');
    for (const ch of VALUES[key]) {
      if (id !== run) return false;
      b.textContent += ch;
      await sleep(key === 'password' ? 70 : 55);
    }
    await sleep(250);
    f.classList.remove('is-typing');
    return true;
  }

  async function cycle(id) {
    while (id === run) {
      reset(); setStep(0);
      await sleep(600);
      for (const k of ['name', 'email', 'password']) { if (!(await type(k, id))) return; }
      await sleep(400); if (id !== run) return;
      demo.dataset.pressed = 'true';
      await sleep(350); if (id !== run) return;
      demo.dataset.pressed = 'false';
      setStep(1);
      await sleep(2100); if (id !== run) return;
      setStep(2);
      await sleep(1300); if (id !== run) return;
      demo.dataset.selected = 'true';
      await sleep(3000);
    }
  }

  function start() {
    run++;
    if (demoPaused || !inView) return;
    cycle(run);
  }
  function showStatic(n) {
    run++;
    reset();
    if (n === 0) Object.keys(VALUES).forEach((k) => { demo.querySelector('[data-demo="' + k + '"]').textContent = VALUES[k]; });
    if (n === 2) demo.dataset.selected = 'true';
    setStep(n);
  }

  stepBtns.forEach((b, k) => b.addEventListener('click', () => {
    demoPaused = true;
    pauseDemo.textContent = 'Reanudar animación';
    pauseDemo.setAttribute('aria-pressed', 'true');
    showStatic(k);
  }));
  pauseDemo.textContent = demoPaused ? 'Reanudar animación' : 'Pausar animación';
  pauseDemo.setAttribute('aria-pressed', demoPaused ? 'true' : 'false');
  pauseDemo.addEventListener('click', () => {
    demoPaused = !demoPaused;
    pauseDemo.textContent = demoPaused ? 'Reanudar animación' : 'Pausar animación';
    pauseDemo.setAttribute('aria-pressed', demoPaused ? 'true' : 'false');
    if (demoPaused) { run++; } else { start(); }
  });

  if (demoPaused) showStatic(0);
  new IntersectionObserver((es) => {
    es.forEach((e) => { inView = e.isIntersecting; if (inView && !demoPaused) start(); else if (!inView) run++; });
  }, { threshold: 0.35 }).observe(demo);
})();

/* ---------- ÁREAS, EFECTOS Y ENLACES ---------- */
(function () {
  'use strict';
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Áreas de capacitación: 6 tarjetas de imagen (a partir de DATA.cursos)
  const grid = document.getElementById('areas-grid');
  if (grid && typeof DATA !== 'undefined') {
    const AREAS = [
      { t: 'Neurológica', cats: ['Neurológica'], img: 'neurologica', poster: 'curso1' },
      { t: 'Deportiva', cats: ['Deportiva'], img: 'deportiva', poster: 'curso6' },
      { t: 'Ortopédica', cats: ['Ortopédica'], img: 'ortopedica', poster: 'curso5' },
      { t: 'Materno-infantil', cats: ['Embarazo', 'Infantil'], img: 'materno-infantil', poster: 'curso7' },
      { t: 'Cardiopulmonar', cats: ['Cardiopulmonar'], img: 'cardiopulmonar', poster: 'curso13' },
      { t: 'Bienestar', cats: ['Bienestar'], img: 'bienestar', poster: 'curso2' }
    ];
    AREAS.forEach((a, k) => {
      const n = DATA.cursos.filter((c) => a.cats.indexOf(c.categoria) !== -1).length;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'area-card reveal';
      b.style.transitionDelay = (k % 3) * 80 + 'ms';
      b.setAttribute('aria-label', a.t + ', ' + n + (n === 1 ? ' curso' : ' cursos'));
      b.innerHTML = '<img class="area-card__img" alt="" loading="lazy" draggable="false"/><span class="area-card__vel"></span><span class="area-card__num">0' + (k + 1) + '</span><span class="area-card__txt"><span class="area-card__cnt">' + n + (n === 1 ? ' curso' : ' cursos') + '</span><h3></h3><span class="area-card__go"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg></span></span>';
      const im = b.querySelector('img');
      im.addEventListener('error', () => { im.onerror = null; im.src = 'assets/img/cursos/' + a.poster + '.jpg'; im.classList.add('is-poster'); }, { once: true });
      im.src = 'assets/img/areas/' + a.img + '.webp';
      b.querySelector('h3').textContent = a.t;
      b.addEventListener('click', () => {
        if (typeof window.filtrarCursos === 'function') window.filtrarCursos(a.cats);
        document.getElementById('cursos').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      });
      grid.appendChild(b);
    });
    const ro = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } }), { threshold: 0.12 });
    grid.querySelectorAll('.reveal').forEach((el) => ro.observe(el));
  }

  // Entrada de la sección de registro
  const lay = document.querySelector('.registration-layout');
  if (lay) new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { lay.classList.add('is-in-view'); o.disconnect(); } }), { threshold: 0.2 }).observe(lay);

  // Inclinación 3D de la ventana de registro y del certificado (solo con puntero fino)
  const fino = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fino && !reduce) {
    const demo = document.getElementById('registration-demo');
    if (demo) {
      demo.addEventListener('pointermove', (e) => {
        const r = demo.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        demo.style.setProperty('--ry', ((x - 0.5) * 9).toFixed(2) + 'deg');
        demo.style.setProperty('--rx', ((0.5 - y) * 7).toFixed(2) + 'deg');
        const w = demo.querySelector('.registration-window').getBoundingClientRect();
        demo.style.setProperty('--mx', (e.clientX - w.left) + 'px');
        demo.style.setProperty('--my', (e.clientY - w.top) + 'px');
        demo.classList.add('is-tilting');
      });
      demo.addEventListener('pointerleave', () => { demo.classList.remove('is-tilting'); demo.style.setProperty('--rx', '0deg'); demo.style.setProperty('--ry', '0deg'); });
    }
    const cert = document.getElementById('cert-doc');
    if (cert) {
      cert.addEventListener('pointermove', (e) => {
        const r = cert.getBoundingClientRect();
        cert.style.setProperty('--cry', (((e.clientX - r.left) / r.width - 0.5) * 12).toFixed(2) + 'deg');
        cert.style.setProperty('--crx', ((0.5 - (e.clientY - r.top) / r.height) * 8).toFixed(2) + 'deg');
      });
      cert.addEventListener('pointerleave', () => { cert.style.removeProperty('--cry'); cert.style.removeProperty('--crx'); });
    }
  }

  // Botón "Habla con la Guía" de preguntas frecuentes
  const g = document.getElementById('faq-guia');
  if (g) g.addEventListener('click', () => { const l = document.querySelector('.fg-launcher'); if (l && !l.hidden) l.click(); });
})();

/* ---------- PIE DE PÁGINA: partículas (cruces y destellos que suben) ---------- */
(function () {
  'use strict';
  const cv = document.getElementById('ft-fx');
  if (!cv || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = 1, ps = [], visible = false, raf = 0;
  const COL = ['79,227,198', '127,245,224', '122,167,238', '255,255,255'];
  function fit() {
    const r = cv.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(46, Math.max(18, W / 32)));
    ps = Array.from({ length: n }, () => nuevo(true));
  }
  function nuevo(inicial) {
    return {
      x: Math.random() * W, y: inicial ? Math.random() * H : H + 20,
      s: 4 + Math.random() * 9, v: 0.12 + Math.random() * 0.4, a: 0.12 + Math.random() * 0.3,
      fase: Math.random() * 6.28, amp: 8 + Math.random() * 22, rot: Math.random() * 1.5,
      tipo: Math.random() < 0.55 ? 'cruz' : 'circ', c: COL[Math.floor(Math.random() * COL.length)]
    };
  }
  function dibujar(t) {
    ctx.clearRect(0, 0, W, H);
    ps.forEach((p) => {
      p.y -= p.v;
      const x = p.x + Math.sin(t / 1600 + p.fase) * p.amp;
      if (p.y < -30) Object.assign(p, nuevo(false));
      const vida = Math.min(1, (H - p.y) / 120, (p.y + 30) / 160);
      ctx.globalAlpha = Math.max(0, p.a * vida);
      ctx.fillStyle = 'rgb(' + p.c + ')';
      ctx.strokeStyle = 'rgb(' + p.c + ')';
      if (p.tipo === 'cruz') {
        const a = p.s / 2, g = p.s / 3.4;
        ctx.save(); ctx.translate(x, p.y); ctx.rotate(Math.sin(t / 2400 + p.fase) * 0.35);
        ctx.beginPath();
        ctx.rect(-g / 2, -a, g, p.s); ctx.rect(-a, -g / 2, p.s, g);
        ctx.fill(); ctx.restore();
      } else {
        ctx.beginPath(); ctx.arc(x, p.y, p.s / 2.4, 0, 6.283); ctx.lineWidth = 1.4; ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
  }
  function bucle(t) { dibujar(t); raf = visible ? requestAnimationFrame(bucle) : 0; }
  new IntersectionObserver((es) => es.forEach((e) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(bucle); })).observe(cv);
  window.addEventListener('resize', fit);
  fit();
})();


/* ---------- PANEL DEL CLUB (maqueta animada) ---------- */
(function () {
  'use strict';
  const app = document.getElementById('club-app');
  if (!app) return;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const card = app.closest('.club-access-card');
  const screens = app.querySelectorAll('.ca-screen');
  const navs = app.querySelectorAll('.ca-nav__b');
  const tabs = card.querySelectorAll('.ca-tab');
  let cur = 0, timer = null, hover = false, vis = false;
  function go(n) {
    cur = n;
    screens.forEach((s, k) => s.classList.toggle('is-on', k === n));
    navs.forEach((s, k) => s.classList.toggle('is-on', k === n));
    tabs.forEach((s, k) => { s.classList.toggle('is-on', k === n); s.setAttribute('aria-selected', k === n ? 'true' : 'false'); });
    app.dataset.s = String(n);
  }
  function play() { clearInterval(timer); if (!reduce && vis && !hover) timer = setInterval(() => go((cur + 1) % screens.length), 4300); }
  tabs.forEach((t, k) => t.addEventListener('click', () => { go(k); play(); }));
  card.addEventListener('mouseenter', () => { hover = true; clearInterval(timer); });
  card.addEventListener('mouseleave', () => { hover = false; play(); });
  new IntersectionObserver((es) => es.forEach((e) => { vis = e.isIntersecting; if (vis) { go(cur); play(); } else clearInterval(timer); }), { threshold: 0.3 }).observe(card);
  go(0);
})();

/* ---------- CANAL DE WHATSAPP: teléfono animado (canal → entrada al Club) ---------- */
(function () {
  'use strict';
  const demo = document.getElementById('canal-demo');
  if (!demo) return;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const a = demo.querySelector('[data-sc="a"]'), b = demo.querySelector('[data-sc="b"]');
  const msgs = Array.from(demo.querySelectorAll('.ph-msg'));
  const typing = demo.querySelector('.ph-typing');
  const cta = document.getElementById('ph-cta');
  const cursor = demo.querySelector('.ph-cursor');
  const screen = demo.querySelector('.phone__screen');
  const pausaBtn = document.getElementById('canal-pausa');
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let run = 0, paused = reduce, vis = false;

  const show = (k) => { a.classList.toggle('is-on', k === 'a'); b.classList.toggle('is-on', k === 'b'); };
  function reset() {
    msgs.forEach((m) => m.classList.remove('is-on'));
    typing.classList.remove('is-on');
    demo.dataset.cursor = '0'; demo.dataset.press = '0';
    show('a');
  }
  function estatico() { run++; show('a'); msgs.forEach((m) => m.classList.add('is-on')); typing.classList.remove('is-on'); demo.dataset.cursor = '0'; }

  async function ciclo(id) {
    while (id === run) {
      reset();
      await sleep(800); if (id !== run) return;
      for (let i = 0; i < msgs.length; i++) {
        typing.classList.add('is-on'); await sleep(800); if (id !== run) return;
        typing.classList.remove('is-on'); msgs[i].classList.add('is-on'); await sleep(950); if (id !== run) return;
      }
      await sleep(500); if (id !== run) return;
      // El cursor aparece abajo a la derecha y viaja hasta "Ver en el Club"
      cursor.style.transition = 'none'; cursor.style.left = '78%'; cursor.style.top = '94%'; void cursor.offsetWidth; cursor.style.transition = '';
      demo.dataset.cursor = '1'; await sleep(160); if (id !== run) return;
      const s = screen.getBoundingClientRect(), c = cta.getBoundingClientRect();
      cursor.style.left = (c.left - s.left + c.width * 0.55) + 'px';
      cursor.style.top = (c.top - s.top + c.height * 0.5) + 'px';
      await sleep(1150); if (id !== run) return;
      demo.dataset.press = '1'; await sleep(280); demo.dataset.press = '0';
      show('b'); await sleep(350); demo.dataset.cursor = '0';
      await sleep(4600); if (id !== run) return;
    }
  }
  function start() { run++; if (!paused && vis) ciclo(run); }

  if (pausaBtn) pausaBtn.addEventListener('click', () => {
    paused = !paused;
    pausaBtn.textContent = paused ? 'Reanudar animación' : 'Pausar animación';
    pausaBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    if (paused) estatico(); else start();
  });
  if (paused) { estatico(); if (pausaBtn) { pausaBtn.textContent = 'Reanudar animación'; pausaBtn.setAttribute('aria-pressed', 'true'); } }
  new IntersectionObserver((es) => es.forEach((e) => { vis = e.isIntersecting; if (vis && !paused) start(); else if (!vis) run++; }), { threshold: 0.35 }).observe(demo);

  // Partículas verdes de fondo (burbujas de chat que suben)
  const cv = document.getElementById('canal-fx');
  if (!cv || reduce) return;
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, ps = [], on = false, raf = 0;
  function fit() {
    const r = cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    ps = Array.from({ length: Math.round(Math.min(34, Math.max(14, W / 40))) }, () => nueva(true));
  }
  function nueva(ini) { return { x: Math.random() * W, y: ini ? Math.random() * H : H + 20, s: 6 + Math.random() * 12, v: 0.15 + Math.random() * 0.45, a: 0.08 + Math.random() * 0.22, f: Math.random() * 6.28, amp: 10 + Math.random() * 24, burb: Math.random() < 0.5 }; }
  function dibuja(t) {
    ctx.clearRect(0, 0, W, H);
    ps.forEach((p) => {
      p.y -= p.v; if (p.y < -30) Object.assign(p, nueva(false));
      const x = p.x + Math.sin(t / 1700 + p.f) * p.amp;
      ctx.globalAlpha = p.a * Math.min(1, (H - p.y) / 120, (p.y + 30) / 150);
      ctx.fillStyle = '#5df0a6'; ctx.strokeStyle = '#5df0a6';
      if (p.burb) { const w = p.s * 1.6, h = p.s; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, p.y, w, h, 4) : ctx.rect(x, p.y, w, h); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + 2, p.y + h); ctx.lineTo(x - 2, p.y + h + 4); ctx.lineTo(x + 7, p.y + h); ctx.fill(); }
      else { ctx.beginPath(); ctx.arc(x, p.y, p.s / 2.2, 0, 6.283); ctx.lineWidth = 1.3; ctx.stroke(); }
    });
    ctx.globalAlpha = 1;
  }
  const loop = (t) => { dibuja(t); raf = on ? requestAnimationFrame(loop) : 0; };
  new IntersectionObserver((es) => es.forEach((e) => { on = e.isIntersecting; if (on && !raf) raf = requestAnimationFrame(loop); })).observe(cv);
  window.addEventListener('resize', fit); fit();
})();
