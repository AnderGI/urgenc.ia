import Product from "../../domain/Product.js";
import ProductId from "../../domain/ProductId.js";
import type ProductRepository from "../../domain/ProductRepository.js";
import FindProductByIdQuery from '../../../../../../apps/backoffice/backend/controllers/get-product-by-id/FindProductByIdQuery.js'

export default class ProductByIdFinder {
  constructor (private readonly repo:ProductRepository){}

  async run(_:FindProductByIdQuery): Promise<Product> {
    const product = await this.repo.search(new ProductId(_.id));
    if(!product) {
      throw new Error(`Product with id <${_.id}> not found`)
    }
    return product;
  }
}