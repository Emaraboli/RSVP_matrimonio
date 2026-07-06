# RSVP — María Jesús & Enrique

Este paquete trae todo lo necesario para tu formulario de confirmación de asistencia:

- `index.html` → el sitio completo (diseño, countdown, mapa, galería y formulario)
- `apps-script.gs` → el backend que guarda las respuestas en Google Sheets y te avisa por correo
- `README.md` → estas instrucciones

## Paso 1 — Configurar el backend (Google Apps Script)

1. Ve a [sheets.google.com](https://sheets.google.com) y crea una hoja de cálculo nueva.
2. En el menú: **Extensiones > Apps Script**.
3. Borra el código de ejemplo y pega todo el contenido de `apps-script.gs`.
4. Busca la línea `const CORREO_DESTINO = "correo-de-los-novios@ejemplo.com";` y cámbiala por el correo donde quieres recibir cada confirmación.
5. Haz clic en **Implementar > Nueva implementación**.
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo (tu cuenta)**
   - Quién tiene acceso: **Cualquier usuario**
6. Autoriza los permisos (Google te pedirá confirmar que confías en tu propio script).
7. Copia la **URL de la aplicación web** que te entrega al final.

## Paso 2 — Conectar el formulario con el backend

1. Abre `index.html` con cualquier editor de texto.
2. Busca esta línea (cerca del final, dentro de `<script>`):
   ```js
   const APPS_SCRIPT_URL = "PEGA_AQUI_LA_URL_DE_TU_GOOGLE_APPS_SCRIPT";
   ```
3. Reemplázala por la URL que copiaste en el paso anterior.

## Paso 3 — Reemplazar fotos reales

En `index.html`, busca la sección `id="galeria"`. Cada bloque `<div class="gal-item">Foto 1</div>` se puede reemplazar por:
```html
<div class="gal-item" style="background-image:url('URL_DE_TU_FOTO'); background-size:cover; background-position:center;"></div>
```
Puedes subir tus fotos a un servicio como Imgur, Google Drive (con acceso público) o el mismo hosting donde publiques el sitio.

## Paso 4 — Publicar el sitio (elige una opción, ambas son gratis)

**Opción A — Netlify (más simple, arrastrar y soltar)**
1. Ve a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta completa (o solo `index.html`) a la página.
3. Netlify te entrega una URL pública al instante (puedes personalizar el subdominio en la configuración del sitio).

**Opción B — GitHub Pages**
1. Crea un repositorio nuevo en GitHub y sube `index.html`.
2. Ve a **Settings > Pages**, selecciona la rama principal como fuente.
3. GitHub te entrega una URL tipo `tuusuario.github.io/nombre-repo`.

## Paso 5 — Generar los 3 links para tus invitados

El mismo sitio publicado sirve para los 3 tipos de invitado, solo cambia lo que va después de `?tipo=`:

| Tipo de invitado                     | Link a enviar                                  |
|---------------------------------------|-------------------------------------------------|
| Invitado con opción de +1             | `https://tu-sitio.com/?tipo=pareja`             |
| Invitado solo (sin +1)                | `https://tu-sitio.com/?tipo=solo`               |
| Invitado solo a la fiesta             | `https://tu-sitio.com/?tipo=fiesta`             |

(Si no se agrega `?tipo=`, el formulario asume por defecto que es tipo "pareja". Recomendamos siempre incluirlo explícitamente en el link que envíes por WhatsApp.)

## Cómo revisar las respuestas

Todas las confirmaciones quedan guardadas automáticamente en la hoja llamada **"Confirmaciones"** dentro de la misma Google Sheet donde instalaste el script — no necesitas hacer nada extra, se crea sola con la primera respuesta. Además, te llegará un correo por cada confirmación al instante.

## Notas

- El countdown y la fecha límite (15 de noviembre de 2026) están fijados en el código en hora de Chile (`-03:00`). Si necesitas cambiar fechas, búscalas al inicio del `<script>` en `index.html`.
- El diseño es 100% responsive (se ve bien en celular, que es como la mayoría de tus invitados lo abrirá desde WhatsApp).
- Si quieres agregar más fotos, ajustar textos o cambiar colores, todo está comentado dentro de `index.html` para que sea fácil de editar.
