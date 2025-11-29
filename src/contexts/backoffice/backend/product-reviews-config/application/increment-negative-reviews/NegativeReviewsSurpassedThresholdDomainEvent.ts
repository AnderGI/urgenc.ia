import DomainEvent from '../../../../../../shared/domain/event/DomainEvent.js';
import { type DomainEventAttributes } from '../../../../../../shared/domain/event/DomainEventAttributes.js';

export default class NegativeThresholdExceededDomainEvent extends DomainEvent {
  static readonly eventName: string = 'andergi.backoffice.backend.event.negative_threshold_exceeded'
  constructor(
    public readonly productId: string,
    public readonly thresholdDate: Date,
    eventId?: string,
    occurredOn?: Date,
  ) {
    super(NegativeThresholdExceededDomainEvent.eventName, eventId, occurredOn);
  }

  toPrimitives(): Record<string, unknown> {
    return {
      productId: this.productId,
      thresholdDate: (this.thresholdDate as Date).toLocaleString()
    };
  }

    static fromPrimitives(
    eventId: string,
    occurredOn: Date,
    attributes: DomainEventAttributes,
  ): NegativeThresholdExceededDomainEvent {
    return new NegativeThresholdExceededDomainEvent(
      attributes.productId as string,
      attributes.thresholdDate as Date, 
      eventId,
      occurredOn,
    );
  }
}
