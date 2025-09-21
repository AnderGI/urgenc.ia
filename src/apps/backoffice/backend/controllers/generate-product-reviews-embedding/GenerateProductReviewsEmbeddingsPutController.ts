import status from "http-status";
import type { Request, Response } from "express";
import GenerateProductReviewsEmbeddingsCommand from "./GenerateProductReviewsEmbeddingsCommand.js";
import type ProductReviewsEmbeddingGeneratorService from "../../../../../contexts/backoffice/backend/product-reviews/application/generate-embedding/ProductReviewsEmbeddingGeneratorService.js";


export default class GenerateProductReviewsEmbeddingsPutController  {

  constructor(private readonly _:ProductReviewsEmbeddingGeneratorService){}

  public run(req: Request, res: Response): void {
    const { id } = req.params;
    const {body} = req;
    const command = new GenerateProductReviewsEmbeddingsCommand(id, body.content);
    this._.run(command);
    res.status(status.ACCEPTED).send();
    return;
  }
  
}