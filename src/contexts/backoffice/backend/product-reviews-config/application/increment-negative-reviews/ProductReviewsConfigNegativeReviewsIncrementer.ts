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

    if(productReviewsConfig.totalReviews.isEqualOrGreaterThan(productReviewsConfig.minimumReviews)) {
      console.log('update percentage')
      const notRounded = productReviewsConfig.negativeReviews.value / productReviewsConfig.totalReviews.value;
      const negativeReviewsRoundedPercentagePrimitive = Math.round(notRounded * 10) / 10;
      productReviewsConfig.updateNegativeReviewsRoundedPercentage(negativeReviewsRoundedPercentagePrimitive)
    }

    this.repository.save(productReviewsConfig)
  }
}