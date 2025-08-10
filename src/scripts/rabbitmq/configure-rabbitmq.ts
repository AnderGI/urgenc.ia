import container from "../../apps/backoffice/backend/dependency-injection/node-dependency-injection/index.js";
import type DomainEvent from "../../shared/domain/event/DomainEvent.js";
import type { DomainEventSubscriber } from "../../shared/domain/event/DomainEventSubscriber.js";
import RabbitMqConnection  from "../../shared/infrastructure/event/rabbitmq/RabbitMqConnection.js";


const connection = new RabbitMqConnection();

const exchangeName = "domain_events";

const subscribers: DomainEventSubscriber<DomainEvent>[] = [...container.findTaggedServiceIds("domain-event-subscriber").keys()].map(id => container.get(id))

const queues: {
	name: string;
	bindingKeys: string[];
}[] = subscribers.map((subscriber) => {
		return {
		name: subscriber.name(),
		bindingKeys: subscriber.subscribedTo().map((event) => event.eventName),
	}
});

console.log(queues)

async function main(): Promise<void> {
	await connection.connect();

	await connection.declareExchanges(exchangeName);

	await Promise.all(
		queues.map((queue) => connection.declareQueue(queue.name, exchangeName, queue.bindingKeys)),
	);

	await connection.close();
}

main().catch(console.error);
