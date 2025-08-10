import AggregateRoot from "../../../../../shared/domain/AggregateRoot.js";
import ProductReviewsConfigId from "./ProductReviewsConfigId.js";
import ProductReviewsConfigNegativeReviews from "./ProductReviewsConfigNegativeReviews.js";
import ProductReviewsConfigNegativeReviewsRoundedPercentage from "./ProductReviewsConfigNegativeReviewsRoundedPercentage.js";
import ProductReviewsConfigNegativeReviewsThreshold from "./ProductReviewsConfigNegativeReviewsThreshold.js";
import ProductReviewsConfigTimeWindowStart from "./ProductReviewsConfigTimeWindowStart.js";
import ProductReviewsConfigTotalReviews from "./ProductReviewsConfigTotalReviews.js";

export default class ProductReviewsConfig extends AggregateRoot{
  
  constructor (readonly id: ProductReviewsConfigId, public totalReviews: ProductReviewsConfigTotalReviews, 
    readonly negativeReviews:ProductReviewsConfigNegativeReviews, public negativeReviewsThreshold: ProductReviewsConfigNegativeReviewsThreshold,
    readonly negativeReviewsRoundedPercentage: ProductReviewsConfigNegativeReviewsRoundedPercentage, public timeWindowStart: ProductReviewsConfigTimeWindowStart
  ){
      super()
      
  }
  
  public static fromPrimitives(id:string, totalReviews:number, negativeReviews:number, negativeReviewsThreshold:number, negativeReviewsRoundedPercentage:number, timeWindowStart:Date): ProductReviewsConfig {
      return new ProductReviewsConfig(new ProductReviewsConfigId(id), new ProductReviewsConfigTotalReviews(totalReviews), 
      new ProductReviewsConfigNegativeReviews(negativeReviews), new ProductReviewsConfigNegativeReviewsThreshold(negativeReviewsThreshold),
      new ProductReviewsConfigNegativeReviewsRoundedPercentage(negativeReviewsRoundedPercentage), new ProductReviewsConfigTimeWindowStart(timeWindowStart)
    )
    }
  
    public toPrimitives():  {
    id: string;
    totalReviews: number;
    negativeReviews: number;
    negativeReviewsThreshold: number;
    negativeReviewsRoundedPercentage:number;
    timeWindowStart: string;
  } {
      return {
        id: this.id.value,
        totalReviews: this.totalReviews.value,
        negativeReviews: this.negativeReviews.value,
        negativeReviewsThreshold: this.negativeReviewsThreshold.value,
        negativeReviewsRoundedPercentage: this.negativeReviewsRoundedPercentage.value,
        timeWindowStart: this.timeWindowStart.value.toISOString()
      }
    }

    public updateNegativeReviewsThreshold(_:ProductReviewsConfigNegativeReviewsThreshold):void {
      this.negativeReviewsThreshold = _
    }

    public updatetimeWindowStart(_:ProductReviewsConfigTimeWindowStart):void {
      this.timeWindowStart = _
    }

    public incrementTotalReviewsByOne() {
      const totalReviewsValue = this.totalReviews.value;
      this.totalReviews = new ProductReviewsConfigTotalReviews(totalReviewsValue + 1)
    }

  }