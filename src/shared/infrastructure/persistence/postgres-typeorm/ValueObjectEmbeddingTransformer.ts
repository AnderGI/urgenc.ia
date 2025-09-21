/* eslint-disable @typescript-eslint/no-explicit-any */
import type EmbeddingValueObject from "../../../domain/EmbeddingValueObject.js";
import type { Newable } from "../../../domain/Newable.js";

const ValueObjectEmbeddingTransformer = (EmbeddingValueObject: Newable<EmbeddingValueObject>) => {
  return {
    to: (value: EmbeddingValueObject): any => {
      console.log('TO')
      console.log(value.value)
      return value.value;
    },
    from: (value: any): EmbeddingValueObject => {
      console.log('FROM')
      console.log(value)
      const arrayValue: number[] = Array.isArray(value) ? value : JSON.parse(value);
      return new EmbeddingValueObject(arrayValue);
    }
  };
};

export default ValueObjectEmbeddingTransformer;
