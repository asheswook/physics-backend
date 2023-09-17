import config from "./utils/config";
import App from "./app";
import { errorHandler } from "./middlewares";

declare global {
  namespace Express {
    interface Request {
      ipaddr: string;
    }
  }
}

const { app } = new App();

app.listen(config.PORT || 3946, () => {
  console.log(`Server listening on : ${config.PORT || 3946}`);
});
