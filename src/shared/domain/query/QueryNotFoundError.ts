import Query from "./Query.js";
import Response from "./Response.js";
import type QueryHandler from "./QueryHandler.js";

export default class QueryNotFoundError extends Error {
  constructor(handler: QueryHandler<Query, Response>) {
    super(
      `The query hasn't been found in the handlers <${handler.constructor.name}> suscribedTo method`,
    );
  }
}
