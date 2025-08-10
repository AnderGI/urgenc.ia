import type DomainEventClass from "../../../../../../shared/domain/event/DomainEventClass.js";
import type { DomainEventSubscriber } from "../../../../../../shared/domain/event/DomainEventSubscriber.js";
import ProductReviewsCreatedDomainEvent from "../../../../../../contexts/backoffice/backend/product-reviews/application/create/ProductReviewsCreatedDomainEvent.js";
import type ProductReviewsConfigReviewsIncrementer from "../../../../../../contexts/backoffice/backend/product-reviews-config/application/increment/ProductReviewsConfigReviewsIncrementer.js";
import IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand from "./IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand.js";

export default class IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreated implements DomainEventSubscriber<ProductReviewsCreatedDomainEvent>{
  
  constructor(private readonly incrementer: ProductReviewsConfigReviewsIncrementer){}

  async on(domainEvent: ProductReviewsCreatedDomainEvent): Promise<void> {
    console.log('IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreated#on')
    const command = new IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand(domainEvent.productId)
    this.incrementer.run(command)
  }
  subscribedTo(): DomainEventClass[] {
    return [ProductReviewsCreatedDomainEvent]
  }
  name(): string {
    return "andergi.backoffice.backend.increment_product_reviews_config_total_reviews_on_product_reviews_created";
  }
 
}