import { Router } from "express";
import type RouteHandler from "./RouterHandler.js";

export default class RouteHandlers {
  constructor(private readonly routeHAndlers: RouteHandler[]) {}

  registerRoutes(router: Router) {
    this.routeHAndlers.forEach((_) => {
      _.register(router);
    });
  }
}
