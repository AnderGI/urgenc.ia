import type { Request, Response } from "express";
import status from "http-status";

export default class ProductPutController {
  public run(req: Request, res: Response): void {
    const data:Buffer[] = [] 
    req.on('data', (_:Buffer) => {
      data.push(_)
    })

    req.on('end', () => {
        const body = Buffer.concat(data).toString();
        const jsonBody = JSON.parse(body);
        console.log(jsonBody);
    })

    res.status(status.ACCEPTED).send();
  }
}


