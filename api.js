/* =============================================
   API.JS — FisioTeck (portada)
   Envía al servidor del Club, sin cuentas ni cookies:
   · la encuesta (anónima; el WhatsApp es opcional y exige aceptar el aviso),
   · las preguntas que la Guía no supo contestar (sin correos, teléfonos ni enlaces),
   (las visitas las cuenta visitas.js)
   Si el servidor no responde, la portada sigue funcionando igual.
   ============================================= */
(function () {
  'use strict';
  const local = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const API = local ? 'http://localhost:3000' : 'https://web-production-cd020.up.railway.app';
  const VERSION_AVISO = '2026-10';

  const noRastrear = () => {
    try { return navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.globalPrivacyControl === true; } catch (e) { return false; }
  };
  const ss = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* modo privado */ } }
  };
  const sessionId = () => {
    let id = ss.get('ft_sid');
    if (!id) {
      id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
      ss.set('ft_sid', id);
    }
    return id;
  };
  function enviar(ruta, cuerpo) {
    try {
      return fetch(API + ruta, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo), keepalive: true })
        .then((r) => r.json().catch(() => ({})).then((d) => ({ ok: r.ok, status: r.status, datos: d })))
        .catch(() => ({ ok: false, status: 0, datos: {} }));
    } catch (e) { return Promise.resolve({ ok: false, status: 0, datos: {} }); }
  }

  window.ftApi = {
    VERSION_AVISO,
    // Copia parcial o completa de la encuesta. `contacto` es opcional: { numero, avisoAceptado: true }.
    encuesta(respuestas, completada, contacto) {
      const cuerpo = { sessionId: sessionId(), respuestas: respuestas || {}, completada: !!completada };
      if (contacto) cuerpo.contacto = { numero: contacto.numero, avisoAceptado: contacto.avisoAceptado === true, avisoVersion: VERSION_AVISO };
      return enviar('/api/encuesta', cuerpo);
    },
    sinRespuesta(texto) { return enviar('/api/chatbot/sin-respuesta', { texto: String(texto || '').slice(0, 200) }); }
  };
})();
