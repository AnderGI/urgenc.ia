import ProductReviewsConfig from "../../domain/ProductReviewsConfig.js"
import ProductReviewsConfigId from "../../domain/ProductReviewsConfigId.js"
import ProductReviewsConfigRepository from "../../domain/ProductReviewsConfigRepository.js"
import IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand from '../../../../../../apps/backoffice/backend/subscribers/rabbitmq/product-reviews-config/increase-negative-review/IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand.js'
export default class ProductReviewsConfigNegativeReviewsIncrementer {
  constructor(private readonly repository:ProductReviewsConfigRepository){}
  async run(_:IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand) {
    console.log('ProductReviewsConfigNegativeReviewsIncrementer#run')
    console.log(_)
    const productReviewsConfig: ProductReviewsConfig = await this.repository.search(new ProductReviewsConfigId(_.productId));
    if(!productReviewsConfig) {
      throw new Error(`Product Reviews Config with id <${_.productId}> not found`)
    }
    console.log(productReviewsConfig.toPrimitives())
    productReviewsConfig.incrementNegativeReviewsByOne()
    console.log(productReviewsConfig.toPrimitives())
    this.repository.save(productReviewsConfig)
  }
}