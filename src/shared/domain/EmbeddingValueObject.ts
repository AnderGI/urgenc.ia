export default class EmbeddingValueObject {
  constructor(readonly value: number[]) {
    this.ensureValueIsDefined(value);
  }
  private ensureValueIsDefined(value: number[]): void {
    if (value === null || value === undefined) {
      throw new Error("Value must be defined");
    }
  }

  equals(other: EmbeddingValueObject): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      this.areEqualArrays(this.value, other.value)
    );
  }

  toString(): string {
    return this.value.toString();
  }

private areEqualArrays(one: number[], another: number[]): boolean {
  return (
    Array.isArray(one) &&
    Array.isArray(another) &&
    one.length === another.length && 
    one.every((value, index) => value === another[index])
  );
}

}