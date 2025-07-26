import type { Request, Response } from "express";
import status from "http-status";

export default class ProductPutController {
  public run(req: Request, res: Response): void {
    res.status(status.ACCEPTED).send();
  }
}


