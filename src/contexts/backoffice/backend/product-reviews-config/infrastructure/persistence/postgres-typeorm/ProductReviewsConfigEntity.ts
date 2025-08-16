import { EntitySchema } from "typeorm";
import ValueObjectTransformer from '../../../../../../../shared/infrastructure/persistence/postgres-typeorm/ValueObjectTransformer.js'
import ProductReviewsConfig from "../../../domain/ProductReviewsConfig.js";
import ProductReviewsConfigId from "../../../domain/ProductReviewsConfigId.js";
import ProductReviewsConfigTotalReviews from "../../../domain/ProductReviewsConfigTotalReviews.js";
import ProductReviewsConfigNegativeReviews from "../../../domain/ProductReviewsConfigNegativeReviews.js";
import ProductReviewsConfigNegativeReviewsThreshold from "../../../domain/ProductReviewsConfigNegativeReviewsThreshold.js";
import ProductReviewsConfigNegativeReviewsRoundedPercentage from "../../../domain/ProductReviewsConfigNegativeReviewsRoundedPercentage.js";
import ProductReviewsConfigTimeWindowStart from "../../../domain/ProductReviewsConfigTimeWindowStart.js";
import { number } from "zod";
import ProductReviewsConfigMinimumReviews from "../../../domain/ProductReviewsConfigMinimumReviews.js";

export const ProductReviewsConfigEntity = new EntitySchema<ProductReviewsConfig>({
  name: 'ProductReviewsConfig',
  tableName: 'product_reviews_config',
  target: ProductReviewsConfig,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(ProductReviewsConfigId)
    },
    totalReviews: {
      type: Number,
      transformer: ValueObjectTransformer(ProductReviewsConfigTotalReviews)
    },
    negativeReviews: {
      type: Number,
      transformer: ValueObjectTransformer(ProductReviewsConfigNegativeReviews)
    },
    negativeReviewsThreshold: {
      type: "decimal",
      transformer: ValueObjectTransformer(ProductReviewsConfigNegativeReviewsThreshold)
    },
    negativeReviewsRoundedPercentage: {
      type: "decimal",
      transformer: ValueObjectTransformer(ProductReviewsConfigNegativeReviewsRoundedPercentage)
    },
    timeWindowStart: {
      type: Date,
      transformer: ValueObjectTransformer(ProductReviewsConfigTimeWindowStart)
    },
    minimumReviews: {
      type: Number,
      transformer: ValueObjectTransformer(ProductReviewsConfigMinimumReviews)
    }
  }
});