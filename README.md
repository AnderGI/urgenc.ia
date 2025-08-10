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

