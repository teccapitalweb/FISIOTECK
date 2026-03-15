// =============================================
//  SCRIPT.JS — FisioTeck
//  Lógica del sitio (carga dinámica + interacciones)
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- RENDER: ÁREAS DE FORMACIÓN ----
  const areasEl = document.getElementById('nosotros-areas');
  if (areasEl) {
    DATA.areas.forEach(a => {
      areasEl.innerHTML += `
        <div class="area-item">
          <div class="area-icon">${a.icon}</div>
          ${a.texto}
        </div>`;
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
            <a href="https://wa.me/522381479365?text=Hola,%20me%20interesa%20inscribirme%20a%20un%20curso" target="_blank">
              📲 Inscríbete
            </a>
          </div>
        </div>`;
    });
  }

  // ---- RENDER: GALERÍA ----
  const galeriaEl = document.getElementById('galeria-grid');
  if (galeriaEl) {
    DATA.galeria.forEach((src, i) => {
      galeriaEl.innerHTML += `
        <div class="galeria-item" onclick="openLightbox(${i})">
          <img src="${src}" alt="Galería ${i + 1}" loading="lazy" />
        </div>`;
    });
  }

  // ---- RENDER: OPINIONES ----
  const opCarouselEl = document.getElementById('opiniones-carousel');
  if (opCarouselEl) {
    DATA.opiniones.forEach(o => {
      const initials = o.nombre.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
      opCarouselEl.innerHTML += `
        <div class="opinion-card">
          <div class="opinion-stars">★★★★★</div>
          <p class="opinion-texto">"${o.texto}"</p>
          <div class="opinion-autor">
            <div class="opinion-avatar">${initials}</div>
            <div>
              <div class="opinion-nombre">${o.nombre}</div>
              <div class="opinion-fecha">${o.fecha}</div>
            </div>
          </div>
        </div>`;
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

  // ---- RENDER: FOOTER REDES ----
  const footerSocialEl = document.getElementById('footer-social');
  if (footerSocialEl) {
    DATA.redes.forEach(r => {
      footerSocialEl.innerHTML += `<a href="${r.url}" target="_blank" title="${r.title}">${r.label}</a>`;
    });
  }

  // ---- RENDER: FOOTER CONTACTO ----
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
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }

  // ---- CONTADOR ANIMADO ----
  function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 16);
  }
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); statsObserver.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => statsObserver.observe(el));

  // ---- SCROLL REVEAL ----
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ---- CARRUSEL: CURSOS ----
  let cursosIndex = 0;
  const cursosCarousel = document.getElementById('cursos-carousel');
  function getCardWidth(carousel) {
    const card = carousel.querySelector('.curso-card, .opinion-card');
    if (!card) return 300;
    return card.offsetWidth + 20;
  }
  function updateCarousel(carousel, index) {
    carousel.style.transform = `translateX(-${index * getCardWidth(carousel)}px)`;
  }
  function visibleCount(carousel) {
    return Math.max(1, Math.floor(carousel.parentElement.offsetWidth / getCardWidth(carousel)));
  }
  document.getElementById('cursos-next')?.addEventListener('click', () => {
    const total = cursosCarousel.children.length;
    if (cursosIndex < total - visibleCount(cursosCarousel)) { cursosIndex++; updateCarousel(cursosCarousel, cursosIndex); }
  });
  document.getElementById('cursos-prev')?.addEventListener('click', () => {
    if (cursosIndex > 0) { cursosIndex--; updateCarousel(cursosCarousel, cursosIndex); }
  });

  // ---- CARRUSEL: OPINIONES ----
  let opIndex = 0;
  const opCarousel = document.getElementById('opiniones-carousel');
  document.getElementById('op-next')?.addEventListener('click', () => {
    const total = opCarousel.children.length;
    if (opIndex < total - visibleCount(opCarousel)) { opIndex++; updateCarousel(opCarousel, opIndex); }
  });
  document.getElementById('op-prev')?.addEventListener('click', () => {
    if (opIndex > 0) { opIndex--; updateCarousel(opCarousel, opIndex); }
  });

  // ---- LIGHTBOX ----
  let lbIndex = 0;
  window.openLightbox = function(i) {
    lbIndex = i;
    document.getElementById('lightbox-img').src = DATA.galeria[i];
    document.getElementById('lightbox').classList.add('open');
  };
  window.closeLightbox = function() {
    document.getElementById('lightbox').classList.remove('open');
  };
  window.moveLightbox = function(dir) {
    lbIndex = (lbIndex + dir + DATA.galeria.length) % DATA.galeria.length;
    document.getElementById('lightbox-img').src = DATA.galeria[lbIndex];
  };
  document.getElementById('lightbox-close')?.addEventListener('click', () => closeLightbox());
  document.getElementById('lightbox-prev')?.addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => moveLightbox(1));
  document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') moveLightbox(1);
    if (e.key === 'ArrowLeft') moveLightbox(-1);
  });

});
