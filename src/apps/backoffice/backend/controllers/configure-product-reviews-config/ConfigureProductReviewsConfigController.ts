import ConfigureProductReviewsConfigCommandHandler from "../../../../../contexts/backoffice/backend/product-reviews-config/application/update/ConfigureProductReviewsConfigCommandHandler.js";
import ConfigureProductReviewsConfigCommand from "./ConfigureProductReviewsConfigCommand.js";
import type ConfigureProductReviewsConfigRequest from "./ConfigureProductReviewsConfigRequest.js";


export default class ConfigureProductReviewsConfigController {

  constructor(private readonly configUpdater:ConfigureProductReviewsConfigCommandHandler) {}

  public run(configureProductReviewsConfigRequest:ConfigureProductReviewsConfigRequest): void {
    const command = new ConfigureProductReviewsConfigCommand(configureProductReviewsConfigRequest.productId, configureProductReviewsConfigRequest.negativeThreshold, configureProductReviewsConfigRequest.timeWindowStart, configureProductReviewsConfigRequest.minimumReviews)
    this.configUpdater.handle(command);
    return;
  }
  
}