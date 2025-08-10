import ValueObject from "./ValueObject.js";

export default class DateValueObject extends ValueObject<Date> {
  constructor (readonly value:Date){
    super(value)
  }
}