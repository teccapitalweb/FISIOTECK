// =============================================
//  SCRIPT.JS — FisioTeck
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- RENDER: ÁREAS ----
  const areasEl = document.getElementById('nosotros-areas');
  if (areasEl) {
    DATA.areas.forEach(a => {
      areasEl.innerHTML += `<div class="area-item"><div class="area-icon">${a.icon}</div>${a.texto}</div>`;
    });
  }

  // ---- RENDER: CURSOS ----
  const cursosCarouselEl = document.getElementById('cursos-carousel');
  if (cursosCarouselEl) {
    DATA.cursos.forEach(c => {
      cursosCarouselEl.innerHTML += `
        <div class="curso-card">
          <img src="${c.img}" alt="${c.nombre}" loading="lazy" />
          <div class="curso-card-body">
            <a href="https://wa.me/522381479365?text=Hola,%20me%20interesa%20inscribirme%20a%20un%20curso" target="_blank">📲 Inscríbete</a>
          </div>
        </div>`;
    });
  }

  // ---- RENDER: GALERÍA ----
  const galeriaEl = document.getElementById('galeria-grid');
  if (galeriaEl) {
    DATA.galeria.forEach((src, i) => {
      galeriaEl.innerHTML += `<div class="galeria-item" onclick="openLightbox(${i})"><img src="${src}" alt="Galería ${i+1}" loading="lazy" /></div>`;
    });
  }

  // ---- RENDER: OPINIONES (imágenes) ----
  const opCarouselEl = document.getElementById('opiniones-carousel');
  if (opCarouselEl) {
    DATA.opiniones.forEach((o, i) => {
      opCarouselEl.innerHTML += `<div class="opinion-card"><img src="${o.img}" alt="Reseña ${i+1}" loading="lazy" /></div>`;
    });
  }

  // ---- RENDER: CONTACTO ----
  const contactoEl = document.getElementById('contacto-cards');
  if (contactoEl) {
    DATA.contacto.forEach(c => {
      contactoEl.innerHTML += `
        <div class="contacto-card">
          <div class="contacto-icon">${c.icon}</div>
          <h3>${c.titulo}</h3>
          <p>${c.descripcion}</p>
          <a href="${c.url}" target="_blank">${c.btnTexto}</a>
        </div>`;
    });
  }

  // ---- RENDER: FOOTER ----
  const footerSocialEl = document.getElementById('footer-social');
  if (footerSocialEl) {
    DATA.redes.forEach(r => {
      footerSocialEl.innerHTML += `<a href="${r.url}" target="_blank" title="${r.title}">${r.label}</a>`;
    });
  }
  const footerContactoEl = document.getElementById('footer-contacto-list');
  if (footerContactoEl) {
    DATA.footerContacto.forEach(fc => {
      footerContactoEl.innerHTML += `<li><a href="${fc.url}" target="_blank">${fc.texto}</a></li>`;
    });
  }

  // ---- HAMBURGER ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // ---- CONTADOR ANIMADO ----
  function animateCounter(el) {
    const target = +el.dataset.target;
    const step = Math.ceil(target / (1800 / 16));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 16);
  }
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); statsObs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => statsObs.observe(el));

  // ---- SCROLL REVEAL ----
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ---- HELPERS CARRUSEL ----
  function getCardW(carousel, sel) {
    const card = carousel.querySelector(sel);
    return card ? card.offsetWidth + 20 : 300;
  }
  function visibleN(carousel, sel) {
    return Math.max(1, Math.floor(carousel.parentElement.offsetWidth / getCardW(carousel, sel)));
  }
  function moveCarousel(carousel, index, sel) {
    carousel.style.transform = `translateX(-${index * getCardW(carousel, sel)}px)`;
  }

  // ---- CARRUSEL: CURSOS (manual) ----
  let cursosIdx = 0;
  const cursosC = document.getElementById('cursos-carousel');
  document.getElementById('cursos-next')?.addEventListener('click', () => {
    if (cursosIdx < cursosC.children.length - visibleN(cursosC, '.curso-card')) {
      cursosIdx++; moveCarousel(cursosC, cursosIdx, '.curso-card');
    }
  });
  document.getElementById('cursos-prev')?.addEventListener('click', () => {
    if (cursosIdx > 0) { cursosIdx--; moveCarousel(cursosC, cursosIdx, '.curso-card'); }
  });

  // ---- CARRUSEL: OPINIONES (auto-scroll cada 3s) ----
  let opIdx = 0;
  let opTimer = null;
  const opC = document.getElementById('opiniones-carousel');

  function opGoNext() {
    if (!opC) return;
    const total = opC.children.length;
    const vc = visibleN(opC, '.opinion-card');
    opIdx = opIdx < total - vc ? opIdx + 1 : 0;
    moveCarousel(opC, opIdx, '.opinion-card');
  }
  function opGoPrev() {
    if (!opC) return;
    const vc = visibleN(opC, '.opinion-card');
    opIdx = opIdx > 0 ? opIdx - 1 : opC.children.length - vc;
    moveCarousel(opC, opIdx, '.opinion-card');
  }
  function startAuto() { opTimer = setInterval(opGoNext, 3000); }
  function stopAuto()  { clearInterval(opTimer); }

  // Arrancar auto-scroll cuando la sección sea visible
  const opSection = document.getElementById('opiniones');
  if (opSection) {
    new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting ? startAuto() : stopAuto());
    }, { threshold: 0.2 }).observe(opSection);
  }

  // Pausa en hover
  opC?.addEventListener('mouseenter', stopAuto);
  opC?.addEventListener('mouseleave', startAuto);

  // Botones manuales
  document.getElementById('op-next')?.addEventListener('click', () => { stopAuto(); opGoNext(); startAuto(); });
  document.getElementById('op-prev')?.addEventListener('click', () => { stopAuto(); opGoPrev(); startAuto(); });

  // ---- LIGHTBOX ----
  let lbIdx = 0;
  window.openLightbox = i => {
    lbIdx = i;
    document.getElementById('lightbox-img').src = DATA.galeria[i];
    document.getElementById('lightbox').classList.add('open');
  };
  window.closeLightbox = () => document.getElementById('lightbox').classList.remove('open');
  window.moveLightbox = dir => {
    lbIdx = (lbIdx + dir + DATA.galeria.length) % DATA.galeria.length;
    document.getElementById('lightbox-img').src = DATA.galeria[lbIdx];
  };
  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => moveLightbox(1));
  document.getElementById('lightbox')?.addEventListener('click', e => { if (e.target === document.getElementById('lightbox')) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') moveLightbox(1);
    if (e.key === 'ArrowLeft') moveLightbox(-1);
  });

});
