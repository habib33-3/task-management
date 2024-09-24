import express from "express";

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

app.get("/", async (req, res) => {
    res.send("Hi");
});

app.use("/api/v1", router);
swaggerDoc(app, env.port);

app.use(globalErrorCatcher);

app.use(notFound);

export default app;
