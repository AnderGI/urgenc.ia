import { Nullable } from "../../../../../shared/domain/Nullable.js";
import ProductReviewsConfig from "./ProductReviewsConfig.js";
import ProductReviewsConfigId from "./ProductReviewsConfigId.js";

export default interface ProductReviewsConfigRepository {
  save(_:ProductReviewsConfig): Promise<void>;
  search(_:ProductReviewsConfigId): Promise<Nullable<ProductReviewsConfig>>;
}