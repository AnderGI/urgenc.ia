# WIP (Work In Progress)
# urgenc.ia
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/AnderGI/urgenc.ia/blob/main/docs/README.en.md)
[![es](https://img.shields.io/badge/lang-es-red.svg)](https://github.com/AnderGI/urgenc.ia/blob/main/README.md)

**Event-based system that monitors, classifies, and detects patterns of negative product reviews in order to provide relevant information to interested sellers.**

## Índice
- [Considerations and aspects to take into account](#considerations-and-aspects-to-take-into-account)
- [Technologies used](#technologies-used)
- [Tasks](#tasks)
- [Container Management, Automation, and Deployment](#container-management-automation-and-deployment)
- [Start-up](#start-up)

## Considerations and aspects to take into account

>[!NOTE]
> The [multilanguage-readme-pattern](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/STEPS.md) repository has been used to establish a standard for creating different README.md files for different languages.

>[!IMPORTANT]
> The repository is currently in version v0.0.0. Any changes may constitute a BREAKING CHANGE, so stability is not guaranteed until version v1.0.0. For technical reasons (a BIOS failure on the creator's laptop, i.e., mine :) ), the project is on hold until further notice. As of 12/14/2025, the latest changes made are related to the API documentation following the OpenAPI standard. This means that, using this single file, tests and SDKs (libraries that function as clients in different languages) can be generated automatically and in a standardized manner, among other possible integrations. In addition, the OpenAPI standard and its OAD description offer a guide and a standard, forgive the redundancy, that any human can understand.

>[!IMPORTANT]
> This project does not aim to reflect the capabilities of MVP development. Under no circumstances should an MVP be developed in this way. An MVP exists and should exist as proof of concept to validate a product in the market as quickly as possible. This clashes head-on with the fundamental idea underlying the project: the implementation of a whole battery of elements that make applications not only functional but also scalable, maintainable, testable, and long-lasting. There are many layers of indirection. Some of them could even be considered over-engineering for the stage the application is at. Even so, that is the main objective for my technical preferences: to develop a complex application in the most scalable, maintainable, reproducible, and testable way possible.



## Technologies used

- Languages
  - TypeScript (v5.8.3)
  - Notable libraries: langchain/community (v0.3.50), langchain/core (v0.3.68), langchain/ollama (0.2.3), node-dependency-injection (v2.7.3), amqplib (v0.10.8), pg (v8.16.3), typeorm (v0.3.25)
- DevOps and automation:
  - Docker
  - docker compose
  - Bash scripting
- Databases and persistence:
  - PostgreSQL (v13)
  - Internal Postgress libraries: pgvector (v0.8.0), pgnet **need for a major controlled version**
- Queuing and event communication system:
  - RabbitMQ (v4.1)
- Use and hosting of artificial intelligence models:
  - Ollama (v.0.11.4)

> [!NOTE]
> To have greater control over the release of different libraries and to avoid incompatibilities in the system due to major version updates, it is necessary to have all libraries with specific versioning, especially controlling the major part. For more information, see the [semantic versioning specification](https://semver.org/lang/es/).

## Tasks

>[!NOTE]
>Tasks for the implementation of the first stable version v1.0.0

- [ ] Document the public API using the [OpenAPI](https://spec.openapis.org/oas/latest.html) specification
- [ ] Implement unit and integration test base before adding new use cases
- [ ] Automate setup with bash and docker
- [ ] Implement CI/CD flows in order to maintain application correctness

## Container Management, Automation, and Deployment
The application relies on technologies provided by Docker and the Bash terminal to perform various tasks related to infrastructure and automation, including:
- Configuring and building custom images and containers using Dockerfile and docker compose.
- Managing the lifecycle of images, containers, and volumes, including their creation, execution, and permanent deletion.
- Monitoring the status of containers, ensuring their proper functioning and availability.
- Automating the complete deployment of the application, reducing manual intervention and increasing reproducibility.
- Configuring and managing queues, consumers, and producers in RabbitMQ, ensuring proper communication between services.
- Managing and enabling PostgreSQL extensions necessary for the application to function.
- Controlling and managing the artificial intelligence models available within the execution environment.

The entry point for the application is the [docker-compose.yaml](https://github.com/AnderGI/urgenc.ia/blob/main/docker-compose.yaml) file, which defines four different services:

**app**
--
This container hosts the main application and exposes port **5000**, which is mapped to Docker's internal port. This allows:

* Other containers to communicate through internal port **5000**.
* External clients to interact with the application through the external port **5000** (for example, using Postman).

The application container will only start once the other services are deployed correctly, thanks to the `depends_on` key.

To build this container, a [Dockerfile](https://github.com/AnderGI/urgenc.ia/blob/main/Dockerfile) located at the root of the project is used. The image uses two techniques to optimize itself:

1. **Leveraging the Docker cache:**
   Initially, only the dependency files (`package.json` and `pnpm-lock.yaml`) are copied and installed before copying the rest of the source code. This allows the dependency installation layer to be reused when there are no changes to these files, avoiding unnecessary executions. Subsequently, the entire application is copied and transpiled, leaving only the production dependencies.

2. **Multi-Stage Build:**
   This technique allows you to reduce the final image size. The first stage includes both the development dependencies and the source code needed for transpilation. Only the artifacts needed for production execution are copied to the final image: the transpiled JavaScript code in the `./dist` directory and the production dependencies.

 **db**
 --
This service defines a container based on the official `postgres:13` image, extended by a custom image, whose build process is detailed in the [Dockerfile](https://github.com/AnderGI/urgenc.ia/blob/main/demo/postgress/Dockerfile).

The purpose of this custom image is to incorporate additional extensions to PostgreSQL:

* **`pgvector`**: provides support for storing and managing *embeddings* as native fields in the database.
* **`pg_net`**: allows HTTP calls to be made directly from the database engine itself.

**ai**
--
This service is built from the `ollama/ollama:0.11.4` image and functions as a server to host and run artificial intelligence models locally. The image extends the base and incorporates additional elements defined in the executable files located in [./urgenc.ai/etc/ollama](https://github.com/AnderGI/urgenc.ia/tree/main/etc/ollama).

The **`ollama-entrypoint.sh`** script runs as the image's entrypoint, defining a retry system for installing the LLM models used in the application:

* `qwen3:8b`
* `nomic-embed-text:v1.5`

The **`ollama-healthcheck.sh`** script serves as a **healthcheck**, verifying that all models are ready for use before the container is considered operational.

**events**
--
This service is based on the `rabbitmq:4.1-management` image and is used as an event communication system for the different modules of the application. It does not incorporate additional functionalities on top of the base image, but provides queue management and the RabbitMQ administration interface.

## Start-up

To start the application with all services configured, simply run the [setup.sh](https://github.com/AnderGI/urgenc.ia/blob/main/etc/docker/setup.sh) script, located in `./urgenc.ai/etc/docker/setup.sh`.  

This script automatically performs the following steps:

1. **Container startup**
   Runs `docker compose up -d`, launching all containers in **detached mode** (in the background).  

2. **Verify service status**  
   Checks that each container has a defined **healthcheck** and is in a `healthy` state. If it does not have a healthcheck, it displays its `running` status to inform the user.  

3. **Configuring RabbitMQ**  
   Run commands inside the `urgencia-app-1` container to:  
   - Configure queues and consumers in RabbitMQ  
   - Start event publishing, listening, and consumption processes
