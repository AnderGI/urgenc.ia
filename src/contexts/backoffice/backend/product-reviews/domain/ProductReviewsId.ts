import Uuid from "../../../../../shared/domain/Uuid";

export default class ProductReviewsId extends Uuid{
  constructor (readonly value:string){
    super(value)
  }
}