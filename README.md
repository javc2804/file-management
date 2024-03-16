# Nombre del Proyecto file-management

Breve descripción del proyecto.

## Requisitos previos

- Node.js 18
- npm 10.2.4

## Instalación

1. Clona el repositorio: `git clone git@github.com:javc2804/file-management.git`
2. Navega al directorio del proyecto: `cd tu-proyecto`
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
