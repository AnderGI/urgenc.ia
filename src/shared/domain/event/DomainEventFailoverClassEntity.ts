import { EntitySchema } from "typeorm";
import DomainEventFailoverClass from "./DomainEventFailoverClass.js";

const DomainEventFailoverClassEntity = new EntitySchema<DomainEventFailoverClass>({
  name: 'DomainEventFailoverClass',
  tableName: 'domain_event_failover',
  target: DomainEventFailoverClass,
  columns: {
    eventId: {
      type: String,
      name: "event_id",
      primary: true
    },
    eventName: {
      type: String,
      name: "event_name"
    },
    serializedEvent: {
      type: String,
      name: "serialized_event",
    }
  }
});

export default DomainEventFailoverClassEntity;