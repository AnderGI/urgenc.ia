import ValueObject from "./ValueObject.js";

export default class NumberValueObject extends ValueObject<number>{
  constructor (readonly value:number){
    super(value)
  }
}

