import ProductReviewsConfigId from "../../domain/ProductReviewsConfigId.js";
import type ProductReviewsConfigRepository from "../../domain/ProductReviewsConfigRepository.js";


export default class ProductReviewsConfigUpdater {
  constructor(private readonly repo:ProductReviewsConfigRepository){}
  async run(productId:string, negativeReviewsThreshold:number, timeWindowStart:Date, minimumReviews:number) {
    const id = new ProductReviewsConfigId(productId);
    const inDatabaseProductReviewConfig = await this.repo.search(id);
    if(!inDatabaseProductReviewConfig) {
      throw new Error(`ProductReviewConfig with id <${productId}> does not exist`)
    }  

    inDatabaseProductReviewConfig.updateNegativeReviewsThreshold(negativeReviewsThreshold)
    inDatabaseProductReviewConfig.updatetimeWindowStart(timeWindowStart)
    inDatabaseProductReviewConfig.updateMinimumReviews(minimumReviews)

    this.repo.save(inDatabaseProductReviewConfig)


  }
}