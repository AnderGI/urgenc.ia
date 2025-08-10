import * as z from 'zod' 
import StringValueObject from './StringValueObject.js';

export default class Uuid extends StringValueObject{
  readonly value: string;

  constructor(value: string) {
    super(value)
    this.ensureIsValidUuid(value);

    this.value = value;
  }


  private ensureIsValidUuid(id: string): void {
    const idSchema = z.uuid()
    const result = idSchema.safeParse(id)
    if (!result.success) {
      throw new Error(`<${this.constructor.name}> does not allow the value <${id}>`);
    }
  }

  toString(): string {
    return this.value;
  }
}