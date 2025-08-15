import Command from "../../../../../../../shared/domain/command/Command.js";

export default class LabelSentimentFromReviewContentCommand extends Command {
  constructor (readonly productId:string, readonly reviewContent:string){
    super()
  }
}