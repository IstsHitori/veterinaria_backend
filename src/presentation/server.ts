import express, { Router } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { Logger } from "@/infraestructure/utils/logger";
import { validationErrorHandler } from "./middlewares/validationHandler";
import { errorHandler } from "./middlewares/errorHandler";

interface Options {
  port: number;
  routes: Router;
  NODE_ENV: string;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly NODE_ENV: string;
  private server: any;

  constructor(options: Options) {
    const { port, routes, NODE_ENV } = options;
    this.port = port;
    this.routes = routes;
    this.NODE_ENV = NODE_ENV;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan(this.NODE_ENV));
    //* Routes
    this.app.use(this.routes);

    //* Error handling
    this.app.use(errorHandler)


    this.server = this.app.listen(this.port, () => {
      Logger.showServerInfo(this.port, this.NODE_ENV);
    });
  }

  async stop() {
    if (this.server) {
      return new Promise<void>((resolve) => {
        this.server.close(() => {
          console.log("Servidor detenido");
          resolve();
        });
      });
    }
  }
}
