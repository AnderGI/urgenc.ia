import ProductReviewsConfig from "../../domain/ProductReviewsConfig.js"
import ProductReviewsConfigId from "../../domain/ProductReviewsConfigId.js"
import ProductReviewsConfigRepository from "../../domain/ProductReviewsConfigRepository.js"

export default class ProductReviewsConfigReviewsIncrementer {
  constructor(private readonly repository:ProductReviewsConfigRepository){}
  async run(idProduct:string) {
    console.log('ProductReviewsConfigReviewsIncrementer#run')
    console.log()
    const productReviewsConfig: ProductReviewsConfig = await this.repository.search(new ProductReviewsConfigId(idProduct));
    if(!productReviewsConfig) {
      throw new Error(`Product Reviews Config with id <${idProduct}> not found`)
    }
    console.log(productReviewsConfig.toPrimitives())
    productReviewsConfig.incrementTotalReviewsByOne()
    console.log(productReviewsConfig.toPrimitives())
    this.repository.save(productReviewsConfig)
  }
}