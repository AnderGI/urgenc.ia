  import express, { type NextFunction, Router, type Request, type Response } from "express";
  import { Server } from "http";
  import type RouteValidator from "./routes/RouteValidator.js";
  import RouteHandlers from "./routes/RouteHandlers.js";
  import Route from "./routes/Route.js";
  import status from "http-status";

  export default class ExpressHttpServer {
    private readonly express: express.Express;
    private readonly port: string;
    private server!: Server;
    private readonly router: express.Router;
    constructor(
      private readonly routeValidator: RouteValidator,
      private readonly routeHandlers: RouteHandlers,
    ) {
      this.port = "5000";
      this.express = express();
      
      this.express.use((req:Request, res:Response, next:NextFunction) => {
        const ACCEPTED_COMMAND_QUERY_HTTP_METHOD = ["PUT", "GET", "POST"];
        const IS_VALID_METHOD = ACCEPTED_COMMAND_QUERY_HTTP_METHOD.includes(req.method);
        if(!IS_VALID_METHOD) {
          console.log('no es un metodod valido')
          return res.status(status.BAD_REQUEST).json({"mssg": "Not accepted method"}).end()
        }
        return next();
      })
      this.express.use(express.json())
      this.router = Router();
      this.express.use(this.router);
      this.express.disable("x-powered-by");
    }

    async start(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.server = this.express.listen(parseInt(this.port, 10), '0.0.0.0', (err) => {
          if (err) {
            reject(err);
          }
          console.log(`Server listening at http://localhost:${this.port}`);
          console.log("  Press CTRL-C to stop\n");
          resolve();
        });
      });
    }

    registerRoutes(): void {
      this.routeHandlers.registerRoutes(this.router);
    }

    async stop(): Promise<void> {
      return new Promise((resolve, reject) => {
        if (this.server) {
          this.server.close((error) => {
            if (error) {
              reject(error);

              return;
            }

            resolve();
          });
        }

        resolve();
      });
    }

    private validateRouteStructureMiddleware(
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      try {
        this.routeValidator.validate(new Route(req.path));
        next();
      } catch (error) {
        res.status(status.BAD_REQUEST).json({
          error: "InvalidRoute",
          message: (error as Error).message,
          path: req.path,
        });
      }
    }
  }
