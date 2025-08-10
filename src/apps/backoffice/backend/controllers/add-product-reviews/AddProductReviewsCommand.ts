export default class AddProductReviewsCommand {
  constructor (readonly productReviewsId:string, readonly productId:string, readonly createdAt:Date, readonly reviewContent:string){}
}