import type IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommandHandler from "../../../../../../../contexts/backoffice/backend/product-reviews-config/application/increment-negative-reviews/IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommandHandler.js";
import NegativeProductReviewDetectedDomainEvent from "../../../../../../../contexts/backoffice/backend/review-sentiment-classifier/domain/NegativeProductReviewDetectedDomainEvent.js";
import type DomainEventClass from "../../../../../../../shared/domain/event/DomainEventClass.js";
import type DomainEventSubscriber from "../../../../../../../shared/domain/event/DomainEventSubscriber.js";
import IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand from "./IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand.js";

export default class IncreaseNegativeReviewOnNegativeProductReviewDetected implements DomainEventSubscriber<NegativeProductReviewDetectedDomainEvent>{
  constructor(private readonly negativeReviewIncrementer:IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommandHandler){}
  async on(domainEvent: NegativeProductReviewDetectedDomainEvent): Promise<void> {
    this.negativeReviewIncrementer.handle(new IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand(domainEvent.productId))
  }
  subscribedTo(): DomainEventClass[] {
    return [NegativeProductReviewDetectedDomainEvent]
  }
  name(): string {
    return "andergi.backoffice.backend.increase_negative_review_on_negative_product_review_detected";
  }

}