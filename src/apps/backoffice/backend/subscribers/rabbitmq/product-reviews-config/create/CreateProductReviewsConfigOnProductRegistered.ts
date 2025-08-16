import ProductRegisteredDomainEvent from "../../../../../../../contexts/backoffice/backend/product/application/register-product/ProductRegisteredDomainEvent.js";
import type DomainEventClass from "../../../../../../../shared/domain/event/DomainEventClass.js";
import type { DomainEventSubscriber } from "../../../../../../../shared/domain/event/DomainEventSubscriber.js";
import type CreateProductReviewsConfigOnProductRegisteredCommandHandler from "../../../../../../../contexts/backoffice/backend/product-reviews-config/application/create/CreateProductReviewsConfigOnProductRegisteredCommandHandler.js";
import CreateProductReviewsConfigOnProductRegisteredCommand from "./CreateProductReviewsConfigOnProductRegisteredCommand.js";

export default class CreateProductReviewsConfigOnProductRegistered implements DomainEventSubscriber<ProductRegisteredDomainEvent>{
  constructor(private readonly creator:CreateProductReviewsConfigOnProductRegisteredCommandHandler){}
  
  async on(domainEvent: ProductRegisteredDomainEvent): Promise<void> {
    this.creator.handle(new CreateProductReviewsConfigOnProductRegisteredCommand(domainEvent.productId))
  }
  subscribedTo(): DomainEventClass[] {
    return [ProductRegisteredDomainEvent]
  }
  name(): string {
    return "andergi.backoffice.backend.create_product_reviews_config_on_product_registered";
  }
 
}