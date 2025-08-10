import ProductReviewsConfigId from "../../domain/ProductReviewsConfigId.js";
import ProductReviewsConfigNegativeReviews from "../../domain/ProductReviewsConfigNegativeReviews.js";
import ProductReviewsConfigRepository from "../../domain/ProductReviewsConfigRepository.js";
import ProductReviewsConfigTimeWindowStart from "../../domain/ProductReviewsConfigTimeWindowStart.js";

export default class ProductReviewsConfigUpdater {
  constructor(private readonly repo:ProductReviewsConfigRepository){}
  async run(productId:string, negativeReviewsThreshold:number, timeWindowStart:Date) {
    const id = new ProductReviewsConfigId(productId);
    const inDatabaseProductReviewConfig = await this.repo.search(id);
    if(!inDatabaseProductReviewConfig) {
      throw new Error(`ProductReviewConfig with id <${productId}> does not exist`)
    }  

    inDatabaseProductReviewConfig.updateNegativeReviewsThreshold(new ProductReviewsConfigNegativeReviews(negativeReviewsThreshold))
    inDatabaseProductReviewConfig.updatetimeWindowStart(new ProductReviewsConfigTimeWindowStart(timeWindowStart))

    this.repo.save(inDatabaseProductReviewConfig)


  }
}