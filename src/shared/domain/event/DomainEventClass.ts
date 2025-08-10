import DomainEvent from "./DomainEvent.js";

export default interface DomainEventClass<T extends DomainEvent = DomainEvent> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	new (...args: any[]): T;
	eventName: string;
}