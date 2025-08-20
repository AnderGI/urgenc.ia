import AddProductReviewsCommand from "../../../../../../apps/backoffice/backend/controllers/add-product-reviews/AddProductReviewsCommand.js";
import Command from "../../../../../../shared/domain/command/Command.js";
import type CommandHandler from '../../../../../../shared/domain/command/CommandHandler.js'
import ProductReviewsCreator from "./ProductReviewsCreator.js";

export default class AddProductReviewsCommandHandler implements CommandHandler<AddProductReviewsCommand>{
  
  constructor (private readonly creator:ProductReviewsCreator){}
  
  subscribedTo(): Command {
    return AddProductReviewsCommand;
  }

  async handle(command: AddProductReviewsCommand): Promise<void> {
    this.creator.run(command)
  }
}