import type  DomainEvent from "./DomainEvent.js";

export type DomainEventName<T extends DomainEvent> = Pick<T, "eventName">