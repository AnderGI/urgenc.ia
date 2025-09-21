import type EventBus from "../../../../../../shared/domain/event/EventBus.js";
import ProductReviews from "../../domain/ProductReviews.js";
import type ProductReviewsRepository from "../../domain/ProductReviewsRepository.js";
import ProductReviewsCreatedDomainEvent from "./ProductReviewsCreatedDomainEvent.js";
import AddProductReviewCommand from '../../../../../../apps/backoffice/backend/controllers/add-product-reviews/AddProductReviewsCommand.js'
import ProductReviewsContentEmbedding from "../../domain/ProductReviewsContentEmbedding.js";
export default class ProductReviewsCreator {
  constructor (private readonly repo:ProductReviewsRepository, readonly eventBus:EventBus){}

  public async run(command:AddProductReviewCommand): Promise<void> {
    console.log("ProductReviewsCreator#run")
    const productReviews = ProductReviews.fromPrimitives(command.productReviewsId, command.productId, command.createdAt, command.reviewContent, ProductReviewsContentEmbedding.empty().value);
    this.repo.save(productReviews);
    const event = new ProductReviewsCreatedDomainEvent(productReviews.productId.value, productReviews.content.value)
    this.eventBus.publish(event)
  }
}