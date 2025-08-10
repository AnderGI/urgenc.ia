import { v4 } from "uuid";

export type DomainEventAttributes = Record<string, unknown>;

export default abstract class DomainEvent {
	public readonly eventId: string;
	public readonly occurredOn: Date;

	protected constructor(
		public readonly eventName: string,
		eventId?: string,
		occurredOn?: Date,
	) {
		this.eventId = eventId ?? v4();
		this.occurredOn = occurredOn ?? new Date();
	}

	 
	static fromPrimitives: (
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes,
		 
	) => DomainEvent;

	abstract toPrimitives(): DomainEventAttributes;
}