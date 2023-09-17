import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as helmet from "helmet";
import * as bearerToken from "express-bearer-token";
import { ipLogger, errorHandler, InjectionPreventor } from "./middlewares";
import { route } from "./routes";
import config from "./utils/config";
import * as moment from "moment";

const corsOptions = {
  origin: "*",
};

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.connectMongoDB();
    this.initializeRouter();
    this.initializeErrorHandlers();
  }

  private initializeRouter() {
    route(this.app);
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors(corsOptions));
    this.app.use(express.json({ limit: "100mb" }));
    this.app.use(express.urlencoded({ limit: "100mb", extended: true }));
    this.app.use(
      bearerToken({
        headerKey: "Bearer",
        reqKey: "token",
      })
    );
    this.app.use(ipLogger);
    this.app.use(InjectionPreventor);
    moment.locale("ko");
    console.log("middleware initialized - OK");
  }

  private initializeErrorHandlers() {
    this.app.use(errorHandler);
    console.log("error handler initialized - OK");
  }

  private connectMongoDB() {
    const { MONGO_URL } = config;
    const mongooseOption = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    mongoose.connect(MONGO_URL);
    console.log("mongoDB - CONNECTION ESTABLISHED");
  }
}

export default App;
