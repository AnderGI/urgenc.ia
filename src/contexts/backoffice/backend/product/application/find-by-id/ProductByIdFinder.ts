import Product from "../../domain/Product";
import ProductId from "../../domain/ProductId";
import ProductRepository from "../../domain/ProductRepository";
import FindProductByIdQuery from '../../../../../../apps/backoffice/backend/controllers/get-product-by-id/FindProductByIdQuery'

export default class ProductByIdFinder {
  constructor (private readonly repo:ProductRepository){}

  async run(_:FindProductByIdQuery): Promise<Product> {
    return await this.repo.search(new ProductId(_.id))
  }
}