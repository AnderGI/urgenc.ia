import type GenerateProductReviewsEmbeddingsCommand from "../../../../../../apps/backoffice/backend/controllers/generate-product-reviews-embedding/GenerateProductReviewsEmbeddingsCommand.js";
import type ProductReviewsEmbeddingGenerator from "../../domain/ProductReviewsEmbeddingGenerator.js";
import type ProductReviewsRepository from "../../domain/ProductReviewsRepository.js";
import ProductReviewsId from "../../domain/ProductReviewsId.js";
import ProductReviewsContent from "../../domain/ProductReviewsContent.js";

export default class ProductReviewsEmbeddingGeneratorService {

  constructor(private readonly _:ProductReviewsEmbeddingGenerator, private readonly repo:ProductReviewsRepository) {}
  
  public async run(_:GenerateProductReviewsEmbeddingsCommand):Promise<void> {

    const inDatabase = await this.repo.search(new ProductReviewsId(_.productReviewsId))

    if(!inDatabase) {
      console.log(`no product review with id <${_.productReviewsId}>`)
      throw new Error(`no product review with id <${_.productReviewsId}>`)
    }
    
    const data = await this._.generate(new ProductReviewsContent(_.productReviewContent));
    inDatabase.updateContentEmbedding(data.value)
    await this.repo.save(inDatabase)

    return;
  }
}