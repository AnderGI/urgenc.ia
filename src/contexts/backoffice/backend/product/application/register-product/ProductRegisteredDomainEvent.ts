import DomainEvent from '../../../../../../shared/domain/event/DomainEvent.js';
import { type DomainEventAttributes } from '../../../../../../shared/domain/event/DomainEventAttributes.js';

export default class ProductRegisteredDomainEvent extends DomainEvent {
  static readonly eventName: string = 'andergi.backoffice.backend.event.product_registered'
  constructor(
    public readonly productId: string,
    eventId?: string,
    occurredOn?: Date,
  ) {
    super(ProductRegisteredDomainEvent.eventName, eventId, occurredOn);
  }

  toPrimitives(): Record<string, unknown> {
    return {
      productId: this.productId,
    };
  }

  	static fromPrimitives(
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes,
	): ProductRegisteredDomainEvent {
		return new ProductRegisteredDomainEvent(
			attributes.productId as string,
      eventId,
			occurredOn,
		);
	}
}
