import AggregateRoot from "../../../../../shared/domain/AggregateRoot.js";
import ProductReviewsConfigId from "./ProductReviewsConfigId.js";
import ProductReviewsConfigMinimumReviews from "./ProductReviewsConfigMinimumReviews.js";
import ProductReviewsConfigNegativeReviews from "./ProductReviewsConfigNegativeReviews.js";
import ProductReviewsConfigNegativeReviewsRoundedPercentage from "./ProductReviewsConfigNegativeReviewsRoundedPercentage.js";
import ProductReviewsConfigNegativeReviewsThreshold from "./ProductReviewsConfigNegativeReviewsThreshold.js";
import ProductReviewsConfigTimeWindowStart from "./ProductReviewsConfigTimeWindowStart.js";
import ProductReviewsConfigTotalReviews from "./ProductReviewsConfigTotalReviews.js";

export default class ProductReviewsConfig extends AggregateRoot{
  
  constructor (readonly id: ProductReviewsConfigId, public totalReviews: ProductReviewsConfigTotalReviews, 
    public negativeReviews:ProductReviewsConfigNegativeReviews, public negativeReviewsThreshold: ProductReviewsConfigNegativeReviewsThreshold,
    public negativeReviewsRoundedPercentage: ProductReviewsConfigNegativeReviewsRoundedPercentage, public timeWindowStart: ProductReviewsConfigTimeWindowStart,
    public minimumReviews:ProductReviewsConfigMinimumReviews
  ){
      super()
      
  }
  
  public static fromPrimitives(id:string, totalReviews:number, negativeReviews:number, negativeReviewsThreshold:number, negativeReviewsRoundedPercentage:number, timeWindowStart:Date, minimumReviews: number): ProductReviewsConfig {
      return new ProductReviewsConfig(new ProductReviewsConfigId(id), new ProductReviewsConfigTotalReviews(totalReviews), 
      new ProductReviewsConfigNegativeReviews(negativeReviews), new ProductReviewsConfigNegativeReviewsThreshold(negativeReviewsThreshold),
      new ProductReviewsConfigNegativeReviewsRoundedPercentage(negativeReviewsRoundedPercentage), new ProductReviewsConfigTimeWindowStart(timeWindowStart),
      new ProductReviewsConfigMinimumReviews(minimumReviews)
    )
    }
  
    public toPrimitives():  {
    id: string;
    totalReviews: number;
    negativeReviews: number;
    negativeReviewsThreshold: number;
    negativeReviewsRoundedPercentage:number;
    timeWindowStart: string;
    minimumReviews:number;
  } {
      return {
        id: this.id.value,
        totalReviews: this.totalReviews.value,
        negativeReviews: this.negativeReviews.value,
        negativeReviewsThreshold: this.negativeReviewsThreshold.value,
        negativeReviewsRoundedPercentage: this.negativeReviewsRoundedPercentage.value,
        timeWindowStart: this.timeWindowStart.value.toISOString(),
        minimumReviews: this.minimumReviews.value
      }
    }

    public updateNegativeReviewsThreshold(negativeReviewsThreshold:number):void {
      this.negativeReviewsThreshold = new ProductReviewsConfigNegativeReviews(negativeReviewsThreshold)
    }

    public updatetimeWindowStart(timeWindowStart:Date):void {
      this.timeWindowStart = new ProductReviewsConfigTimeWindowStart(timeWindowStart)
    }

    public updateMinimumReviews(minimumReviews:number):void {
      this.minimumReviews = new ProductReviewsConfigMinimumReviews(minimumReviews)
    }

    public updateNegativeReviewsRoundedPercentage(negativeReviewsRoundedPercentage:number):void {
      this.negativeReviewsRoundedPercentage = new ProductReviewsConfigNegativeReviewsRoundedPercentage(negativeReviewsRoundedPercentage)
    }

    public incrementTotalReviewsByOne() {
      const totalReviewsValue = this.totalReviews.value;
      this.totalReviews = new ProductReviewsConfigTotalReviews(totalReviewsValue + 1)
    }

    public incrementNegativeReviewsByOne() {
      const negativeReviewsValue = this.negativeReviews.value;
      this.negativeReviews = new ProductReviewsConfigNegativeReviewsThreshold(negativeReviewsValue + 1)
    }

  }