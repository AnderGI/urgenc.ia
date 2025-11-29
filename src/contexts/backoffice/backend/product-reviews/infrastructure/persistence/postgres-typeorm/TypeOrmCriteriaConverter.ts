/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type FindOptionsWhere,
  ILike,
  Not,
  MoreThan,
  LessThan,
  Equal,
  type FindManyOptions,
} from "typeorm";
import { Operator } from "../../../../../../../shared/domain/criteria/FilterOperator.js";
import type { Filters } from "../../../../../../../shared/domain/criteria/Filters.js";
import type { Filter } from "../../../../../../../shared/domain/criteria/Filter.js";
import type { Criteria } from "../../../../../../../shared/domain/criteria/Criteria.js";
import type { Order } from "../../../../../../../shared/domain/criteria/Order.js";
import { OrderTypes } from "../../../../../../../shared/domain/criteria/OrderType.js";

type TransformerFunction = (filter: Filter) => FindOptionsWhere<any>;

export class TypeOrmCriteriaConverter {
  private transformers: Map<Operator, TransformerFunction>;

  public static create():TypeOrmCriteriaConverter {
    return new TypeOrmCriteriaConverter();
  }

  private constructor() {
    this.transformers = new Map<Operator, TransformerFunction>([
      [Operator.EQUAL, this.equalFilter],
      [Operator.NOT_EQUAL, this.notEqualFilter],
      [Operator.GT, this.greaterThanFilter],
      [Operator.LT, this.lowerThanFilter],
      [Operator.CONTAINS, this.containsFilter],
      [Operator.NOT_CONTAINS, this.notContainsFilter],
      [Operator.COSINE_DISTANCE, this.cosineDistanceFilter]
    ]);
  }

  public convert(criteria: Criteria): FindManyOptions<any> {
    return {
      where: criteria.hasFilters() ? this.generateFilters(criteria.filters): {},
      order: criteria.hasOrders() ? this.generateOrders(criteria.order) : {}
    }
  }

  private generateFilters(filters: Filters): FindOptionsWhere<any> {
    console.log('################# GENERATE FILETRS ################################')
    const where: FindOptionsWhere<any> = {};

    for (const filter of filters.filters) {
      const transformer = this.transformers.get(filter.operator.value);

      if (!transformer) {
        throw new Error(`Unexpected operator ${filter.operator.value}`);
      }

      const partialWhere = transformer(filter);

      Object.assign(where, partialWhere);
    }

    return where;
  }

  private generateOrders(order:Order) {
    const key = order.orderBy.value;
    const value = order.orderType.value === OrderTypes.ASC ? 'ASC' : 'DESC';
    return {
      [key] : value
    };
  }

  private equalFilter(filter: Filter): FindOptionsWhere<any> {
    return { [filter.field.value]: Equal(filter.value.value) };
  }

  private notEqualFilter(filter: Filter): FindOptionsWhere<any> {
    return { [filter.field.value]: Not(filter.value.value) };
  }

  private greaterThanFilter(filter: Filter): FindOptionsWhere<any> {
    return { [filter.field.value]: MoreThan(filter.value.value) };
  }

  private lowerThanFilter(filter: Filter): FindOptionsWhere<any> {
    return { [filter.field.value]: LessThan(filter.value.value) };
  }

  private containsFilter(filter: Filter): FindOptionsWhere<any> {
    return { [filter.field.value]: ILike(`%${filter.value.value}%`) };
  }

  private notContainsFilter(filter: Filter): FindOptionsWhere<any> {
    return { [filter.field.value]: Not(ILike(`%${filter.value.value}%`)) };
  }

  private cosineDistanceFilter(filter:Filter): FindOptionsWhere<any> {
    const MAX_COSINE_DISTANCE = 0.05;
    return {[filter.field.value] : ILike(`<=> ${filter.value.value} < ${MAX_COSINE_DISTANCE}`)}
  }

}
