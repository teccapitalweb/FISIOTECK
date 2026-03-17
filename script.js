// SCRIPT.JS — FisioTeck

document.addEventListener('DOMContentLoaded', () => {

  // ÁREAS
  const areasEl = document.getElementById('nosotros-areas');
  if (areasEl) DATA.areas.forEach(a => {
    areasEl.innerHTML += `<div class="area-item"><div class="area-icon">${a.icon}</div>${a.texto}</div>`;
  });

  // FILTROS + CURSOS
  const filtrosEl = document.getElementById('cursos-filtros');
  const cursosEl  = document.getElementById('cursos-carousel');
  let cursosIdx = 0;

  function renderCursos(filtro) {
    if (!cursosEl) return;
    cursosEl.innerHTML = '';
    cursosEl.style.transform = 'translateX(0)';
    cursosIdx = 0;
    const lista = filtro === 'Todos' ? DATA.cursos : DATA.cursos.filter(c => c.categoria === filtro);
    lista.forEach(c => {
      const i = DATA.cursos.indexOf(c);
      cursosEl.innerHTML += `
        <div class="curso-card">
          <img src="${c.img}" alt="${c.nombre}" loading="lazy"/>
          <div class="curso-card-body">
            <a href="#" onclick="openModal(${i});return false;">📋 Ver temario</a>
          </div>
        </div>`;
    });
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

  // GALERÍA
  const galeriaEl = document.getElementById('galeria-carousel');
  if (galeriaEl) DATA.galeria.forEach((src, i) => {
    galeriaEl.innerHTML += `<div class="galeria-item" onclick="openLightbox(${i})"><img src="${src}" alt="Galería ${i+1}" loading="lazy"/></div>`;
  });

  // OPINIONES
  const opEl = document.getElementById('opiniones-carousel');
  if (opEl) DATA.opiniones.forEach((o, i) => {
    opEl.innerHTML += `<div class="opinion-card"><img src="${o.img}" alt="Reseña ${i+1}" loading="lazy"/></div>`;
  });

  // CONTACTO
  const contactoEl = document.getElementById('contacto-cards');
  if (contactoEl) DATA.contacto.forEach(c => {
    contactoEl.innerHTML += `
      <div class="contacto-card">
        <div class="contacto-icon">${c.icon}</div>
        <h3>${c.titulo}</h3><p>${c.descripcion}</p>
        <a href="${c.url}" target="_blank">${c.btnTexto}</a>
      </div>`;
  });

  // FOOTER
  const fsEl = document.getElementById('footer-social');
  if (fsEl) DATA.redes.forEach(r => {
    fsEl.innerHTML += `<a href="${r.url}" target="_blank" title="${r.title}">${r.label}</a>`;
  });
  const fcEl = document.getElementById('footer-contacto-list');
  if (fcEl) DATA.footerContacto.forEach(fc => {
    fcEl.innerHTML += `<li><a href="${fc.url}" target="_blank">${fc.texto}</a></li>`;
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
  new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ animCount(e.target); } }), {threshold:0.5})
    .observe(...document.querySelectorAll('[data-target]'));
  document.querySelectorAll('[data-target]').forEach(el => {
    new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ animCount(e.target); } }), {threshold:0.5}).observe(el);
  });

  // SCROLL REVEAL
  const ro = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); ro.unobserve(e.target); } }), {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // HELPERS CARRUSEL
  function cardW(carousel, sel) {
    const c = carousel.querySelector(sel);
    return c ? c.offsetWidth + 16 : 280;
  }
  function visN(carousel, sel) {
    return Math.max(1, Math.floor(carousel.parentElement.offsetWidth / cardW(carousel, sel)));
  }
  function moveC(carousel, idx, sel) {
    carousel.style.transform = `translateX(-${idx * cardW(carousel, sel)}px)`;
  }

  // CARRUSEL CURSOS
  document.getElementById('cursos-next')?.addEventListener('click', () => {
    if (!cursosEl) return;
    const max = cursosEl.children.length - visN(cursosEl, '.curso-card');
    if (cursosIdx < max) { cursosIdx++; moveC(cursosEl, cursosIdx, '.curso-card'); }
  });
  document.getElementById('cursos-prev')?.addEventListener('click', () => {
    if (cursosIdx > 0) { cursosIdx--; moveC(cursosEl, cursosIdx, '.curso-card'); }
  });

  // CARRUSEL GALERÍA
  let galIdx = 0;
  const galEl = document.getElementById('galeria-carousel');
  document.getElementById('galeria-next')?.addEventListener('click', () => {
    const max = galEl.children.length - visN(galEl, '.galeria-item');
    if (galIdx < max) { galIdx++; moveC(galEl, galIdx, '.galeria-item'); }
  });
  document.getElementById('galeria-prev')?.addEventListener('click', () => {
    if (galIdx > 0) { galIdx--; moveC(galEl, galIdx, '.galeria-item'); }
  });

  // CARRUSEL OPINIONES (auto + swipe)
  let opIdx = 0, opTimer = null;
  function opNext() {
    if (!opEl) return;
    const vc = visN(opEl, '.opinion-card');
    opIdx = opIdx < opEl.children.length - vc ? opIdx + 1 : 0;
    moveC(opEl, opIdx, '.opinion-card');
  }
  function opPrev() {
    if (!opEl) return;
    const vc = visN(opEl, '.opinion-card');
    opIdx = opIdx > 0 ? opIdx - 1 : opEl.children.length - vc;
    moveC(opEl, opIdx, '.opinion-card');
  }
  function startAuto() { opTimer = setInterval(opNext, 3000); }
  function stopAuto()  { clearInterval(opTimer); }

  const opSec = document.getElementById('opiniones');
  if (opSec) new IntersectionObserver(e => e.forEach(x => x.isIntersecting ? startAuto() : stopAuto()), {threshold:0.2}).observe(opSec);
  opEl?.addEventListener('mouseenter', stopAuto);
  opEl?.addEventListener('mouseleave', startAuto);
  document.getElementById('op-next')?.addEventListener('click', () => { stopAuto(); opNext(); startAuto(); });
  document.getElementById('op-prev')?.addEventListener('click', () => { stopAuto(); opPrev(); startAuto(); });

  // Swipe táctil opiniones
  let tx = 0;
  opEl?.addEventListener('touchstart', e => { tx = e.touches[0].clientX; stopAuto(); }, {passive:true});
  opEl?.addEventListener('touchend', e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 40) d > 0 ? opNext() : opPrev();
    startAuto();
  }, {passive:true});

  // LIGHTBOX
  let lbIdx = 0;
  window.openLightbox = i => {
    lbIdx = i;
    document.getElementById('lightbox-img').src = DATA.galeria[i];
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeLightbox = () => {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  };
  window.moveLightbox = d => {
    lbIdx = (lbIdx + d + DATA.galeria.length) % DATA.galeria.length;
    document.getElementById('lightbox-img').src = DATA.galeria[lbIdx];
  };
  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => moveLightbox(1));
  document.getElementById('lightbox')?.addEventListener('click', e => { if (e.target.id === 'lightbox') closeLightbox(); });

  // MODAL
  window.openModal = i => {
    const c = DATA.cursos[i];
    document.getElementById('modal-img').src = c.img;
    document.getElementById('modal-nombre').textContent = c.nombre;
    document.getElementById('modal-ponente').textContent = '👤 ' + c.ponente;
    document.getElementById('modal-precio').textContent = c.precio;
    document.getElementById('modal-inicio').textContent = '📅 Inicia: ' + c.inicio;
    document.getElementById('modal-modalidad').textContent = c.modalidad;
    document.getElementById('modal-btn-wa').href = `https://wa.me/5212381478840?text=Hola,%20me%20interesa%20el%20curso:%20${encodeURIComponent(c.nombre)}`;
    document.getElementById('modal-temario').innerHTML = c.temario.map(t => `<li>${t}</li>`).join('');
    document.getElementById('modal-incluye').innerHTML = c.incluye.map(t => `<li>${t}</li>`).join('');
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-overlay')?.addEventListener('click', e => { if (e.target.id === 'modal-overlay') closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeLightbox(); } });

});
