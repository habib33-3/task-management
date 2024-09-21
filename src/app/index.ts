import express from "express";
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

export default app;
