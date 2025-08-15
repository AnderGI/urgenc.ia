import ProductReviewsCreatedDomainEvent from "../../../../../../../contexts/backoffice/backend/product-reviews/application/create/ProductReviewsCreatedDomainEvent.js";
import type ReviewContentSentimentClassifier from "../../../../../../../contexts/backoffice/backend/review-sentiment-classifier/application/ReviewContentSentimentClassifier.js";
import type DomainEventClass from "../../../../../../../shared/domain/event/DomainEventClass.js";
import type { DomainEventSubscriber } from "../../../../../../../shared/domain/event/DomainEventSubscriber.js";

export default class ClassifyReviewContentOnProductReviewsCreated implements DomainEventSubscriber<ProductReviewsCreatedDomainEvent> {
  constructor(private readonly classifier:ReviewContentSentimentClassifier){}
  async on(domainEvent: ProductReviewsCreatedDomainEvent): Promise<void> {
    console.log('ClassifyReviewContentOnProductReviewsCreated#on')
    console.log(domainEvent)
    this.classifier.run(domainEvent.productId, domainEvent.reviewContent)
  }
  subscribedTo(): DomainEventClass[] {
    return [ProductReviewsCreatedDomainEvent];
  }
  name(): string {
    return "andergi.backoffice.backend.classify_review_content_on_product_reviews_created";
  }
}