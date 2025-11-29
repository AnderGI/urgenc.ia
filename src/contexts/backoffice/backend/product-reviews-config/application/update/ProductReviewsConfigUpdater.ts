import type ConfigureProductReviewsConfigCommand from "../../../../../../apps/backoffice/backend/controllers/configure-product-reviews-config/ConfigureProductReviewsConfigCommand.js";
import ProductReviewConfigNotExistsError from "../../domain/ProductReviewConfigNotExistsError.js";
import ProductReviewsConfigId from "../../domain/ProductReviewsConfigId.js";
import type ProductReviewsConfigRepository from "../../domain/ProductReviewsConfigRepository.js";


export default class ProductReviewsConfigUpdater {
  constructor(private readonly repo:ProductReviewsConfigRepository){}
  async run(command: ConfigureProductReviewsConfigCommand) {
    const id = new ProductReviewsConfigId(command.productId);
    const inDatabaseProductReviewConfig = await this.repo.search(id);

    if(!inDatabaseProductReviewConfig) {
      throw new ProductReviewConfigNotExistsError(id)
    }  

    inDatabaseProductReviewConfig.updateNegativeReviewsThreshold(command.negativeReviewsThreshold)
    inDatabaseProductReviewConfig.updatetimeWindowStart(command.timeWindowStart)
    inDatabaseProductReviewConfig.updateMinimumReviews(command.minimumReviews)

    this.repo.save(inDatabaseProductReviewConfig)


  }
}