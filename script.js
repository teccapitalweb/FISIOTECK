const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
const toTop = document.getElementById('toTop');
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  menu.classList.toggle('open');
  document.body.classList.toggle('menu-open', menu.classList.contains('open'));
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

const filters = ['Todos', ...new Set(siteData.courses.map(course => course.category))];
const filtersWrap = document.getElementById('filters');
let filteredCourses = [...siteData.courses];
let slidesPerView = getSlidesPerView();
let currentPage = 0;
let autoTimer = null;

filters.forEach(filter => {
  const button = document.createElement('button');
  button.className = 'filter-btn' + (filter === 'Todos' ? ' active' : '');
  button.textContent = filter;
  button.type = 'button';
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filteredCourses = filter === 'Todos'
      ? [...siteData.courses]
      : siteData.courses.filter(course => course.category === filter);
    currentPage = 0;
    renderCourses();
    resetAutoplay();
  });
  filtersWrap.appendChild(button);
});

const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevCourses');
const nextBtn = document.getElementById('nextCourses');

function getSlidesPerView() {
  if (window.innerWidth <= 860) return 1;
  if (window.innerWidth <= 1080) return 2;
  return 3;
}

function pageCount() {
  return Math.max(1, Math.ceil(filteredCourses.length / slidesPerView));
}

function renderCourses() {
  slidesPerView = getSlidesPerView();
  const pages = pageCount();
  if (currentPage >= pages) currentPage = 0;

  track.innerHTML = '';
  filteredCourses.forEach(course => {
    const card = document.createElement('article');
    card.className = 'course-card';
    card.innerHTML = `
      <div class="course-cover">
        <img src="${course.image}" alt="${course.title}" loading="lazy">
      </div>
      <div class="course-body">
        <div class="badges">
          <span class="badge category">${course.category}</span>
          <span class="badge mode">Modalidad online</span>
        </div>
        <h3>${course.title}</h3>
        <p>${course.summary}</p>
        <div class="card-actions">
          <button type="button" class="small-btn outline">Ver detalles</button>
          <a class="small-btn fill btn-link" href="https://wa.me/522381479365" target="_blank" rel="noopener noreferrer">Informes</a>
        </div>
      </div>
    `;
    card.querySelector('.outline').addEventListener('click', () => openModal(course));
    track.appendChild(card);
  });
  updateCarousel();
  renderDots();
  revealObserverRefresh();
}

function updateCarousel() {
  const pages = pageCount();
  const card = track.querySelector('.course-card');
  if (!card) return;
  const gap = 20;
  const cardWidth = card.getBoundingClientRect().width;
  const move = currentPage * ((cardWidth + gap) * slidesPerView);
  track.style.transform = `translateX(-${move}px)`;
  prevBtn.style.opacity = pages > 1 ? '1' : '.45';
  nextBtn.style.opacity = pages > 1 ? '1' : '.45';
}

function renderDots() {
  dotsWrap.innerHTML = '';
  Array.from({ length: pageCount() }).forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (index === currentPage ? ' active' : '');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir al grupo ${index + 1}`);
    dot.addEventListener('click', () => {
      currentPage = index;
      updateCarousel();
      renderDots();
      resetAutoplay();
    });
    dotsWrap.appendChild(dot);
  });
}

function nextPage() {
  currentPage = (currentPage + 1) % pageCount();
  updateCarousel();
  renderDots();
}
function prevPage() {
  currentPage = (currentPage - 1 + pageCount()) % pageCount();
  updateCarousel();
  renderDots();
}
prevBtn.addEventListener('click', () => { prevPage(); resetAutoplay(); });
nextBtn.addEventListener('click', () => { nextPage(); resetAutoplay(); });

function startAutoplay() {
  stopAutoplay();
  if (pageCount() <= 1) return;
  autoTimer = setInterval(nextPage, 4200);
}
function stopAutoplay() {
  if (autoTimer) clearInterval(autoTimer);
}
function resetAutoplay() { startAutoplay(); }

document.querySelector('.carousel').addEventListener('mouseenter', stopAutoplay);
document.querySelector('.carousel').addEventListener('mouseleave', startAutoplay);

window.addEventListener('resize', () => {
  const newSlides = getSlidesPerView();
  if (newSlides !== slidesPerView) {
    slidesPerView = newSlides;
    currentPage = 0;
    renderCourses();
  } else {
    updateCarousel();
  }
});

const studentGallery = document.getElementById('studentGallery');
siteData.students.forEach((image, index) => {
  const figure = document.createElement('figure');
  figure.className = 'reveal';
  figure.innerHTML = `<img src="${image}" alt="Alumno FISIOTECK MÉXICO ${index + 1}" loading="lazy">`;
  studentGallery.appendChild(figure);
});

const reviewsGrid = document.getElementById('reviewsGrid');
siteData.reviews.forEach((image, index) => {
  const article = document.createElement('article');
  article.className = 'reveal';
  article.innerHTML = `<img src="${image}" alt="Reseña FISIOTECK MÉXICO ${index + 1}" loading="lazy">`;
  reviewsGrid.appendChild(article);
});

const modal = document.getElementById('courseModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalSummary = document.getElementById('modalSummary');
const modalTemario = document.getElementById('modalTemario');
const modalBenefits = document.getElementById('modalBenefits');

function openModal(course) {
  modalImage.src = course.image;
  modalImage.alt = course.title;
  modalTitle.textContent = course.title;
  modalCategory.textContent = course.category;
  modalSummary.textContent = course.summary;
  modalTemario.innerHTML = course.temario.map(item => `<li>${item}</li>`).join('');
  modalBenefits.innerHTML = course.benefits.map(item => `<li>${item}</li>`).join('');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}
function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
modal.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'true') closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

function revealObserverRefresh() {
  document.querySelectorAll('.reveal').forEach((node) => revealObserver.observe(node));
}
revealObserverRefresh();

const counters = document.querySelectorAll('[data-count]');
const countersObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    const startTime = performance.now();
    const duration = 1500;
    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * ease);
      if (target >= 1000) {
        element.textContent = '+' + value.toLocaleString('es-MX');
      } else {
        element.textContent = value + '%';
      }
      if (progress < 1) requestAnimationFrame(animate);
      else element.textContent = target >= 1000 ? '+' + target.toLocaleString('es-MX') : target + '%';
    }
    requestAnimationFrame(animate);
    countersObserver.unobserve(element);
  });
}, { threshold: 0.55 });
counters.forEach(counter => countersObserver.observe(counter));

window.addEventListener('scroll', () => {
  const visible = window.scrollY > 420;
  toTop.classList.toggle('hidden', !visible);
}, { passive: true });

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
toTop.classList.add('hidden');

renderCourses();
startAutoplay();
