import status from "http-status";
import type { Request, Response } from "express";
import AddProductReviewsCommand from "./AddProductReviewsCommand.js";
import type AddProductReviewsCommandHandler from "../../../../../contexts/backoffice/backend/product-reviews/application/create/AddProductReviewsCommandHandler.js";


export default class AddProductReviewsController {

  constructor(private readonly handler:AddProductReviewsCommandHandler){}

  public run(req: Request, res: Response): void {
    console.log("register#/app/productReviews/:id")
    const data: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      data.push(chunk);
    });

    req.on('end', () => {
      try {
        const body = Buffer.concat(data).toString();
        const { id } = req.params;
        const jsonBody = Object.assign({}, JSON.parse(body), {id});
        console.log(jsonBody)
        const command = new AddProductReviewsCommand(jsonBody.id, jsonBody.idProduct, new Date(jsonBody.createdAt), jsonBody.reviewContent)
        this.handler.handle(command)
        return res.status(status.ACCEPTED).send();
      } catch {
        return res.status(status.BAD_REQUEST).send();
      }
    });
  }
  
}