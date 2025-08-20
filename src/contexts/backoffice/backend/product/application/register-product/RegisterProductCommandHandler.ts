import RegisterProductCommand from "../../../../../../apps/backoffice/backend/controllers/register-product/RegisterProductCommand.js";
import Command from "../../../../../../shared/domain/command/Command.js";
import type CommandHandler from "../../../../../../shared/domain/command/CommandHandler.js";
import ProductRegisterer from "./ProductRegisterer.js";

export default class RegisterProductCommandHandler implements CommandHandler<RegisterProductCommand>{
  
  constructor (private readonly registerer:ProductRegisterer) {}
  
  subscribedTo(): Command {
    return RegisterProductCommand;
  }

  async handle(command: RegisterProductCommand): Promise<void> {
    return this.registerer.register(command)
  }
}