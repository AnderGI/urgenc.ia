import ProductReviewsCreatedDomainEvent from "../../../../../../../contexts/backoffice/backend/product-reviews/application/create/ProductReviewsCreatedDomainEvent.js";
import type LabelSentimentFromReviewContentCommandHandler from "../../../../../../../contexts/backoffice/backend/review-sentiment-classifier/application/LabelSentimentFromReviewContentCommandHandler.js";
import type DomainEventClass from "../../../../../../../shared/domain/event/DomainEventClass.js";
import type { DomainEventSubscriber } from "../../../../../../../shared/domain/event/DomainEventSubscriber.js";
import LabelSentimentFromReviewContentCommand from "./LabelSentimentFromReviewContentCommand.js";

export default class ClassifyReviewContentOnProductReviewsCreated implements DomainEventSubscriber<ProductReviewsCreatedDomainEvent> {
  constructor(private readonly classifier:LabelSentimentFromReviewContentCommandHandler){}
  async on(domainEvent: ProductReviewsCreatedDomainEvent): Promise<void> {
    console.log('ClassifyReviewContentOnProductReviewsCreated#on')
    console.log(domainEvent)
    this.classifier.handle(new LabelSentimentFromReviewContentCommand(domainEvent.productId, domainEvent.reviewContent))
  }
  subscribedTo(): DomainEventClass[] {
    return [ProductReviewsCreatedDomainEvent];
  }
  name(): string {
    return "andergi.backoffice.backend.classify_review_content_on_product_reviews_created";
  }
}