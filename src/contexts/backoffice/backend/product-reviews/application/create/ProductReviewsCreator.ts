import EventBus from "../../../../../../shared/domain/event/EventBus";
import ProductReviews from "../../domain/ProductReviews";
import ProductReviewsRepository from "../../domain/ProductReviewsRepository";
import ProductReviewsCreatedDomainEvent from "./ProductReviewsCreatedDomainEvent";
import AddProductReviewCommand from '../../../../../../apps/backoffice/backend/controllers/add-product-reviews/AddProductReviewsCommand'
export default class ProductReviewsCreator {
  constructor (private readonly repo:ProductReviewsRepository, readonly eventBus:EventBus){}

  public async run(command:AddProductReviewCommand): Promise<void> {
    console.log("ProductReviewsCreator#run")
    const productReviews = ProductReviews.fromPrimitives(command.productReviewsId, command.productId, command.createdAt, command.reviewContent);
    this.repo.save(productReviews);
    const event = new ProductReviewsCreatedDomainEvent(productReviews.productId.value, productReviews.content.value)
    this.eventBus.publish(event)
  }
}