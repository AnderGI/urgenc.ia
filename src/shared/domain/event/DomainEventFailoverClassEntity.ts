import { EntitySchema } from "typeorm";
import DomainEventFailoverClass from "./DomainEventFailoverClass.js";

const DomainEventFailoverClassEntity = new EntitySchema<DomainEventFailoverClass>({
  name: 'DomainEventFailoverClass',
  tableName: 'domain_event_failover',
  target: DomainEventFailoverClass,
  columns: {
    eventId: {
      type: String,
      primary: true
    },
    eventName: {
      type: String,
    },
    serializedEvent: {
      type: String,
    }
  }
});

export default DomainEventFailoverClassEntity;