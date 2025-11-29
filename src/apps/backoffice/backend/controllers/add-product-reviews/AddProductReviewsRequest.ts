export default class AddProductReviewsRequest {
  constructor (readonly productReviewId:string, readonly idProduct:string, readonly createdAt:Date, readonly reviewContent:string){}
}