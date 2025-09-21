import type { ConsumeMessage } from "amqplib";
import container from "../../apps/backoffice/backend/dependency-injection/node-dependency-injection/index.js";
import type DomainEvent from "../../shared/domain/event/DomainEvent.js";
import type DomainEventSubscriber from "../../shared/domain/event/DomainEventSubscriber.js";
import RabbitMqConnection from "../../shared/infrastructure/event/rabbitmq/RabbitMqConnection.js";
import type DomainEventClass from "../../shared/domain/event/DomainEventClass.js";
import DomainEventJsonDeserializer from "../../shared/infrastructure/event/DomainEventJsonDeserializer.js";
import path from "path";
import { config } from "dotenv";

config({
	path: path.join(process.cwd(), '.env.local')
})

const connection = new RabbitMqConnection();

const subscribers: DomainEventSubscriber<DomainEvent>[] = [...container.findTaggedServiceIds("domain-event-subscriber").keys()].map(id => container.get(id))


const eventMapping = new Map<string, DomainEventClass>();

subscribers.forEach((subscriber) => {
  subscriber.subscribedTo().forEach(eventClass => {
		eventMapping.set(eventClass.eventName, eventClass);
  })
});

// console.log(eventMapping)

const deserializer = new DomainEventJsonDeserializer(eventMapping);

async function main(): Promise<void> {
	await connection.connect();

	await Promise.all(
		subscribers.map((subscriber) => connection.consume(subscriber.name(), consume(subscriber))),
	);
}

function consume(subscriber: DomainEventSubscriber<DomainEvent>) {
	return async function (message: ConsumeMessage): Promise<void> {
		const content = message.content.toString();
		const domainEvent = deserializer.deserialize(content);
		console.log('#consume deserialize')
		console.log(domainEvent)
		try {
			await subscriber.on(domainEvent);
		} catch {
			await handleError(message, subscriber.name());
		} finally {
			await connection.ack(message);
		}
	};
}

async function handleError(message: ConsumeMessage, queueName: string): Promise<void> {
	console.log(`Error consuming ${message.fields.routingKey}`);

	if (hasBeenRedeliveredTooMuch(message)) {
		console.log(`--- To dead letter`);
		await connection.publishToDeadLetter(message, queueName);
	} else {
		console.log(`--- To retry`);
		await connection.publishToRetry(message, queueName);
	}
}

function hasBeenRedeliveredTooMuch(message: ConsumeMessage): boolean {
	if (hasBeenRedelivered(message)) {
		const count = parseInt(message.properties.headers!["redelivery_count"], 10);

		return count >= 3;
	}

	return false;
}

function hasBeenRedelivered(message: ConsumeMessage): boolean {
	return message.properties.headers!["redelivery_count"] !== undefined;
}

main().catch(console.error);