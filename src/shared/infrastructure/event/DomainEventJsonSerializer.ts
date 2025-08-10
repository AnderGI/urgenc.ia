import DomainEvent from "../../domain/event/DomainEvent.js";

export default class DomainEventJsonSerializer {
	static serialize(event: DomainEvent): string {
		return JSON.stringify({
			data: {
				eventId: event.eventId,
				eventName: event.eventName,
				occurredOn: event.occurredOn.toISOString(),
				attributes: event.toPrimitives(),
			},
		});
	}
}