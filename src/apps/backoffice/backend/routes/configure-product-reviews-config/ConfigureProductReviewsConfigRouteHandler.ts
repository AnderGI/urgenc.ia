import type { Router, Request, Response } from "express";
import type RouteHandler from "../RouterHandler.js";
import type ConfigureProductReviewsConfigController from "../../controllers/configure-product-reviews-config/ConfigureProductReviewsConfigController.js";


export default class ConfigureProductReviewsConfigRouteHandler implements RouteHandler {
  constructor(private readonly controller: ConfigureProductReviewsConfigController) {}

  register(router: Router): void {
    router.put("/app/productReviewsConfig/:id", (req: Request, res: Response) => {
      return this.controller.run(req, res);
    });
  }
}
