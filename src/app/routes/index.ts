import { Router } from "express";

import { taskRoutes } from "./task.routes";
import { userRoutes } from "./user.routes";

const router = Router();

/**
 * @openapi
 * {
 *   "paths": {
 *     "/health": {
 *       "get": {
 *         "summary": "Health check endpoint",
 *         "description": "Returns the health status of the API.",
 *         "responses": {
 *           "200": {
 *             "description": "API is healthy",
 *             "content": {
 *               "application/json": {
 *                 "schema": {
 *                   "type": "object",
 *                   "properties": {
 *                     "status": {
 *                       "type": "string",
 *                       "example": "OK"
 *                     },
 *                     "timestamp": {
 *                       "type": "string",
 *                       "format": "date-time",
 *                       "example": "2024-09-24T12:34:56Z"
 *                     }
 *                   }
 *                 }
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date(),
    });
});

const routes: {
    path: string;
    route: Router;
}[] = [
    {
        path: "/user",
        route: userRoutes,
    },
    {
        path: "/task",
        route: taskRoutes,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
