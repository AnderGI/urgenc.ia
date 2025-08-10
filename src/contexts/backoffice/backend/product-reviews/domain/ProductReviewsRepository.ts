import type { Nullable } from "../../../../../shared/domain/Nullable";
import ProductReviews from "./ProductReviews";
import ProductReviewsId from "./ProductReviewsId";

export default interface ProductReviewsRepository {
  save(_:ProductReviews): Promise<void>;
  search(_:ProductReviewsId): Promise<Nullable<ProductReviews>>
}