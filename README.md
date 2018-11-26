# Kevsquare

Proyecto para practicar el framework [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.


## Descripción
Kevsquare es un directorio comercial para tu ciudad.

Permite agregar nuevo negocios, desplegarlos en el mapa de Google y ofrecer opciones de publicidad para los negocios que están en el directorio.


### Objetivos principal

- Permitir la venta y correcto despliegue de publicidad en la aplicación.


### Características

- Registro y acceso mediante email y contraseña (autenticación de Firebase).
- Hay un grupo definido de administradores que podrá dar de alta negocios con un plan pagado.
- El plan pagado debe de contar con una fecha de inicio y fecha de expiración, y los beneficios deben aplicar solo dentro de esa ventana de tiempo.
- El orden en que se despliegan los negocios patrocinados en su propia sección debe ser random.
- En la lista regular de lugares, 3 de los resultados pagados deben aparecer siempre al principio de la lista de lugares, estos 3 deben ser también random. El resto, tomará un lugar convencional en la lista, junto con aquellos lugares no pagados.
- Todos los lugares deben contar con una categoría (ej. Restaurantes, Hoteles, Tiendas de Ropa, etc.). Esto, para que, en la vista de detalle de un lugar que no es pagado, se muestren anuncios pagados de la misma categoría; deben ser mostrados en una sección nueva de esta vista de detalle.
- Cada visita a un lugar pagado, debe generar un record en un nuevo nodo de la base de datos de firebase llamado analytics. Este record debe guardar el id del negocio, la fecha y hora en que se generó la vista.
- Además el conteo total de visitas hasta ese momento para cada negocio, debe ser un atributo de cada lugar pagado (en el nodo de lugares).


## Correr el proyecto

Correr el comando `npm install` para instalar todas las dependencias de Node.js y después `ng serve` para levantar el servidor de desarrollo. Navegar a `http://localhost:4200/`.


## Configuración

El proyecto necesita una base de datos en Firebase y una clave para usar Geocode de Google.

