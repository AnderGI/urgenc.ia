import type { Router, Request, Response, NextFunction } from "express";
import type RouteHandler from "../RouterHandler.js";
import type AddProductReviewsController from "../../controllers/add-product-reviews/AddProductReviewsController.js";
import { body, param, validationResult } from "express-validator";
import status from "http-status";
import AddProductReviewsRequest from "../../controllers/add-product-reviews/AddProductReviewsRequest.js";


export default class AddProductReviewsRouteHandler implements RouteHandler {
  constructor(private readonly controller: AddProductReviewsController) {}

  register(router: Router): void {
    router.put("/app/productReviews/:id",       
      param('id').isUUID('4'),
      body('idProduct').isUUID('4'),
      body('createdAt').isDate({format: 'YYYY-MM-DD'}).notEmpty(),
      body('reviewContent').isString().notEmpty(),
      (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
          return res.status(status.BAD_REQUEST).send();
        }
        return next();
      },(req: Request, res: Response) => {
      const { id } = req.params;
      const { idProduct, createdAt, reviewContent } = req.body;
      // body.idProduct, new Date(body.createdAt), body.reviewContent
      this.controller.run(new AddProductReviewsRequest(id, idProduct, new Date(createdAt), reviewContent));
      res.status(status.ACCEPTED).send();
      return;
    });
  }
}
