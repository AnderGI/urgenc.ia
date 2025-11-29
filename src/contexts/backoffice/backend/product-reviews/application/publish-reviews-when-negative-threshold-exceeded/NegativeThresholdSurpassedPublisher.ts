import NegativeReviewsFromDateOfProduct from "../../domain/NegativeReviewsFromDateOfProduct.js";
import type ProductReviewsRepository from "../../domain/ProductReviewsRepository.js";

export default class NegativeThresholdSurpassedPublisher {
  
  constructor (private readonly repo:ProductReviewsRepository){}
  
  public async run(productId:string, minimumDate: Date):Promise<void> {
    console.log("############################ NegativeReviewsFromDateOfProduct ###############################")
    const data = await this.repo.matching(new NegativeReviewsFromDateOfProduct(productId, minimumDate))
    console.log(data)
  }
}