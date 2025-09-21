import type { Router, Request, Response, NextFunction } from "express";
import type RouteHandler from "../RouterHandler.js";
import status from "http-status";
import type GenerateProductReviewsEmbeddingsPutController from "../../controllers/generate-product-reviews-embedding/GenerateProductReviewsEmbeddingsPutController.js";
import { body, param, validationResult } from "express-validator";


export default class GenerateProductReviewsEmbeddingsRouteHandler implements RouteHandler {
  constructor(private readonly controller:GenerateProductReviewsEmbeddingsPutController){}
  register(router: Router): void {
    router.post("/app/productReviews/:id/embeddings",       
      param('id').isUUID('4'),
      body('content').isString().notEmpty(),
      (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
          return res.status(status.BAD_REQUEST).send();
        }
        return next();
      },
      (req: Request, res: Response) => {
      console.log("/app/productReviews/:id/embeddings")
      this.controller.run(req, res);
    });
  }
}
