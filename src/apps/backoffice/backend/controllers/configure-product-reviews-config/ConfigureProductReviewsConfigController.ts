import status from "http-status";
import z from "zod";
import type { Request, Response } from "express";
import ConfigureProductReviewsConfigCommandHandler from "../../../../../contexts/backoffice/backend/product-reviews-config/application/update/ConfigureProductReviewsConfigCommandHandler.js";
import ConfigureProductReviewsConfigCommand from "./ConfigureProductReviewsConfigCommand.js";


export default class ConfigureProductReviewsConfigController {
  private configureProductReviewsConfigSchema = z.object({
      id: z.uuid(),
      negativeThreshold: z.number().nonnegative().lte(1).gte(0),
      timeWindowStart: z.iso.date(),
      minimumReviews: z.number().gt(0)
    });


  constructor(private readonly configUpdater:ConfigureProductReviewsConfigCommandHandler) {}

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
        console.log(jsonBody)
        const result = this.configureProductReviewsConfigSchema.safeParse(jsonBody);
        if (!result.success) {
          return res.status(status.UNPROCESSABLE_ENTITY).send();
        }
        const command = new ConfigureProductReviewsConfigCommand(jsonBody.id, jsonBody.negativeThreshold, jsonBody.timeWindowStart, jsonBody.minimumReviews)
        this.configUpdater.handle(command);
        return res.status(status.ACCEPTED).send();
      } catch {
        return res.status(status.BAD_REQUEST).send();
      }
    });
  }
  
}