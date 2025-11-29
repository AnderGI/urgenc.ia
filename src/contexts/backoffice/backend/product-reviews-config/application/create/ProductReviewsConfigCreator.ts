import type CreateProductReviewsConfigOnProductRegisteredCommand from "../../../../../../apps/backoffice/backend/subscribers/rabbitmq/product-reviews-config/create/CreateProductReviewsConfigOnProductRegisteredCommand.js";
import ProductReviewsConfig from "../../domain/ProductReviewsConfig.js";
import type ProductReviewsConfigRepository from "../../domain/ProductReviewsConfigRepository.js";

export default class ProductReviewsConfigCreator {
  constructor(readonly repo:ProductReviewsConfigRepository){}
  run(command: CreateProductReviewsConfigOnProductRegisteredCommand) {
    const productReviews = ProductReviewsConfig.fromPrimitives(command.productId, command.totalReviews, command.negativeReviews, command.negativeReviewsThreshold, command.negativeReviewsRoundedPercentage, command.timeWindowStart, command.minimunmReviews);
    this.repo.save(productReviews)
  }
}