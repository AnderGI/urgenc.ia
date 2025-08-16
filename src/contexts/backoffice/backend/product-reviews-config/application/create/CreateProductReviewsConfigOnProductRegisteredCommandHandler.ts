import CommandHandler from "../../../../../../shared/domain/command/CommandHandler";
import CreateProductReviewsConfigOnProductRegisteredCommand from '../../../../../../apps/backoffice/backend/subscribers/rabbitmq/product-reviews-config/create/CreateProductReviewsConfigOnProductRegisteredCommand.js'
import Command from "../../../../../../shared/domain/command/Command";
import ProductReviewsConfigCreator from "./ProductReviewsConfigCreator";

export default class CreateProductReviewsConfigOnProductRegisteredCommandHandler implements CommandHandler<CreateProductReviewsConfigOnProductRegisteredCommand>{
  constructor (private readonly creator:ProductReviewsConfigCreator){}
  subscribedTo(): Command {
    return CreateProductReviewsConfigOnProductRegisteredCommand;
  }
  
  async handle(command: CreateProductReviewsConfigOnProductRegisteredCommand): Promise<void> {
    this.creator.run(command.productId, command.totalReviews, command.negativeReviews, command.negativeReviewsThreshold, command.negativeReviewsRoundedPercentage, command.timeWindowStart, command.minimunmReviews);
  }
}