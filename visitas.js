/* Contador anónimo de visitas · FisioTeck (portada y páginas legales)
   - Sin cookies y sin guardar la IP: el servidor solo cuenta visitas, personas distintas del día, dispositivo, país y origen.
   - Una visita por página cada 30 minutos (recargar no infla el número).
   - Solo cuenta en fisioteck.com (no pruebas locales) y respeta «No rastrear» y el Control global de privacidad.
   - El origen (Facebook, Instagram, Google…) del primer contacto se agrega a los enlaces al Club (?utm_source=…),
     para que el Club sepa de dónde llegó cada cuenta nueva.
   Uso:  <script src="visitas.js" data-pagina="landing" defer></script>   (páginas: landing, legal)
*/
(function () {
  'use strict';
  var host = location.hostname;
  if (host !== 'fisioteck.com' && host !== 'www.fisioteck.com') return;
  try {
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
  } catch (e) { /* sin acceso: se sigue */ }

  var URL_API = 'https://web-production-cd020.up.railway.app/api/visita';
  var VENTANA_MS = 30 * 60 * 1000;
  var etiqueta = document.currentScript && document.currentScript.getAttribute('data-pagina');
  var pagina = etiqueta;
  if (['landing', 'legal'].indexOf(pagina) === -1) return;
  var params = new URLSearchParams(location.search);

  function yaContada() {
    try { var antes = Number(sessionStorage.getItem('ft_vis_' + pagina) || 0); return antes && Date.now() - antes < VENTANA_MS; } catch (e) { return false; }
  }
  function marcar() { try { sessionStorage.setItem('ft_vis_' + pagina, String(Date.now())); } catch (e) { /* modo privado */ } }

  // ── Origen del primer contacto (se recuerda mientras dura la pestaña) ──
  function fuenteSimple(ref, utm, ua) {
    var u = String(utm || '').toLowerCase().replace(/[^a-z0-9_.-]/g, '').slice(0, 30);
    if (u) return u;
    var h = '';
    try { h = new URL(ref).hostname.toLowerCase(); } catch (e) { h = ''; }
    if (h) {
      if (/(^|\.)(fisioteck\.com)$/.test(h)) return '';
      if (/facebook\.|fb\.com|fb\.me/.test(h)) return 'facebook';
      if (/instagram\./.test(h)) return 'instagram';
      if (/google\./.test(h)) return 'google';
      if (/bing\./.test(h)) return 'bing';
      if (/whatsapp\.|wa\.me/.test(h)) return 'whatsapp';
      if (/tiktok\./.test(h)) return 'tiktok';
      if (/youtube\.|youtu\.be/.test(h)) return 'youtube';
      if (/linkedin\.|lnkd\.in/.test(h)) return 'linkedin';
      if (/(^|\.)(twitter|x)\.com|t\.co$/.test(h)) return 'x';
      return 'otros';
    }
    if (/Instagram/i.test(ua)) return 'instagram';
    if (/FBAN|FBAV|FB_IAB|FBIOS/i.test(ua)) return 'facebook';
    if (/musical_ly|TikTok|Bytedance/i.test(ua)) return 'tiktok';
    if (params.has('igshid') || params.has('igsh')) return 'instagram';
    if (params.has('fbclid')) return 'meta';
    return '';
  }
  function capturarOrigen() {
    var guardado = null;
    try { guardado = sessionStorage.getItem('ft_origen'); } catch (e) { guardado = null; }
    if (guardado) return guardado;
    var f = fuenteSimple(document.referrer || '', params.get('utm_source') || '', navigator.userAgent || '');
    if (f) { try { sessionStorage.setItem('ft_origen', f); } catch (e) { /* modo privado */ } }
    return f;
  }
  var origen = capturarOrigen();
  // Los enlaces al Club llevan el origen: club.fisioteck.com?utm_source=instagram
  if (origen) {
    document.addEventListener('click', function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href*="club.fisioteck.com"]') : null;
      if (!a) return;
      try { var u = new URL(a.href); if (!u.searchParams.has('utm_source')) { u.searchParams.set('utm_source', origen); a.href = u.toString(); } } catch (e) { /* enlace raro */ }
    }, true);
  }

  if (yaContada()) return;
  marcar();
  var cuerpo = { pagina: pagina, ref: document.referrer || '', utm: params.get('utm_source') || '' };
  if (params.has('fbclid')) cuerpo.fbclid = true;
  if (params.has('igshid') || params.has('igsh')) cuerpo.igshid = true;
  try {
    fetch(URL_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo), keepalive: true }).catch(function () {});
  } catch (e) { /* las métricas nunca deben estorbar */ }
})();
