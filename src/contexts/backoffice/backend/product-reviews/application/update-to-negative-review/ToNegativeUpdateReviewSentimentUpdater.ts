import type NegativeProductReviewDetectedDomainEvent from "../../../review-sentiment-classifier/domain/NegativeProductReviewDetectedDomainEvent.js";
import ProductReviewsId from "../../domain/ProductReviewsId.js";
import type ProductReviewsRepository from "../../domain/ProductReviewsRepository.js";

export default class ToNegativeUpdateReviewSentimentUpdater {
  constructor (private readonly repository:ProductReviewsRepository){}

  public async run(domainEvent: NegativeProductReviewDetectedDomainEvent) {
    const productReview = await this.repository.search(new ProductReviewsId(domainEvent.productReviewId)); 
    if(!productReview) {
      throw new Error('Product review with id ' + domainEvent.productReviewId + ' not found');
    }
    productReview.updateToNegativeReview();
    this.repository.save(productReview)
  }
}