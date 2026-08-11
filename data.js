const DATA = {
  areas: [
    { icon: "🧠", texto: "Rehabilitación Neurológica" },
    { icon: "🏃", texto: "Fisioterapia Deportiva" },
    { icon: "🦴", texto: "Rehabilitación Ortopédica" },
    { icon: "👵", texto: "Geriatría Clínica" },
    { icon: "📋", texto: "Dosificación de Cargas" },
    { icon: "🎓", texto: "Certificación Avalada" }
  ],
  categorias: ["Todos","Neurológica","Deportiva","Ortopédica","Embarazo","Infantil","Cardiopulmonar","Bienestar"],
  cursos: [
    { img:"assets/img/cursos/curso1.jpg", nombre:"Neurodinamia en Rehabilitación de Lesiones", categoria:"Neurológica", ponente:"Lic. Erika Romero Luna", precio:"$550 MXN", inicio:"16 de Marzo", modalidad:"Online · Cupo limitado", temario:["Fundamentos de neurodinamia","Evaluación del sistema nervioso","Técnicas de movilización neural","Aplicación en lesiones musculoesqueléticas","Casos clínicos y práctica"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso2.jpg", nombre:"Barrel: Flexibilidad y Fuerza para Transformar tu Cuerpo", categoria:"Bienestar", ponente:"FisioTeck", precio:"$550 MXN", inicio:"16 de Marzo", modalidad:"Online · Cupo limitado", temario:["Introducción al método Barrel","Principios de flexibilidad y fuerza","Rutinas progresivas con barrel","Corrección postural y alineación","Planificación de sesiones"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso3.jpg", nombre:"Principios de Neuroplasticidad a la Terapia Física", categoria:"Neurológica", ponente:"Lic. Elizabeth Pozos Alvarado", precio:"$550 MXN", inicio:"16 de Marzo", modalidad:"Online · Cupo limitado", temario:["Bases de la neuroplasticidad","Mecanismos de aprendizaje motor","Aplicación clínica en terapia física","Estrategias de rehabilitación neurológica","Evaluación y seguimiento"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso4.jpg", nombre:"Yoga para la Flexibilidad y Fuerza Corporal", categoria:"Bienestar", ponente:"FisioTeck", precio:"$550 MXN", inicio:"16 de Marzo", modalidad:"Online · Cupo limitado", temario:["Fundamentos del yoga terapéutico","Posturas para flexibilidad","Secuencias de fortalecimiento","Respiración y control corporal","Adaptaciones para rehabilitación"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso5.jpg", nombre:"Terapia Manual Ortopédica Funcional", categoria:"Ortopédica", ponente:"Lic. Erika Laura Morales", precio:"$550 MXN", inicio:"16 de Marzo", modalidad:"Online / Grabados · Cupo limitado", temario:["Evaluación ortopédica funcional","Técnicas de terapia manual","Movilización articular","Tejidos blandos y miofascial","Aplicación clínica por regiones"], incluye:["Certificado de reconocimiento","Acceso online","Clases grabadas"] },
    { img:"assets/img/cursos/curso6.jpg", nombre:"Anatomía Funcional y Biomecánica Aplicada en el Deporte", categoria:"Deportiva", ponente:"Lic. Elizabeth Mercado Reyes", precio:"$550 MXN", inicio:"16 de Marzo", modalidad:"Online · Cupo limitado", temario:["Anatomía del aparato locomotor","Principios biomecánicos","Análisis del movimiento deportivo","Lesiones deportivas frecuentes","Prevención y readaptación"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso7.jpg", nombre:"Ejercicio Terapéutico en Embarazo y Postparto", categoria:"Embarazo", ponente:"LTF. Elisabet Mercado Reyes", precio:"$550 MXN", inicio:"16 de Marzo", modalidad:"Online · Cupo limitado", temario:["Cambios fisiológicos en el embarazo","Ejercicio seguro por trimestre","Suelo pélvico y core","Recuperación postparto","Contraindicaciones y precauciones"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso8.jpg", nombre:"Rehabilitación con Tecnología y Sensores", categoria:"Neurológica", ponente:"LFT. Ricardo Eleazar Garcia Sanchez", precio:"$550 MXN", inicio:"23 de Marzo", modalidad:"Online · Cupo limitado", temario:["Tecnología aplicada a la rehabilitación","Sensores y dispositivos wearables","Realidad virtual en fisioterapia","Evaluación con herramientas digitales","Casos clínicos con tecnología"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso9.jpg", nombre:"Ejercicio Terapéutico Funcional en Rehabilitación", categoria:"Ortopédica", ponente:"Lic. Mauricio Chávez Ramírez", precio:"$550 MXN", inicio:"23 de Marzo", modalidad:"Online · Cupo limitado", temario:["Principios del ejercicio terapéutico","Evaluación funcional del paciente","Programación de ejercicios","Progresión y carga terapéutica","Aplicación en diferentes patologías"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso10.jpg", nombre:"Rehabilitación Postoperatoria de Prótesis en Cadera y Rodilla", categoria:"Ortopédica", ponente:"Lic. Erika Romero Luna", precio:"$550 MXN", inicio:"23 de Marzo", modalidad:"Online · Cupo limitado", temario:["Biomecánica de cadera y rodilla","Protocolo postoperatorio temprano","Fases de rehabilitación","Ejercicios de fortalecimiento progresivo","Retorno a la funcionalidad"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso11.jpg", nombre:"Entrenamiento Hipopresivo", categoria:"Bienestar", ponente:"Lic. Wendy Pérez Saenz", precio:"$550 MXN", inicio:"23 de Marzo", modalidad:"Online · Cupo limitado", temario:["Fundamentos del método hipopresivo","Anatomía del suelo pélvico","Técnica respiratoria y apnea","Posturas y progresiones","Indicaciones y contraindicaciones"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso12.jpg", nombre:"Hipoterapia y la Rehabilitación Infantil", categoria:"Infantil", ponente:"LFT. Efraín Darío Moreno Rodríguez", precio:"$550 MXN", inicio:"23 de Marzo", modalidad:"Online · Cupo limitado", temario:["Fundamentos de hipoterapia","Beneficios en rehabilitación infantil","Patologías que responden al tratamiento","Técnicas y posicionamiento en el caballo","Seguridad y protocolos de sesión"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso13.jpg", nombre:"Rehabilitación Cardiopulmonar Tratamiento Fisioterapéutico", categoria:"Cardiopulmonar", ponente:"LFT. Ricardo Eleazar Garcia Sanchez", precio:"$550 MXN", inicio:"23 de Marzo", modalidad:"Online · Cupo limitado", temario:["Anatomía y fisiología cardiopulmonar","Patologías cardíacas y respiratorias","Evaluación del paciente cardiopulmonar","Técnicas de fisioterapia respiratoria","Programa de rehabilitación cardiaca"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso14.jpg", nombre:"Biomecánica Aplicada al Gesto Deportivo", categoria:"Deportiva", ponente:"Lic. Domingo Sánchez Arellano", precio:"$550 MXN", inicio:"23 de Marzo", modalidad:"Online · Cupo limitado", temario:["Fundamentos de biomecánica deportiva","Análisis cinemático del movimiento","Fuerzas y palancas en el deporte","Optimización del gesto técnico","Prevención de lesiones deportivas"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] },
    { img:"assets/img/cursos/curso15.jpg", nombre:"Intervención Temprana en Niños con Síndrome de Down", categoria:"Infantil", ponente:"Lic. Lilia Marina Duque", precio:"$550 MXN", inicio:"23 de Marzo", modalidad:"Online · Cupo limitado", temario:["Características del Síndrome de Down","Desarrollo motor en la primera infancia","Estrategias de intervención temprana","Estimulación sensoriomotriz","Trabajo con familia y cuidadores"], incluye:["Certificado de reconocimiento","Acceso online","Material de apoyo"] }
  ],
  galeria: [
    "assets/img/galeria/foto1.jpg","assets/img/galeria/foto2.jpg","assets/img/galeria/foto3.jpg",
    "assets/img/galeria/foto4.jpg","assets/img/galeria/foto5.jpg","assets/img/galeria/foto6.jpg",
    "assets/img/galeria/foto7.jpg","assets/img/galeria/foto8.jpg"
  ],
  opiniones: [
    { avatar:"assets/img/testimonios/avatar-01.webp", nombre:"Ale Muro", fecha:"4 sep 2025", comentario:"Información actualizada, de buena calidad y siempre atentos a las dudas que puedan surgir. ¡Respuestas al instante!", color:"#32D6B5" },
    { avatar:"assets/img/testimonios/avatar-02.webp", nombre:"Ineraj Hernandez", fecha:"4 sep 2025", comentario:"Información muy interesante, actualizada y de calidad, además de un servicio excelente.", color:"#5DB7E8" },
    { avatar:"assets/img/testimonios/avatar-03.webp", nombre:"Chapo Rangel", fecha:"4 sep 2025", comentario:"Excelentes cursos, nos ayudan a seguir preparándonos y mantenernos actualizados.", color:"#78D9F4" },
    { avatar:"assets/img/testimonios/avatar-04.webp", nombre:"Luna Mary Sol", fecha:"4 sep 2025", comentario:"Es una página de aportes importantes que nos ayuda a complementar conocimientos; además, los cursos que brinda son 100% recomendables.", color:"#9B8AFB" },
    { avatar:"assets/img/testimonios/avatar-05.webp", nombre:"Jhosh Iah-hel", fecha:"4 sep 2025", comentario:"Conozco mucho de la página y es una oportunidad para aprender y conocer más; una nueva forma de prepararse.", color:"#58D2D4" },
    { avatar:"assets/img/testimonios/avatar-06.webp", nombre:"Azul Messina", fecha:"15 sep 2025", comentario:"Muy buenas certificaciones.", color:"#B19AF7" },
    { avatar:"assets/img/testimonios/avatar-07.webp", nombre:"Clau Cobos", fecha:"12 dic 2025", comentario:"Excelente página y cursos muy buenos y accesibles. 100% recomendable.", color:"#2EB7C6" },
    { avatar:"assets/img/testimonios/avatar-08.webp", nombre:"Laura Nazaretty Mariaca", fecha:"12 dic 2025", comentario:"Me gustan sus clases: son entendibles y me ayudan a comprender mejor los diferentes temas anatómicos.", color:"#82D4C8" }
  ],
  contacto: [
    { icon:"assets/img/brands/whatsapp.svg", color:"#25D366", titulo:"WhatsApp", descripcion:"+52 1 238 147 8840 · Atención directa", btnTexto:"Escribir ahora", url:"https://wa.me/5212381478840?text=Hola,%20me%20interesa%20información%20sobre%20sus%20cursos" },
    { icon:"assets/img/brands/facebook.svg", color:"#1877F2", titulo:"Facebook", descripcion:"FisioTec · Novedades y publicaciones", btnTexto:"Ver página", url:"https://www.facebook.com/profile.php?id=61578034067438" },
    { icon:"assets/img/brands/instagram.svg", color:"#E1306C", titulo:"Instagram", descripcion:"@fisioteccc · Comunidad FisioTeck", btnTexto:"Ver perfil", url:"https://www.instagram.com/fisioteccc/" },
    { icon:"assets/img/brands/gmail.svg", color:"#EA4335", titulo:"Correo", descripcion:"fisiotecmexico@gmail.com", btnTexto:"Enviar correo", url:"mailto:fisiotecmexico@gmail.com" }
  ],
  redes: [
    { icon:"assets/img/brands/facebook.svg", url:"https://www.facebook.com/profile.php?id=61578034067438", title:"Facebook" },
    { icon:"assets/img/brands/instagram.svg", url:"https://www.instagram.com/fisioteccc/", title:"Instagram" },
    { icon:"assets/img/brands/whatsapp.svg", url:"https://wa.me/5212381478840", title:"WhatsApp" }
  ],
  footerContacto: [
    { icon:"assets/img/brands/whatsapp.svg", texto:"+52 1 238 147 8840", url:"https://wa.me/5212381478840" },
    { icon:"assets/img/brands/gmail.svg", texto:"fisiotecmexico@gmail.com", url:"mailto:fisiotecmexico@gmail.com" },
    { icon:"assets/img/brands/facebook.svg", texto:"FisioTec en Facebook", url:"https://www.facebook.com/profile.php?id=61578034067438" }
  ]
};
