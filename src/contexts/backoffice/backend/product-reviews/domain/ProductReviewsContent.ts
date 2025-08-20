import StringValueObject from "../../../../../shared/domain/StringValueObject.js";

export default class ProductReviewsContent extends StringValueObject{
  constructor (readonly value:string){
    super(value)
  }
}