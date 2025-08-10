import DomainEvent from "../../domain/event/DomainEvent.js";
import type DomainEventClass from "../../domain/event/DomainEventClass.js";

export interface DomainEventJson {
	eventId: string;
	eventName: string;
	occurredOn: string;
	attributes: string;
}

export default class DomainEventJsonDeserializer {
	constructor(private readonly eventMapping: Map<string, DomainEventClass>) {}

	deserialize(event: string): DomainEvent {
		console.log('#deserialize')
		console.log(event)
		const eventData = JSON.parse(event).data as DomainEventJson;
		const eventClass = this.eventMapping.get(eventData.eventName);
		console.log('#eventClass')
		console.log(eventClass)
		if (!eventClass) {
			throw Error(`DomainEvent mapping not found for event ${eventData.eventName}`);
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return eventClass.fromPrimitives(
			eventData.eventId,
			new Date(eventData.occurredOn),
			eventData.attributes,
		);
	}
}