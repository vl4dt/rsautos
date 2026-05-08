# Guia de Gestion del Sitio Web RS Autos HN

Esta guia explica como funciona el sitio web de RS Autos HN y como administrarlo con confianza. Esta escrita para el dueno del negocio, gerente o miembro del equipo responsable de mantener actualizado el sitio y el inventario de vehiculos.

## 1. Que Hace Este Sistema

El sitio web de RS Autos HN es una plataforma publica de ventas y confianza para vehiculos importados en Honduras.

Su objetivo principal es ayudar a los clientes a:

- Ver vehiculos disponibles.
- Entender la condicion de cada vehiculo.
- Contactar rapidamente a RS Autos HN por WhatsApp.
- Confiar en el negocio porque la informacion esta organizada, clara y presentada de forma profesional.

El sistema tiene tres partes principales:

- **Sitio web**: La pagina publica que visitan los clientes.
- **Sanity**: El sistema de administracion donde el equipo gestiona vehiculos y contenido.
- **Vercel**: El servicio que publica y mantiene el sitio web en internet.

Piense en el sistema asi:

```text
Sanity = donde se edita la informacion de los vehiculos
Sitio web = lo que ven los clientes
Vercel = lo que mantiene el sitio publicado en internet
```

## 2. Enlaces Importantes

Sitio local de desarrollo:

```text
http://localhost:3000
```

Sanity Studio local:

```text
http://localhost:3000/studio
```

Sitio en produccion:

```text
https://rsautos.vercel.app
```

Sanity Studio en produccion:

```text
https://rsautos.vercel.app/studio
```

El Studio de produccion es donde normalmente el equipo del negocio iniciara sesion para administrar contenido.

## 3. Roles Principales

### Dueno o Gerente del Negocio

Responsable de:

- Revisar los anuncios de vehiculos antes de publicarlos.
- Asegurarse de que precios y detalles sean correctos.
- Decidir que vehiculos deben estar visibles al publico.
- Revisar la experiencia del cliente y los mensajes de WhatsApp.

### Encargado de Contenido o Asistente de Ventas

Responsable de:

- Agregar informacion de vehiculos en Sanity.
- Subir fotos de vehiculos.
- Actualizar el estado de importacion.
- Corregir errores de texto o informacion faltante.
- Ocultar vehiculos vendidos.

### Desarrollador o Soporte Tecnico

Responsable de:

- Cambiar el diseno o funciones del sitio.
- Corregir errores tecnicos.
- Actualizar integraciones.
- Administrar configuracion de despliegue en Vercel.
- Ajustar los esquemas de Sanity si se necesitan nuevos campos.

## 4. Como Funciona el Sitio Web

Los clientes visitan el sitio y pueden ver paginas como:

- **Pagina de inicio**: Presenta RS Autos HN y la promesa de transparencia.
- **Pagina de inventario**: Muestra vehiculos disponibles con filtros.
- **Paginas de detalle de vehiculo**: Muestran transparencia, inspeccion, documentos y reportes publicos por vehiculo.
- **Sanity Studio**: Area privada de administracion para el equipo del negocio.

La pagina de inventario obtiene los datos desde Sanity. Cuando un vehiculo se agrega y se publica en Sanity, puede aparecer en el sitio web.

El contenido de marca tambien viene del documento `Site Settings` en Sanity:

- Imagenes hero para inicio y sobre nosotros.
- Contenido del CTA de inicio, incluyendo titulo, texto, etiqueta del boton y enlace del boton.
- Enlaces sociales de Facebook, Instagram, YouTube y TikTok. Si Sanity no tiene enlaces, el sitio puede usar `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_YOUTUBE_URL` y `NEXT_PUBLIC_TIKTOK_URL`.
- Testimonios con cita, nombre, ciudad, vehiculo/contexto y calificacion. Los ejemplos de respaldo se muestran solo cuando no hay testimonios en CMS.
- Una imagen Open Graph de marca se genera automaticamente para vistas previas al compartir enlaces.

## 5. Como Funciona Sanity

Sanity es el sistema backend. Es donde se guarda la informacion de los vehiculos.

En Sanity, cada vehiculo es un documento llamado:

```text
Car Listing
```

Cada Car Listing contiene detalles como:

- Titulo publico.
- Marca.
- Modelo.
- Ano.
- VIN.
- Precio publico.
- Millaje.
- Estado de importacion.
- Transmision.
- Traccion.
- Tipo de combustible.
- Condicion de subasta.
- Condicion actual en Honduras.
- Imagenes.
- Notas de inspeccion.
- Registros de reparacion.

Sanity no es el sitio publico. Es el panel privado que alimenta el sitio web.

## 6. Como Iniciar Sesion en Sanity Studio

Abra:

```text
https://rsautos.vercel.app/studio
```

Luego inicie sesion con la cuenta de Sanity que tenga permiso para administrar el proyecto.

Si Sanity le pide registrar el Studio otra vez, revise:

- Que el dominio `https://rsautos.vercel.app` este agregado en la configuracion CORS de Sanity.
- Que **Allow credentials** este activado para ese dominio.
- Que Vercel tenga las variables correctas del proyecto de Sanity.
- Que la ultima version del codigo haya sido desplegada en Vercel.

## 7. Gestion de Vehiculos

### Crear un Vehiculo Nuevo

En Sanity Studio:

1. Abra **Car Listing**.
2. Haga clic en **Create new**.
3. Complete la informacion del vehiculo.
4. Suba las imagenes.
5. Revise cuidadosamente toda la informacion.
6. Active **Show on public website** solo cuando el anuncio este listo.
7. Publique el documento.

El vehiculo deberia quedar disponible para aparecer en el sitio web.

### Informacion Minima Requerida

Como minimo, cada vehiculo publico debe tener:

- Titulo.
- Marca.
- Modelo.
- Ano.
- Precio publico.
- Millaje.
- Estado de importacion.
- Fecha de publicacion.
- Slug.
- Al menos una buena foto.

El **slug** es la direccion amigable del vehiculo en el sitio web. Ejemplo:

```text
toyota-rav4-2021
```

Use slugs cortos y claros, con letras minusculas y guiones.

### Formato Recomendado para el Titulo

Use un formato claro:

```text
2021 Toyota RAV4 XLE
```

Buenos ejemplos:

```text
2020 Honda CR-V EX
2022 Toyota Corolla LE
2019 Ford Ranger XLT
```

Evite titulos vagos como:

```text
Nice SUV
Carro rojo
Oferta especial
```

## 8. Estado de Importacion del Vehiculo

Cada vehiculo tiene un estado de importacion. Esto ayuda al cliente a entender en que etapa esta la unidad.

Estados disponibles:

```text
auctionWon
inTransit
customsClearance
atWorkshop
readyForSale
```

Significado:

| Estado | Significado |
|---|---|
| auctionWon | El vehiculo fue comprado en subasta en USA. |
| inTransit | El vehiculo esta en camino a Honduras. |
| customsClearance | El vehiculo esta en tramite de aduana. |
| atWorkshop | El vehiculo esta en inspeccion o reparacion. |
| readyForSale | El vehiculo esta listo para venta. |

Use el estado de forma honesta. Esto es parte de la promesa de transparencia.

## 9. Informacion Publica vs Informacion Interna

Algunos datos son publicos. Otros son solo internos.

### Informacion Publica

Puede mostrarse al cliente:

- Marca.
- Modelo.
- Ano.
- Precio publico.
- Millaje.
- VIN, si el negocio decide mostrarlo.
- Fotos del vehiculo.
- Resumen de condicion.
- Estado de importacion.
- Detalles de inspeccion.
- Registros de reparacion.

### Informacion Interna

No debe mostrarse al cliente:

- Precio de compra en subasta USA.
- Desglose interno de costos.
- Margen de ganancia.
- Estrategia interna de costos de reparacion.
- Notas privadas de negociacion.

El sistema esta disenado para que campos como estos no se incluyan en consultas publicas de inventario:

```text
usaAuctionPrice
priceBreakdown
```

Aun asi, solo gerentes de confianza deben editar campos sensibles internos.

## 10. Guia para Imagenes

Las imagenes son muy importantes para generar confianza.

Use:

- Fotos exteriores claras.
- Fotos interiores claras.
- Foto del tablero.
- Foto del millaje.
- Foto del VIN, si aplica.
- Fotos de danos de subasta, si existen.
- Fotos del proceso de reparacion.
- Fotos del estado final.

Evite:

- Imagenes borrosas.
- Fotos oscuras donde no se vean detalles importantes.
- Imagenes recortadas que oculten partes relevantes.
- Fotos demasiado editadas.
- Usar solo fotos bonitas sin mostrar condicion real.

Orden recomendado de imagenes:

1. Mejor foto exterior actual.
2. Angulo frontal.
3. Angulo trasero.
4. Interior.
5. Tablero y millaje.
6. Motor.
7. Fotos de subasta o danos.
8. Fotos del proceso de reparacion.

## 11. Concepto de Transparency Toggle

La funcion principal planeada es el **Transparency Toggle**.

Esto permitira que el cliente cambie entre:

- **USA Auction / As-Is**: Como estaba el vehiculo cuando se compro.
- **Current Local State**: Como esta ahora despues de inspeccion o reparacion.

El objetivo es demostrar que RS Autos HN no oculta el historial del vehiculo.

Para preparar esta funcion, mantenga ambos tipos de informacion en Sanity:

- Fotos y notas de condicion de subasta.
- Fotos y notas de condicion actual.
- Registros de reparacion.
- Lista de inspeccion.

## 12. Flujo de Clientes por WhatsApp

WhatsApp es el canal principal de ventas.

El sitio crea enlaces de WhatsApp con mensajes prellenados. Cuando un cliente hace clic en WhatsApp dentro de un vehiculo, el mensaje puede incluir:

- Titulo del vehiculo.
- VIN, si esta disponible.
- Estado del vehiculo.
- Enlace del sitio.

Ejemplo de mensaje:

```text
Hola RS Autos HN, quiero mas informacion sobre 2021 Toyota RAV4 VIN XXXXX. Estado actual: Listo para venta. Enlace: https://rsautos.vercel.app/inventory/toyota-rav4-2021
```

El numero de telefono viene de la configuracion del sitio, no de texto escrito directamente en una pagina.

Variable actual del telefono:

```text
NEXT_PUBLIC_CONTACT_PHONE
```

Si cambia el numero de WhatsApp, actualicelo en las variables de entorno de Vercel y vuelva a desplegar el sitio.

## 13. Que Es Vercel

Vercel hospeda el sitio web en internet.

Cuando el codigo se sube al repositorio conectado en GitHub, Vercel puede construir y publicar automaticamente la nueva version.

Vercel controla:

- Despliegue del sitio en produccion.
- Variables de entorno del sitio.
- Registros de construccion.
- Configuracion de dominio.
- Despliegues de prueba.

El equipo del negocio normalmente no necesita editar Vercel, excepto cuando se cambia configuracion del negocio como:

- URL del sitio.
- ID del proyecto de Sanity.
- Numero de WhatsApp.
- Nombre del negocio.
- Ubicacion del negocio.

## 14. Variables Importantes en Vercel

Estas variables deben existir en Vercel:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-01
NEXT_PUBLIC_SITE_URL=https://rsautos.vercel.app
NEXT_PUBLIC_BUSINESS_NAME=RS Autos HN
NEXT_PUBLIC_PRIMARY_MARKET=Honduras
NEXT_PUBLIC_CONTACT_PHONE=50489057397
NEXT_PUBLIC_BUSINESS_LOCATION=Santa Rosa de Copan, Copan
```

Si estas variables estan incorrectas, el sitio puede:

- No conectarse a Sanity.
- Mostrar inventario vacio.
- Enviar mensajes de WhatsApp al numero incorrecto.
- Usar el enlace incorrecto en mensajes.
- Mostrar informacion incorrecta del negocio.

Despues de cambiar variables de entorno en Vercel, vuelva a desplegar el sitio.

## 15. Configuracion CORS de Sanity

Para que el Studio de produccion funcione, Sanity debe confiar en el dominio del sitio.

En Sanity Manage:

1. Abra el proyecto de Sanity.
2. Vaya a **Settings**.
3. Vaya a **API**.
4. Busque **CORS Origins**.
5. Agregue:

```text
https://rsautos.vercel.app
```

6. Active:

```text
Allow credentials
```

Esto es necesario porque el Studio debe hacer solicitudes autenticadas a Sanity.

No agregue `/studio` en CORS. Use solamente el origen:

```text
Correcto:   https://rsautos.vercel.app
Incorrecto: https://rsautos.vercel.app/studio
```

## 16. Flujo de Publicacion

Use esta lista para cada vehiculo.

### Antes de Publicar

- Confirmar que el titulo sea correcto.
- Confirmar marca, modelo, ano y VIN.
- Confirmar millaje.
- Confirmar precio publico.
- Confirmar estado de importacion.
- Subir imagenes claras.
- Agregar condicion de subasta, si esta disponible.
- Agregar condicion actual, si esta disponible.
- Agregar detalles de inspeccion.
- Verificar que datos internos sensibles no esten escritos en campos publicos.

### Publicar

1. Active **Show on public website**.
2. Haga clic en **Publish**.
3. Abra la pagina de inventario del sitio.
4. Confirme que el vehiculo aparece.
5. Pruebe el boton de WhatsApp.

### Cuando un Vehiculo Se Vende

Opciones recomendadas:

- Desactivar **Show on public website** para quitarlo del inventario activo.
- O mas adelante agregar un estado **Vendido** si el sitio se actualiza para soportarlo.

Por ahora, lo mas limpio es ocultar o despublicar vehiculos vendidos.

## 17. Solucion de Problemas

### El Vehiculo No Aparece en el Sitio

Revise:

- Esta publicado en Sanity?
- Esta activado **Show on public website**?
- Tiene slug?
- Esta usando el tipo de documento `Car Listing`?
- El sitio esta conectado al dataset correcto de Sanity?
- Ya se actualizo la cache del sitio?

El sitio usa una ventana de actualizacion de una hora para paginas con datos de Sanity. Algunos cambios pueden no verse inmediatamente en produccion.

### Studio Sigue Pidiendo Registro

Revise:

- Sanity CORS incluye `https://rsautos.vercel.app`.
- **Allow credentials** esta activado.
- Vercel tiene el `NEXT_PUBLIC_SANITY_PROJECT_ID` correcto.
- Usted inicio sesion con la cuenta correcta de Sanity.
- El proyecto fue redeplegado despues de cambiar variables de entorno.

### El Inventario Esta Vacio

Revise:

- Sanity tiene documentos `Car Listing` publicados.
- Los documentos tienen **Show on public website** activado.
- El sitio esta conectado al dataset `production`.
- Los filtros no estan ocultando todos los vehiculos.

### El Boton de WhatsApp Abre Mensaje o Numero Incorrecto

Revise en Vercel:

```text
NEXT_PUBLIC_CONTACT_PHONE
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_BUSINESS_NAME
```

Luego vuelva a desplegar.

### El Sitio Muestra Informacion Vieja

Posibles razones:

- El sitio de produccion tiene cache.
- El documento de Sanity fue guardado pero no publicado.
- Vercel no fue redeplegado despues de cambiar variables de entorno.
- El navegador necesita una recarga completa.

## 18. Rutina Diaria o Semanal

Lista semanal recomendada:

- Revisar todos los vehiculos publicos.
- Quitar vehiculos vendidos o no disponibles.
- Confirmar que precios esten actualizados.
- Confirmar que estados de importacion esten actualizados.
- Probar que botones de WhatsApp funcionen.
- Agregar nuevas fotos cuando un vehiculo pase de subasta a taller o listo para venta.
- Revisar preguntas frecuentes de clientes y mejorar descripciones si se repiten mucho.

Lista diaria recomendada cuando hay ventas activas:

- Revisar nuevos contactos de WhatsApp.
- Actualizar cambios de estado.
- Publicar nuevas unidades.
- Ocultar vehiculos vendidos.
- Revisar la pagina publica de inventario desde celular.

## 19. Estándares de Contenido

Escriba de forma clara y honesta.

Buen contenido:

```text
Unidad importada desde subasta en USA. Golpe frontal reparado. Motor y transmision verificados. Lista para inspeccion del cliente.
```

Contenido debil:

```text
Super nitida, full extras, aproveche.
```

La promesa de la marca es transparencia, por eso las descripciones deben responder preguntas del cliente antes de que las haga.

Tono recomendado:

- Profesional.
- Directo.
- Honesto.
- Servicial.
- Seguro, sin exagerar.

## 20. Reglas de Seguridad

Solo usuarios de confianza deben tener acceso a Sanity.

Reglas recomendadas:

- No compartir credenciales de Sanity.
- Usar cuentas individuales para cada miembro del equipo.
- Quitar acceso cuando alguien deja el negocio.
- No publicar costos internos en campos publicos.
- No guardar contrasenas ni datos privados de clientes dentro de anuncios de vehiculos.
- No dar acceso a Vercel a usuarios no tecnicos, a menos que sea necesario.

## 21. A Quien Contactar Segun el Problema

| Problema | Contacto |
|---|---|
| Corregir informacion de un vehiculo | Encargado de contenido o asistente de ventas |
| Vehiculo no aparece | Encargado de contenido primero, desarrollador si continua |
| Sitio caido | Desarrollador o soporte tecnico |
| Problema de inicio de sesion en Studio | Administrador de Sanity o desarrollador |
| Numero de WhatsApp incorrecto | Desarrollador o administrador de Vercel |
| Nueva funcion para el sitio | Desarrollador |
| Agregar nuevos campos de vehiculo | Desarrollador |

## 22. Glosario

### Sanity

Sistema privado de administracion donde el equipo edita vehiculos y contenido.

### Studio

Interfaz de edicion de Sanity. Es la pagina en `/studio`.

### Vercel

Servicio que publica el sitio web en internet.

### Dataset

Base de datos de Sanity donde se guarda el contenido. El dataset principal en vivo normalmente es:

```text
production
```

### Documento

Elemento de contenido dentro de Sanity. Un anuncio de vehiculo es un documento.

### Slug

Nombre amigable para la URL de una pagina.

Ejemplo:

```text
toyota-rav4-2021
```

### Publicar

Hacer que un documento de Sanity quede disponible para que el sitio lo use.

### CORS

Configuracion de seguridad que permite que el dominio del sitio se comunique con Sanity.

### Variable de Entorno

Configuracion usada por el sitio, como el ID del proyecto de Sanity o el numero de WhatsApp.

## 23. Referencia Rapida

### Agregar un Vehiculo

```text
Studio -> Car Listing -> Create new -> Completar campos -> Subir fotos -> Activar publicacion -> Publish
```

### Ocultar un Vehiculo

```text
Studio -> Car Listing -> Abrir vehiculo -> Desactivar visibilidad publica -> Publish
```

### Corregir Problema de Registro en Studio

```text
Sanity Manage -> Settings -> API -> CORS Origins -> Agregar https://rsautos.vercel.app -> Allow credentials
```

### Cambiar Numero de WhatsApp

```text
Vercel -> Project Settings -> Environment Variables -> NEXT_PUBLIC_CONTACT_PHONE -> Redeploy
```

### Cambiar Ubicacion del Negocio

```text
Vercel -> Project Settings -> Environment Variables -> NEXT_PUBLIC_BUSINESS_LOCATION -> Redeploy
```

## 24. Estado Actual del Sitio

Plataforma actual completada:

- El sitio web base esta construido.
- Sanity Studio esta integrado en `/studio`.
- El esquema de vehiculos existe en el codigo de Sanity.
- La pagina de inventario y los filtros existen.
- Las paginas de detalle de vehiculo existen con Transparency Toggle.
- Existen checklist de inspeccion, registros de reparacion, tarjetas de documentos y reportes PDF publicos.
- Existen las paginas Importamos tu auto y Contacto con entrega por WhatsApp.
- La pagina Sobre nosotros explica proceso, confianza e informacion publica vs interna.
- La integracion de decodificador VIN existe en Studio y en rutas API.
- La API de estimacion de importacion para Honduras existe como guia comercial.
- Existen sitemap, robots, analitica basica y revalidacion por webhook.
- Las consultas publicas evitan campos internos de precio.

## 25. Nuevas Paginas y Formularios

### Site Settings

En Sanity Studio existe un documento llamado `Site Settings`. Use este documento para cambiar imagenes decorativas sin pedir cambios de codigo:

- Imagen hero de la pagina de inicio.
- Imagen de fondo del CTA en la pagina de inicio.
- Imagen hero de Sobre nosotros.

Si un espacio esta vacio, el sitio usa la imagen incluida por defecto en `public/images/rs-autos`.

### Importamos tu auto

Esta pagina recoge una solicitud guiada para cotizar importacion. El visitante elige preferencia de vehiculo, presupuesto, combustible, uso principal, tiempo esperado, nombre y ciudad. El formulario no guarda el lead en la base de datos del sitio. Abre WhatsApp con un mensaje estructurado y etiqueta de origen.

### Contacto

Esta pagina separa motivos de contacto:

- Inventario disponible.
- Importar un vehiculo.
- Documentos o reportes.

Cada boton abre WhatsApp con una etiqueta de origen para que el equipo de ventas entienda el contexto.

### Sobre nosotros

Esta pagina explica el proceso de transparencia de RS Autos HN, modulos de confianza, testimonios y que puede verificar un comprador.

## 26. Detalle de Vehiculo y Reportes

Cada pagina publica de detalle puede mostrar:

- Condicion de origen de subasta.
- Condicion actual local.
- Especificaciones publicas.
- Checklist de inspeccion.
- Registro de reparaciones.
- Tarjetas de documentos publicos.
- Reporte tecnico PDF para comprador.

El reporte PDF solo incluye datos publicos para compradores. Nunca debe incluir costos de adquisicion, desgloses operativos ni margenes.

## 27. Prefill VIN en Studio

Al editar un `Car Listing`, el campo `VIN` incluye un boton:

```text
Decodificar VIN y llenar ficha
```

Uselo despues de ingresar un VIN. Consulta NHTSA y puede llenar especificaciones publicas como:

- Titulo.
- Marca.
- Modelo.
- Ano.
- Combustible.
- Traccion.
- Transmision.

Siempre revise los campos generados antes de publicar. La informacion de NHTSA ayuda, pero el equipo del negocio sigue siendo responsable de la exactitud final.

## 28. Rutina QA

Antes de publicar cambios importantes o despues de editar muchos vehiculos, soporte tecnico debe ejecutar:

```text
npm run typecheck
npm run lint
npm run build
npm run qa:privacy
npm run qa:images
npm run qa:smoke
```

Use `VISUAL_QA_CHECKLIST.md` para revision visual en escritorio y movil.
