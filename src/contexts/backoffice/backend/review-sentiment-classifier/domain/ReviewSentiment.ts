import StringValueObject from "../../../../../shared/domain/StringValueObject.js"
import ReviewSentimentEnum from "./ReviewSentimentEnum.js";

export default class ReviewSentiment extends StringValueObject{

  constructor(value: string) {
    super(value)
    this.checkIfSentimentIsValid(value)
  }

  public isNegative():boolean {
    return this.value === ReviewSentimentEnum.Negative
  }

  private checkIfSentimentIsValid(value:string) {
    if (
      value !== ReviewSentimentEnum.Negative &&
      value !== ReviewSentimentEnum.Neutral &&
      value !== ReviewSentimentEnum.Positive
    ) {
        throw new Error(`Invalid sentiment <${value}> for ReviewSentiment`)
    }
  }
}