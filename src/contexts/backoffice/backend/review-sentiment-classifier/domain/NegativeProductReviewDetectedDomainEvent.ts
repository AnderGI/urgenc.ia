import DomainEvent from "../../../../../shared/domain/event/DomainEvent.js";
import { type DomainEventAttributes } from "../../../../../shared/domain/event/DomainEventAttributes.js";

export default class NegativeProductReviewDetectedDomainEvent extends DomainEvent{
  static readonly eventName: string = 'andergi.backoffice.backend.event.negative_product_review_detected'
  constructor(
    public readonly productId: string,
    eventId?: string,
    occurredOn?: Date,
  ) {
    super(NegativeProductReviewDetectedDomainEvent.eventName, eventId, occurredOn);
  }
  toPrimitives(): Record<string, unknown> {
    return {
      productId: this.productId
    };
  }
  
    static fromPrimitives(
    eventId: string,
    occurredOn: Date,
    attributes: DomainEventAttributes,
  ): NegativeProductReviewDetectedDomainEvent {
    return new NegativeProductReviewDetectedDomainEvent(
      attributes.productId as string,
      eventId,
      occurredOn,
    );
  }
}