import IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand from "../../../../../../apps/backoffice/backend/subscribers/rabbitmq/product-reviews-config/increase-negative-review/IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand.js";
import Command from "../../../../../../shared/domain/command/Command.js";
import type CommandHandler from "../../../../../../shared/domain/command/CommandHandler.js";
import ProductReviewsConfigNegativeReviewsIncrementer from "./ProductReviewsConfigNegativeReviewsIncrementer.js";

export default class IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommandHandler implements CommandHandler<IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand>{
  constructor (private readonly negativeReviewIncrementer:ProductReviewsConfigNegativeReviewsIncrementer){}

  subscribedTo(): Command {
    return IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand;
  }
  
  async handle(command: IncrementProductReviewsConfigNegativeReviewsOnProductReviewsCreatedCommand): Promise<void> {
    this.negativeReviewIncrementer.run(command.productId)
  }
}