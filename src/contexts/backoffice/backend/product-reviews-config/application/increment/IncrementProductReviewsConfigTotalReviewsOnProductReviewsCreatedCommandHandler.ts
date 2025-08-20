import IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand from "../../../../../../apps/backoffice/backend/subscribers/rabbitmq/product-reviews-config/increment-product-reviews-config-total-reviews/IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand.js";
import Command from "../../../../../../shared/domain/command/Command.js";
import type CommandHandler from "../../../../../../shared/domain/command/CommandHandler.js";
import ProductReviewsConfigReviewsIncrementer from "./ProductReviewsConfigReviewsIncrementer.js";

export default class IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommandHandler implements CommandHandler<IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand> {
  constructor (private readonly incrementer: ProductReviewsConfigReviewsIncrementer){}
  subscribedTo(): Command {
    return IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand;
  }

  async handle(command: IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand): Promise<void> {
    this.incrementer.run(command.idProduct)
  }
}