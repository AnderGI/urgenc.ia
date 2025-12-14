# WIP (Work In Progress)

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/AnderGI/urgenc.ia/blob/main/docs/README.en.md)
[![es](https://img.shields.io/badge/lang-es-red.svg)](https://github.com/AnderGI/urgenc.ia/blob/main/README.md)

>[!NOTE]
> Se ha usado el repositorio [multilanguage-readme-pattern](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/STEPS.md) para tener un estándar en la creación de distintos ficheros de README.md para distintos idiomas.

>[!IMPORTANT]
> El repositorio se encuentra en su version v0.0.0. Cualquier cambio puede suponer un BREAKING CHANGE por lo que no se garantiza la estabilidad del mismo hasta la version v1.0.0. Por motivos electronicos (fallo en la BIOS del portátil del creador, vamos yo mismo :) ) el proyecto queda pausado hasta próximo aviso. A día 14/12/2025 los últimos cambios realizados están relacionados con la documentación de la API siguiendo el estandar OpenAPI. De tal manera que, mediante este único fichero se podrán generar tests, sdk (librerías que funcionen como clientes en distintos lenguajes) de manera automática y estandarizada, entre otras posibles integraciones. Además, el estadar OpenAPI y su descripor OAD ofrecen una guía y un estandar, valga la redundancia, que cualquier humano puede entender.

>[!IMPORTANT]
> Este proyecto no pretende reflejar las capacidades del desarrollo de un MVP. Bajo ningún concepto se debería de desarrollar un MVP de esta manera. Un MVP existe y debe existir como prueba de concepto para validar un producto en el mercado de la manera más rapida posible. Esto choca frontalmente con la idea fundamental que subyace en el proyecto: la implementación de toda una batería de elementos que hacen que las aplicaciones además de funcionar escalen, sean mantenibles, testables y perduren en el tiempo. Existen muchas capas de indireccion. Algunas de ellas, incluso las podría considerar sobreingeniería para el punto en el que se encuentra la aplicación. Aún así, ese es el principal objetivo por mis preferencias técnicas: desarrollar una aplicación compleja de la forma mas escalable, mantenible, reproducible y testable posible.

# urgenc.ia

**Sistema basado en eventos que monitoriza, clasifica y detecta patrones de reseñas de productos negativos con el fin de proporcionar de información relevante a los vendedores interesados.**

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

## Quehaceres para la implementacion de la primera versión estable v1.0.0

- [ ] Documentar la API pública usando la especificación [OpenAPI](https://spec.openapis.org/oas/latest.html)
- [ ] Implementar base de tests unitarios y de integracion antes de añadir nuevos casos de uso
- [ ] Automatizar setup con bash y docker
- [ ] Implementar flujos de CI/CD con el fin de mantener una correctitud de la aplicación
