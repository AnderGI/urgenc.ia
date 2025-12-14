# WIP (Work In Progress)
# urgenc.ia
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/AnderGI/urgenc.ia/blob/main/docs/README.en.md)
[![es](https://img.shields.io/badge/lang-es-red.svg)](https://github.com/AnderGI/urgenc.ia/blob/main/README.md)

**Sistema basado en eventos que monitoriza, clasifica y detecta patrones de reseñas de productos negativos con el fin de proporcionar de información relevante a los vendedores interesados.**

## Índice
- [Consideraciones y aspectos a tener en cuenta](#consideraciones-y-aspectos-a-tener-en-cuenta)
- [Tecnologías usadas](#tecnologías-usadas)
- [Quehaceres](#quehaceres)
- [Gestión de Contenedores, Automatización y Despliegue](#gestión-de-contenedores-automatización-y-despliegue)
- [Puesta en marcha](#puesta-en-marcha)

## Consideraciones y aspectos a tener en cuenta

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
La aplicación se apoya en las tecnologías proporcionadas por ```Docker``` y la terminal de ```Bash``` para realizar diversas tareas relacionadas con la infraestructura y la automatización, entre las que destacan:
- Configurar y construir imágenes y contenedores personalizados mediante ```Dockerfile``` y ```docker compose```.
- Gestionar el ciclo de vida de imágenes, contenedores y volúmenes, incluyendo su creación, ejecución y eliminación permanente.
- Supervisar el estado de los contenedores, garantizando su correcto funcionamiento y disponibilidad.
- Automatizar el despliegue completo de la aplicación, reduciendo la intervención manual y aumentando la reproducibilidad.
- Configurar y administrar colas, consumidores y productores en ```RabbitMQ```, asegurando la correcta comunicación entre servicios.
- Gestionar y habilitar extensiones de ```PostgreSQL``` necesarias para el funcionamiento de la aplicación.
- Controlar y administrar los modelos de inteligencia artificial disponibles dentro del entorno de ejecución.

El punto de entrada de la aplicación es el fichero [docker-compose.yaml](https://github.com/AnderGI/urgenc.ia/blob/main/docker-compose.yaml), que define cuatro servicios distintos:

**app**
Este contenedor aloja la aplicación principal y expone el puerto **5000**, que se mapea con el puerto interno de Docker. Esto permite que:

* Los demás contenedores se comuniquen a través del puerto interno **5000**.
* Los clientes externos puedan interactuar con la aplicación mediante el puerto externo **5000** (por ejemplo, usando Postman).

El contenedor de la aplicación solo se iniciará una vez que los demás servicios se encuentren desplegados correctamente, gracias a la clave `depends_on`.

Para construir este contenedor se utiliza un [Dockerfile](https://github.com/AnderGI/urgenc.ia/blob/main/Dockerfile) ubicado en la raíz del proyecto. La imagen hace uso de dos técnicas para optimizar la mima:

1. **Aprovechamiento de la caché de Docker:**
   Se copian inicialmente solo los archivos de dependencias (`package.json` y `pnpm-lock.yaml`) y se instalan antes de copiar el resto del código fuente. Esto permite reutilizar la capa de instalación de dependencias cuando no hay cambios en estos archivos, evitando ejecuciones innecesarias. Posteriormente, se copia toda la aplicación y transpila, dejando finalmente únicamente las dependencias de producción.

2. **Multi-Stage Build:**
   Esta técnica permite reducir el tamaño final de la imagen. En la primera etapa se incluyen tanto las dependencias de desarrollo como el código fuente necesario para la transpilación. En la imagen final solo se copian los artefactos necesarios para la ejecución en producción: el código JavaScript transpilado en el directorio `./dist` y las dependencias de producción.

 **db**
Este servicio define un contenedor basado en la imagen oficial `postgres:13`, extendida mediante una imagen personalizada, cuyo proceso de construcción se detalla en el [Dockerfile](https://github.com/AnderGI/urgenc.ia/blob/main/demo/postgress/Dockerfile).

El objetivo de esta imagen personalizada es incorporar extensiones adicionales a PostgreSQL:

* **`pgvector`**: proporciona soporte para almacenar y gestionar *embeddings* como campos nativos en la base de datos.
* **`pg_net`**: permite realizar llamadas HTTP directamente desde el propio motor de base de datos.

**ai**
Este servicio se construye a partir de la imagen `ollama/ollama:0.11.4` y funciona como servidor para alojar y ejecutar modelos de inteligencia artificial localmente. La imagen extiende la base e incorpora elementos adicionales definidos en los ficheros ejecutables ubicados en [./urgenc.ia/etc/ollama](https://github.com/AnderGI/urgenc.ia/tree/main/etc/ollama).

El script **`ollama-entrypoint.sh`** se ejecuta como entrypoint de la imagen, definiendo un sistema de reintentos para la instalación de los modelos LLM utilizados en la aplicación:

* `qwen3:8b`
* `nomic-embed-text:v1.5`

El script **`ollama-healthcheck.sh`** sirve como **healthcheck**, comprobando que todos los modelos están listos para su uso antes de que el contenedor se considere operativo.

**events**
Este servicio se basa en la imagen `rabbitmq:4.1-management` y se utiliza como sistema de comunicación de eventos para los distintos módulos de la aplicación. No incorpora funcionalidades adicionales sobre la imagen base, pero provee la gestión de colas y la interfaz de administración de RabbitMQ.


Perfecto, puedo ayudarte a **mejorar y clarificar** tanto la explicación como el bloque de script. Te propongo algo más legible, con mejor redacción y formato para un README:  

---

## Puesta en marcha

Para poner en marcha la aplicación con todos los servicios configurados, basta con ejecutar el script [setup.sh](https://github.com/AnderGI/urgenc.ia/blob/main/etc/docker/setup.sh), ubicado en `./urgenc.ia/etc/docker/setup.sh`.  

Este script realiza los siguientes pasos automáticamente:  

1. **Arranque de contenedores**  
   Ejecuta `docker compose up -d`, levantando todos los contenedores en **modo detached** (en segundo plano).  

2. **Verificación del estado de los servicios**  
   Comprueba que cada contenedor tenga un **healthcheck** definido y que esté en estado `healthy`. Si no tiene healthcheck, muestra su estado `running` para informar al usuario.  

3. **Configuración de RabbitMQ**  
   Ejecuta comandos dentro del contenedor `urgencia-app-1` para:  
   - Configurar colas y consumidores en RabbitMQ  
   - Iniciar procesos de publicación, escucha y consumo de eventos

##
