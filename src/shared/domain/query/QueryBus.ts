import Query from "./Query.js";
import Response from "./Response.js";

export default interface QueryBus {
  ask<Q extends Query, R extends Response>(query: Q): Promise<R>;
}
