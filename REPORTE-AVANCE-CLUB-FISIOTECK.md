# Club FisioTeck · Reporte de avance frente a Alintec Food y Zoorigen

Fecha: 27 de octubre de 2026 · Estado: **todo local, nada publicado**.
Cómo leerlo: **Listo** = construido y probado en local · **Parcial** = construido pero falta algo concreto · **Falta** = no está.
Lo que dice "probado" son 154 pruebas automáticas del servidor (todas pasan) y capturas de pantalla del Club. **No** se ha probado con cuentas reales, pagos reales ni el correo real, porque nada está conectado a producción.

## 1. Resumen rápido

| Área | Estado frente a Alintec/Zoorigen |
|---|---|
| Servidor (Express: cursos, quizzes, materiales, retos, logros, referidos, certificados) | Listo |
| Panel del Club (diseño y estructura) | Listo en las secciones principales; faltan algunas pantallas internas |
| Panel de administrador | Parcial: la mayoría de módulos listos; faltan unos detalles (ver sección 5) |
| Correos (Resend), recordatorios de pago | Listo en código y pruebas; falta la cuenta real de Resend |
| Métricas de visitas | Listo |
| Retos (quiz, ordenar, detective, flashcards, reto del día, modo historia) | Listo |
| Referidos y premios | Listo |
| Publicación | **No hecha** (decisión tuya: todo local) |

## 2. Lo que ya es funcional en el Club (lo que ve el miembro)

**Inicio (dashboard con estructura de Alintec)**
- Saludo con fecha y la mascota; tarjeta "Continúa tu curso" con foto; meta siguiente; cuatro contadores.
- Noticias del sector con diseño de periódico (tres plantillas: azul, turquesa y bicolor); abren en ventana "Lo esencial".
- Columna derecha: clases en vivo, comunidad, actividad y directorio. Alintec la muestra solo a VIP; aquí quien no es miembro ve una tarjeta para abrir el Club.

**Mis cursos**
- Tarjetas con foto, etiquetas, instructor, horas, clases, barra de avance, pestañas Todos/En progreso/Completados, buscador y filtros por área.
- Escalonado: los cursos se abren con el tiempo o al superar retos; candados con "Restan N días".

**PDF y material**
- Dos bloques independientes, como pediste: **materiales gratuitos** (PDF del Club) y **materiales de cada curso**, que se desbloquean según la clase en que vayas. Portadas generadas, créditos y filtros.
- Faltan: lector de libros (Alintec lo tiene) y asociar un PDF a un curso desde el panel.

**Retos (estructura de Zoorigen y Alintec)**
- "Elige tu reto" con 4 misiones con foto: Quiz por tema (5), Detective con fotografías (4 escenas), Ordena el procedimiento (4) y Flashcards.
- Reto del día (+25 XP), Modo historia y Clasificación del club (podio y top 20).
- **Modo historia "Atiende al paciente"**: 4 mundos de 4 casos cada uno (valoración, ortopedia, neurorrehabilitación y respiratoria). Fisi te cuenta el caso, eliges la decisión, y se explica por qué. Con 3 de 4 se supera y se abre el siguiente mundo. Alintec tiene 6 mundos; aquí hay 4 (se pueden agregar más).
- Todo se califica en el servidor: el navegador solo manda tus respuestas. El XP se da una vez por reto.

**Logros (estructura de Alintec)**
- Tarjeta de nivel con 5 pasos y círculo de avance, tarjetas de cifras e insignias por categoría (22 insignias).
- **Premios por nivel y por invitar:** Profesional (501 XP), Maestro (5,001 XP) e invitar a 4 amigos. Cada uno abre **un curso bloqueado antes de su fecha**, el que elija el miembro, una sola vez.

**Referidos (Invitar amigos, como Zoorigen)**
- Enlace personal, copiar y compartir por WhatsApp, lista de invitados solo con nombre e inicial, y puntos por hitos (+120 pago, +40 y +80 por retos).
- Control anti-fraude por dispositivo y correo confirmado. No es infalible (lo avisa la propia pantalla).

**Certificados, Perfil, Suscripción, Foro, Canal, Directorio**
- Certificados con folio, QR, verificación pública, compartir y reseña del curso.
- Perfil con avatar ilustrado (16 opciones gratuitas, sin emojis), "Tu actividad" y cambio de contraseña.
- Suscripción: planes $199 mensual y $1,999 anual; cupones de $50 y $100 **solo en el plan mensual**.
- **Foro:** caja para publicar, pestañas y tarjetas. Quien no es miembro ve publicaciones de **ejemplo** (marcadas como "Ejemplo") para ver cómo es; el miembro ve las reales y, si aún no hay, los ejemplos con un aviso.
- Faltan en el foro: avatares ilustrados de los autores y moderación visible para el miembro.

**Mascota "Fisi" y animaciones**
- Mascota propia (hueso con vendaje) con 14 poses y gestos: saluda, celebra, trofeo, lupa, libro, micrófono, etc. Cada sección tiene su pose y su frase, con animación suave. Respeta "reducir movimiento".

**Diseño y accesibilidad**
- Modo claro por defecto (siempre abre en claro) y modo oscuro disponible durante la sesión.
- Responsivo: tarjetas, paneles y tablas se acomodan a celular, tablet y escritorio. Revisado a fondo en escritorio; **celular y tablet solo en parte** (pendiente una revisión completa).
- Sin emojis ni iconos "de IA" en la interfaz.

## 3. Servidor y datos (lo que no se ve pero sostiene todo)

- **Autoridad del servidor:** respuestas de quizzes, progreso, XP, racha, insignias, premios, materiales por clase y retos se calculan en el servidor, no en el navegador (igual que Zoorigen y Alintec).
- **Historial de miembros:** el avance, retos, logros y premios **no se borran**. El administrador sí puede borrar foro, notificaciones, miembros y tarjetas del directorio (acordado contigo).
- **Correos (Resend):** verificación y restablecer contraseña, certificado con PDF, y **recordatorios de pago** (7 correos por ciclo, 3 ciclos, 4 días de descanso, solo de 8:00 a 22:00 hora de México). Los recordatorios **arrancan apagados** y se encienden desde el panel.
- **Métricas de visitas:** dispositivo, país, de dónde llegan (Facebook, Instagram, etc.), hora y visitantes únicos por día, sin guardar datos personales. Las gráficas del panel leen estos datos.
- **Bitácora del servidor:** eventos y errores guardados; las acciones del administrador nunca se borran.
- **Pruebas:** 154 pruebas automáticas del servidor pasan.

## 4. Panel de administrador (módulos ya hechos)

Cursos (editor con Bunny), páginas, miembros (activar, regalar tiempo, quitar), gráficas y métricas, recordatorios de pago, tráfico, estado del servidor, exportar, webinars y moderación (reseñas). Las acciones sobre miembros pasan por el servidor y quedan en bitácora.

## 5. Lo que falta o hay que revisar (honesto)

**Falta construir**
1. Selector de plantillas de noticias dentro del panel (el Club ya las muestra; falta que el administrador elija la plantilla y la fuente al crear una noticia).
2. Lector de libros y asociar PDF a curso desde el panel.
3. Más mundos en el Modo historia (Alintec tiene 6; aquí hay 4) y más escenas de Detective.
4. Premios reclamables más allá del curso adelantado (ej. insignias físicas), notas y favoritos en las clases, subtítulos y velocidad del video.
5. Del panel: sincronizar pagos con Stripe, ver cobros rechazados y más datos curiosos en noticias.

**Falta revisar en el navegador**
- Modo oscuro y tablet/celular de las pantallas nuevas (Logros, Retos, Foro, Certificados, Perfil).
- El flujo completo con cuentas reales (registro con enlace de invitación, pago, certificado por correo): hasta ahora solo con servidor de demostración y pruebas automáticas.

**Antes de publicar (cuando decidas)**
- Crear las variables del servidor: `RESEND_API_KEY`, `MAIL_FROM`, `CERT_SIGNING_KEY`, `ADMIN_EMAILS`, claves de Stripe/Firebase/Bunny y URL del Club/servidor.
- Verificar el dominio de correo en Resend y autorizar el dominio en Firebase.
- Revisión legal del aviso de privacidad y los términos.
- Publicar las **reglas de Firestore** al final (están propuestas, no aplicadas).
- Cambiar los círculos del Detective si alguna foto nueva los mueve (hay una herramienta `#calibrar`).

## 5 bis. Cambios del 27 de octubre (revisión contra Alintec y Zoorigen)

- **Bienvenida a cuentas nuevas:** pantalla con confeti y 7 láminas (cuenta creada, prueba gratuita o membresía, cursos, herramientas, retos y logros, certificados, todo listo) que se muestra una sola vez; luego el recorrido guiado de 10 pasos y el premio de +100 XP. Falta confirmar con una cuenta recién creada de verdad.
- **Inicio:** tarjeta de Invitar amigos con 4 huellas (como Zoorigen), entrada escalonada y conteo de cifras, y la tarjeta Continúa tu curso ahora abre la primera clase sin ver; si no hay curso abierto muestra Espera tu próximo curso con los días que faltan y los retos para abrirlo antes.
- **Invitar amigos:** rehecho con las secciones de Zoorigen (hero con cifras, enlace con WhatsApp, Facebook, X y correo, avance al premio, quién aceptó tu invitación y cómo cuenta un invitado).
- **Niveles más difíciles:** Profesional 1,900 XP y Maestro 5,800 XP (antes 501 y 5,001); el reto del día y las flashcards suman como máximo 600 XP en toda la vida. Esos mismos umbrales abren los premios de nivel.
- **Adelanto por retos, una sola vez:** al volverse miembro, con 12 retos superados (mínimo 2 de cada tipo: quiz, ordena, detective e historia) se abre el curso que se abriría a los 8 días. No se repite para los demás cursos. El administrador puede cambiar el número en la configuración.

## 5 ter. Cambios del 27 de octubre (contenido, demo y juegos)

- **Más retos:** quizzes de 5 a 25, ordena de 4 a 24, mundos del Modo historia de 4 a 24 y flashcards de 20 a 60. El Detective sigue en 4 escenas hasta que lleguen las fotos de las 20 nuevas. El contenido nuevo lo redactó una IA y no ha pasado por revisión de un fisioterapeuta: conviene revisarlo antes de publicar.
- **XP por reto:** 6 XP, o 10 si es perfecto (como Alintec y Zoorigen). Niveles: Profesional 2,500 y Maestro 6,000.
- **Modo demo local:** http://localhost:8080/?demo=vip (también ?demo=nuevo, ?demo=free y ?demo=off). Solo funciona en localhost.
- **Juegos dinámicos de clase:** sopa de letras (omite palabras que no caben, toque o arrastre, progreso y colores), ahorcado con muñeco y letras de ayuda, rompecabezas con imagen de referencia y contador, memorama hasta 10 pares.
- **Materiales gratuitos:** el Club y el panel aceptan el formato (PDF, Excel, PowerPoint, Word). Falta crear los 24 archivos (prompt en PROMPT-ARCHIVOS-GRATUITOS.md).

## 5 quater. Material gratuito: créditos y retos

- Cada material gratuito se desbloquea con **créditos** (cualquier cuenta, 100 por material, los regala el administrador o llegan por cupón) o con **retos** (solo miembros con membresía: cada material pide más retos que el anterior, de 2 a 71). La membresía sola ya no los abre. Un miembro también puede canjear créditos si no quiere esperar. Una vez desbloqueado se queda desbloqueado.
- El material se muestra una sola vez (se quitó la lista repetida). Probado de punta a punta en el modo demo: regalo del administrador, canje, apertura y rechazo del segundo material sin créditos.

## 5 quinquies. Auditoría de paridad (27 de octubre) y correcciones

Se comparó FisioTeck con Alintec y Zoorigen en pagos y correos, panel de administrador, cursos del miembro y seguridad. Corregido:
- Cobros: crear pago, cancelar, ligar pago pendiente y consultar pagos ahora **exigen sesión** y usan el correo y la cuenta de la sesión (antes cualquiera podía cancelar la suscripción de otra persona con solo su correo). La cancelación es **al final del periodo** (conserva el acceso pagado) y hay endpoint para reactivar.
- Webhook de Stripe: **siempre con firma** (sin STRIPE_WEBHOOK_SECRET se rechaza), **sin repetir eventos** y con reintento si algo falla. El cobro rechazado queda en los pagos y se avisa por correo.
- Quien cancela y vuelve a pagar (o es activado por el administrador) **recupera el acceso**.
- Servidor: CORS con lista de sitios, límite de intentos en cobros, token de la tarea de vencimientos por cabecera, sin mensajes internos de error y el servidor demo se niega a arrancar en producción.
- Clases con preguntas: el servidor exige acertar al menos 60 % para completarlas (y por tanto para el certificado).
- Foro: la imagen del tema ya no permite meter código. Reglas propuestas: solo el precio es público, el directorio exige membresía y la imagen del foro tiene tope al editar.
- Pendiente de la auditoría: sincronizar pagos con Stripe, eliminar miembro con papelera, seguimiento de retos y XP en el panel, libros, datos curiosos, reseña automática al terminar un curso, y escapar textos de content.json en index.html (solo los controla el administrador).
- **Antes de publicar:** definir STRIPE_WEBHOOK_SECRET, NEWSDATA_API_KEY (rotar la clave que estaba escrita en el código), CORS_ORIGINS si hay más dominios, ADMIN_TOKEN; actualizar el aviso de privacidad (terceros, directorio y reseñas) y publicar las reglas de Firestore.

## 6. Dónde está cada cosa

- Club: `club-fisioteck/` (`club-retos-zona.js`, `club-historia.js`, `club-detective.js`, `club-paginas.js`, `club-mascota.js`, estilos `club-diseno-*.css`).
- Servidor: `club-fisioteck-webhooks/` (`services/`, `data/retos-claves.json` con las respuestas correctas, pruebas en `test/`).
- Demo local: `VER-FISIOTECK-LOCAL.bat` (Club 8080, landing 8790, servidor de demostración 3000).
- Prompts de imágenes: `PROMPTS-IMAGENES-RETOS.md` y `PROMPTS-IMAGENES-LANDING.md`.

## 5 sexies. Directorio VIP, tarjeta de Modo historia y cupones (27 de octubre de 2026)

- **Directorio VIP** igual que Alintec/Zoorigen: tarjeta con portada de color, sello de verificado, estado profesional, certificados reales, contacto por iconos y ventana de detalle; "Mi tarjeta" con vista previa, publicar/ocultar y eliminar; búsqueda y filtro por especialidad; grupos "Miembros VIP verificados" y "Comunidad FisioTeck".
- El **contacto** (WhatsApp, correo, LinkedIn, sitio, Instagram) vive en el servidor (`directorioContacto`, rutas `GET /api/directorio/meta` y `POST /api/directorio/contacto`) y solo se entrega a quien tiene membresía vigente. Pruebas nuevas en `test/directorio.test.js`.
- `firestore.rules` (propuesta, sin publicar): las tarjetas publicadas las lee cualquier cuenta con sesión; `directorioContacto` sin acceso desde el navegador.
- **Modo historia**: tarjeta grande de entrada en Retos y el reto del día como fila aparte.
- **Cupones de créditos**: tarjeta "Hay un cupón para ti" y tarjeta "Lo sentimos" (`club-cupones.js`).

## 5 septies. Panel de administrador: Stripe, papelera y Retos y XP (29 de octubre de 2026)

- **Pagos desde Stripe**: botón "Traer pagos desde Stripe" (`POST /api/admin/pagos/sincronizar`). Guarda los cobros pagados y rechazados que faltan (sin duplicar) y pone al día la fecha de pago y la cancelación hecha desde Stripe. Nuevo KPI "Cobros rechazados" y filtro Todos/Pagados/Rechazados en el historial.
- **Papelera de miembros**: "Eliminar miembro" manda la cuenta a `miembrosPapelera` y bloquea su acceso; se puede **restaurar** o **borrar el acceso** (libera el correo). El avance, certificados, logros y pagos nunca se borran. No deja eliminar administradores ni miembros con suscripción activa.
- **Retos y XP**: sección nueva con XP total y promedio, miembros por nivel, retos por tipo, y tabla por miembro (nivel, XP, quiz/orden/detective/historia, racha, curso adelantado, última visita) con filtros y CSV.
- Código: `services/admin-miembros.js` (pruebas en `test/admin-miembros.test.js`), `admin/retos-xp.js`, `admin/miembros.js`, `admin/index.html`.
- Pendiente de esta parte: probar la sincronización con la cuenta real de Stripe.

## 5 octies. Libros, datos curiosos, reseña automática y avisos del foro (29 de octubre de 2026)

- **Libros de lectura**: el administrador los publica en el panel (título, autor, enlace https, portada y retos que pide); en el Club hay una página "Libros" (menú) y se leen dentro del visor. El enlace solo lo entrega el servidor a quien tiene membresía y ya superó los retos (`services/libros.js`, `club-libros.js`, `admin/libros.js`).
- **Datos curiosos**: banco de 30 datos de fisioterapia y rehabilitación; sale uno en la campana de todos los miembros cada martes y viernes desde las 7:00 a.m. (hora de México), el menos enviado primero. El panel permite agregar, editar, pausar, borrar y enviar uno ahora (`services/datos-curiosos.js`, `admin/curiosos.js`).
- **Reseña automática**: al completar la última clase de un curso aparece "¡Terminaste el curso!"; invita a generar el certificado y, al emitirlo, abre la calificación (una sola vez por curso) (`club-resenas.js`).
- **Avisos del foro**: cuando alguien responde un tema, su autor recibe un aviso en la campana (lo crea el servidor y comprueba que la respuesta es de quien avisa) (`services/avisos.js`, `club-avisos.js`).
- Pruebas nuevas en `test/contenido-extra.test.js`.

## 5 nonies. Libros gratuitos, nombre del certificado e insignias de comunidad (29 de octubre de 2026)

- **Libros (licencia abierta)**: se cargan solos 5 libros de OpenStax con licencia **CC BY 4.0** (verificada en la API oficial de OpenStax): Anatomy and Physiology (1.ª ed.), College Physics, Psychology, Biology y Física universitaria vol. 1 (español). Cada uno pide **10 retos** y muestra su crédito y licencia. Se leen dentro del Club (no se alojan en nuestro servidor). Datos en `data/libros-base.json`.
- Descartados por licencia: Anatomy and Physiology **2e** (CC BY-NC-SA: no comercial), Concepts of Fitness and Wellness (NC), Open Textbook of Exercise Physiology (NC), Gray's Anatomy 1918 (dominio público en EE. UU., dudoso en México por las revisiones del editor) y libros de agregadores sin licencia clara.
- **Nombre del certificado**: la tarjeta de nombre sale siempre antes del certificado; el nombre confirmado ahora también se guarda en el perfil y en la cuenta de acceso.
- **Insignias**: *Embajador* (1 invitado que confirme su cuenta, 60 XP) y *La manada crece* (4 invitados, 150 XP).

## 5 decies. Libros en español, certificado como Alintec, responsivo y moderación (29 de octubre de 2026)

- **Libros en español (5 originales de FisioTeck, 98 a 113 páginas cada uno)**: Anatomía y fisiología, Biomecánica, Dolor y neurociencia, Ejercicio terapéutico y Valoración clínica. Texto propio (no copiado), con glosario, ideas clave y preguntas; los generó `scripts/construir-libros.js` a partir de `libros-fuente/*.md` y los PDF viven en `libros-privados/` (el servidor los entrega con enlace firmado de 15 minutos solo a quien tiene membresía y 10 retos). Se suma «Física universitaria vol. 1» (OpenStax, español, CC BY 4.0). **Los textos médicos necesitan revisión de un fisioterapeuta antes de publicar** (cada agente dejó su lista de puntos a verificar).
- **Certificado, orden de Alintec**: al terminar el curso el certificado se emite solo con el nombre del perfil; en el PRIMER certificado se pregunta «¿tu certificado debe llevar este nombre?» (Sí / No, corregir) antes de verlo y lo corregido pasa al perfil y a la cuenta; después, felicitación con el certificado y, cuando no hay otra ventana, la tarjeta para calificar (hasta 3 veces si dice «Ahora no»).
- **Responsivo**: Alintec cambia de escritorio a móvil en **880 px** (tableta 881–1180/1280); FisioTeck lo hacía en 768 y se alineó a 880. Revisado en 1024 y 768 en claro y oscuro.
- **Moderación del directorio**: el panel puede ocultar (con motivo), volver a mostrar y eliminar tarjetas, con bitácora; lo oculto lo decide el servidor y no se quita borrando y recreando la tarjeta.
- **Materiales gratuitos**: sus enlaces ya no son de prueba; se guardan como ruta relativa y el servidor los completa con `CLUB_URL` (por defecto https://club.fisioteck.com/).
- Variables nuevas opcionales del servidor: `CLUB_URL`, `LIBROS_KEY` (si no, usa `CERT_SIGNING_KEY`), `API_PUBLICA`.

## 5 undecies. Libros dentro de «PDF y material» (29 de octubre de 2026)

- Los libros ya no tienen página ni menú propio: viven al inicio de «PDF y material», como en Alintec: etiqueta «Libros», tarjeta «Tu siguiente libro» con barra de retos, libro destacado y estante «Explora más libros y materiales». Pestaña nueva «Libros» en los filtros.
- Los libros se abren solo con retos; no se canjean por créditos (los créditos siguen valiendo solo para los materiales).
- Revisado en escritorio (1180 px) y celular (375 px) en modo claro; el modo oscuro y tablet quedan por revisar.

## 5 duodecies. Portadas predeterminadas (29 de octubre de 2026)

- Materiales y libros usan imágenes de `assets/portadas/<área>.webp` (14 áreas + `general`) y `assets/portadas/libros/<id>.webp`; la miniatura propia del material siempre manda. Un material que el administrador agrega a un curso toma la portada de su área. Si el archivo no existe queda la portada de color con el título.
- Las imágenes se generan con `PROMPTS-PORTADAS-MATERIALES.md` (20 imágenes, WebP 3:4). Aún no existen; se quedan sin subir hasta generarlas.

## 5 terdecies. Eliminar cuenta, panel siempre claro y ajuste de pantalla (29 de octubre de 2026)

- **Eliminar mi cuenta** (Mi perfil): tarjeta con botón y ventana que exige escribir ELIMINAR. El servidor (`services/cuenta.js`, `POST /api/cuenta/eliminar`) cancela la suscripción de Stripe de inmediato (si Stripe falla no borra nada para no seguir cobrando), borra todo lo de la persona (miembro y subcolecciones, directorio, créditos, referidos, certificados, reseñas, foro, pendientes) y al final su acceso. Las cuentas de administrador no se pueden borrar así. Nota: esto sustituye la regla anterior de «nunca borrar el historial» solo para quien elimina su propia cuenta; lo que hace el administrador no cambia. Stripe conserva sus propios registros de cobros; el aviso de privacidad debe mencionar esta opción.
- **Panel de administrador**: siempre inicia en modo claro; el modo oscuro ya no se recuerda ni afecta al Club.
- **PDF y material** ya no se ensancha ni se corta a la derecha en pantallas medianas (el estante se desliza por dentro).
- Sin probar con Stripe ni Firebase reales; el borrado se probó con una base falsa (5 pruebas).

## 5 quaterdecies. Móvil, créditos, foto del directorio y aviso de privacidad (29 de octubre de 2026)

- **Móvil**: revisadas las 25 páginas del Club en 320, 360, 375 y 412 px. Ajustes: tarjetas de material y filtros que se salían a 320 px. El aviso «MODO DEMO LOCAL» (solo existe en la demo) tapaba el centro de la barra inferior; ahora va arriba y pequeño. La barra inferior real no se ocultaba.
- **Tarjeta de créditos y cupón** (PDF y material): saldo, campo y botón ya no se encima; en celular se apilan.
- **Foto en la tarjeta del directorio**: se sube desde Mi tarjeta profesional, se recorta cuadrada, se reduce a 320 px y se guarda como JPEG dentro de la tarjeta (campo `foto`; reglas de Firestore actualizadas: solo JPEG en base64, máximo 70 000 caracteres). Si no hay foto se muestra el avatar o las iniciales. **Hay que publicar `firestore.rules` para que funcione en producción.**
- **Aviso de privacidad**: agregado el apartado de eliminar la cuenta desde Mi perfil y la tarjeta del Directorio (con foto) como dato opcional. **Texto legal: debe revisarlo quien corresponda antes de publicarlo.**
- Los libros y los materiales siguen en secciones separadas (decisión tomada).

## 5 quindecies. Panel lateral del perfil (29 de octubre de 2026)

- Al tocar el avatar y el nombre de la barra superior se abre un panel por la derecha, como «Tu espacio» de Alintec: nombre, correo, plan, XP, clases y cursos, tarjeta «Explora tus beneficios», accesos a Mi perfil, Mis logros, Certificados y Membresía, y Cerrar sesión (`club-perfil.js` / `club-perfil.css`). Cierra con la X, tocando fuera o con Esc.
- En celular el ícono de tres rayas ya no aparece; en su lugar el encabezado muestra el avatar con el primer nombre, que abre ese mismo panel. El menú completo sigue en «Más», abajo. A 320 px se oculta el ícono de modo oscuro del encabezado para que quepa (sigue en «Más»).
- Revisado en 320, 360, 419 y 1280 px en modo claro. Sin probar con un avatar elegido ni con una cuenta con datos reales.

Ajuste (29 de octubre de 2026): el chip del perfil en el encabezado del celular quedaba dentro del contenedor del logo y se veía desordenado. Ahora el encabezado es: lupa y logo a la izquierda; modo oscuro (solo en pantallas de 390 px o más), campana y avatar con nombre a la derecha. Revisado en 412, 375, 360 y 320 px.

## Noticias sin foto y variables de Railway (29 de octubre de 2026)

- Si la foto de una noticia no carga, el Club quita el recuadro vacío y la tarjeta queda con su texto (`club-noticias.js`). En la prueba, 1 de 9 noticias tenía la foto rota.
- Variables de Railway revisadas contra el código: están todas las necesarias salvo `NEWSDATA_API_KEY` (hay que crearla con la clave rotada de newsdata.io). `CORS_ORIGINS`, `API_PUBLICA` y `LIBROS_KEY` son opcionales. `EMAIL_USER` y `EMAIL_PASS` ya no las usa el código.

## Revisión de modo oscuro y tableta, y portadas (29 de octubre de 2026)

- Las 20 portadas ya están en `club-fisioteck/assets/portadas/` (14 de material y 6 de libro, WebP 900×1200, de 35 a 83 KB). Se ven en el destacado, el estante y las tarjetas de material; los materiales de curso toman la de su área.
- Modo oscuro revisado en PDF y material, panel del perfil y ventana de eliminar cuenta: todo legible. Único ajuste: el número azul de «Materiales» se leía poco; ahora es un azul más claro en modo oscuro.
- Tableta: las 25 páginas del Club, en modo oscuro, en 768, 900, 1024, 1180 y 1280 px, sin ningún elemento fuera de pantalla.
- Pendiente para publicar: crear `NEWSDATA_API_KEY` en Railway con la clave nueva de newsdata.io.

Ajuste (29 de octubre de 2026): los filtros de «PDF y material» se salían de su recuadro con 5 pestañas. Ahora se llaman Todo, Libros, PDF, Mis cursos y Créditos, bajan de renglón y quedan dentro (revisado en 700, 900 y 1100 px).

## Íconos del sitio, curso de prueba y ventana del curso (29 de octubre de 2026)

- **Ícono del sitio**: la portada y el Club no declaraban ningún ícono, por eso no salía en la pestaña ni en Google. Se agregó `favicon.ico`, `icon-192.png`, `icon-512.png` y `apple-touch-icon.png` y sus etiquetas en la portada, el aviso, los términos, el Club, el panel de administrador y la página de verificar. Google tarda días en mostrarlo.
- **Detalle del curso**: ya no abre a pantalla completa; es una ventana centrada con el fondo oscurecido (en celular sube desde abajo).
- **Curso de prueba gratuita**: el curso elegido aparece primero en Mis cursos con «Tu prueba gratuita · N clases gratis»; el Inicio muestra ese curso (no el primero del catálogo) con sus clases gratis, o «Elige tu curso de prueba» si aún no elige; el detalle dice cuántas clases son gratis.

## Verifica tu correo y bienvenida como tarjeta (29 de octubre de 2026)

- **Tarjeta «Verifica tu correo»** (`ftMostrarVerificacion` en `club-correo.js`): al crear la cuenta con correo y contraseña se manda el correo de confirmación y se muestra la tarjeta con «Ya verifiqué», «Reenviar correo» (espera de 60 s) y «Cerrar sesión / usar otra cuenta». No se entra al panel hasta confirmar; se actualiza sola cada 4 s. Aplica al registro y al inicio de sesión. Con Google no aplica (el correo ya viene verificado). No bloquea a quien ya es miembro ni a quien tiene historial de pagos.
- **Bienvenida** ya no abarca toda la pantalla: es una tarjeta centrada con el fondo oscurecido y el confeti dentro de ella.
- Orden al entrar una cuenta nueva: verificar correo → bienvenida → recorrido guiado → +100 XP → tarjeta «Tu prueba gratuita» → elegir curso. Probado en la demo.

## Verifica tu correo fuera del panel y tarjeta «Completa tu perfil profesional» (29 de octubre de 2026)

- La tarjeta «Verifica tu correo» ahora se ve FUERA del panel, como en Alintec: fondo sólido de la marca, el panel oculto y sin cargarse hasta confirmar el correo.
- Nueva tarjeta **«Completa tu perfil profesional»** (`club-perfil-inicial.js` / `.css`) para cuentas nuevas: avatar, nombre completo, WhatsApp, consultorio o empresa, ubicación y especialidad; en «Ver más», puesto, LinkedIn, sitio web e Instagram. Se guarda en la cuenta (nombre, teléfono, especialidad, avatar), actualiza el nombre del perfil y deja una tarjeta PRIVADA del Directorio (el contacto lo guarda el servidor). Se puede omitir.
- Orden de una cuenta nueva: verificar correo → bienvenida → recorrido guiado → +100 XP → completar perfil → tarjeta «Tu prueba gratuita» → elegir curso. Probado en la demo.

## Bienvenida VIP y regla de los 8 días (29 de octubre de 2026)

- **Bienvenida VIP** (como Alintec): tarjeta de varias láminas (portada según plan mensual, anual o cortesía; cursos, en vivo, PDF y libros, herramientas y retos, certificados; cierre con «Ver mis cursos»). Sale una sola vez cuando la membresía es NUEVA (primer pago, activación o regalo de los últimos 7 días), por pago, por activación del administrador o al volver de Stripe (`?checkout=success`, que antes abría un aviso simple de pantalla completa). No se muestra a miembros de siempre.
- **Regla de los 8 días (cursos escalonados)**: está construida (servidor `services/acceso.js`, tarjetas «Restan N días», adelanto por retos) pero está APAGADA: en `config/club` no existe `escalonadoActivo`. Se enciende en el panel de administrador → Configuración → «Cursos escalonados» → Activar → Guardar. Al encenderla se guarda `escalonadoDesde` (hoy): quienes ya pagaban conservan todo abierto; los miembros nuevos desde esa fecha tienen abierto el curso de su prueba y cada 8 días se abre el siguiente (o antes con 12 retos).

## Videos del panel, regla de los 8 días para todos y calendario de cursos (29 de octubre de 2026)

- **Error 502 en `/api/admin/bunny-catalogo`**: se pedían todas las listas de Bunny a la vez y Bunny rechazaba. Ahora máximo 3 consultas a la vez, reintentos, memoria de 5 minutos y, si Bunny falla, el catálogo guardado en el servidor (con aviso del código que respondió Bunny).
- **Escalonado para TODOS** (por defecto): cada miembro cuenta desde el inicio real de su membresía (primer pago) y lo que ya empezó a ver se conserva abierto. Casilla nueva «Solo para miembros nuevos» en Configuración → Cursos escalonados para volver al comportamiento anterior (`escalonadoSoloNuevos`). **Sigue APAGADO hasta que el administrador lo active.**
- **Calendario de cursos** (`club-calendario.js`): «Día N de tu membresía», contador del siguiente curso, cuentas (completados, en progreso, abiertos sin empezar, en espera) y la lista de cursos con su estado, avance y fecha de desbloqueo; tarjeta pequeña en Inicio.

## Certificado rediseñado con las firmas originales (29 de octubre de 2026)

- El certificado original del Club (el que se generaba en el navegador) llevaba dos firmas: **Lic. Paulina Torres Montalvo, Directora Académica (Club FisioTeck)** y **Coordinación de Certificación (IPCI Latinoamericano)**. El PDF del servidor las había perdido. Se recuperaron las imágenes originales del historial de git y están en `club-fisioteck-webhooks/assets/cert/` (`firma-directora.png`, `firma-coordinacion.png`, `logo.png`).
- Diseño nuevo (`services/certificado-pdf.js`, A4 horizontal) con la estructura del de Alintec y los colores de FisioTeck: doble marco, logo, medalla, «CERTIFICADO DE ACREDITACIÓN», nombre, curso, carga académica, QR, las dos firmas, sello FT y barra con folio. Nombres y cursos largos se reducen solos.
- El PDF se genera en el momento a partir del certificado guardado: **todos los certificados ya emitidos adoptan el diseño nuevo**, con el mismo folio. El correo adjunta el mismo PDF.

Ajuste (29 de octubre de 2026): el historial de cursos (completados, en progreso, abiertos sin empezar) ahora se ve SIEMPRE a los miembros en Mis cursos; el calendario con fechas, contador y «en espera» aparece cuando el administrador enciende los cursos escalonados (Configuración → Cursos escalonados). En la base real `config/club.escalonadoActivo` no existía: la regla de los 8 días seguía apagada.

## Corrección: miembros antiguos conservan todo; el calendario cuenta desde el pago (29 de octubre de 2026)

- Se revirtió el cambio que aplicaba la regla de los 8 días a TODOS. Como en Alintec y Zoorigen: quienes pagaron antes de encender el escalonado (`escalonadoDesde`) conservan su avance, su historial y todo lo que ya tenían abierto. Solo si el administrador marca «Aplicar también a miembros antiguos» (`escalonadoParaTodos`) se les aplica.
- El calendario de un miembro empieza cuando PAGA (primer pago; sin pagos: último pago, activación o regalo; la fecha de alta de la cuenta es el último recurso).
- Se quitó la tarjeta «Tu calendario/historial de cursos» de Mis cursos y de Inicio. Se conservan las tarjetas de curso con «Restan N días para su desbloqueo» y «Ábrelo antes con N retos» (los retos abren UN solo curso, el que seguiría a los 8 días).
- Panel: el semáforo «Correos» ahora reconoce Resend (RESEND_API_KEY + MAIL_FROM); antes solo revisaba EmailJS y daba un aviso falso. Los correos de bienvenida y cancelación ya salían por Resend.
- Pendiente del dueño: `BUNNY_STREAM_API_KEY` en Railway devuelve 401 (llave incorrecta).

## Diagnóstico del «403» en el reproductor (29 de octubre de 2026)

- El enlace del video que firma el servidor es correcto (sha256 de BUNNY_STREAM_TOKEN_KEY + id del video + expiración, como pide Bunny). Si el reproductor muestra «403», lo rechaza Bunny: la «Token Authentication Key» no corresponde a la biblioteca configurada, los «Allowed Domains» de la biblioteca no incluyen club.fisioteck.com, o `BUNNY_STREAM_LIBRARY_ID` no es la biblioteca donde están los cursos (el catálogo del servidor usa la 726068).
- El semáforo del panel (Estado de servicios) ahora hace una **prueba real de reproducción** («Reproducción de videos (prueba real)») y dice cuál de esas causas es.

## Verificación de miembros antiguos (29 de octubre de 2026)

- Avance de cursos: el Club viejo guardaba el avance en `members/{uid}/progress/courses` con claves `c_<curso>` y `completed`; el servidor nuevo lee exactamente ese formato. Compatible.
- Logros: las 16 insignias del sistema viejo existen en el nuevo con los mismos puntos; racha, estadísticas y XP de retos se migran solos la primera vez que la persona abre Logros, y el documento viejo no se borra.
- Certificados: el Club viejo los generaba en el navegador y no los guardaba; todo curso terminado se puede emitir (y descargar con el diseño nuevo).
- Ninguna ruta del servidor borra avance, logros ni certificados; solo la papelera del administrador, la eliminación de la propia cuenta y la limpieza de bitácora.
- Corrección: un miembro antiguo sin lista de pagos pero con un cobro de renovación reciente podía tomarse por nuevo; ahora el inicio usa la fecha más antigua disponible.
- `scripts/auditar-miembros.js`: auditoría de SOLO LECTURA para correr con la cuenta de servicio propia.

## Retos: contadores en 0 (29 de octubre de 2026)

- **Causa**: `achievementData` se declara con `let` en `index.html`, por lo que NO es propiedad de `window`. La zona de retos (`club-retos-zona.js`), el Modo historia (`club-historia.js`) y el perfil (`club-paginas.js`) lo leían como `window.achievementData` y recibían un objeto vacío: «0 de 25 superados», mundos del Modo historia sin avance y racha en 0, aunque el servidor ya había guardado los retos y los puntos (la XP subía por otra vía). El servidor calificaba y guardaba bien.
- **Corrección**: `club-logros.js` expone `window.achievementData` como acceso al mismo objeto. Probado en la demo con quiz, ordena, detective e historia: los cuatro contadores suben.
- También se corrigió que `window.db` no existe: las marcas «ya vio la bienvenida / el perfil / la bienvenida VIP» no se guardaban en Firestore, solo en el navegador.
- Los retos que ya se habían resuelto NO se perdieron: están en `members/{uid}/progress/retos` y ahora se muestran.

## Orden de las tarjetas de una cuenta nueva, igual que Alintec (29 de octubre de 2026)

Orden (cuenta gratuita nueva): 1) bienvenida con confeti → 2) **regalo de +100 XP** (tarjeta con la barra de nivel) → 3) **completa tu perfil profesional** → 4) **recorrido guiado** → 5) presentación de la **prueba gratuita** → 6) avisos de regalo (créditos / cupón). Quien paga de inmediato ve la bienvenida VIP en lugar de la gratuita y sigue con el regalo de XP, el perfil y el recorrido.

- Antes el regalo de XP era un aviso pequeño AL FINAL del recorrido y la tarjeta de perfil salía DESPUÉS del recorrido; ahora van antes, como Alintec.
- El servidor da el regalo solo a cuentas creadas hace menos de 7 días y no administradores (`/api/logros/bienvenida`); una sola vez.
- El recorrido guiado solo se muestra solo a cuentas nuevas (las antiguas lo ven desde Ayuda). Cada tarjeta espera a la anterior; topes de seguridad de 15 min (perfil) y 10 min (recorrido/prueba) para que ninguna bloquee el panel. Los avisos de regalo/cupón esperan a toda la secuencia (`ftBienvenida.secuenciaPendiente`).
- Probado en la demo con una cuenta gratuita nueva y con un miembro VIP nuevo.

## Seis correcciones de pagos y seguridad tras la auditoría contra Alintec y Zoorigen (29 de octubre de 2026)

- **Verificación de certificados**: `?cert=` en el Club ya no muestra «Certificado Verificado» sin consultar; manda a `verificar/?folio=…`, que pregunta al servidor. Los certificados viejos del navegador (FTCK-…) nunca se registraron y salen como no encontrados.
- **Quitar acceso** (panel): primero cancela YA la suscripción en Stripe; si Stripe falla, no se quita el acceso. Una renovación posterior ya no devuelve el acceso que quitó el administrador.
- **Papelera**: antes de eliminar pregunta a Stripe si la suscripción sigue viva (no solo el estado guardado).
- **Sin doble cobro** (`/api/create-checkout`, 409): con suscripción activa, cancelada pero vigente (debe reactivar) o con cobro pendiente (debe actualizar la tarjeta en «Gestionar en Stripe»).
- **Clases en vivo**: el enlace y la grabación ya no se publican en `content.json`; viven en `webinarsPrivados` y el servidor los entrega solo con membresía (`services/webinars.js`). El panel los guarda al guardar la sesión y antes de publicar (si no llegan, no publica).
- **Cron de vencidos**: acepta `?token=` además del encabezado `x-admin-token`.
- **Cobro rechazado**: ya no corta el acceso al primer rechazo; queda «pago pendiente» con 7 días de gracia mínimo mientras Stripe reintenta. Nuevo aviso `customer.subscription.updated` (cancelar/reactivar desde el portal de Stripe, past_due, unpaid). El miembro se encuentra por la cuenta guardada en la suscripción y la fecha del siguiente cobro es la de Stripe (`services/suscripcion.js`).
- Pruebas: 210 del servidor pasan (7 nuevas en `test/suscripcion.test.js`); el aviso de Stripe se probó en el servidor real con Stripe simulado (8 casos) y el Club/panel en la demo.
- **En Stripe (dueño)**: agregar el evento `customer.subscription.updated` al webhook de producción.

## Nueve correcciones de lo que nota el miembro (29 de octubre de 2026)

- **Insignias de certificados**: Primer Certificado, Coleccionista de Certificados y Voz del Club ahora las entrega el servidor (antes solo existían en el navegador y nunca se podían ganar).
- **Reto del día como Alintec/Zoorigen**: 5 preguntas, UN intento al día (fallar también lo gasta), se supera con 60 %, 6 XP o 10 si es perfecto; las respuestas correctas se ven después de contestar.
- **«Confirmando tu pago…»**: al volver de Stripe, si el aviso tarda, una pantalla revisa sola cada 4 s (hasta 3 min), consulta a Stripe si el pago se completó y avisa qué hacer; ya nadie entra como visitante sin explicación.
- **Notificaciones**: la página «Ver todas» muestra lo mismo que la campana (avisos + foro + en vivo + cursos nuevos); los avisos se conservan (últimos 15, ya no desaparecen a las 24 h); el aviso sin leer es legible en modo oscuro; el texto y los enlaces se escapan y solo se aceptan enlaces http(s).
- **Cambiar contraseña**: reconoce `auth/invalid-credential` de Firebase 10 («La contraseña actual es incorrecta»); a quien entra con Google se le explica que no tiene contraseña en el Club (sin formulario).
- **Foro**: el administrador puede responder aunque no tenga membresía (`firestore.rules`; hay que publicar las reglas).
- **«Ahorras $389»**: corregido el texto de respaldo (decía $989).
- **Video**: cerrar el reproductor antes de que cargue cancela la carga (ya no suena oculto).
- **Curso de la encuesta**: viaja en el enlace `?cursoPref=` de fisioteck.com al Club; al abrir la prueba gratuita se propone ese curso primero.
- Pruebas: 212 del servidor pasan; revisado en la demo local (reto del día por API, insignias, notificaciones, detección de cuentas Google y el curso preferido).
