import EmbeddingValueObject from "../../../../../shared/domain/EmbeddingValueObject.js";

export default class ProductReviewsContentEmbedding extends EmbeddingValueObject {
  constructor (readonly value:number[]){
    super(value);
  }

  public static empty(): ProductReviewsContentEmbedding {
    const vector = []
    const nomicDimensions = 768;
    let i = 0
    do {
      vector.push(0)
      i++;
    } while(i < nomicDimensions)

    return new ProductReviewsContentEmbedding(vector)
  }

}