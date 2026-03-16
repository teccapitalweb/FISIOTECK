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

  // ---- RENDER: CURSOS (con botón que abre modal) ----
  const cursosCarouselEl = document.getElementById('cursos-carousel');
  if (cursosCarouselEl) {
    DATA.cursos.forEach((c, i) => {
      cursosCarouselEl.innerHTML += `
        <div class="curso-card">
          <img src="${c.img}" alt="${c.nombre}" loading="lazy" />
          <div class="curso-card-body">
            <a href="#" onclick="openModal(${i}); return false;">📋 Ver temario</a>
          </div>
        </div>`;
    });
  }

  // ---- RENDER: GALERÍA (carrusel) ----
  const galeriaCarouselEl = document.getElementById('galeria-carousel');
  if (galeriaCarouselEl) {
    DATA.galeria.forEach((src, i) => {
      galeriaCarouselEl.innerHTML += `
        <div class="galeria-item" onclick="openLightbox(${i})">
          <img src="${src}" alt="Galería ${i+1}" loading="lazy" />
        </div>`;
    });
  }

  // ---- RENDER: OPINIONES ----
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
    return card ? card.offsetWidth + 16 : 300;
  }
  function visibleN(carousel, sel) {
    return Math.max(1, Math.floor(carousel.parentElement.offsetWidth / getCardW(carousel, sel)));
  }
  function moveCarousel(carousel, index, sel) {
    carousel.style.transform = `translateX(-${index * getCardW(carousel, sel)}px)`;
  }

  // ---- CARRUSEL: CURSOS ----
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

  // ---- CARRUSEL: GALERÍA ----
  let galeriaIdx = 0;
  const galeriaC = document.getElementById('galeria-carousel');
  document.getElementById('galeria-next')?.addEventListener('click', () => {
    if (galeriaIdx < galeriaC.children.length - visibleN(galeriaC, '.galeria-item')) {
      galeriaIdx++; moveCarousel(galeriaC, galeriaIdx, '.galeria-item');
    }
  });
  document.getElementById('galeria-prev')?.addEventListener('click', () => {
    if (galeriaIdx > 0) { galeriaIdx--; moveCarousel(galeriaC, galeriaIdx, '.galeria-item'); }
  });

  // ---- CARRUSEL: OPINIONES (auto-scroll) ----
  let opIdx = 0;
  let opTimer = null;
  const opC = document.getElementById('opiniones-carousel');

  function opGoNext() {
    if (!opC) return;
    const vc = visibleN(opC, '.opinion-card');
    opIdx = opIdx < opC.children.length - vc ? opIdx + 1 : 0;
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

  const opSection = document.getElementById('opiniones');
  if (opSection) {
    new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting ? startAuto() : stopAuto());
    }, { threshold: 0.2 }).observe(opSection);
  }
  opC?.addEventListener('mouseenter', stopAuto);
  opC?.addEventListener('mouseleave', startAuto);
  document.getElementById('op-next')?.addEventListener('click', () => { stopAuto(); opGoNext(); startAuto(); });
  document.getElementById('op-prev')?.addEventListener('click', () => { stopAuto(); opGoPrev(); startAuto(); });

  // ---- SWIPE TÁCTIL: OPINIONES ----
  let touchStartX = 0;
  opC?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  opC?.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? opGoNext() : opGoPrev(); }
    startAuto();
  }, { passive: true });

  // ---- MODAL CURSO ----
  window.openModal = function(i) {
    const c = DATA.cursos[i];
    document.getElementById('modal-img').src = c.img;
    document.getElementById('modal-nombre').textContent = c.nombre;
    document.getElementById('modal-ponente').textContent = '👤 ' + c.ponente;
    document.getElementById('modal-precio').textContent = c.precio;
    document.getElementById('modal-inicio').textContent = '📅 Inicia: ' + c.inicio;
    document.getElementById('modal-modalidad').textContent = c.modalidad;
    document.getElementById('modal-btn-wa').href =
      `https://wa.me/522381479365?text=Hola,%20me%20interesa%20inscribirme%20al%20curso:%20${encodeURIComponent(c.nombre)}`;

    const temarioEl = document.getElementById('modal-temario');
    temarioEl.innerHTML = '';
    c.temario.forEach(t => { temarioEl.innerHTML += `<li>${t}</li>`; });

    const incluyeEl = document.getElementById('modal-incluye');
    incluyeEl.innerHTML = '';
    c.incluye.forEach(t => { incluyeEl.innerHTML += `<li>${t}</li>`; });

    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-overlay')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
    }
    if (e.key === 'ArrowRight') moveLightbox(1);
    if (e.key === 'ArrowLeft') moveLightbox(-1);
  });

  // ---- LIGHTBOX ----
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
  window.moveLightbox = dir => {
    lbIdx = (lbIdx + dir + DATA.galeria.length) % DATA.galeria.length;
    document.getElementById('lightbox-img').src = DATA.galeria[lbIdx];
  };
  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => moveLightbox(1));
  document.getElementById('lightbox')?.addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });

});
