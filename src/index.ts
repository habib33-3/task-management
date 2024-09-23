/* eslint-disable no-console */
import app from "./app";
import env from "./config/env";
import connectToDb from "./db";

const main = async () => {
    try {
        await connectToDb();

        app.listen(env.port, () => {
            console.info(`Server running at ${env.port}`);

            // swaggerDoc(app, env.port);
        });
    } catch (err) {
        console.error("Failed to start the server:", err);
        process.exit(1);
    }
};

main();
