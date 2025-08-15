import Command from "../../../../../shared/domain/command/Command.js";

export default class AddProductReviewsCommand extends Command {
  constructor (readonly productReviewsId:string, readonly productId:string, readonly createdAt:Date, readonly reviewContent:string){
    super()
  }
}