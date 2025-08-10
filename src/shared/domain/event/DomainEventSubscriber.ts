import DomainEvent from "./DomainEvent.js";
import type DomainEventClass from "./DomainEventClass.js";

export interface DomainEventSubscriber<T extends DomainEvent> {
	on(domainEvent: T): Promise<void>;

	subscribedTo(): DomainEventClass[];

	name(): string;
}