import IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand from "../../../../../../apps/backoffice/backend/subscribers/rabbitmq/product-reviews-config/increment-product-reviews-config-total-reviews/IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand.js"
import ProductReviewsConfig from "../../domain/ProductReviewsConfig.js"
import ProductReviewsConfigId from "../../domain/ProductReviewsConfigId.js"
import ProductReviewsConfigRepository from "../../domain/ProductReviewsConfigRepository.js"

export default class ProductReviewsConfigReviewsIncrementer {
  constructor(private readonly repository:ProductReviewsConfigRepository){}
  async run(_:IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand) {
    console.log('ProductReviewsConfigReviewsIncrementer#run')
    console.log(_)
    const productReviewsConfig: ProductReviewsConfig = await this.repository.search(new ProductReviewsConfigId(_.idProduct));
    if(!productReviewsConfig) {
      throw new Error(`Product Reviews Config with id <${_.idProduct}> not found`)
    }
    console.log(productReviewsConfig.toPrimitives())
    productReviewsConfig.incrementTotalReviewsByOne()
    console.log(productReviewsConfig.toPrimitives())
    this.repository.save(productReviewsConfig)
  }
}