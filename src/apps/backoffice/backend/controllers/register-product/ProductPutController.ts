import type { Request, Response } from "express";
import status from "http-status";
import RegisterProductCommand from "./RegisterProductCommand.js";
import type RegisterProductCommandHandler from "../../../../../contexts/backoffice/backend/product/application/register-product/RegisterProductCommandHandler.js";

export default class ProductPutController {

  constructor(private readonly registerer:RegisterProductCommandHandler){}

  public run(req: Request, res: Response): void {
      const { id } = req.params;
      const { body } = req;
      this.registerer.handle(new RegisterProductCommand(id, body.name))
      res.status(status.ACCEPTED).send();
      return;
    }
}
