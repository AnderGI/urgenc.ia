import type EventBus from "../../../../../../shared/domain/event/EventBus.js";
import ProductReviewConfigNotExistsError from "../../domain/ProductReviewConfigNotExistsError.js";
import ProductReviewsConfigId from "../../domain/ProductReviewsConfigId.js"
import type ProductReviewsConfigRepository from "../../domain/ProductReviewsConfigRepository.js"
import NegativeThresholdExceededDomainEvent from "./NegativeReviewsSurpassedThresholdDomainEvent.js";

export default class ProductReviewsConfigNegativeReviewsIncrementer {
  constructor(private readonly repository:ProductReviewsConfigRepository, private readonly eventBus:EventBus){}
  async run(productId:string) {

    const id = new ProductReviewsConfigId(productId);
    const productReviewsConfig = await this.repository.search(id);
    if(!productReviewsConfig) {
      throw new ProductReviewConfigNotExistsError(id);
    }

    productReviewsConfig.incrementNegativeReviewsByOne()
    
    const notRounded = productReviewsConfig.negativeReviews.value / productReviewsConfig.totalReviews.value;
    const negativeReviewsRoundedPercentagePrimitive = Math.round(notRounded * 10) / 10;
    productReviewsConfig.updateNegativeReviewsRoundedPercentage(negativeReviewsRoundedPercentagePrimitive)
    
    // When negative reviews are => than minimum negative reviews
    // and that % is => than threshold
    // emit event to generate document
    if(
      productReviewsConfig.negativeReviews.isEqualOrGreaterThan(productReviewsConfig.minimumReviews)
      &&
      productReviewsConfig.negativeReviewsRoundedPercentage.isEqualOrGreaterThan(productReviewsConfig.negativeReviewsThreshold)
    ) {
      const event = new NegativeThresholdExceededDomainEvent(productReviewsConfig.id.value, productReviewsConfig.timeWindowStart.value)
      this.eventBus.publish(event)
    }

    this.repository.save(productReviewsConfig)
  }
}