import type ProductReviewsConfigNegativeReviewsIncrementer from "../../../../../../../contexts/backoffice/backend/product-reviews-config/application/increment-negative-reviews/ProductReviewsConfigNegativeReviewsIncrementer.js";
import NegativeProductReviewDetectedDomainEvent from "../../../../../../../contexts/backoffice/backend/review-sentiment-classifier/domain/NegativeProductReviewDetectedDomainEvent.js";
import type DomainEventClass from "../../../../../../../shared/domain/event/DomainEventClass.js";
import type { DomainEventSubscriber } from "../../../../../../../shared/domain/event/DomainEventSubscriber.js";
import IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand from "./IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand.js";

export default class IncreaseNegativeReviewOnNegativeProductReviewDetected implements DomainEventSubscriber<NegativeProductReviewDetectedDomainEvent>{
  constructor(private readonly negativeReviewIncrementer:ProductReviewsConfigNegativeReviewsIncrementer){}
  async on(domainEvent: NegativeProductReviewDetectedDomainEvent): Promise<void> {
    this.negativeReviewIncrementer.run(new IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand(domainEvent.productId))
  }
  subscribedTo(): DomainEventClass[] {
    return [NegativeProductReviewDetectedDomainEvent]
  }
  name(): string {
    return "andergi.backoffice.backend.increase_negative_review_on_negative_product_review_detected";
  }

}