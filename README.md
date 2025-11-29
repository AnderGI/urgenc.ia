# WIP (Work In Progress)

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/AnderGI/urgenc.ia/edit/main/docs/README.en.md)
[![es](https://img.shields.io/badge/lang-es-red.svg)](https://github.com/AnderGI/urgenc.ia/edit/main/README.md)

>[!NOTE]
> SE ha usado el repositorio [multilanguage-readme-pattern](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/STEPS.md) para tener un estándar en la creación de distintos ficheros de README.md para distintos idiomas.

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

## Quehaceres

- [ ] Documentar la API pública usando la especificación [OpenAPI](https://spec.openapis.org/oas/latest.html)
- [ ] Implementar base de tests unitarios y de integracion antes de añadir nuevos casos de uso
- [ ] Automatizar setup con bash y docker
- [ ] Implementar flujos de CI/CD con el fin de mantener una correctitud de la aplicación
