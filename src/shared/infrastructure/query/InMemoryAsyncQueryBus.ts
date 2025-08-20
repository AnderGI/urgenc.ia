import Query from "../../domain/query/Query.js";
import type QueryBus from "../../domain/query/QueryBus.js";
import Response from "../../domain/query/Response.js";
import QueryHandlers from "./QueryHandlers.js";

export default class InMemoryAsyncQueryBus implements QueryBus {
  constructor(private queryHandlers: QueryHandlers) {}

  async ask<Q extends Query, R extends Response>(query: Q): Promise<R> {
    const queryHandler = this.queryHandlers.get(query);

    return (await queryHandler.handle(query)) as Promise<R>;
  }
}
