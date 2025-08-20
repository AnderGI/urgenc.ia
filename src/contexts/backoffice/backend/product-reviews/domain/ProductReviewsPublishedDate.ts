import DateValueObject from "../../../../../shared/domain/DateValueObject.js";

export default class ProductReviewsPublishedDate extends DateValueObject{
  constructor (readonly value:Date){
    super(value)
  }
}