export default class ConfigureProductReviewsConfigRequest {
  constructor (readonly productId:string,readonly negativeThreshold:number, readonly timeWindowStart:Date, readonly minimumReviews:number){}
}