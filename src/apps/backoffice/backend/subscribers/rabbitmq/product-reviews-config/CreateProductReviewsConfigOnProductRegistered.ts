import ProductRegisteredDomainEvent from "../../../../../../contexts/backoffice/backend/product/application/register-product/ProductRegisteredDomainEvent.js";
import type DomainEventClass from "../../../../../../shared/domain/event/DomainEventClass.js";
import type { DomainEventSubscriber } from "../../../../../../shared/domain/event/DomainEventSubscriber.js";
import ProductReviewsConfigCreator from '../../../../../../contexts/backoffice/backend/product-reviews-config/application/create/ProductReviewsConfigCreator.js'

export default class CreateProductReviewsConfigOnProductRegistered implements DomainEventSubscriber<ProductRegisteredDomainEvent>{
  constructor(private readonly creator:ProductReviewsConfigCreator){}
  
  async on(domainEvent: ProductRegisteredDomainEvent): Promise<void> {
    this.creator.run(domainEvent.productId, 0, 0, 0, 0, new Date())
  }
  subscribedTo(): DomainEventClass[] {
    return [ProductRegisteredDomainEvent]
  }
  name(): string {
    return "andergi.backoffice.backend.create_product_reviews_config_on_product_registered";
  }
 
}