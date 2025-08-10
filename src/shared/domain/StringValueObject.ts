import ValueObject from "./ValueObject.js";

export default abstract class StringValueObject extends ValueObject<string> {
  constructor(readonly value: string) {
    super(value);
  }
}
