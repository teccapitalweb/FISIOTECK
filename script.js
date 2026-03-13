
const coursesGrid = document.getElementById('coursesGrid');
const studentGallery = document.getElementById('studentGallery');
const reviewsTrack = document.getElementById('reviewsTrack');
const modal = document.getElementById('courseModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const year = document.getElementById('year');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

year.textContent = new Date().getFullYear();

siteData.courses.forEach((course, index) => {
  const card = document.createElement('article');
  card.className = 'course-card reveal';
  card.innerHTML = `
    <img src="${course.image}" alt="${course.name}" loading="lazy" />
    <div class="course-overlay">
      <h3>${course.name}</h3>
      <span>Abrir información visual</span>
    </div>
  `;
  card.addEventListener('click', () => openCourse(course));
  coursesGrid.appendChild(card);
});

siteData.students.forEach((image, index) => {
  const figure = document.createElement('figure');
  figure.className = 'reveal';
  figure.innerHTML = `<img src="${image}" alt="Alumno de FISIOTECK MÉXICO ${index + 1}" loading="lazy" />`;
  studentGallery.appendChild(figure);
});

siteData.reviews.forEach((image, index) => {
  const article = document.createElement('article');
  article.className = 'review-card reveal';
  article.innerHTML = `<img src="${image}" alt="Reseña visual de FISIOTECK MÉXICO ${index + 1}" loading="lazy" />`;
  reviewsTrack.appendChild(article);
});

function openCourse(course) {
  modalImage.src = course.image;
  modalImage.alt = course.name;
  modalTitle.textContent = course.name;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modal.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'true') closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('is-open');
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('is-open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

function registerReveals() {
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
registerReveals();

const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      el.textContent = target >= 1000 ? `+${value.toLocaleString('es-MX')}` : `+${value}`;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target >= 1000 ? `+${target.toLocaleString('es-MX')}` : `+${target}`;
    }
    requestAnimationFrame(update);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(counter => countObserver.observe(counter));
