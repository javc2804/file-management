# File Management

Breve descripción del proyecto.

Una API Rest para una web de subida y gestión de archivos.
Entre los servicios que se tendrán que realizar están:

- Login
- Registro (Con la contraseña encriptada)
- Olvide contraseña con envío de email.
- Subida de archivos (AWS S3)
- Bajada de archivos (AWS S3)
- Gestor de archivos donde puedes: cambiar nombre y obtener enlace de
  archivo. (AWS S3)
- Integrar un buscador de imagenes online usando una API externa
  (Unsplash por ejemplo)
- Subir una imagen proveniente de una API externa directo a S3 (Es
  decir, sin que el usuario tenga que bajar la imagen en su local y luego
  subirla manualmente).

## Requisitos previos

- Node.js 18
- npm 10.2.4
- MongoDB

## Instalación

1. Clona el repositorio: `git clone git@github.com:javc2804/file-management.git`
2. Navega al directorio del proyecto: `cd file-management`

3. Instala las dependencias: `npm install`

## Configuración

El proyecto utiliza dos archivos de configuración:

- `.env` para entorno de producción
- `.env.local` para entorno local

Asegúrate de configurar correctamente estos archivos antes de ejecutar el proyecto. Estos archivos los enviare de forma privada por correo.

## Ejecución

Para ejecutar el proyecto, sigue estos pasos:

1. Inicia el servidor de desarrollo: `npm run dev`
2. Abre tu navegador y visita `http://localhost:4000`

## Documentación

El proyecto cuenta con un Swagger para documentar la API. Puedes acceder al documento en la ruta `/api-docs`.

Proporciono también documentación en postman, herramienta la cual tengo dominio y por la cual fue usado para el desarrolo de la api.

## Docker

Si prefieres ejecutar el proyecto en un contenedor Docker, sigue estos pasos:

1. Construye la imagen de Docker: `docker build -t my-app .`
2. Ejecuta el contenedor: `docker run -p 4000:4000 my-app`

## Enlaces

- [Sitio en producción](https://file-management-v67d.onrender.com/)

Este sitio esta configurado con CI/CD para cualquier cambio inmediato por medio de una rama al hacer push automaticamente se refleja el cambio.

## Prueba Unitarias

Para ejecutar las pruebas unitarias, utiliza el siguiente comando: `npm jest`

Hay una prueba muy sencilla y muy corta, la cual es pasada, y pide un puerto para el envio de correo el cual no es necesario probar.

## Importante!

Las imagenes que se descargan lo hacen en un directorio de nombre images en la raiz del proyecto. Importante configurar la variable de entorno de forma local.
