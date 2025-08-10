import type { Request, Response } from "express";
import status from "http-status";
import z from "zod";
import ProductRegisterer from '../../../../../contexts/backoffice/backend/product/application/register-product/ProductRegisterer.js'
import RegisterProductCommand from "./RegisterProductCommand.js";

export default class ProductPutController {
  private productSchema = z.object({
    id: z.uuid(),
    name: z.string().min(2)
  });

  constructor(private readonly registerer:ProductRegisterer){}

  public run(req: Request, res: Response): void {
    const data: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      data.push(chunk);
    });

    req.on('end', () => {
      try {
        const body = Buffer.concat(data).toString();
        const { id } = req.params;
        const jsonBody = Object.assign({}, JSON.parse(body), {id});
        const result = this.productSchema.safeParse(jsonBody);
        if (!result.success) {
          return res.status(status.UNPROCESSABLE_ENTITY).send();
        }
        this.registerer.register(new RegisterProductCommand(jsonBody.id, jsonBody.name))
        return res.status(status.ACCEPTED).send();
      } catch {
        return res.status(status.BAD_REQUEST).send();
      }
    });
  }
}
