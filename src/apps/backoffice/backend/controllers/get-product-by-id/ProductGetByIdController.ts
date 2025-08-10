import z from "zod";
import type { Request, Response } from "express";
import status from "http-status";
import FindProductByIdQuery from "./FindProductByIdQuery.js";
import type FindProductByIdQueryHandler from "../../../../../contexts/backoffice/backend/product/application/find-by-id/FindProductByIdQueryHandler.js";

export default class ProductGetByIdController {
  private productSchema = z.uuid()

  constructor(private readonly handler:FindProductByIdQueryHandler){}

  public async run(req: Request, res: Response): Promise<void> {
    const {id} = req.params;
    const result = this.productSchema.safeParse(id);
    if (!result.success) {
      res.status(status.UNPROCESSABLE_ENTITY).send();
      return;
    }
    const data = await this.handler.handle(new FindProductByIdQuery(id))
    res.status(status.ACCEPTED).json(data);
    return;
  }
  
}