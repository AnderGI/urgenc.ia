import ProductReviewsConfigId from "../../domain/ProductReviewsConfigId.js"
import type ProductReviewsConfigRepository from "../../domain/ProductReviewsConfigRepository.js"

export default class ProductReviewsConfigReviewsIncrementer {
  constructor(private readonly repository:ProductReviewsConfigRepository){}
  async run(idProduct:string) {
    console.log('ProductReviewsConfigReviewsIncrementer#run')
    console.log()
    const productReviewsConfig = await this.repository.search(new ProductReviewsConfigId(idProduct));
    if(!productReviewsConfig) {
      throw new Error(`Product Reviews Config with id <${idProduct}> not found`)
    }
    productReviewsConfig.incrementTotalReviewsByOne()
    this.repository.save(productReviewsConfig)
  }
}