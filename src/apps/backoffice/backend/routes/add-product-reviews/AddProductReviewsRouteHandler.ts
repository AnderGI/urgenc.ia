import type { Router, Request, Response } from "express";
import type RouteHandler from "../RouterHandler.js";
import type AddProductReviewsController from "../../controllers/add-product-reviews/AddProductReviewsController.js";


export default class AddProductReviewsRouteHandler implements RouteHandler {
  constructor(private readonly controller: AddProductReviewsController) {}

  register(router: Router): void {
    router.put("/app/productReviews/:id", (req: Request, res: Response) => {
      console.log("register#/app/productReviews/:id")
      return this.controller.run(req, res);
    });
  }
}
