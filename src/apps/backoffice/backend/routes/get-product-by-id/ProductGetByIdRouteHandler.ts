import type { Router, Request, Response } from "express";
import type RouteHandler from "../RouterHandler.js";
import type ProductGetByIdController from "../../controllers/get-product-by-id/ProductGetByIdController.js";

export default class ProductGetByIdRouteHandler implements RouteHandler {
  constructor(private readonly controller: ProductGetByIdController) {}

  register(router: Router): void {
    router.get("/app/products/:id", (req: Request, res: Response) => {
      return this.controller.run(req, res);
    });
  }
}
