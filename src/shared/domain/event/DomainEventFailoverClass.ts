export default class DomainEventFailoverClass {
  constructor (readonly eventId:string, readonly eventName:string, readonly serializedEvent: string){}
}