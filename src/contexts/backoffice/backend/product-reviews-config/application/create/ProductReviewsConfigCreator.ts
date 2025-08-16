import ProductReviewsConfig from "../../domain/ProductReviewsConfig.js";
import ProductReviewsConfigRepository from "../../domain/ProductReviewsConfigRepository.js";

export default class ProductReviewsConfigCreator {
  constructor(readonly repo:ProductReviewsConfigRepository){}
  run(productId:string, totalReviews: number, negativeReviews: number, negativeReviewsThreshold:number, negativeReviewsRoundedPercentage:number, timeWindowStart:Date, minimunmReviews:number) {
    const productReviews = ProductReviewsConfig.fromPrimitives(productId, totalReviews, negativeReviews, negativeReviewsThreshold, negativeReviewsRoundedPercentage, timeWindowStart, minimunmReviews);
    this.repo.save(productReviews)
  }
}