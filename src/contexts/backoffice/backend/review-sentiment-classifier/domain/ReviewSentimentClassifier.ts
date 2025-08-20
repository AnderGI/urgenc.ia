import AggregateRoot from "../../../../../shared/domain/AggregateRoot.js";
import ProductId from "../../product/domain/ProductId.js";
import ReviewContent from "./ReviewContent.js";

export default class ReviewSentimentClassifier extends AggregateRoot{
  constructor (readonly id:ProductId, readonly content:ReviewContent){
    super()
  }
  
  public static fromPrimitives(id:string, content:string): ReviewSentimentClassifier {
    return new ReviewSentimentClassifier(new ProductId(id), new ReviewContent(content))
  }

  toPrimitives() {
    return {
      "id": this.id.value,
      "content": this.content.value
    }
  }


}