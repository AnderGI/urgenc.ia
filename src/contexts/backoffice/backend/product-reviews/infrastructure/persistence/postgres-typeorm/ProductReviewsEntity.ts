import { EntitySchema } from "typeorm";
import ProductReviews from "../../../domain/ProductReviews.js";
import ProductReviewsId from "../../../domain/ProductReviewsId.js";
import ValueObjectTransformer from "../../../../../../../shared/infrastructure/persistence/postgres-typeorm/ValueObjectTransformer.js";
import ProductId from "../../../domain/ProductId.js";
import ProductReviewsContent from "../../../domain/ProductReviewsContent.js";
import ProductReviewsPublishedDate from "../../../domain/ProductReviewsPublishedDate.js";

export const ProductReviewsEntity = new EntitySchema<ProductReviews>({
  name: 'ProductReviews',
  tableName: 'product_reviews',
  target: ProductReviews,
  columns: {
    productReviewsId: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(ProductReviewsId)
    },
    productId: {
      type: String,
      transformer: ValueObjectTransformer(ProductId)
    },
    publishedDate: {
      type: Date,
      transformer: ValueObjectTransformer(ProductReviewsPublishedDate)
    },
    content: {
      type: String,
      transformer: ValueObjectTransformer(ProductReviewsContent)
    }
  }
});