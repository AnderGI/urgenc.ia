import container from "../../../apps/backoffice/backend/dependency-injection/node-dependency-injection/index.js";
import type DomainEventFailoverClass from "../../../shared/domain/event/DomainEventFailoverClass.js";
import type { DomainEventFailover } from "../../../shared/infrastructure/event/failover/DomainEventFailover.js";
import RabbitMqEventBus from "../../../shared/infrastructure/event/rabbitmq/RabbitMqEventBus.js";

const domainEventFailover = container.get('Backoffice.DomainEventFailover') as DomainEventFailover;
const rabbitMq = container.get('Backoffice.EventBus') as RabbitMqEventBus;

async function main() {
  const data = await domainEventFailover.consume(10) as DomainEventFailoverClass[]

  await rabbitMq.connection.connect()

  await Promise.all(
    data.map(event =>
      rabbitMq.publishRaw(event.eventId, event.eventName, event.serializedEvent)
    )
  )

  await rabbitMq.connection.close()
  await domainEventFailover.close()
}

main().catch(err => console.error('Error in failover re-publish:', err))
