import Uuid from "../../../../../shared/domain/Uuid.js";

export default class ProductReviewsId extends Uuid{
  constructor (readonly value:string){
    super(value)
  }
}