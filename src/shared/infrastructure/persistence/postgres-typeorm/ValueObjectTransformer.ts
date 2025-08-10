/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Newable } from "../../../domain/Newable.js"
import type ValueObject from "../../../domain/ValueObject.js"

  
const ValueObjectTransformer = (ValueObject: Newable<ValueObject<any>>) => {
  return {
    to: (value: ValueObject<any>): any => value.value,
    from: (value: any): ValueObject<any> => new ValueObject(value)
  }
}

export default ValueObjectTransformer