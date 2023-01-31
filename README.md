# Message Api

message es una aplicación multitenant para el envió de mensajes programados y personalizados actualmente con `TWILIO` como proveedor de SMS y para la persistencia de información se utiliza `MYSQL`.

## 1. Configuración del proyecto(Entorno local)

> Asegúrese de tener node js desde la version 16 en adelante, adicional se debe tener instalada una base de datos o en su defecto usar el docker-compose.yml integrado

### 1.1. Variables de entorno

Para agregar las variables de entorno primero debe copiar el fichero example.env que se encuentra en la carpeta env en la carpeta raíz y empezar a rellenar la información de las variables definidas en el archivo, para la ejecución en modo desarrollo se debe crear la copia del archivo con el nombre development.env, si desea ejecutar en modo producción debe crear la copia con el nombre production.env.

> Para las variables de entono de Twilio debe crear una cuenta previamente.

Puede utilizar el siguiente comando para crear la copia:

- Desarrollo

  ```bash
  $ cp ./env/example.env ./env/development.env
  ```

- Producción
  ```bash
    $ cp ./env/example.env ./env/production.env
  ```

### 1.2. Instalar dependencias

Para la instalación de dependencias ejecute el siguiente comando

```bash
$ yarn install
```

### 1.3. Base de datos y servidor de redis(cache)

> Para este paso debe tener instalado docker desktop

En el archivo docker-compose.yml se encuentra la configuración para una base de datos con mysql usado para persistir la información y servidor de cache de redis usado para las colas(queues) de envío de mensajes, las variables de entorno se interpolan desde los archivos .env por lo que para levantar los servicios deben estar configurados previamente.

Para levantar ambos servicios utilice el siguiente comando:

```bash
$ docker compose -f "docker-compose.yml" --env-file ./env/{NODE_ENV}.env  up -d --build
```

En donde `NODE_ENV` apuntara al .env que se desea utilizar, como ejemplo los comandos correspondientes para `production` y `development` son los siguientes:

```bash
# Production
$ docker compose -f "docker-compose.yml" --env-file ./env/production.env  up -d --build

# Development
$ docker compose -f "docker-compose.yml" --env-file ./env/development.env  up -d --build
```

Una vez los servicios estén en ejecución debe ejecutar las migraciones con el siguiente comando:

```bash
$ npm run migration:run
```

Si desea generar una nueva migración utilice el siguiente comando:

```bash
$ npm run migration:generate --name="name of migration"
```

### 1.4. Ejecutar aplicación

Para ejecutar la aplicación de manera local ejecute el alguno de los siguientes comandos:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Puede acceder a la documentación de la Api en la siguiente url:

```bash
http://localhost:3000/api
```

## 2. Test

Los siguientes comandos le permitirán ejecutar los test de la aplicación.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

[MIT licensed](LICENSE).
