import { Criteria } from "../../../../../shared/domain/criteria/Criteria.js";
import { Filter } from "../../../../../shared/domain/criteria/Filter.js";
import { Order } from "../../../../../shared/domain/criteria/Order.js";
import { Filters } from "../../../../../shared/domain/criteria/Filters.js";
import { FilterField } from "../../../../../shared/domain/criteria/FilterField.js";
import { FilterOperator, Operator } from "../../../../../shared/domain/criteria/FilterOperator.js";
import { FilterValue } from "../../../../../shared/domain/criteria/FilterValue.js";
import ReviewSentimentEnum from "../../review-sentiment-classifier/domain/ReviewSentimentEnum.js";

export default class NegativeReviewsFromDateOfProduct extends Criteria {
  constructor (productId:string, minimumDate:Date, ){
    // TODO the fields are correlated to the typeorm entity think of someway of decoupling that
    super(new Filters([
      new Filter(
        new FilterField('sentiment'),
        new FilterOperator(Operator.EQUAL),
        new FilterValue(ReviewSentimentEnum.Negative)
      ),
      new Filter(
        new FilterField('productId'), 
        new FilterOperator(Operator.EQUAL),
        new FilterValue(productId)
      ),
      new Filter(
        new FilterField('publishedDate'), 
        new FilterOperator(Operator.GT),
        new FilterValue(minimumDate.toString())
      )
    ]), Order.none())
  }
}