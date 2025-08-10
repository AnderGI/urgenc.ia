import DomainEvent  from "./DomainEvent.js";

export default interface EventBus {
  publish(events: DomainEvent): Promise<void>;
}
