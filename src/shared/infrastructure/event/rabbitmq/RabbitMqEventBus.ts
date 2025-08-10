import type DomainEvent from "../../../domain/event/DomainEvent.js";
import type EventBus from "../../../domain/event/EventBus.js";
import DomainEventJsonSerializer from "../DomainEventJsonSerializer.js";
import type { DomainEventFailover } from "../failover/DomainEventFailover.js";
import type RabbitMqConnection from "./RabbitMqConnection.js";


export default class RabbitMqEventBus implements EventBus {
	constructor(
		readonly connection: RabbitMqConnection,
		readonly failover: DomainEventFailover
	) {}

	async publish(event: DomainEvent): Promise<void> {
		await this.connection.connect();

		const serializedEvent = DomainEventJsonSerializer.serialize(event);
		await this.publishRaw(event.eventId, event.eventName, serializedEvent);
	}

	/*
	async publishFromFailover(): Promise<void> {
		await this.connection.connect();

		const events = await this.failover.consume(10);

		await Promise.all(
			events.map((event) => this.publishRaw(event.eventId, event.eventName, event.body)),
		);
	}
	*/

	public async publishRaw(eventId: string, eventName: string, serializedEvent: string) {
		try {
			await this.connection.publish("domain_events", eventName, Buffer.from(serializedEvent), {
				messageId: eventId,
				contentType: "application/json",
				contentEncoding: "utf-8",
			});

			console.log('#publishRaw se publica')

			return;
		} catch {
			console.log('llega al cathc')
			console.log(this.failover)
			return this.failover.publish(eventId, eventName, serializedEvent);
		}
	}

}