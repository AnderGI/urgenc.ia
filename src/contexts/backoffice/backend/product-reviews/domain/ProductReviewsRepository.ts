import type { Criteria } from "../../../../../shared/domain/criteria/Criteria.js";
import type { Nullable } from "../../../../../shared/domain/Nullable.js";
import ProductReviews from "./ProductReviews.js";
import ProductReviewsId from "./ProductReviewsId.js";

export default interface ProductReviewsRepository {
  save(_:ProductReviews): Promise<void>;
  search(_:ProductReviewsId): Promise<Nullable<ProductReviews>>;
  matching(criteria:Criteria): Promise<ProductReviews[]>;
}