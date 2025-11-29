# WIP (Work In Progress)

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/AnderGI/urgenc.ia/blob/main/docs/README.en.md)
[![es](https://img.shields.io/badge/lang-es-red.svg)](https://github.com/AnderGI/urgenc.ia/blob/main/README.md)

>[!NOTE]
> [multilanguage-readme-pattern](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/STEPS.md) repository is used as a reference when creating different README.md files in different languages.

# urgenc.ia

**Event-based system that monitors, classifies and detects patterns in negative product reviews, aiming to provide interested vendors with relevant information**

## Used technologies

- Languages
  - TypeScript (v5.8.3)
  - Relevant libraries: langchain/community (v0.3.50), langchain/core (v0.3.68), langchain/ollama (0.2.3), node-dependency-injection (v2.7.3), amqplib (v0.10.8), pg (v8.16.3), typeorm (v0.3.25)
- DevOps y automations:
  - Docker
  - docker compose
  - Bash scripting
- Persistence and databases:
  - PostgreSQL (v13)
  - Librerias internas de postgress: pgvector (v0.8.0), pgnet **need to have a controlled mayor version**
- Queue-based system and event communication:
  - RabbitMQ (v4.1)
- Use and accomodation of artificial intelligence models:
  - Ollama (v.0.11.4)

> [!NOTE]
> In order to have a more control over the publication of the different library versions and avoid system-incompatibilities due to mayor version updates, an specfic mayor version controll system is needed for each library. For more information see [semantic versioning specification](https://semver.org/lang/es/).

## TODOS

- [ ] Using [OpenAPI](https://spec.openapis.org/oas/latest.html) specification document the public API
- [ ] Before new use cases are added implement unit, integration and acceptance tests
- [ ] Automate app setup with bash and docker
- [ ] Implement CI/CD workflows to maintain the correct functioning of the application
