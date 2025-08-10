# urgenc.ia

**AI-powered alert system for real-time monitoring of product reviews.**  
Detects negative review surges, analyzes context using RAG (Retrieval-Augmented Generation), and automatically delivers insightful reports.

---

## 🚀 Overview

`urgenc.ia` is a backend service designed using **Domain-Driven Design**, **Event-Driven Architecture**, and a **Hexagonal Architecture** approach.

It exposes a RESTful API for managing products and reviews. The system monitors review sentiment in real time and triggers a reporting workflow when negative feedback surpasses a configured threshold.

When the percentage of negative reviews for a product exceeds a configurable threshold, `urgenc.ia`:

1. Fetches recent reviews (from the last 3, 6, 9, or 12 months).
2. Uses AI to extract semantic vectors (embeddings) from the reviews.
3. Applies RAG (Retrieval-Augmented Generation) to generate a contextual report.
4. Sends the report automatically to a configured email.

---

## 🛠️ Features

- 🔍 Real-time sentiment classification of reviews using AI.
- 📊 Custom threshold per product to trigger alerts.
- 📦 RESTful API to register products and submit reviews.
- 🧠 RAG-based report generation for root-cause analysis.
- 📧 Notifications with full summaries when a crisis is detected.

---

Perfecto 👍. Tu caso es ideal para aplicar **DDD + arquitectura hexagonal + CQRS** porque tienes entidades claras (producto, reseña, configuración), eventos de dominio (reseña añadida, umbral superado), y procesos reactivos (clasificación con IA, generación de informes).

Voy a proponerte una **estructura modular** con **bounded contexts** bien definidos y siguiendo el esquema que ya vienes trabajando.

---

## 🌐 Estructura de Módulos (Bounded Contexts)

### 1. **Productos**

- 📌 **Responsabilidad**: Gestionar la entidad `Product` y su ciclo de vida.
- 📂 Carpeta: `contexts/products`
- **Dominios / Entidades**:
  - `Product`
  - `ProductId`
  - `ProductName`

- **Casos de uso**:
  - Registrar producto
  - Consultar productos

- **Eventos de dominio**:
  - `ProductCreated`

---

### 2. **Reviews**

- 📌 **Responsabilidad**: Capturar y almacenar reseñas. No decide si son negativas o positivas, solo las guarda.
- 📂 Carpeta: `contexts/reviews`
- **Entidades**:
  - `Review` (con `ReviewId`, `ProductId`, `ReviewContent`)

- **Eventos de dominio**:
  - `ReviewAdded`

- **Casos de uso**:
  - Añadir reseña
  - Consultar reseñas de un producto

- **Nota**: Aquí se publica un evento para que el módulo de **Sentiment Analysis** lo procese.

---

### 3. **Sentiment Analysis (Clasificación IA)**

- 📌 **Responsabilidad**: Escuchar el evento `ReviewAdded`, clasificar la reseña como positiva/negativa y comunicarlo al módulo de **ReviewStats**.
- 📂 Carpeta: `contexts/sentiment`
- **Entidades / Objetos de dominio**:
  - `Sentiment` (valor object: positivo | negativo)

- **Servicios de dominio**:
  - `ReviewClassifier` (usa IA, puerto hacia infraestructura)

- **Eventos de dominio**:
  - `ReviewClassified` (contiene ID reseña y si fue positiva o negativa)

---

### 4. **ReviewStats (Configuración y Contador por Producto)**

- 📌 **Responsabilidad**: Mantener la proyección de reseñas totales y negativas por producto. Controla si se alcanza el umbral.
- 📂 Carpeta: `contexts/review-stats`
- **Agregados**:
  - `ProductReviewsConfig` (ya lo tienes ✅)

- **Casos de uso**:
  - Actualizar métricas al recibir `ReviewClassified`

- **Eventos de dominio**:
  - `NegativeReviewThresholdReached` (cuando se supera el límite)

---

### 5. **CrisisReports**

- 📌 **Responsabilidad**: Generar informes automáticos cuando un producto entra en "modo crisis".
- 📂 Carpeta: `contexts/crisis-reports`
- **Agregados**:
  - `CrisisReport`

- **Servicios de dominio**:
  - `ReportGenerator` (usa IA/RAG)

- **Eventos de dominio**:
  - `CrisisReportGenerated`

- **Casos de uso**:
  - Generar informe con reseñas recientes (ejecutado tras `NegativeReviewThresholdReached`)

---

### 6. **Shared**

- 📌 **Responsabilidad**: Reutilizables entre contextos.
- 📂 Carpeta: `contexts/shared`
- **Contenido**:
  - `AggregateRoot`
  - `DomainEvent`
  - `Entity`, `ValueObject`
  - Utilidades comunes (fecha, UUID, etc.)
  - Bus de eventos (interfaz hexagonal)

---

## ⚙️ Flujo de Eventos

1. **User → Reviews**
   Se crea una reseña → `ReviewAdded`.
2. **Sentiment Analysis**
   Escucha → clasifica → emite `ReviewClassified`.
3. **ReviewStats**
   Actualiza proyección.
   - Si umbral alcanzado → `NegativeReviewThresholdReached`.

4. **CrisisReports**
   Escucha → genera informe → emite `CrisisReportGenerated`.
5. **Infraestructura**
   - Notifica vía email o dashboard.

---

## 🏗️ CQRS en tu Caso

- **Commands**
  - `RegisterProduct`
  - `AddReview`

- **Queries**
  - `GetProductReviews`
  - `GetProductReviewStats`
  - `GetCrisisReports`

Commands actualizan el dominio (y publican eventos).
Queries leen de proyecciones optimizadas.

---

## 📂 Ejemplo de Estructura de Carpetas

```
contexts/
  products/
    domain/
    application/
    infrastructure/
  reviews/
    domain/
    application/
    infrastructure/
  sentiment/
    domain/
    application/
    infrastructure/
  review-stats/
    domain/
    application/
    infrastructure/
  crisis-reports/
    domain/
    application/
    infrastructure/
  shared/
    domain/
    infrastructure/
```

Cada módulo con su propia lógica hexagonal:

- **domain/** → Entidades, agregados, VO, eventos.
- **application/** → Casos de uso, commands, queries, handlers.
- **infrastructure/** → Repositorios, adaptadores (IA, email, persistencia).

---

💡 Pregunta:
¿Quieres que te haga también un **ejemplo práctico de cómo encadenar eventos** (con código TypeScript) para que veas cómo `ReviewAdded` dispara todo el flujo hasta el `CrisisReport`?
