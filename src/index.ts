import app from "./app";
import env from "./config/env";

app.listen(env.port,()=>{
    console.info(`server running at ${env.port}`)
})