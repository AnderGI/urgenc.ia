import { Filter } from "./Filter.js";
import { FilterField } from "./FilterField.js";
import { FilterOperator } from "./FilterOperator.js";
import { FilterValue } from "./FilterValue.js";

export default class EmbeddingFilter extends Filter{
  constructor(filterField: FilterField, filterOperator: FilterOperator, filterValue: FilterValue) {
    super(filterField, filterOperator, filterValue)
  }
}