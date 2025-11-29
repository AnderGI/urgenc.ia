import RegisterProductCommand from "./RegisterProductCommand.js";
import type RegisterProductCommandHandler from "../../../../../contexts/backoffice/backend/product/application/register-product/RegisterProductCommandHandler.js";
import type RegisterProductRequest from "./RegisterProductRequest.js";

export default class ProductPutController {

  constructor(private readonly registerProductCommandHandler:RegisterProductCommandHandler){}

  public run(_:RegisterProductRequest): void {
      this.registerProductCommandHandler.handle(new RegisterProductCommand(_.productId, _.productName))
      return;
    }
}
