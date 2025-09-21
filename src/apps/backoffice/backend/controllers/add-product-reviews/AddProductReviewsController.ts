import status from "http-status";
import type { Request, Response } from "express";
import AddProductReviewsCommand from "./AddProductReviewsCommand.js";
import type AddProductReviewsCommandHandler from "../../../../../contexts/backoffice/backend/product-reviews/application/create/AddProductReviewsCommandHandler.js";


export default class AddProductReviewsController {

  constructor(private readonly handler:AddProductReviewsCommandHandler){}

  public run(req: Request, res: Response): void {
    console.log("register#/app/productReviews/:id")
    
    const { id } = req.params;
    const { body } = req;
    const command = new AddProductReviewsCommand(id, body.idProduct, new Date(body.createdAt), body.reviewContent)
    this.handler.handle(command)
    res.status(status.ACCEPTED).send();
    return;
  }
  
}