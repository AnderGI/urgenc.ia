import Product from "../../../domain/Product";
import ProductRepository from "../../../domain/ProductRepository";

export default class InMemoryProductRepository implements ProductRepository {
  private database:Product[] = []
  async save(_: Product): Promise<void> {
    this.database.push(_)
  }
}