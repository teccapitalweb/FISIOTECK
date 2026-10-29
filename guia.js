/* =============================================
   GUÍA FISIOTECK — guía virtual de la portada
   Árbol de botones + palabras clave. No es una
   persona ni inteligencia artificial, y lo dice.
   Toma los cursos de DATA.cursos (data.js).
   Imágenes del personaje: assets/img/guia/
   ============================================= */
(function () {
  'use strict';
  if (window.__ftGuia || typeof DATA === 'undefined' || !Array.isArray(DATA.cursos)) return;
  window.__ftGuia = true;

  const CURSOS = DATA.cursos;
  const WA = '5212381478840';
  const URL_REGISTRO = 'https://club.fisioteck.com/?mode=register';
  const URL_LOGIN = 'https://club.fisioteck.com/?mode=login';
  const IMG_AVATAR = 'assets/img/guia/guia-avatar.webp';
  const IMG_LANZADOR = 'assets/img/guia/guia-pensando.webp';
  const VISTO = 'ft_guia_visto';
  const LOTE = 3;

  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---------- texto ---------- */
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const waLink = (txt) => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(txt);

  /* ---------- catálogo ---------- */
  const CATS = (DATA.categorias || []).filter((c) => c !== 'Todos');
  const CAT_SINON = {
    'Neurológica': ['neuro', 'neurologica', 'cerebro'],
    'Deportiva': ['deporte', 'deportiva', 'deportivo', 'atleta', 'biomecanica', 'lesiones deportivas', 'gesto'],
    'Ortopédica': ['ortopedia', 'ortopedica', 'articular'],
    'Embarazo': ['embarazo', 'embarazada', 'postparto', 'parto', 'gestacion', 'suelo pelvico'],
    'Infantil': ['infantil', 'ninos', 'nino', 'pediatria', 'pediatrica', 'bebes'],
    'Cardiopulmonar': ['cardio', 'cardiopulmonar', 'corazon', 'pulmon', 'respiratoria', 'respiratorio'],
    'Bienestar': ['bienestar', 'flexibilidad', 'postura']
  };
  const cursoCard = (i) => {
    const c = CURSOS[i];
    return { i, titulo: c.nombre, area: c.categoria, img: c.img };
  };
  const delArea = (cat) => CURSOS.map((c, i) => (c.categoria === cat ? i : -1)).filter((i) => i >= 0);

  // Recomendación: del mismo tema primero, y si no alcanza, de otros temas.
  function recomendar(cat, excluir, n) {
    const ex = new Set(excluir || []);
    const mismos = delArea(cat).filter((i) => !ex.has(i));
    const otros = CURSOS.map((_, i) => i).filter((i) => !ex.has(i) && CURSOS[i].categoria !== cat);
    return mismos.concat(otros).slice(0, n || 2).map(cursoCard);
  }

  /* ---------- preguntas frecuentes ---------- */
  const precios = Array.from(new Set(CURSOS.map((c) => c.precio)));
  const FAQ = [
    { id: 'modalidad', q: '¿Los cursos son en línea?', k: ['en linea', 'online', 'presencial', 'modalidad', 'zoom', 'grabad', 'clases en vivo'],
      a: ['Sí, los cursos son **en línea**. Algunos incluyen clases grabadas para que repases cuando quieras.', 'La modalidad y el cupo aparecen en el detalle de cada curso.'], tema: 'Neurológica' },
    { id: 'certificado', q: '¿Dan certificado?', k: ['certificado', 'certificacion', 'constancia', 'diploma', 'aval', 'reconocimiento'],
      a: ['Los cursos del catálogo incluyen **certificado de reconocimiento**. El detalle de cada curso te dice qué incluye exactamente.'], tema: 'Ortopédica' },
    { id: 'precio', q: '¿Cuánto cuestan?', k: ['precio', 'costo', 'cuanto cuesta', 'cuanto vale', 'cuanto', 'pagar', 'tarifa', 'inversion'],
      a: [precios.length === 1 ? 'Cada curso del catálogo tiene un costo de **' + precios[0] + '**.' : 'Los precios aparecen en el detalle de cada curso.', 'Para confirmar promociones o vigencia, el equipo te atiende por WhatsApp.'], tema: 'Deportiva' },
    { id: 'inscripcion', q: '¿Cómo me inscribo?', k: ['inscrib', 'inscripcion', 'registrar', 'comprar', 'apartar', 'cupo', 'como entro', 'como me uno'],
      a: ['Es sencillo: **1)** elige tu curso, **2)** pulsa “Inscribirme por WhatsApp” en su detalle y **3)** el equipo te confirma pasos y acceso.', 'Si prefieres conocer antes la plataforma, crea tu cuenta gratis en el Club.'], tema: 'Ortopédica' },
    { id: 'fechas', q: '¿Cuándo inician?', k: ['cuando inicia', 'cuando empieza', 'fecha', 'inicio', 'empiezan', 'calendario', 'horario'],
      a: ['Cada curso muestra su **fecha de inicio** en el detalle.', 'Si buscas una fecha vigente o próxima, escríbele al equipo por WhatsApp para confirmarla.'], tema: 'Neurológica' },
    { id: 'publico', q: '¿Para quién son?', k: ['para quien', 'dirigido', 'estudiante', 'requisitos', 'perfil', 'fisioterapeuta', 'licenciado', 'pasante'],
      a: ['Están pensados para **fisioterapeutas y profesionales de la salud** que quieren actualizarse con teoría vigente y aplicación práctica.', 'Cada detalle de curso incluye su temario para que valides si es para ti.'], tema: 'Ortopédica' },
    { id: 'club', q: '¿Qué es el Club FisioTeck?', k: ['club', 'membresia', 'plataforma', 'beneficios', 'suscripcion', 'cuenta'],
      a: ['El **Club FisioTeck** reúne en un solo lugar: cursos especializados, clases y sesiones, material de apoyo, herramientas clínicas, certificados y beneficios exclusivos.', 'Crear tu cuenta es gratis y te permite explorar el catálogo.'], tema: 'Bienestar' },
    { id: 'prueba', q: '¿Cómo funciona la prueba gratuita?', k: ['prueba', 'gratis', 'gratuita', 'gratuito', 'sin costo', 'primera clase', 'probar'],
      a: ['**1)** Crea tu cuenta gratis en el Club. **2)** Entra a tu espacio. **3)** Elige un curso y conoce su primera clase gratuita.', 'Así revisas la plataforma y el estilo de enseñanza antes de continuar tu formación. No necesitas pagar para registrarte.'], tema: 'Neurológica', registro: true },
    { id: 'contacto', q: '¿Cómo los contacto?', k: ['contacto', 'telefono', 'whatsapp', 'correo', 'asesor', 'hablar', 'llamar', 'ubicacion', 'donde estan'],
      a: ['Puedes escribirnos por **WhatsApp al +52 1 238 147 8840** o al correo **fisiotecmexico@gmail.com**.'], tema: 'Bienestar' }
  ];

  /* ---------- motor: devuelve la respuesta a una acción ---------- */
  const R = (partes, extra) => Object.assign({ partes }, extra || {});
  const BTN_MENU = { t: 'Volver al menú', accion: { tipo: 'inicio' } };
  const BTN_ASESOR = { t: 'Hablar con un asesor', wa: waLink('Hola, necesito más información sobre los cursos de FisioTeck') };

  let temaActual = null; // último tema (categoría) visto, para recomendar al final

  function menu() {
    return [
      { t: 'Buscar un curso', accion: { tipo: 'areas' } },
      { t: 'Cómo funciona la prueba gratuita', accion: { tipo: 'duda', id: 'prueba' } },
      { t: 'Conocer el Club', accion: { tipo: 'duda', id: 'club' } },
      { t: 'Resolver una duda', accion: { tipo: 'dudas' } },
      { t: 'Hablar con un asesor', accion: { tipo: 'asesor' } }
    ];
  }

  function inicio() {
    return R([
      '¡Hola! Soy la **Guía FisioTeck**, una guía virtual. No soy una persona ni una inteligencia artificial: respondo con botones y palabras clave.',
      'Puedo ayudarte a encontrar un curso, explicarte la prueba gratuita y resolver dudas frecuentes. ¿Qué te gustaría hacer?'
    ], { botones: menu() });
  }

  function areas() {
    return R(['Estos son nuestros temas. ¿Cuál te interesa?'], {
      botones: CATS.map((c) => ({ t: c + ' (' + delArea(c).length + ')', accion: { tipo: 'area', cat: c } })).concat([BTN_MENU])
    });
  }

  function area(cat) {
    const lista = delArea(cat);
    if (!lista.length) return R(['Por ahora no tengo cursos en ese tema.'], { botones: [{ t: 'Ver otros temas', accion: { tipo: 'areas' } }, BTN_MENU] });
    temaActual = cat;
    return R(['En **' + cat + '** tenemos ' + lista.length + (lista.length === 1 ? ' curso' : ' cursos') + '. Elige uno para ver el detalle:'], {
      cursos: lista.map(cursoCard),
      botones: [{ t: 'Ver otros temas', accion: { tipo: 'areas' } }, BTN_MENU]
    });
  }

  function curso(i) {
    const c = CURSOS[i];
    if (!c) return inicio();
    temaActual = c.categoria;
    const temas = c.temario.slice(0, 3).join(', ');
    return R([
      '**' + c.nombre + '**',
      'Ponente: ' + c.ponente + '. Inicio: ' + c.inicio + '. ' + c.modalidad + '. Inversión: ' + c.precio + '.',
      'Temario: ' + temas + ' y más.'
    ], {
      botones: [
        { t: 'Probar gratis en el Club', href: URL_REGISTRO, main: true },
        { t: 'Inscribirme por WhatsApp', wa: waLink('Hola, quiero inscribirme al curso: ' + c.nombre) },
        { t: 'Más de ' + c.categoria, accion: { tipo: 'area', cat: c.categoria } },
        BTN_MENU
      ],
      oferta: { frase: 'Si te interesa este tema, también podría gustarte:', cursos: recomendar(c.categoria, [i], 2) }
    });
  }

  function dudas() {
    return R(['Estas son las dudas más frecuentes. Elige una:'], {
      botones: FAQ.map((f) => ({ t: f.q, accion: { tipo: 'duda', id: f.id } })).concat([BTN_MENU])
    });
  }

  function duda(id) {
    const f = FAQ.find((x) => x.id === id);
    if (!f) return dudas();
    const tema = temaActual || f.tema;
    const botones = [];
    if (f.registro || f.id === 'club') botones.push({ t: 'Crear mi cuenta gratis', href: URL_REGISTRO, main: true });
    if (f.id === 'contacto' || f.id === 'inscripcion') botones.push(BTN_ASESOR);
    botones.push({ t: 'Otra duda', accion: { tipo: 'dudas' } }, BTN_MENU);
    return R(f.a, { botones, oferta: { frase: 'Un curso que podría interesarte:', cursos: recomendar(tema, [], 2) } });
  }

  function asesor() {
    return R(['Con gusto te atiende el equipo. Es una persona real y responde por WhatsApp, en su horario de atención.', 'Cuéntale qué curso te interesa para agilizar tu respuesta.'], {
      botones: [Object.assign({ main: true }, BTN_ASESOR), BTN_MENU]
    });
  }

  // Texto libre: busca una duda, un tema o un curso por palabras clave.
  function texto(crudo) {
    const n = norm(crudo);
    if (!n) return inicio();
    if (/^(hola|buenas|buenos dias|buenas tardes|buenas noches|hey|que tal)\b/.test(n) && n.split(' ').length <= 3) return inicio();
    if (/\b(gracias|muchas gracias|ok gracias)\b/.test(n)) {
      return R(['¡Con gusto! Si quieres seguir, aquí tienes el menú.'], { botones: menu() });
    }
    // 1) curso por nombre
    const tokens = n.split(' ').filter((t) => t.length > 3);
    let mejorCurso = -1, mejorPts = 0;
    CURSOS.forEach((c, i) => {
      const nombre = norm(c.nombre);
      const pts = tokens.reduce((s, t) => s + (nombre.includes(t) ? 1 : 0), 0);
      if (pts > mejorPts) { mejorPts = pts; mejorCurso = i; }
    });
    // 2) tema por sinónimos
    let mejorCat = null, ptsCat = 0;
    CATS.forEach((cat) => {
      const pts = (CAT_SINON[cat] || []).reduce((s, w) => s + (n.includes(w) ? 1 : 0), 0) + (n.includes(norm(cat)) ? 2 : 0);
      if (pts > ptsCat) { ptsCat = pts; mejorCat = cat; }
    });
    // 3) duda frecuente
    let mejorFaq = null, ptsFaq = 0;
    FAQ.forEach((f) => {
      const pts = f.k.reduce((s, w) => s + (n.includes(w) ? (w.length > 6 ? 2 : 1) : 0), 0);
      if (pts > ptsFaq) { ptsFaq = pts; mejorFaq = f; }
    });
    const quiereCurso = /\b(curso|cursos|capacitacion|taller|diplomado|aprender)\b/.test(n);
    if (ptsFaq >= 2 && ptsFaq >= ptsCat) return duda(mejorFaq.id);
    if (mejorPts >= 2 || (mejorPts === 1 && !mejorCat && !ptsFaq)) return curso(mejorCurso);
    if (mejorCat) return area(mejorCat);
    if (ptsFaq >= 1) return duda(mejorFaq.id);
    if (quiereCurso) return areas();
    if (window.ftApi) window.ftApi.sinRespuesta(crudo); // el servidor limpia correos, teléfonos y enlaces antes de guardar
    return R(['No tengo una respuesta guiada para eso todavía. Prueba con una de estas opciones o escríbele al equipo; así no te quedas con la duda.'], {
      botones: menu(), registrar: true
    });
  }

  function accion(a) {
    switch (a && a.tipo) {
      case 'inicio': return inicio();
      case 'areas': return areas();
      case 'area': return area(a.cat);
      case 'curso': return curso(a.i);
      case 'dudas': return dudas();
      case 'duda': return duda(a.id);
      case 'asesor': return asesor();
      default: return inicio();
    }
  }

  /* ---------- interfaz ---------- */
  const SVG = {
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    reiniciar: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    minimizar: '<path d="M5 12h14"/>',
    enviar: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    curso: '<path d="M21.42 10.92 12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>'
  };
  function icono(n, t) {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('width', t || 20); s.setAttribute('height', t || 20);
    s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor'); s.setAttribute('stroke-width', '2');
    s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round'); s.setAttribute('aria-hidden', 'true');
    s.innerHTML = SVG[n] || '';
    return s;
  }
  function el(tag, cls, txt) { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; }
  // Imagen decorativa del personaje: si no carga se quita y queda el icono.
  function personaje(src, cls, tam, alFallar) {
    const im = el('img', cls);
    im.alt = ''; im.width = tam; im.height = tam; im.decoding = 'async'; im.draggable = false;
    im.addEventListener('error', () => { im.remove(); if (alFallar) alFallar(); });
    im.src = src;
    return im;
  }

  let lanzador, panel, cuerpo, campo, punto;
  let sesion = 0, iniciado = false, ocupado = false;

  const abajo = () => requestAnimationFrame(() => { cuerpo.scrollTop = cuerpo.scrollHeight; });
  const yo = (txt) => { cuerpo.appendChild(el('div', 'fg-me', txt)); abajo(); };

  function filaGuia(contenido) {
    const fila = el('div', 'fg-row');
    const av = el('span', 'fg-bav');
    av.appendChild(personaje(IMG_AVATAR, null, 30, () => { av.hidden = true; }));
    fila.append(av, contenido);
    return fila;
  }
  function escribiendo() {
    const w = el('div', 'fg-wait');
    w.setAttribute('role', 'status');
    w.appendChild(el('span', 'fg-sr', 'Escribiendo'));
    w.append(el('i'), el('i'), el('i'));
    const f = filaGuia(w); cuerpo.appendChild(f); abajo(); return f;
  }
  function negritas(txt) {
    const p = el('p');
    String(txt).split(/(\*\*[^*]+\*\*)/).forEach((t) => {
      if (/^\*\*[^*]+\*\*$/.test(t)) p.appendChild(el('strong', null, t.slice(2, -2)));
      else if (t) p.appendChild(document.createTextNode(t));
    });
    return p;
  }
  function globo(resp) {
    const g = el('div', 'fg-bot');
    resp.partes.forEach((t) => g.appendChild(negritas(t)));
    return g;
  }
  function tarjetaCurso(c, tk) {
    const b = el('button', 'fg-curso');
    b.type = 'button';
    const th = el('span', 'fg-curso__img');
    th.appendChild(personaje(c.img, null, 44, () => { th.appendChild(icono('curso', 22)); }));
    const tx = el('span', 'fg-curso__txt');
    tx.append(el('b', null, c.titulo), el('small', null, c.area));
    b.append(th, tx, el('span', 'fg-curso__go', 'Ver'));
    b.addEventListener('click', () => {
      if (tk !== sesion || ocupado) return;
      yo(c.titulo);
      responder(() => accion({ tipo: 'curso', i: c.i }));
    });
    return b;
  }
  function mostrarCursos(lista, tk, siguiente) {
    let pos = 0;
    const rec = () => {
      if (tk !== sesion) return;
      lista.slice(pos, pos + LOTE).forEach((c) => cuerpo.appendChild(tarjetaCurso(c, tk)));
      pos += LOTE; abajo();
      if (pos < lista.length) {
        const mas = el('div', 'fg-chips');
        const bm = el('button', 'fg-chip', 'Ver más cursos');
        bm.type = 'button';
        bm.addEventListener('click', () => { mas.remove(); rec(); });
        mas.appendChild(bm); cuerpo.appendChild(mas);
      } else if (siguiente) siguiente();
    };
    rec();
  }
  function chips(botones, tk) {
    if (!botones || !botones.length) return;
    const grupo = el('div', 'fg-chips');
    botones.forEach((o) => {
      if (o.wa || o.href) {
        const a = el('a', 'fg-chip' + (o.wa ? ' is-wa' : '') + (o.main && !o.wa ? ' is-main' : ''), o.t);
        a.href = o.wa || o.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
        grupo.appendChild(a); return;
      }
      const b = el('button', 'fg-chip', o.t);
      b.type = 'button';
      b.addEventListener('click', () => {
        if (tk !== sesion || ocupado) return;
        grupo.classList.add('is-used');
        yo(o.t);
        responder(() => accion(o.accion));
      });
      grupo.appendChild(b);
    });
    cuerpo.appendChild(grupo); abajo();
  }

  async function pintar(resp, tk) {
    const espera = escribiendo();
    await wait(reduce ? 0 : 380);
    espera.remove();
    if (tk !== sesion) return;
    cuerpo.appendChild(filaGuia(globo(resp))); abajo();
    const cierre = () => {
      if (tk !== sesion) return;
      if (resp.oferta && resp.oferta.cursos.length) {
        const of = el('div', 'fg-oferta');
        of.setAttribute('role', 'group'); of.setAttribute('aria-label', 'Cursos recomendados');
        of.appendChild(el('p', 'fg-oferta__frase', resp.oferta.frase));
        resp.oferta.cursos.forEach((c) => of.appendChild(tarjetaCurso(c, tk)));
        cuerpo.appendChild(of); abajo();
      }
      chips(resp.botones, tk);
    };
    if (resp.cursos && resp.cursos.length) mostrarCursos(resp.cursos, tk, cierre); else cierre();
  }
  async function responder(producir) {
    const tk = sesion;
    ocupado = true;
    try { await pintar(producir(), tk); }
    catch (e) {
      if (tk === sesion) cuerpo.appendChild(filaGuia(globo({ partes: ['Algo salió mal por mi lado. Intenta de nuevo o escríbele al equipo por WhatsApp.'] })));
    } finally { ocupado = false; }
  }

  function empezarDeNuevo() {
    sesion++; ocupado = false; temaActual = null;
    cuerpo.textContent = '';
    cuerpo.appendChild(el('div', 'fg-lbl', 'Guía FisioTeck · guía virtual'));
    responder(inicio);
  }

  const esMovil = () => !!(window.matchMedia && window.matchMedia('(max-width: 560px)').matches);

  function construir() {
    lanzador = el('button', 'fg-launcher');
    lanzador.type = 'button';
    lanzador.setAttribute('aria-label', 'Abrir la Guía FisioTeck, una guía virtual');
    lanzador.setAttribute('aria-expanded', 'false');
    lanzador.setAttribute('aria-controls', 'fg-panel');
    const ico = el('span', 'fg-launcher__ico');
    ico.appendChild(icono('chat', 26));
    const pj = el('span', 'fg-launcher__pj');
    const pjImg = personaje(IMG_LANZADOR, 'fg-launcher__pj-img', 92, () => ico.classList.remove('con-personaje'));
    pj.appendChild(pjImg);
    ico.appendChild(pj); ico.classList.add('con-personaje');
    punto = el('span', 'fg-launcher__dot'); punto.hidden = !!ls.get(VISTO);
    ico.appendChild(punto);
    const nota = el('span', 'fg-launcher__txt', 'Soy tu guía virtual');
    nota.setAttribute('aria-hidden', 'true');
    lanzador.append(nota, ico);
    lanzador.addEventListener('click', abrir);
    document.body.appendChild(lanzador);

    panel = el('div', 'fg-panel');
    panel.id = 'fg-panel'; panel.hidden = true; panel.tabIndex = -1;
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Guía FisioTeck, guía virtual');

    const hd = el('div', 'fg-hd');
    const av = el('span', 'fg-av'); av.appendChild(icono('chat', 22));
    av.appendChild(personaje(IMG_AVATAR, 'fg-av__img', 46));
    const tt = el('div', 'fg-tt');
    tt.append(el('small', null, 'FisioTeck'), el('b', null, 'Guía FisioTeck'), el('span', null, 'Guía virtual, no es una persona'));
    const bR = el('button', 'fg-ic'); bR.type = 'button'; bR.title = 'Empezar de nuevo'; bR.setAttribute('aria-label', 'Empezar de nuevo');
    bR.appendChild(icono('reiniciar', 18)); bR.addEventListener('click', empezarDeNuevo);
    const bC = el('button', 'fg-ic'); bC.type = 'button'; bC.title = 'Minimizar'; bC.setAttribute('aria-label', 'Minimizar la guía');
    bC.appendChild(icono('minimizar', 18)); bC.addEventListener('click', () => cerrar(true));
    hd.append(av, tt, bR, bC);

    const nota2 = el('div', 'fg-note');
    nota2.append(el('b', null, 'Respuestas guiadas. No hay una persona conectada.'), document.createTextNode(' No escribas datos personales.'));

    cuerpo = el('div', 'fg-bd');
    cuerpo.setAttribute('role', 'log'); cuerpo.setAttribute('aria-live', 'polite'); cuerpo.setAttribute('aria-label', 'Conversación con la guía'); cuerpo.tabIndex = 0;

    const pie = el('div', 'fg-ft');
    const form = el('form', 'fg-inp'); form.setAttribute('autocomplete', 'off');
    campo = el('input'); campo.type = 'text'; campo.maxLength = 120; campo.placeholder = 'Escribe tu pregunta…';
    campo.setAttribute('aria-label', 'Escribe tu pregunta');
    const env = el('button'); env.type = 'submit'; env.setAttribute('aria-label', 'Enviar pregunta'); env.appendChild(icono('enviar', 20));
    form.append(campo, env);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = campo.value.replace(/\s+/g, ' ').trim();
      if (!q || ocupado) return;
      campo.value = '';
      yo(q); responder(() => texto(q));
    });
    const lk = el('div', 'fg-lk');
    const bA = el('button', null, 'Hablar con un asesor'); bA.type = 'button';
    bA.addEventListener('click', () => { if (ocupado) return; yo('Hablar con un asesor'); responder(asesor); });
    const bN = el('button', null, 'Empezar de nuevo'); bN.type = 'button'; bN.addEventListener('click', empezarDeNuevo);
    lk.append(bA, bN);
    pie.append(form, lk);

    panel.append(hd, nota2, cuerpo, pie);
    document.body.appendChild(panel);

    document.addEventListener('keydown', (e) => {
      if (panel.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); cerrar(true); }
    });
  }

  function abrir() {
    panel.hidden = false; lanzador.hidden = true;
    lanzador.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-modal', esMovil() ? 'true' : 'false');
    punto.hidden = true; ls.set(VISTO, '1');
    if (!iniciado) {
      iniciado = true;
      cuerpo.appendChild(el('div', 'fg-lbl', 'Guía FisioTeck · guía virtual'));
      responder(inicio);
    }
    if (!esMovil()) campo.focus(); else panel.focus({ preventScroll: true });
    abajo();
  }
  function cerrar(foco) {
    panel.hidden = true; lanzador.hidden = false;
    lanzador.setAttribute('aria-expanded', 'false');
    if (foco) lanzador.focus({ preventScroll: true });
  }

  function iniciar() {
    construir();
    // La nota sale unos segundos y se oculta.
    setTimeout(() => {
      if (document.hidden || lanzador.hidden) return;
      lanzador.classList.add('is-nota');
      setTimeout(() => lanzador.classList.remove('is-nota'), 6500);
    }, 2600);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
