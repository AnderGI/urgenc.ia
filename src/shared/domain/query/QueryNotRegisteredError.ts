import Query from "./Query.js";

export default class QueryNotRegisteredError extends Error {
  constructor(query: Query) {
    super(
      `The query <${query.constructor.name}> hasn't a command handler associated`,
    );
  }
}
