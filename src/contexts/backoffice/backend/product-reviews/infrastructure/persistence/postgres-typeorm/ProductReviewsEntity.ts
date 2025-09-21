import { EntitySchema } from "typeorm";
import ProductReviews from "../../../domain/ProductReviews.js";
import ProductReviewsId from "../../../domain/ProductReviewsId.js";
import ValueObjectTransformer from "../../../../../../../shared/infrastructure/persistence/postgres-typeorm/ValueObjectTransformer.js";
import ProductId from "../../../domain/ProductId.js";
import ProductReviewsContent from "../../../domain/ProductReviewsContent.js";
import ProductReviewsPublishedDate from "../../../domain/ProductReviewsPublishedDate.js";
import ProductReviewsContentEmbedding from "../../../domain/ProductReviewsContentEmbedding.js";
import ValueObjectEmbeddingTransformer from "../../../../../../../shared/infrastructure/persistence/postgres-typeorm/ValueObjectEmbeddingTransformer.js";

export const ProductReviewsEntity = new EntitySchema<ProductReviews>({
  name: 'ProductReviews',
  tableName: 'product_reviews',
  target: ProductReviews,
  columns: {
    productReviewsId: {
      type: String,
      name: "product_reviews_id",
      primary: true,
      transformer: ValueObjectTransformer(ProductReviewsId)
    },
    productId: {
      type: String,
      name: "product_id",
      transformer: ValueObjectTransformer(ProductId)
    },
    publishedDate: {
      type: Date,
      name: "published_date",
      transformer: ValueObjectTransformer(ProductReviewsPublishedDate)
    },
    content: {
      type: String,
      transformer: ValueObjectTransformer(ProductReviewsContent)
    },
    contentEmbedding: {
      type: "json",
      name: "embedding",
      nullable: true,
      transformer: ValueObjectEmbeddingTransformer(ProductReviewsContentEmbedding)
    }
  }
});