import type ProductReviewsContent from "./ProductReviewsContent.js";
import type ProductReviewsContentEmbedding from "./ProductReviewsContentEmbedding.js";

export default interface ProductReviewsEmbeddingGenerator {
  generate(_:ProductReviewsContent): Promise<ProductReviewsContentEmbedding>;
}