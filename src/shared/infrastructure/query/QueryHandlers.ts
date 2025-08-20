import Query from "../../domain/query/Query.js";
import Response from "../../domain/query/Response.js";
import type QueryHandler from "../../domain/query/QueryHandler.js";
import QueryNotFoundError from "../../domain/query/QueryNotFoundError.js";
import QueryNotRegisteredError from "../../domain/query/QueryNotRegisteredError.js";

export default class QueryHandlers {
  private readonly queryToHandlerRelation = new Map<
    Query,
    QueryHandler<Query, Response>
  >();

  constructor(queryHandlers: QueryHandler<Query, Response>[]) {
    queryHandlers.forEach((queryHandler) => {
      this.set(queryHandler);
    });
  }

  private set(handler: QueryHandler<Query, Response>): void {
    const query = handler.subscribedTo();

    if (!query) throw new QueryNotFoundError(handler);

    this.queryToHandlerRelation.set(handler.subscribedTo(), handler);
  }

  public get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = this.queryToHandlerRelation.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }

    return queryHandler;
  }
}
