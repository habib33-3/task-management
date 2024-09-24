/* eslint-disable no-console */
import { Application } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1",
            description: "API for managing tasks",
        },
        components: {
            schemas: {},
            securitySchemes: {
                jwtAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description:
                        "Send the access token directly in the Authorization header",
                },
            },
        },
        security: [{ jwtAuth: [] }],
    },
    apis: ["./src/app/routes/**/*.ts", "./src/app/validations/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDoc = (app: Application, port: number) => {
    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, {
            swaggerOptions: {
                swaggerVersion: "3.0.0",
            },
        })
    );

    app.get("/doc.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.info(`Docs available at http://localhost:${port}/docs`);
    console.info(`Swagger JSON available at http://localhost:${port}/doc.json`);
};

export default swaggerDoc;
