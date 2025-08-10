import Query from "./Query.js";
import Response from "./Response.js";

export default interface QueryHandler<Q extends Query, R extends Response> {
  subscribedTo(): Query;
  handle(query: Q): Promise<R>;
}
