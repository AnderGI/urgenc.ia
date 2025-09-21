import type { Router, Request, Response, NextFunction } from "express";
import type RouteHandler from "../RouterHandler.js";
import type ConfigureProductReviewsConfigController from "../../controllers/configure-product-reviews-config/ConfigureProductReviewsConfigController.js";
import { body, param, validationResult } from "express-validator";
import status from "http-status";


export default class ConfigureProductReviewsConfigRouteHandler implements RouteHandler {
  constructor(private readonly controller: ConfigureProductReviewsConfigController) {}
  register(router: Router): void {
    router.put("/app/productReviewsConfig/:id",       
      param('id').isUUID('4'),
      body('negativeThreshold').isFloat({min: 0, max: 1}).not().isEmpty(),
      body('timeWindowStart').isDate({format: 'YYYY-MM-DD'}),
      body('minimumReviews').isInt({min: 0}).not().isEmpty(),
      (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
          return res.status(status.BAD_REQUEST).send();
        }
        return next();
      },(req: Request, res: Response) => {
      return this.controller.run(req, res);
    });
  }
}
