// SCRIPT.JS — FisioTeck

document.addEventListener('DOMContentLoaded', () => {

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = (id, cls) => `<svg class="ic${cls ? ' ' + cls : ''}" aria-hidden="true"><use href="#${id}"/></svg>`;

  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // ÁREAS (bloque "Nosotros")
  const areasEl = document.getElementById('nosotros-areas');
  if (areasEl) DATA.areas.forEach(a => {
    areasEl.innerHTML += `<div class="area-item"><div class="area-icon">${icon(a.icon)}</div>${a.texto}</div>`;
  });

  // ---------- CURSOS: filtros + carrusel continuo ----------
  const filtrosEl = document.getElementById('cursos-filtros');
  const wrapEl = document.getElementById('cursos-wrapper');
  const trackEl = document.getElementById('cursos-track');
  const pauseBtn = document.getElementById('cursos-pause');
  let x = 0, vel = reduce ? 0 : 0.45, pausado = reduce, hover = false, impulso = 0, mitad = 0, raf = null, marquee = false;

  const tarjeta = (c, i) => `
    <div class="curso-card" role="button" tabindex="0" data-i="${i}" aria-label="Ver detalles de ${esc(c.nombre)}">
      <div class="img-wrap">
        <img src="${c.img}" alt="${esc(c.nombre)}" loading="lazy" draggable="false"/>
        <span class="curso-card__cat">${esc(c.categoria)}</span>
        <div class="curso-card__hover"><span>Ver detalles ${icon('ic-arrow')}</span></div>
      </div>
      <div class="curso-info">
        <h3>${esc(c.nombre)}</h3>
        <p class="instructor">${icon('ic-user')}${esc(c.ponente)}</p>
        <p class="curso-meta">${icon('ic-cal')}Inicia ${esc(c.inicio)}</p>
      </div>
    </div>`;

  function renderCursos(filtro) {
    if (!trackEl) return;
    const lista = DATA.cursos.map((c, i) => ({ c, i })).filter(o => filtro === 'Todos' || (Array.isArray(filtro) ? filtro.indexOf(o.c.categoria) !== -1 : o.c.categoria === filtro));
    marquee = lista.length >= 5;
    const html = lista.map(o => tarjeta(o.c, o.i)).join('');
    trackEl.innerHTML = marquee ? html + html : html;
    trackEl.classList.toggle('is-static', !marquee);
    wrapEl.classList.toggle('is-static', !marquee);
    x = 0; impulso = 0;
    trackEl.style.transform = 'translateX(0)';
    document.querySelectorAll('.carousel-nav .carousel-btn').forEach(b => { b.hidden = !marquee; });
    requestAnimationFrame(() => { mitad = marquee ? trackEl.scrollWidth / 2 : 0; });
  }

  function paso() {
    if (marquee && mitad) {
      if (!pausado && !hover) x -= vel;
      if (impulso) { const d = impulso * 0.14; x += d; impulso -= d; if (Math.abs(impulso) < 0.5) impulso = 0; }
      if (x <= -mitad) x += mitad;
      if (x > 0) x -= mitad;
      trackEl.style.transform = `translateX(${x}px)`;
    }
    raf = requestAnimationFrame(paso);
  }

  if (filtrosEl) {
    DATA.categorias.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filtro-btn' + (cat === 'Todos' ? ' active' : '');
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        filtrosEl.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCursos(cat);
      });
      filtrosEl.appendChild(btn);
    });
  }
  renderCursos('Todos');
  // Filtro desde las tarjetas de áreas (una o varias categorías)
  window.filtrarCursos = (cats) => {
    const lista = [].concat(cats);
    filtrosEl?.querySelectorAll('.filtro-btn').forEach(b => b.classList.toggle('active', lista.length === 1 && b.textContent === lista[0]));
    renderCursos(lista.length === 1 ? lista[0] : lista);
  };
  if (trackEl) {
    raf = requestAnimationFrame(paso);
    window.addEventListener('resize', () => { mitad = marquee ? trackEl.scrollWidth / 2 : 0; });
    window.addEventListener('load', () => { mitad = marquee ? trackEl.scrollWidth / 2 : 0; });
    wrapEl.addEventListener('mouseenter', () => { hover = true; });
    wrapEl.addEventListener('mouseleave', () => { hover = false; });
    wrapEl.addEventListener('focusin', () => { hover = true; });
    wrapEl.addEventListener('focusout', () => { hover = false; });
    trackEl.addEventListener('click', (e) => { const t = e.target.closest('.curso-card'); if (t) openModal(+t.dataset.i); });
    trackEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { const t = e.target.closest('.curso-card'); if (t) { e.preventDefault(); openModal(+t.dataset.i); } } });
    const salto = () => (trackEl.querySelector('.curso-card')?.offsetWidth || 290) + 24;
    document.getElementById('cursos-next')?.addEventListener('click', () => { impulso -= salto(); });
    document.getElementById('cursos-prev')?.addEventListener('click', () => { impulso += salto(); });
    if (pauseBtn) {
      const ver = () => { pauseBtn.setAttribute('aria-pressed', pausado ? 'true' : 'false'); pauseBtn.setAttribute('aria-label', pausado ? 'Reanudar movimiento' : 'Pausar movimiento'); pauseBtn.innerHTML = icon(pausado ? 'ic-play' : 'ic-pause'); };
      pauseBtn.addEventListener('click', () => { pausado = !pausado; if (!pausado && !vel) vel = 0.45; ver(); });
      ver();
    }
    // Arrastre con puntero / dedo
    let ax = null, x0 = 0, arrastro = false;
    wrapEl.addEventListener('pointerdown', (e) => { if (!marquee) return; ax = e.clientX; x0 = x; arrastro = false; });
    window.addEventListener('pointermove', (e) => { if (ax === null) return; const d = e.clientX - ax; if (Math.abs(d) > 6) arrastro = true; if (arrastro) { x = x0 + d; impulso = 0; } });
    window.addEventListener('pointerup', () => { ax = null; });
    wrapEl.addEventListener('click', (e) => { if (arrastro) { e.stopPropagation(); e.preventDefault(); arrastro = false; } }, true);
  }

  // ---------- OPINIONES: dos filas de tarjetas ----------
  const rowsEl = document.getElementById('tm-rows');
  if (rowsEl && DATA.opiniones) {
    const ini = (n) => n.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase();
    const stars = '<span class="tm-card__stars" aria-label="Recomendado">' + icon('ic-star').repeat(5) + '</span>';
    const card = (o) => `
      <article class="tm-card">
        ${stars}
        <p class="tm-card__txt">“${esc(o.texto)}”</p>
        <div class="tm-card__autor">
          <span class="tm-avatar" aria-hidden="true">${esc(ini(o.nombre))}</span>
          <div><strong>${esc(o.nombre)}</strong><small>${icon('ic-fb')}Recomienda a FisioTeck · ${esc(o.fecha)}</small></div>
        </div>
      </article>`;
    const mid = Math.ceil(DATA.opiniones.length / 2);
    const filas = [DATA.opiniones.slice(0, mid), DATA.opiniones.slice(mid)];
    rowsEl.innerHTML = filas.map((f, k) => {
      const set = f.map(card).join('');
      return `<div class="tm-row tm-row--${k ? 'b' : 'a'}"><div class="tm-track">${set}${set}${set}</div></div>`;
    }).join('');
    // Los duplicados son decorativos para el lector de pantalla
    rowsEl.querySelectorAll('.tm-track').forEach(t => Array.from(t.children).forEach((c, i, arr) => { if (i >= arr.length / 3) c.setAttribute('aria-hidden', 'true'); }));
  }

  // CONTACTO
  const contactoEl = document.getElementById('contacto-cards');
  if (contactoEl) DATA.contacto.forEach(c => {
    contactoEl.innerHTML += `
      <div class="contacto-card" style="--brand-color:${c.color}">
        <div class="contacto-icon"><img src="${c.icon}" alt="" aria-hidden="true"/></div>
        <h3>${c.titulo}</h3><p>${c.descripcion}</p>
        <a href="${c.url}" target="_blank" rel="noopener noreferrer">${c.btnTexto}</a>
      </div>`;
  });

  // FOOTER
  const fsEl = document.getElementById('footer-social');
  if (fsEl) DATA.redes.forEach(r => {
    fsEl.innerHTML += `<a href="${r.url}" target="_blank" rel="noopener noreferrer" title="${r.title}" aria-label="${r.title}"><img src="${r.icon}" alt="" aria-hidden="true"/></a>`;
  });
  const fcEl = document.getElementById('footer-contacto-list');
  if (fcEl) DATA.footerContacto.forEach(fc => {
    fcEl.innerHTML += `<li><a class="footer-contact-link" href="${fc.url}" target="_blank" rel="noopener noreferrer"><img src="${fc.icon}" alt="" aria-hidden="true"/>${fc.texto}</a></li>`;
  });

  // HAMBURGER
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-menu');
  ham?.addEventListener('click', () => mob.classList.toggle('open'));
  mob?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));

  // CONTADOR
  function animCount(el) {
    const target = +el.dataset.target, step = Math.ceil(target / 112);
    let n = 0;
    const t = setInterval(() => { n += step; if (n >= target) { n = target; clearInterval(t); } el.textContent = n; }, 16);
  }
  document.querySelectorAll('[data-target]').forEach(el => {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { animCount(e.target); io.disconnect(); } }), { threshold: 0.5 });
    io.observe(el);
  });

  // SCROLL REVEAL
  const ro = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // MODAL
  window.openModal = i => {
    const c = DATA.cursos[i];
    document.getElementById('modal-img').src = c.img;
    document.getElementById('modal-nombre').textContent = c.nombre;
    document.getElementById('modal-ponente').innerHTML = icon('ic-user') + esc(c.ponente);
    document.getElementById('modal-precio').textContent = c.precio;
    document.getElementById('modal-inicio').innerHTML = icon('ic-cal') + 'Inicia: ' + esc(c.inicio);
    document.getElementById('modal-modalidad').textContent = c.modalidad;
    document.getElementById('modal-btn-wa').href = `https://wa.me/5212381478840?text=Hola,%20me%20interesa%20el%20curso:%20${encodeURIComponent(c.nombre)}`;
    document.getElementById('modal-temario').innerHTML = c.temario.map(t => `<li>${esc(t)}</li>`).join('');
    document.getElementById('modal-incluye').innerHTML = c.incluye.map(t => `<li>${esc(t)}</li>`).join('');
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-overlay')?.addEventListener('click', e => { if (e.target.id === 'modal-overlay') closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

});
