import type { Filters } from "./Filters.js";
import type { Order } from "./Order.js";

export class Criteria {
  readonly filters: Filters;
  readonly order: Order;


  constructor(filters: Filters, order: Order) {
    this.filters = filters;
    this.order = order;
  }

  public hasFilters():boolean {
    return !this.filters.isEmpty();
  }

  public hasOrders():boolean {
    return this.order.hasOrder()
  }

}