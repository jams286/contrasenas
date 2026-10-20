# contrasenas (casa)

Generador de contraseñas para la familia (tablet vía el hub `infra/home` y celular).

## Qué hace

- Tres modos: **Aleatoria** (8–64 caracteres; mayúsculas, minúsculas, números, símbolos; opción de evitar caracteres parecidos como 0/O y 1/l/I), **Frase** (3–8 palabras en español, separador, mayúscula inicial, número opcional) y **PIN** (4–12 dígitos).
- Muestra la fuerza estimada (bits de entropía) con una barra y una etiqueta.
- Botones "Copiar" y "Otra".

## Cómo está hecho

Sitio estático, sin frameworks ni paso de build:

- `index.html`, `styles.css`, `app.js` (IIFE), `palabras.js` (lista de palabras sin tildes ni ñ, para que se puedan escribir en cualquier teclado; se quitan duplicados al cargar y la entropía se calcula con el tamaño real de la lista).
- Aleatoriedad con `crypto.getRandomValues` y muestreo por rechazo (sin sesgo de módulo). Sí está disponible por http.
- Copiar: `navigator.clipboard` solo existe en HTTPS, así que por http se usa el respaldo con `<textarea>` + `document.execCommand("copy")`.
- Solo se guardan las **opciones** en `localStorage` (clave `contrasenas.v1`); las contraseñas nunca se guardan.
- Rutas relativas para que funcione bajo `/contrasenas/`.

## Dónde se publica

- URL: http://192.168.1.4/contrasenas/
- Carpeta: `/var/www/contrasenas/` (de jams, sin sudo). Comando de publicación en el README.
