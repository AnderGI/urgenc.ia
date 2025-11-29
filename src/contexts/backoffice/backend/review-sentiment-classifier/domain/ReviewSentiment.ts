import StringValueObject from "../../../../../shared/domain/StringValueObject.js"
import InvalidReviewSentimentValueError from "./InvalidReviewSentimentValueError.js";
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
      value !== ReviewSentimentEnum.Positive
    ) {
        throw new InvalidReviewSentimentValueError(value)
    }
  }
}