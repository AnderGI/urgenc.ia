import IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand from "../../../../../../apps/backoffice/backend/subscribers/rabbitmq/product-reviews-config/increment-product-reviews-config-total-reviews/IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand";
import Command from "../../../../../../shared/domain/command/Command";
import CommandHandler from "../../../../../../shared/domain/command/CommandHandler";
import ProductReviewsConfigReviewsIncrementer from "./ProductReviewsConfigReviewsIncrementer";

export default class IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommandHandler implements CommandHandler<IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand> {
  constructor (private readonly incrementer: ProductReviewsConfigReviewsIncrementer){}
  subscribedTo(): Command {
    return IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand;
  }

  async handle(command: IncrementProductReviewsConfigTotalReviewsOnProductReviewsCreatedCommand): Promise<void> {
    this.incrementer.run(command.idProduct)
  }
}