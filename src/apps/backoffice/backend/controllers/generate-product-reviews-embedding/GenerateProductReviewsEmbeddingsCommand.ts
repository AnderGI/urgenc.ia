import Command from "../../../../../shared/domain/command/Command.js";

export default class GenerateProductReviewsEmbeddingsCommand extends Command {
  constructor (readonly productReviewsId:string, readonly productReviewContent:string){
    super()
  }
}