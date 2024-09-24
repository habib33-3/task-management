import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import env from "../config/env";
import swaggerDoc from "../config/swagger";
import { globalErrorCatcher } from "../middlewares/globalErrorCatcher";
import notFound from "../middlewares/notFound";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1", router);
swaggerDoc(app, env.port);

app.use(globalErrorCatcher);

app.use(notFound);

export default app;
