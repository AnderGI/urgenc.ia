# WIP (Work In Progress)
# urgenc.ia
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/AnderGI/urgenc.ia/blob/main/docs/README.en.md)
[![es](https://img.shields.io/badge/lang-es-red.svg)](https://github.com/AnderGI/urgenc.ia/blob/main/README.md)

**Sistema basado en eventos que monitoriza, clasifica y detecta patrones de reseñas de productos negativos con el fin de proporcionar de información relevante a los vendedores interesados.**

## Índice
- [Consideraciones y aspectos a tener en cuenta](#consideracioes-y-aspectos-a-tener-en-cuenta)
- [Tecnologías usadas](#tecnologías-usadas)
- [Quehaceres](#quehaceres)
- [Gestión de Contenedores, Automatización y Despliegue](#Gestión-de-contenedores,-automatización-y-despliegue)

## Consideracioes y aspectos a tener en cuenta

>[!NOTE]
> Se ha usado el repositorio [multilanguage-readme-pattern](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/STEPS.md) para tener un estándar en la creación de distintos ficheros de README.md para distintos idiomas.

>[!IMPORTANT]
> El repositorio se encuentra en su version v0.0.0. Cualquier cambio puede suponer un BREAKING CHANGE por lo que no se garantiza la estabilidad del mismo hasta la version v1.0.0. Por motivos electronicos (fallo en la BIOS del portátil del creador, vamos yo mismo :) ) el proyecto queda pausado hasta próximo aviso. A día 14/12/2025 los últimos cambios realizados están relacionados con la documentación de la API siguiendo el estandar OpenAPI. De tal manera que, mediante este único fichero se podrán generar tests, sdk (librerías que funcionen como clientes en distintos lenguajes) de manera automática y estandarizada, entre otras posibles integraciones. Además, el estadar OpenAPI y su descripor OAD ofrecen una guía y un estandar, valga la redundancia, que cualquier humano puede entender.

>[!IMPORTANT]
> Este proyecto no pretende reflejar las capacidades del desarrollo de un MVP. Bajo ningún concepto se debería de desarrollar un MVP de esta manera. Un MVP existe y debe existir como prueba de concepto para validar un producto en el mercado de la manera más rapida posible. Esto choca frontalmente con la idea fundamental que subyace en el proyecto: la implementación de toda una batería de elementos que hacen que las aplicaciones además de funcionar escalen, sean mantenibles, testables y perduren en el tiempo. Existen muchas capas de indireccion. Algunas de ellas, incluso las podría considerar sobreingeniería para el punto en el que se encuentra la aplicación. Aún así, ese es el principal objetivo por mis preferencias técnicas: desarrollar una aplicación compleja de la forma mas escalable, mantenible, reproducible y testable posible.



## Tecnologías usadas

- Lenguajes
  - TypeScript (v5.8.3)
  - Librerias destacadas: langchain/community (v0.3.50), langchain/core (v0.3.68), langchain/ollama (0.2.3), node-dependency-injection (v2.7.3), amqplib (v0.10.8), pg (v8.16.3), typeorm (v0.3.25)
- DevOps y automatizaciones:
  - Docker
  - docker compose
  - Bash scripting
- Bases de datos y persistencia:
  - PostgreSQL (v13)
  - Librerias internas de postgress: pgvector (v0.8.0), pgnet **necesidad de una versión mayor controlada**
- Sistema de colas y comunicación de eventos:
  - RabbitMQ (v4.1)
- Uso y hospedaje de modelos de inteligencia artificial:
  - Ollama (v.0.11.4)

> [!NOTE]
> Para tener mayor control sobre las publicaciones de versiones de las distintas librerías y con el fin de evitar incompatibilidades en el sistema por actualizaciones de la versión mayor, es necesario tener todas las librerías con un versionado, controlando sobre todo la parte mayor, específicas. Para más información ver la [especificación del versionado semántico](https://semver.org/lang/es/).

## Quehaceres

>[!NOTE]
>Quehaceres para la implementacion de la primera versión estable v1.0.0

- [ ] Documentar la API pública usando la especificación [OpenAPI](https://spec.openapis.org/oas/latest.html)
- [ ] Implementar base de tests unitarios y de integracion antes de añadir nuevos casos de uso
- [ ] Automatizar setup con bash y docker
- [ ] Implementar flujos de CI/CD con el fin de mantener una correctitud de la aplicación

## Gestión de Contenedores, Automatización y Despliegue
Lo primero de todo, será traernos el proyecto desde el repositorio remoto de GitHub a nuestro repositorio local. Para ello, usaremos el comando ```git clone``` en cualquiera de sus posibles vías: HTTPS, SSH o GitHub CLI.

Es un proyecto basado en contenedores de Docker por lo que toda la configuracion relacionada con nombres de servicios, usuarios, contraseñas para por el fichero que esta en la raíz del proyecto ```./docker-compose.yaml```. Dentro veremos cuatro servicios distintos conectados bajo la misma network de app-network: app, db, events y ai.

**app**: 

Contenedor que contiene la aplicación. Es tiene el puerto 5000 expuesto y mapeado con el puerto interno de docker. Por lo que los demás contenedores se comunicarán a través del puerto interno 5000 y cualquier cliente podrá comunicarse con docker a través del puerto externo 5000 (por ejemplo, para hacer peticiones mediante clientes como Postman). Este contenedor solo arrancará si los demás servicios están desplegados correctamente (ver clave ```depends_on```). Para la contrucción de este contenedor, se hace uso de un [Dockerfile](https://github.com/AnderGI/urgenc.ia/blob/main/Dockerfile) que se encuentra en la misma raíz del proyecto. 

Esta imagen hace uso de dos técnicas de desarrollo clave para optimizar la construcción de imágenes Docker: por un lado, el aprovechamiento de la caché de Docker, y por otro, el uso del patrón ```Multi-Stage Build```.

En el primer ```FROM```, correspondiente a la imagen builder, la caché de Docker se optimiza copiando inicialmente únicamente los archivos de dependencias (package.json y pnpm-lock.yaml) e instalándolas antes de copiar el resto del código fuente. De esta forma, Docker puede reutilizar la capa de instalación de dependencias siempre que estos archivos no cambien. Posteriormente, se copia la aplicación completa y se genera el código compilado, dejando finalmente solo las dependencias de producción. Esto optimiza el tiempo de construcción de la imagen, ya que evita ejecutar repetidamente las instrucciones de instalación de dependencias y únicamente vuelve a ejecutar la fase de build cuando se producen cambios en el código fuente.

Por otro lado, el patrón ```Multi-Stage Build``` permite reducir significativamente el tamaño de la imagen final. En la primera etapa se incluyen tanto las dependencias de desarrollo como el código fuente necesario para la compilación. A continuación, en la imagen final, únicamente se copian los artefactos necesarios para la ejecución en producción: el código JavaScript ya compilado en el directorio ./dist y las dependencias de producción.

**db**:
Este servicio define un contenedor basado en la imagen oficial postgres:13, que ha sido extendida mediante la construcción de una imagen personalizada, cuyo proceso se detalla en el correspondiente [Dockerfile](https://github.com/AnderGI/urgenc.ia/blob/main/demo/postgress/Dockerfile)

La finalidad de esta imagen personalizada es incorporar extensiones adicionales al motor de base de datos PostgreSQL. En concreto, se incluyen las extensiones ```pgvector```, que proporciona soporte para el almacenamiento y la gestión de embeddings como campos nativos en la base de datos, y ```pg_net```, que permite la realización de llamadas HTTP directamente desde el propio sistema gestor de bases de datos.

**ai**:
Este servicio se contruye mediante una imagen de ```ollama/ollama:0.11.4``` como servidor que permite alojar y ejecutar modelos de inteligencia artificial en local. Esta imagen, extiende las funcionalidades de la imagen base e incorpora nuevos elementos definidos el los ficheros ejecutables que hay en [./urgenc.ia/etc/ollama](https://github.com/AnderGI/urgenc.ia/tree/main/etc/ollama). 

El script ```ollama-entrypoint.sh``` se ejecutara como entrypoint de la imagen. Es decir, sera el comando que se ejecute al inicio de la creacion del contendor. En el se definira con un sistema de reintentos la instalacion de los siguientes modelos de LLM que se usarán en la aplicación ```qwen3:8b nomic-embed-text:v1.5```. 

El script ollama-healthcheck.sh define un executable que se ejecutara para comprobar, como criterio de healthcheck que todos los modelos, están listos para su uso.

**events**:
Este servicio extiende y no añade funcionalidad extra a la imagen de rabbitmq:4.1-management. Esta servira como servicio de comunicacion de eventos para los distintos modulos que componenen la aplicacion.

## Puesta en marcha

Para poner en marcha y arrancar la aplicacion con todo configurado y los servicios listos tan solo basta con ejecutar el comando [setup.sh](https://github.com/AnderGI/urgenc.ia/blob/main/etc/docker/setup.sh) que se encuentra en ```./urgenc.ia/etc/docker/setup.sh```. Este ejecutara ```docker compose up -d``` que configura todos los contenedores y servicios en modo detached, ejecutado el proceso en segundo plano. Despues se segura de que tengan un healtcheck. Pofr ultimo ejecuta el obtenedor urgencia-app-1 donde se configura las colas y consumidores de rabbitmq de manera automatica y se abre un proceso para la publicacion, escucha y consumicion de eventos
