import type { Router, Request, Response, NextFunction } from "express";
import type RouteHandler from "../RouterHandler.js";
import type ProductPutController from "../../controllers/register-product/ProductPutController.js";
import { body, param, validationResult } from "express-validator";
import status from "http-status";
import RegisterProductRequest from "../../controllers/register-product/RegisterProductRequest.js";

export default class ProductPutRouteHandler implements RouteHandler {

  constructor(private readonly controller: ProductPutController) {}
  register(router: Router): void {
    router.put("/app/products/:id", 
      param('id').isUUID('4'),
      body('name').isString().isLength({min: 2}).not().isEmpty(),
      (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
          return res.status(status.BAD_REQUEST).send();
        }
        return next();
      },
      (req: Request, res: Response) => {
        const {id} = req.params;
        const {name} = req.body;
        this.controller.run(new RegisterProductRequest(id, name));
        res.status(status.ACCEPTED).send();
        return;
    });
  }
}
