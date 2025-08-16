import ProductReviewsConfig from "../../domain/ProductReviewsConfig.js"
import ProductReviewsConfigId from "../../domain/ProductReviewsConfigId.js"
import ProductReviewsConfigRepository from "../../domain/ProductReviewsConfigRepository.js"

export default class ProductReviewsConfigNegativeReviewsIncrementer {
  constructor(private readonly repository:ProductReviewsConfigRepository){}
  async run(productId:string) {
    console.log('ProductReviewsConfigNegativeReviewsIncrementer#run')
    const productReviewsConfig: ProductReviewsConfig = await this.repository.search(new ProductReviewsConfigId(productId));
    if(!productReviewsConfig) {
      throw new Error(`Product Reviews Config with id <${productId}> not found`)
    }
    console.log(productReviewsConfig.toPrimitives())
    productReviewsConfig.incrementNegativeReviewsByOne()
    console.log(productReviewsConfig.toPrimitives())
    this.repository.save(productReviewsConfig)
  }
}