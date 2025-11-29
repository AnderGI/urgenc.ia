import NegativeThresholdExceededDomainEvent from "../../../../../../../contexts/backoffice/backend/product-reviews-config/application/increment-negative-reviews/NegativeReviewsSurpassedThresholdDomainEvent.js";
import type NegativeThresholdSurpassedPublisher from "../../../../../../../contexts/backoffice/backend/product-reviews/application/publish-reviews-when-negative-threshold-exceeded/NegativeThresholdSurpassedPublisher.js";
import type DomainEventClass from "../../../../../../../shared/domain/event/DomainEventClass.js";
import type DomainEventSubscriber from "../../../../../../../shared/domain/event/DomainEventSubscriber.js";

export default class GetProductReviewsOnNegativeThresholdSurpassed implements DomainEventSubscriber<NegativeThresholdExceededDomainEvent>{
  constructor(private readonly publisher:NegativeThresholdSurpassedPublisher){}

  async on(domainEvent: NegativeThresholdExceededDomainEvent): Promise<void> {
    this.publisher.run(domainEvent.productId, domainEvent.thresholdDate);
  }
  subscribedTo(): DomainEventClass[] {
    return [NegativeThresholdExceededDomainEvent]
  }
  name(): string {
    return 'andergi.backoffice.backend.event.negative_threshold_exceeded';
  }
 

}