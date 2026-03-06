
# API Calculadora

Esta aplicación expone una API para realizar operaciones básicas y guardar el historial de operaciones realizadas

## Docker

Para ejecutar la API desde un contenedor es necesario tener instalado [Docker](https://www.docker.com/products/docker-desktop/)

### 1. Construir la imagen de Docker

Ejecutar el siguiente comando:
`docker build -t practica-docker .`

### 2. Crear el archivo de entorno

Cree un archivo `env.docker` con el siguiente contenido:
`NODE_ENV=production`
`PORT=3000`

### 3. Ejecutar la imagen

Luego ejecutar el siguiente comando para ejecutar la imagen
`docker run --name practica-docker --env-file .env.docker -p 3000:3000 practica-docker`

### 4. Verificar si la imagen esta en ejecución

Use el comando `docker ps`, si el contenedor se esta ejecutando podra ver el nombre dado al contenedor en `docker built -t` en la lista de contenedores

## Probar el Endpoint

**En Postman**
Puede ingresar la siguiente operación para probar si la API esta funcionando:

Metodo: POST
`http://localhost:3000/calculadora/operar`

En el apartado Body, selecciona Raw e ingrese el siguiente JSON:
`{
  "operacion": "multiplicar",
  "a": 5,
  "b": 5
}`

Debera recibir un código `201 CREATED` con el siguiente cuerpo:

`{
    "mensaje": "Operación guardada",
    "registro": {
        "id": 1,
        "operacion": "multiplicar",
        "a": 5,
        "b": 5,
        "resultado": 25
    }
}`
