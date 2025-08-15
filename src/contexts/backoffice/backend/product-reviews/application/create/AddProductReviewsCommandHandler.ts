import AddProductReviewsCommand from "../../../../../../apps/backoffice/backend/controllers/add-product-reviews/AddProductReviewsCommand";
import Command from "../../../../../../shared/domain/command/Command";
import CommandHandler from '../../../../../../shared/domain/command/CommandHandler.js'
import ProductReviewsCreator from "./ProductReviewsCreator";

export default class AddProductReviewsCommandHandler implements CommandHandler<AddProductReviewsCommand>{
  
  constructor (private readonly creator:ProductReviewsCreator){}
  
  subscribedTo(): Command {
    return AddProductReviewsCommand;
  }

  async handle(command: AddProductReviewsCommand): Promise<void> {
    this.creator.run(command)
  }
}