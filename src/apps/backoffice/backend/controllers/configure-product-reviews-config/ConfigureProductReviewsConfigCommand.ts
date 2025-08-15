import Command from "../../../../../shared/domain/command/Command.js";

export default class ConfigureProductReviewsConfigCommand extends Command{
  constructor (readonly productId:string, readonly negativeReviewsThreshold:number, readonly timeWindowStart:Date){
    super()
  }
}