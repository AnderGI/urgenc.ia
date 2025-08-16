import Command from "../../../../../../../shared/domain/command/Command.js";

export default class CreateProductReviewsConfigOnProductRegisteredCommand extends Command {
  private static readonly CREATION_DEFAULT_VALUE = 0;  
  readonly totalReviews: number = CreateProductReviewsConfigOnProductRegisteredCommand.CREATION_DEFAULT_VALUE;
  readonly negativeReviews: number = CreateProductReviewsConfigOnProductRegisteredCommand.CREATION_DEFAULT_VALUE; 
  readonly negativeReviewsThreshold:number = CreateProductReviewsConfigOnProductRegisteredCommand.CREATION_DEFAULT_VALUE; 
  readonly negativeReviewsRoundedPercentage:number = CreateProductReviewsConfigOnProductRegisteredCommand.CREATION_DEFAULT_VALUE; 
  readonly timeWindowStart:Date = new Date();
  readonly minimunmReviews:number = CreateProductReviewsConfigOnProductRegisteredCommand.CREATION_DEFAULT_VALUE;

  constructor (readonly productId:string){
    super()
  }
}