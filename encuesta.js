/* =============================================
   ENCUESTA DE LA PORTADA — FisioTeck
   Una pregunta a la vez, árbol según el perfil y
   recomendación de cursos al final. Las respuestas
   se envían de forma ANÓNIMA (sin nombre ni correo)
   para mejorar la oferta (api.js). El WhatsApp es
   opcional y exige aceptar el aviso de privacidad.
   Es una guía programada.
   ============================================= */
(function () {
  'use strict';
  if (typeof DATA === 'undefined' || !Array.isArray(DATA.cursos)) return;
  const sec = document.getElementById('encuesta');
  if (!sec) return;

  const URL_REGISTRO = 'https://club.fisioteck.com/?mode=register';
  const URL_LOGIN = 'https://club.fisioteck.com/?mode=login';
  const WA = '5212381478840';
  const PROG_KEY = 'ft_encuesta_prog_e1';
  const PREF_KEY = 'ft_curso_pref';
  const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const $ = (id) => document.getElementById(id);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const ls = {
    get(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* sin almacenamiento */ } }
  };
  const nodo = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };
  const boton = (cls, txt, fn) => { const b = nodo('button', cls, txt); b.type = 'button'; if (fn) b.addEventListener('click', fn); return b; };

  /* ---------- preguntas ---------- */
  const PERFILES = ['Estudiante de fisioterapia', 'Fisioterapeuta en consulta', 'Profesional de la salud', 'Instructor de bienestar'];
  const AREAS = {
    'Rehabilitación neurológica': 'Neurológica',
    'Fisioterapia deportiva': 'Deportiva',
    'Rehabilitación ortopédica': 'Ortopédica',
    'Embarazo y postparto': 'Embarazo',
    'Fisioterapia infantil': 'Infantil',
    'Cardiopulmonar': 'Cardiopulmonar',
    'Bienestar y movimiento': 'Bienestar'
  };
  const RETOS = {
    'Estudiante de fisioterapia': { q: '¿Tu meta es?', opts: ['Complementar mi carrera', 'Prepararme para la práctica clínica', 'Elegir mi especialidad'] },
    'Fisioterapeuta en consulta': { q: '¿Tu reto hoy?', opts: ['Mejorar resultados con mis pacientes', 'Incorporar técnicas nuevas', 'Dosificar mejor cargas y progresiones'] },
    'Profesional de la salud': { q: '¿Qué buscas?', opts: ['Entender la rehabilitación', 'Trabajar mejor con fisioterapia', 'Actualizarme en mi área'] },
    'Instructor de bienestar': { q: '¿Qué te interesa?', opts: ['Movimiento y flexibilidad', 'Postura y respiración', 'Trabajo con embarazo y postparto'] }
  };
  const RETO_CAT = {
    'Incorporar técnicas nuevas': ['Ortopédica'], 'Dosificar mejor cargas y progresiones': ['Ortopédica', 'Deportiva'],
    'Mejorar resultados con mis pacientes': ['Neurológica', 'Ortopédica'], 'Prepararme para la práctica clínica': ['Ortopédica'],
    'Movimiento y flexibilidad': ['Bienestar'], 'Postura y respiración': ['Bienestar', 'Cardiopulmonar'], 'Trabajo con embarazo y postparto': ['Embarazo']
  };
  const PREGUNTAS = {
    meta: { q: '¿Qué quieres lograr este año?', opts: ['Actualizarme en mi práctica clínica', 'Especializarme en un área', 'Certificarme y destacar en mi currículum', 'Aprender técnicas nuevas para mis pacientes'] },
    p1: { q: '¿Tú eres…?', opts: PERFILES },
    origen: { q: '¿Cómo nos conociste?', opts: ['Redes sociales', 'Recomendación', 'Buscador', 'Otro'] },
    area: { q: '¿Qué área te interesa más?', opts: Object.keys(AREAS) },
    experiencia: { q: '¿Ya tomaste cursos en línea?', opts: ['Sí, me gustan', 'Prefiero presencial', 'Es mi primera vez'] },
    urgencia: { q: '¿Cuándo te gustaría empezar?', opts: ['Lo antes posible', 'En el próximo mes', 'Solo estoy explorando'] },
    freno: { q: '¿Qué te detiene hoy?', opts: ['Precio', 'Tiempo', 'No estoy seguro', 'Nada, listo'] }
  };
  const REACCION = {
    meta: ['¡Buena meta!', 'Con eso en mente, afinamos tu ruta.'],
    p1: ['Gracias por contarme.', 'Así adapto lo que sigue a tu perfil.'],
    origen: ['¡Qué bueno que llegaste!', 'Es útil saber cómo nos encontraste.'],
    area: ['¡Excelente elección!', 'Es un área con varios cursos para ti.'],
    reto: ['Anotado.', 'Eso ayuda a elegir el curso adecuado.'],
    experiencia: ['Perfecto.', 'Nuestros cursos se estudian a tu ritmo.'],
    urgencia: ['Entendido.', 'Casi terminamos.'],
    freno: ['Gracias por la confianza.', 'Ya tengo lo necesario para recomendarte.']
  };

  function pasos(r) {
    const lista = [{ clave: 'meta', ...PREGUNTAS.meta }, { clave: 'p1', ...PREGUNTAS.p1 }, { clave: 'origen', ...PREGUNTAS.origen }, { clave: 'area', ...PREGUNTAS.area }];
    if (r.p1 && RETOS[r.p1]) lista.push({ clave: 'reto', ...RETOS[r.p1] });
    lista.push({ clave: 'experiencia', ...PREGUNTAS.experiencia }, { clave: 'urgencia', ...PREGUNTAS.urgencia }, { clave: 'freno', ...PREGUNTAS.freno });
    return lista;
  }
  const TOTAL = 8;

  /* ---------- estado ---------- */
  let respuestas = {};
  let paso = 0;
  let ocupado = false;
  const prog = ls.get(PROG_KEY);
  if (prog && prog.respuestas && typeof prog.paso === 'number') { respuestas = prog.respuestas; paso = Math.min(prog.paso, TOTAL - 1); }
  const guardar = () => ls.set(PROG_KEY, { respuestas, paso });


  /* ---------- personaje animado (cuadros opcionales en assets/img/guia/) ---------- */
  const POSES = { base: 'guia-bienvenida', parpadeo: 'guia-parpadeo', saludo1: 'guia-saludo-1', saludo2: 'guia-saludo-2', feliz: 'guia-feliz', pensando: 'guia-pensando', sorprendido: 'guia-sorprendido', confundido: 'guia-confundido' };
  window.ftAnimarPersonaje = function (img, opt) {
    opt = opt || {};
    const host = img.parentElement;
    const capas = { base: img };
    img.classList.add('ft-capa');
    let actual = 'base', timers = [], vivo = true, ocupadoSaludo = false;
    const url = (n) => 'assets/img/guia/' + POSES[n] + '.webp';
    // Cada cuadro vive en su propia capa ya decodificada: cambiar de pose solo cambia la opacidad (sin parpadeo de carga).
    Object.keys(POSES).forEach((n) => {
      if (n === 'base') return;
      const im = new Image();
      im.className = 'ft-capa ft-capa--extra'; im.alt = ''; im.setAttribute('aria-hidden', 'true'); im.draggable = false; im.decoding = 'async';
      im.src = url(n);
      const listo = () => { im.style.opacity = '0'; host.appendChild(im); capas[n] = im; };
      if (im.decode) im.decode().then(listo, () => {}); else im.onload = listo;
    });
    const ya = () => document.visibilityState !== 'hidden' && !reduce;
    // Cambio instantáneo: el cuadro nuevo se pone encima (opaco) y el anterior se oculta un instante después.
    // Nunca hay dos cuadros a media opacidad, así que no se transparenta el fondo (efecto de destello blanco).
    function pose(n, ms) {
      const nueva = capas[n];
      if (!nueva) return false;
      if (n !== actual) {
        const vieja = capas[actual];
        nueva.style.transition = 'none'; vieja.style.transition = 'none';
        nueva.style.zIndex = '2'; nueva.style.opacity = '1';
        vieja.style.zIndex = '1';
        actual = n;
        requestAnimationFrame(() => requestAnimationFrame(() => { if (capas[actual] !== vieja) vieja.style.opacity = '0'; }));
      }
      if (ms) timers.push(setTimeout(() => { if (actual === n) pose('base', 0); }, ms));
      return true;
    }
    function secuencia(lista, alFin) {
      let t = 0;
      lista.forEach(([n, ms, suave]) => { timers.push(setTimeout(() => pose(n, 0, suave), t)); t += ms; });
      timers.push(setTimeout(() => { pose('base', 0, true); if (alFin) alFin(); }, t));
    }
    function parpadeo() {
      timers.push(setTimeout(() => {
        if (vivo && ya() && actual === 'base' && capas.parpadeo) {
          pose('parpadeo', 0, false);
          timers.push(setTimeout(() => { if (actual === 'parpadeo') pose('base', 0, false); }, 110 + Math.random() * 40));
          if (Math.random() < 0.25) timers.push(setTimeout(() => { if (actual === 'base') { pose('parpadeo', 0, false); timers.push(setTimeout(() => { if (actual === 'parpadeo') pose('base', 0, false); }, 100)); } }, 330));
        }
        parpadeo();
      }, 2800 + Math.random() * 3600));
    }
    function saludo() {
      if (!ya() || ocupadoSaludo || actual !== 'base' || !capas.saludo1 || !capas.saludo2) return;
      ocupadoSaludo = true;
      host.classList.add('ft-saluda');
      secuencia([['saludo1', 230, true], ['saludo2', 260, true], ['saludo1', 260, true], ['saludo2', 260, true], ['saludo1', 240, true], ['saludo2', 220, true]], () => { host.classList.remove('ft-saluda'); ocupadoSaludo = false; });
    }
    parpadeo();
    if (opt.alVer) new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setTimeout(saludo, 1100); }), { threshold: 0.5 }).observe(opt.alVer);
    if (opt.alPasar) opt.alPasar.addEventListener('mouseenter', saludo);
    document.addEventListener('visibilitychange', () => { if (document.hidden) { timers.forEach(clearTimeout); timers = []; pose('base', 0, false); ocupadoSaludo = false; host.classList.remove('ft-saluda'); } else parpadeo(); });
    return { pose: (n, ms) => pose(n, ms, true), saludo };
  };

  /* ---------- guía (cara y nota) ---------- */
  const cara = $('zenc-cara'), carai = $('zenc-cara-img');
  if (carai) carai.addEventListener('error', () => { cara.hidden = true; sec.classList.remove('zenc--con-cara'); });
  const anim = carai ? window.ftAnimarPersonaje(carai, { alVer: cara, alPasar: cara }) : null;
  function nota(t, c) {
    $('zenc-nota-t').textContent = t; $('zenc-nota-c').textContent = c;
    const n = $('zenc-nota'); n.classList.remove('is-nueva'); void n.offsetWidth; n.classList.add('is-nueva');
    if (!reduce && cara) { cara.classList.remove('is-reacciona'); void cara.offsetWidth; cara.classList.add('is-reacciona'); setTimeout(() => cara.classList.remove('is-reacciona'), 520); }
  }

  /* ---------- pantalla de pregunta ---------- */
  const cuerpo = $('zenc-cuerpo'), q = $('zenc-q'), barra = $('zenc-barra'), pasoEl = $('zenc-paso'), acc = $('zenc-acciones'), tarjeta = $('zenc-tarjeta');
  const ico = {
    atras: '<svg class="zenc-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    reinicio: '<svg class="zenc-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>'
  };
  function mini(html, txt, fn) { const b = boton('zenc-mini'); b.innerHTML = html + '<span></span>'; b.lastChild.textContent = txt; b.addEventListener('click', fn); return b; }

  function entrar() {
    if (reduce) return;
    tarjeta.classList.remove('is-entrando'); void tarjeta.offsetWidth; tarjeta.classList.add('is-entrando');
    setTimeout(() => tarjeta.classList.remove('is-entrando'), 400);
  }

  function render() {
    const lista = pasos(respuestas);
    if (paso >= lista.length) return resultado();
    const def = lista[paso];
    pasoEl.textContent = 'Pregunta ' + (paso + 1) + ' de ' + TOTAL;
    barra.style.width = Math.round((paso / TOTAL) * 100) + '%';
    q.textContent = def.q;
    cuerpo.textContent = '';
    const grupo = nodo('div', 'zenc__opciones-lista');
    grupo.setAttribute('role', 'group'); grupo.setAttribute('aria-labelledby', 'zenc-q');
    def.opts.forEach((opt) => {
      const b = boton('zenc-opt' + (respuestas[def.clave] === opt ? ' is-selected' : ''), opt, () => elegir(def, opt, grupo));
      grupo.appendChild(b);
    });
    cuerpo.appendChild(grupo);
    acc.textContent = '';
    if (paso > 0) acc.appendChild(mini(ico.atras, 'Anterior', () => { if (!ocupado) { paso--; guardar(); entrar(); render(); } }));
    const priv = nodo('p', 'zenc-priv', 'Tus respuestas son anónimas y nos ayudan a mejorar. ');
    const pa = nodo('a', null, 'Aviso de privacidad'); pa.href = 'aviso-de-privacidad.html'; pa.target = '_blank'; pa.rel = 'noopener';
    priv.appendChild(pa); acc.appendChild(priv);
    entrar();
  }

  async function elegir(def, opt, grupo) {
    if (ocupado) return;
    ocupado = true;
    grupo.querySelectorAll('button').forEach((b) => { b.disabled = true; if (b.textContent === opt) b.classList.add('is-selected'); });
    if (respuestas[def.clave] !== opt && def.clave === 'p1') delete respuestas.reto;
    respuestas[def.clave] = opt;
    const re = REACCION[def.clave] || ['¡Gracias!', 'Seguimos.'];
    nota(re[0], re[1]);
    if (anim) anim.pose(def.clave === 'freno' ? 'sorprendido' : (def.clave === 'p1' || def.clave === 'origen' ? 'feliz' : 'feliz'), 900);
    paso++;
    guardar();
    if (window.ftApi) window.ftApi.encuesta(respuestas, false);
    barra.style.width = Math.round((paso / TOTAL) * 100) + '%';
    await wait(reduce ? 0 : 380);
    ocupado = false;
    render();
  }

  /* ---------- recomendación ---------- */
  function recomendar() {
    const cat = AREAS[respuestas.area];
    const extra = RETO_CAT[respuestas.reto] || [];
    const puntos = DATA.cursos.map((c, i) => {
      let p = 0;
      if (c.categoria === cat) p += 5;
      if (extra.indexOf(c.categoria) !== -1) p += 2;
      if (respuestas.p1 === 'Instructor de bienestar' && c.categoria === 'Bienestar') p += 2;
      return { i, p };
    });
    puntos.sort((a, b) => b.p - a.p || a.i - b.i);
    return puntos.slice(0, 3).map((x) => x.i);
  }

  function filaCurso(i, fn) {
    const c = DATA.cursos[i];
    const b = boton('zenc-curso');
    const img = nodo('img'); img.src = c.img; img.alt = ''; img.width = 62; img.height = 62; img.loading = 'lazy';
    const tx = nodo('span', 'zenc-curso__txt'); tx.append(nodo('b', null, c.nombre), nodo('small', null, c.categoria + ' · ' + c.modalidad.split('·')[0].trim()));
    b.append(img, tx, nodo('span', 'zenc-curso__tag', 'ELEGIR'));
    b.addEventListener('click', fn);
    return b;
  }
  function promo() {
    const p = nodo('div', 'zenc-promo');
    p.append(nodo('span', 'zenc-promo__badge', 'PRUEBA GRATUITA'));
    const d = nodo('div'); d.append(nodo('p', 'zenc-promo__t', 'Crea tu cuenta gratis'), nodo('p', 'zenc-promo__s', 'Conoce la plataforma y la primera clase de un curso, sin costo.'));
    p.appendChild(d);
    return p;
  }
  function enlace(cls, txt, href, blank) { const a = nodo('a', cls, txt); a.href = href; if (blank) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } return a; }

  async function resultado() {
    pasoEl.textContent = 'Tu ruta está lista';
    barra.style.width = '100%';
    acc.textContent = '';
    q.textContent = 'Preparando tus recomendaciones…';
    cuerpo.textContent = '';
    const carga = nodo('div', 'zenc__cargando'); carga.append(nodo('i'), nodo('span', null, 'Buscando los cursos que mejor encajan contigo'));
    cuerpo.appendChild(carga);
    nota('¡Ya casi!', 'Estoy revisando el catálogo según tus respuestas.');
    if (anim) anim.pose('pensando');
    await wait(reduce ? 200 : 1100);
    pintarResultado();
  }

  /* ---------- WhatsApp opcional (con aviso de privacidad) ---------- */
  function bloqueContacto() {
    const caja = nodo('form', 'zenc-contacto');
    caja.setAttribute('novalidate', '');
    caja.append(nodo('p', 'zenc-contacto__t', '¿Prefieres que un asesor te escriba?'), nodo('p', 'zenc-contacto__s', 'Déjanos tu WhatsApp (opcional) y te orientamos con tu curso.'));
    const fila = nodo('div', 'zenc-contacto__fila');
    const inp = nodo('input'); inp.type = 'tel'; inp.inputMode = 'tel'; inp.placeholder = 'Tu número de WhatsApp'; inp.maxLength = 20; inp.autocomplete = 'tel'; inp.setAttribute('aria-label', 'Tu número de WhatsApp');
    const bt = nodo('button', 'zenc-btn zenc-btn--sec', 'Enviar'); bt.type = 'submit';
    fila.append(inp, bt);
    const lab = nodo('label', 'zenc-contacto__chk');
    const chk = nodo('input'); chk.type = 'checkbox';
    const txt = nodo('span'); txt.append('Acepto el ');
    const al = nodo('a', null, 'aviso de privacidad'); al.href = 'aviso-de-privacidad.html'; al.target = '_blank'; al.rel = 'noopener'; txt.append(al, ' y que me contacten por WhatsApp.');
    lab.append(chk, txt);
    const msg = nodo('p', 'zenc-contacto__msg'); msg.setAttribute('role', 'status');
    caja.append(fila, lab, msg);
    caja.addEventListener('submit', async (e) => {
      e.preventDefault();
      const digitos = inp.value.replace(/\D/g, '');
      msg.className = 'zenc-contacto__msg';
      if (digitos.length < 8 || digitos.length > 15) { msg.textContent = 'Escribe un número válido (de 8 a 15 dígitos).'; msg.classList.add('is-error'); return; }
      if (!chk.checked) { msg.textContent = 'Para continuar, acepta el aviso de privacidad.'; msg.classList.add('is-error'); return; }
      bt.disabled = true;
      const r = window.ftApi ? await window.ftApi.encuesta(respuestas, true, { numero: inp.value, avisoAceptado: true }) : { ok: false };
      if (r.ok) { caja.textContent = ''; caja.append(nodo('p', 'zenc-contacto__t', '¡Listo! Te escribiremos pronto.'), nodo('p', 'zenc-contacto__s', 'Mientras tanto, ya puedes crear tu cuenta gratis.')); }
      else { bt.disabled = false; msg.textContent = 'No pudimos enviarlo ahora. Prueba por WhatsApp con el botón de abajo.'; msg.classList.add('is-error'); }
    });
    return caja;
  }

  let copiaCompletaEnviada = false;
  function pintarResultado() {
    if (!copiaCompletaEnviada && window.ftApi) { copiaCompletaEnviada = true; window.ftApi.encuesta(respuestas, true); }
    const ids = recomendar();
    q.textContent = 'Estos cursos encajan con tu perfil';
    nota('¡Listo!', 'Elige el que más te llame la atención. No te inscribe: solo te orienta.');
    if (anim) anim.pose('feliz', 2500);
    cuerpo.textContent = '';
    cuerpo.appendChild(nodo('p', 'zenc__lead', 'Según lo que respondiste, te recomendamos estas opciones:'));
    cuerpo.appendChild(promo());
    const lista = nodo('div', 'zenc-lista');
    ids.forEach((i) => lista.appendChild(filaCurso(i, () => confirmar(i))));
    cuerpo.appendChild(lista);
    cuerpo.appendChild(bloqueContacto());
    const a = nodo('div', 'zenc__acc');
    a.append(
      enlace('zenc-btn', 'Crear mi cuenta gratis', URL_REGISTRO),
      enlace('zenc-link', 'Ya tengo cuenta', URL_LOGIN),
      enlace('zenc-link', 'Prefiero que un asesor me escriba', 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Hola, hice la encuesta de FisioTeck y me interesa: ' + ids.map((i) => DATA.cursos[i].nombre).join('; ')), true),
      boton('zenc-link', 'Volver a empezar', reiniciar)
    );
    cuerpo.appendChild(a);
    acc.textContent = '';
    ls.del(PROG_KEY);
    entrar();
  }

  function confirmar(i) {
    const c = DATA.cursos[i];
    ls.set(PREF_KEY, { i, nombre: c.nombre, t: Date.now() });
    q.textContent = 'Elegiste: ' + c.nombre;
    nota('¡Gran elección!', 'Crea tu cuenta gratis y conoce este curso como tu prueba.');
    cuerpo.textContent = '';
    cuerpo.appendChild(nodo('p', 'zenc__lead', 'Ponente: ' + c.ponente + '. ' + c.modalidad + '. Crea tu cuenta gratis en el Club y elige este curso para conocer su primera clase sin costo. No necesitas pagar para registrarte.'));
    cuerpo.appendChild(promo());
    const a = nodo('div', 'zenc__acc');
    const ver = boton('zenc-btn zenc-btn--sec', 'Ver temario', () => { if (typeof openModal === 'function') openModal(i); });
    // El curso elegido viaja en el enlace (como Zoorigen): fisioteck.com y club.fisioteck.com no comparten almacenamiento
    a.append(enlace('zenc-btn', 'Crear mi cuenta gratis', URL_REGISTRO + '&cursoPref=' + encodeURIComponent(c.nombre)), enlace('zenc-btn zenc-btn--wa', 'Inscribirme por WhatsApp', 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Hola, quiero inscribirme al curso: ' + c.nombre), true), ver);
    cuerpo.appendChild(a);
    const b = nodo('div', 'zenc__acc');
    b.append(enlace('zenc-link', 'Ya tengo cuenta', URL_LOGIN), boton('zenc-link', 'Elegir otro curso', pintarResultado));
    cuerpo.appendChild(b);
    entrar();
  }

  function reiniciar() {
    respuestas = {}; paso = 0; ocupado = false; copiaCompletaEnviada = false; ls.del(PROG_KEY);
    nota('¡Hola de nuevo!', 'Empecemos otra vez. Son preguntas rápidas.');
    render();
  }

  render();
  if (paso > 0) nota('¡Qué bueno verte de nuevo!', 'Retomamos donde te quedaste.');
  const fi = document.getElementById('faq-cara-img');
  if (fi) window.ftAnimarPersonaje(fi, { alVer: document.getElementById('faq-cara'), alPasar: document.getElementById('faq-cara') });
})();
