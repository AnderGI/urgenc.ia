import RegisterProductCommand from "../../../../../../apps/backoffice/backend/controllers/register-product/RegisterProductCommand";
import Command from "../../../../../../shared/domain/command/Command";
import CommandHandler from "../../../../../../shared/domain/command/CommandHandler";
import ProductRegisterer from "./ProductRegisterer";

export default class RegisterProductCommandHandler implements CommandHandler<RegisterProductCommand>{
  
  constructor (private readonly registerer:ProductRegisterer) {}
  
  subscribedTo(): Command {
    return RegisterProductCommand;
  }

  async handle(command: RegisterProductCommand): Promise<void> {
    return this.registerer.register(command)
  }
}