# FORMA Nail Studio

Portfolio web ficticio para un salón de uñas editorial con estética contemporánea y composición experimental.

## Requisitos

- Node.js 18+
- npm

## Ejecutar en Codespaces o localmente

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Abre la URL que indique Vite, normalmente http://localhost:5173.

## Editar datos del proyecto

Toda la información principal vive en:

- `src/data/siteData.ts`

Ahí puedes cambiar:

- nombre, navegación y textos de la marca
- servicios, precios y duración
- enlaces de reserva y mensajes
- fotos de la galería y del estudio
- preguntas frecuentes

## Sustituir imágenes

Las imágenes de la portada, galería y estudio se están sirviendo desde Unsplash para la demo. Para usar tus propias imágenes:

1. Guarda los archivos en `src/assets` o en una carpeta pública.
2. Sustituye las URLs de `src/data/siteData.ts` por rutas locales o URLs nuevas.
3. Mantén dimensiones razonables y usa `loading="lazy"` en fotos fuera de la portada.

## Compilar para producción

```bash
npm run build
```

La versión compilada se generará en la carpeta `dist`.

## Recursos y procedencia

- Las fotos usadas en la demo proceden de Unsplash.
- El contenido es ficticio y no representa una marca real ni una reseña/cliente real.

## Nota

La demo deja la reserva desactivada por defecto porque no se incluye ningún número real ni backend. Para activar una reserva de ejemplo, edita la referencia `reservationLink` en `src/data/siteData.ts` con un enlace de WhatsApp válido.
