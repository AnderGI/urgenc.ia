import DomainEvent, { DomainEventAttributes } from '../../../../../../shared/domain/event/DomainEvent.js';

export default class ProductReviewsCreatedDomainEvent extends DomainEvent {
  static readonly eventName: string = 'andergi.backoffice.backend.event.product_reviews_created'
  constructor(
    public readonly productId: string,
    public readonly reviewContent: string,
    eventId?: string,
    occurredOn?: Date,
  ) {
    super(ProductReviewsCreatedDomainEvent.eventName, eventId, occurredOn);
  }

  toPrimitives(): Record<string, unknown> {
    return {
      productId: this.productId,
      reviewContent: this.reviewContent
    };
  }

  	static fromPrimitives(
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes,
	): ProductReviewsCreatedDomainEvent {
		return new ProductReviewsCreatedDomainEvent(
			attributes.productId as string,
      attributes.reviewContent as string,
      eventId,
			occurredOn,
		);
	}
}
