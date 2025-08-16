import IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand from "../../../../../../apps/backoffice/backend/subscribers/rabbitmq/product-reviews-config/increase-negative-review/IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand";
import Command from "../../../../../../shared/domain/command/Command";
import CommandHandler from "../../../../../../shared/domain/command/CommandHandler";
import ProductReviewsConfigNegativeReviewsIncrementer from "./ProductReviewsConfigNegativeReviewsIncrementer";

export default class IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommandHandler implements CommandHandler<IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand>{
  constructor (private readonly negativeReviewIncrementer:ProductReviewsConfigNegativeReviewsIncrementer){}

  subscribedTo(): Command {
    return IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand;
  }
  
  async handle(command: IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand): Promise<void> {
    this.negativeReviewIncrementer.run(command.productId)
  }
}