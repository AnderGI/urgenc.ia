import type CommandHandler from "../../../../../../shared/domain/command/CommandHandler.js";
import ConfigureProductReviewsConfigCommand from '../../../../../../apps/backoffice/backend/controllers/configure-product-reviews-config/ConfigureProductReviewsConfigCommand.js'
import Command from "../../../../../../shared/domain/command/Command.js";
import ProductReviewsConfigUpdater from "./ProductReviewsConfigUpdater.js";

export default class ConfigureProductReviewsConfigCommandHandler implements CommandHandler<ConfigureProductReviewsConfigCommand>{
  constructor (private readonly configUpdater:ProductReviewsConfigUpdater){}

  subscribedTo(): Command {
    return ConfigureProductReviewsConfigCommand;
  }
  
  async handle(command: ConfigureProductReviewsConfigCommand): Promise<void> {
    this.configUpdater.run(command)
  }
}