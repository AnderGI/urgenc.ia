import type { DataSource, EntitySchema, Repository } from "typeorm";
import DomainEventFailoverClass from "../../../domain/event/DomainEventFailoverClass.js";
import DomainEventFailoverClassEntity from "../../../domain/event/DomainEventFailoverClassEntity.js";

export class DomainEventFailover{
	constructor(private _client: Promise<DataSource>) {}

	async publish(eventId: string, eventName: string, serializedEvent: string): Promise<void> {
		const domainEventFailoverClass = new DomainEventFailoverClass(eventId, eventName, serializedEvent);
		this.persist(domainEventFailoverClass)
	}

	private client(): Promise<DataSource> {
    return this._client;
  }

	private async repository(): Promise<Repository<DomainEventFailoverClass>> {
			return (await this.client()).getRepository(this.entitySchema());
	}

	private entitySchema(): EntitySchema<DomainEventFailoverClass> {
		return DomainEventFailoverClassEntity;
	}

	private async persist(event: DomainEventFailoverClass): Promise<void> {
    const repository = await this.repository();
    await repository.save(event);
  }
	
	
	async consume(total: number): Promise<DomainEventFailoverClass[]> {
		const repo = await this.repository();
		const events = await repo.createQueryBuilder().limit(total).getMany();

		if (events.length > 0) {
			await repo.remove(events);
		}

		return events;
	}

	async close() {
		(await this.client()).destroy()
	}
	
}