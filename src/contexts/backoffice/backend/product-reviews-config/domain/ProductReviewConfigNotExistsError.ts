import type ProductReviewsConfigId from "./ProductReviewsConfigId.js";

export default class ProductReviewConfigNotExistsError extends Error {
  constructor (private readonly id:ProductReviewsConfigId){
    super(`ProductReviewConfig with id <${id.value}> does not exist`)
  }
}