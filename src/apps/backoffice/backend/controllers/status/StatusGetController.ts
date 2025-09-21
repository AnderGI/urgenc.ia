import type { Request, Response } from "express";
import status from "http-status";

export default class StatusGetController {
  public run(req: Request, res: Response): void {
    console.log('llega peticiion de estatus')
    res.status(status.OK).send();
  }
}
