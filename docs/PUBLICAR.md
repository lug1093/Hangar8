# Publicar el sitio definitivo

Hoy hay una vista previa en `https://lug1093.github.io/Hangar8/` (sin indexar).
Para salir en serio faltan cuatro cosas, en este orden.

## 1. Dominio

1. Entrar a **nic.ar** con Clave Fiscal (AFIP/ARCA) del dueño del taller o de quien
   vaya a ser titular.
2. Registrar el dominio, por ejemplo `hangar8.com.ar` (hay que ver si está libre).
   Se renueva una vez por año.
3. Si el dominio final no es `hangar8.com.ar`, cambiarlo en `astro.config.mjs`
   (`site`). Todo lo demás (canonical, sitemap, `robots.txt`, `llms.txt`,
   imágenes para compartir) sale de ahí.

## 2. Vercel

1. Entrar a **vercel.com** con la cuenta de GitHub (`lug1093`).
2. **Add New → Project**, elegir el repo **Hangar8** e **Import**.
3. Vercel reconoce Astro solo. No tocar nada y **Deploy**. `vercel.json` ya tiene
   la configuración.
4. En el proyecto: **Settings → Domains → Add**, escribir el dominio. Vercel
   muestra dos registros DNS (uno para `hangar8.com.ar` y otro para
   `www.hangar8.com.ar`).
5. En **nic.ar**, en el dominio, **Delegar** a los DNS de Vercel
   (`ns1.vercel-dns.com` y `ns2.vercel-dns.com`), o cargar los registros que dio
   Vercel si se usa otro proveedor de DNS.
6. Esperar a que Vercel muestre el dominio en verde (puede tardar unas horas).

Con eso, cada cambio que se sube a la rama principal se publica solo.

## 3. Google

**Google Business Profile** (lo que más pesa para aparecer en el mapa):

1. Entrar a **business.google.com** con la cuenta del taller.
2. Si ya existe la ficha, reclamarla; si no, crearla.
3. Categoría principal: **Taller de chapa y pintura**. Secundarias: **Taller
   mecánico**, **Servicio de reparación de automóviles**.
4. Nombre, dirección y teléfono **exactamente** como en la web: `Hangar 8`,
   `Santa Lucía 1746, Ituzaingó`, `11 2316-2623`.
5. Horario, zona de servicio (los barrios del retiro a domicilio), link a la web,
   fotos del taller y de trabajos.
6. Verificar la ficha (Google elige el método: video, llamada o carta).

**Search Console** (para que Google encuentre todas las páginas):

1. Entrar a **search.google.com/search-console** y agregar la propiedad de dominio.
2. Verificar con el registro TXT que da Google, cargado en Vercel
   (**Settings → Domains → DNS Records**).
3. En **Sitemaps**, enviar `sitemap-index.xml`.

## 4. Redes

- Link a la web en la bio de **Instagram** y **TikTok**.
- Actualizar el link de "ubicación" de Instagram si se quiere que lleve a la web.

## Después de publicar

- Apagar la vista previa: borrar `.github/workflows/preview.yml` o sacarle el job
  `deploy`, y desactivar Pages en **Settings → Pages**. El job `check` conviene
  dejarlo: es el que evita que un cambio rompa el sitio.
- Probar el link en WhatsApp: tiene que aparecer la imagen con el logo.
- Buscar `site:hangar8.com.ar` en Google a la semana para ver qué páginas indexó.
