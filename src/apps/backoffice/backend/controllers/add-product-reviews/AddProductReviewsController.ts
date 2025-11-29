import AddProductReviewsCommand from "./AddProductReviewsCommand.js";
import type AddProductReviewsCommandHandler from "../../../../../contexts/backoffice/backend/product-reviews/application/create/AddProductReviewsCommandHandler.js";
import type AddProductReviewsRequest from "./AddProductReviewsRequest.js";


export default class AddProductReviewsController {

  constructor(private readonly handler:AddProductReviewsCommandHandler){}

  public run(addProductReviewsRequest:AddProductReviewsRequest): void {    
    // const command = new AddProductReviewsCommand(addProductReviewsRequest.id, addProductReviewsRequest.idProduct, new Date(body.createdAt), body.reviewContent)
    const command = new AddProductReviewsCommand(addProductReviewsRequest.productReviewId, addProductReviewsRequest.idProduct, addProductReviewsRequest.createdAt, addProductReviewsRequest.reviewContent)
    this.handler.handle(command)
    return;
  }
  
}