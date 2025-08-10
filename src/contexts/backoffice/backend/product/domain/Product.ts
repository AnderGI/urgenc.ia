import ProductId from "./ProductId.js";
import ProductName from "./ProductName.js";
import AggregateRoot from '../../../../../shared/domain/AggregateRoot.js'

export default class Product extends AggregateRoot{
  constructor ( readonly id: ProductId,  readonly name: ProductName){
    super()
  }

  public static fromPrimitives(id:string, name:string): Product {
    return new Product(new ProductId(id), new ProductName(name))
  }

  public toPrimitives():  {
  id: string;
  name: string;
} {
    return {
      id: this.id.value,
      name: this.name.value,
    }
  }
}