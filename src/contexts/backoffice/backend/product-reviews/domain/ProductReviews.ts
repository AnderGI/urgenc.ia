import AggregateRoot from '../../../../../shared/domain/AggregateRoot.js'
import ProductReviewsPublishedDate from "./ProductReviewsPublishedDate.js";
import ProductReviewsId from "./ProductReviewsId.js";
import ProductReviewsContent from "./ProductReviewsContent.js";
import ProductId from './ProductId.js';
import ProductReviewsContentEmbedding from './ProductReviewsContentEmbedding.js';
import ReviewSentiment from '../../review-sentiment-classifier/domain/ReviewSentiment.js';
import ReviewSentimentEnum from '../../review-sentiment-classifier/domain/ReviewSentimentEnum.js';

export default class ProductReviews extends AggregateRoot{
  constructor (  readonly productReviewsId: ProductReviewsId, readonly productId: ProductId, 
    readonly publishedDate: ProductReviewsPublishedDate, readonly content: ProductReviewsContent,
    public contentEmbedding: ProductReviewsContentEmbedding,
    public sentiment: ReviewSentiment
){
    super()
  }

  public updateContentEmbedding(vector:number[]):void {
      this.contentEmbedding = new ProductReviewsContentEmbedding(vector)
  }

  public updateToNegativeReview():void {
      this.sentiment = new ReviewSentiment(ReviewSentimentEnum.Negative);
  }

  public static fromPrimitives(productReviewsId: string, productId: string, 
  publishedDate:Date,
  content:string, vector:number[], sentiment:string): ProductReviews {
    return new ProductReviews(new ProductReviewsId(productReviewsId), new ProductId(productId),
  new ProductReviewsPublishedDate(publishedDate), new ProductReviewsContent(content),
    new ProductReviewsContentEmbedding(vector), new ReviewSentiment(sentiment)
)
  }

  public toPrimitives():  {
  productReviewsId: string;
  productId: string;
  publishedDate:string;
  content:string;
  sentiment:string;
} {
    return {
      productReviewsId: this.productReviewsId.value,
      productId: this.productId.value,
      publishedDate: this.publishedDate.value.toISOString(),
      content: this.content.value,
      sentiment: this.sentiment.value
    }
  }
}