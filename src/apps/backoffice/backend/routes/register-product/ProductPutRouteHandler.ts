import type { Router, Request, Response } from "express";
import type RouteHandler from "../RouterHandler.js";
import type ProductPutController from "../../controllers/register-product/ProductPutController.js";

export default class ProductPutRouteHandler implements RouteHandler {
  constructor(private readonly controller: ProductPutController) {}

  register(router: Router): void {
    router.put("/app/products/:id", (req: Request, res: Response) => {
      return this.controller.run(req, res);
    });
  }
}
