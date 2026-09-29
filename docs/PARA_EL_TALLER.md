# Lo que necesitamos del taller

Para dejar la web lista hacen falta datos reales. Todo lo que hoy dice "Ejemplo" o
"Foto pendiente" se reemplaza con esto. Lo que no esté, no se inventa: la sección
se saca.

## Mensaje para mandarle por WhatsApp

> Hola! Para terminar la web del taller necesito algunas cosas. Mandame lo que
> tengas, no hace falta todo junto:
>
> 1. Fotos de trabajos terminados. Si tenés el antes y el después del mismo auto,
>    mejor. Entre 6 y 12.
> 2. Tres o cuatro reseñas de clientes contentos (captura de Google o de un
>    mensaje), y si te dan permiso para ponerlas con su nombre de pila.
> 3. Más o menos cuántos autos arreglaron y hace cuántos años están.
> 4. Las aseguradoras con las que más trabajás y si las puedo nombrar.
> 5. El logo en buena calidad (el archivo original, no una captura).
> 6. Hasta qué barrios llegan con el retiro a domicilio.
> 7. Si das garantía del trabajo, cuánto tiempo y qué cubre.
> 8. El link de tu perfil de Google (el que aparece en Maps).

## Cómo sacar las fotos

- **Horizontales**, con el auto entero o la zona reparada centrada.
- **Antes y después desde el mismo ángulo y la misma distancia.** Es lo que más
  convence.
- **Con luz de día** o en la cabina con buena luz. Sin flash contra la pintura.
- **Sin patentes a la vista**, ni caras de clientes. Si aparecen, se tapan.
- Mandarlas como **archivo o en calidad original**, no como foto comprimida de
  WhatsApp, si se puede.
- Una o dos del **taller y la cabina de pintura** también suman: muestran que hay
  un lugar serio detrás.

## Reseñas

- Tienen que ser **reales y con permiso** de quien la escribió. Con nombre de pila
  y el modelo del auto alcanza ("Martín, Fiat Cronos").
- Las mejores cuentan **qué se arregló y cómo fue el trato**. Idealmente: una de un
  trabajo por seguro, una de retiro a domicilio y una de chapa y pintura.
- **Pedirle reseñas en Google a cada cliente** que se va contento es lo que más
  ayuda a aparecer en Google Maps. El link para pedirlas sale del perfil de Google
  del taller: "Pedir reseñas" o "Compartir perfil".

## Números

Mejor redondear para abajo que para arriba. "+300 autos" que se sostiene vale más
que "+1000" que nadie cree. Si no hay un número confiable, esa tarjeta se saca.

## Aseguradoras

Solo las que él confirme y autorice a nombrar. Con los nombres alcanza; los logos
son marcas de terceros y conviene no usarlos sin permiso de cada compañía.

## Dónde va cada cosa (para quien edita la web)

Todo en `src/data/site.ts`:

| Dato | Dónde | Después |
|---|---|---|
| Fotos | archivos en `src/assets/trabajos/`, nombres en `gallery` | con `alt` describiendo la foto |
| Reseñas | `reviews`, con `placeholder: false` | |
| Link de Google | `googleReviewsHref` | aparece "Ver todas en Google" |
| Números | `stats`, con `placeholder: false` | |
| Aseguradoras | `insurers` | |
| Zonas | `areas` | |
| Garantía | agregar a la tira del hero (`Hero.astro`) | |
| Logo | `Logo.astro` y `scripts/og.mjs` | correr `npm run og` |

Cuando no quede ningún placeholder, o para salir con lo que haya:
`SHOW_PLACEHOLDERS = false` en `src/config/flags.ts`.
