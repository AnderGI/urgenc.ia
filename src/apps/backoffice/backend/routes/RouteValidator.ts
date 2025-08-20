import Route from "./Route.js";

export default interface RouteValidator {
  validate(route: Route): void;
}
