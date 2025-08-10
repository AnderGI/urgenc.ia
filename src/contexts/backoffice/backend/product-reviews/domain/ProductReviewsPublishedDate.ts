import DateValueObject from "../../../../../shared/domain/DateValueObject";

export default class ProductReviewsPublishedDate extends DateValueObject{
  constructor (readonly value:Date){
    super(value)
  }
}