import { type Nullable } from "../../../../../../../shared/domain/Nullable.js";
import Product from "../../../domain/Product.js";
import ProductId from "../../../domain/ProductId.js";
import type ProductRepository from "../../../domain/ProductRepository.js";

export default class InMemoryProductRepository implements ProductRepository {
  private database:Product[] = []
  async save(_: Product): Promise<void> {
    this.database.push(_)
  }

  search(_: ProductId): Promise<Nullable<Product>> {
    return Promise.resolve(this.database.find(product => product.id.value === _.value))
  }
}