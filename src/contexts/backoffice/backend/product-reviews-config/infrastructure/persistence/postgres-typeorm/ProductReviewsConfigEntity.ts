import { EntitySchema } from "typeorm";
import ValueObjectTransformer from '../../../../../../../shared/infrastructure/persistence/postgres-typeorm/ValueObjectTransformer.js'
import ProductReviewsConfig from "../../../domain/ProductReviewsConfig.js";
import ProductReviewsConfigId from "../../../domain/ProductReviewsConfigId.js";
import ProductReviewsConfigTotalReviews from "../../../domain/ProductReviewsConfigTotalReviews.js";
import ProductReviewsConfigNegativeReviews from "../../../domain/ProductReviewsConfigNegativeReviews.js";
import ProductReviewsConfigNegativeReviewsThreshold from "../../../domain/ProductReviewsConfigNegativeReviewsThreshold.js";
import ProductReviewsConfigNegativeReviewsRoundedPercentage from "../../../domain/ProductReviewsConfigNegativeReviewsRoundedPercentage.js";
import ProductReviewsConfigTimeWindowStart from "../../../domain/ProductReviewsConfigTimeWindowStart.js";
import ProductReviewsConfigMinimumReviews from "../../../domain/ProductReviewsConfigMinimumReviews.js";

export const ProductReviewsConfigEntity = new EntitySchema<ProductReviewsConfig>({
  name: 'ProductReviewsConfig',
  tableName: 'product_reviews_config',
  target: ProductReviewsConfig,
  columns: {
    id: {
      type: String,
      primary: true,
      name: "id",
      transformer: ValueObjectTransformer(ProductReviewsConfigId)
    },
    totalReviews: {
      type: Number,
      name: "total_reviews",
      transformer: ValueObjectTransformer(ProductReviewsConfigTotalReviews)
    },
    negativeReviews: {
      type: Number,
      name: "negative_reviews",
      transformer: ValueObjectTransformer(ProductReviewsConfigNegativeReviews)
    },
    negativeReviewsThreshold: {
      type: "decimal",
      name: "negative_reviews_threshold",
      transformer: ValueObjectTransformer(ProductReviewsConfigNegativeReviewsThreshold)
    },
    negativeReviewsRoundedPercentage: {
      type: "decimal",
      name: "negative_reviews_rounded_percentage",
      transformer: ValueObjectTransformer(ProductReviewsConfigNegativeReviewsRoundedPercentage)
    },
    timeWindowStart: {
      type: Date,
      name: "time_window_start",
      transformer: ValueObjectTransformer(ProductReviewsConfigTimeWindowStart)
    },
    minimumReviews: {
      type: Number,
      name: "minimum_reviews",
      transformer: ValueObjectTransformer(ProductReviewsConfigMinimumReviews)
    }
  }
});