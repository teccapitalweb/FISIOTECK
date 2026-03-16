# FisioTeck — Sitio Web

## Estructura
```
fisioteck_site/
├── index.html       → Estructura HTML
├── styles.css       → Estilos y colores
├── script.js        → Lógica e interacciones
├── data.js          → ⭐ INFORMACIÓN DEL SITIO (edita aquí)
└── assets/
    └── img/
        ├── logo/    → Logo
        ├── banner/  → Banner del hero
        ├── cursos/  → Imágenes de cursos (curso1.jpg ... cursoN.jpg)
        └── galeria/ → Fotos de alumnos (foto1.jpg ... fotoN.jpg)
```

## ¿Cómo editar el contenido?
Solo edita **data.js** — ahí está toda la información:
- `areas` → Áreas de formación (sección Nosotros)
- `cursos` → Imágenes y nombres de cursos
- `galeria` → Fotos de la galería
- `opiniones` → Reseñas de alumnos
- `contacto` → Tarjetas de contacto
- `redes` → Redes sociales del footer

## Agregar más cursos
1. Sube la imagen a `assets/img/cursos/curso9.jpg`
2. Agrega en `data.js`:
   ```js
   { img: "assets/img/cursos/curso9.jpg", nombre: "Nombre del curso" }
   ```

## Colores de marca
- Verde: `#1DB898`
- Azul: `#1A3E8F`
