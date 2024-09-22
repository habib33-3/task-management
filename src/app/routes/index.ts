import { Router } from "express";

import { taskRoutes } from "./task.routes";
import { userRoutes } from "./user.routes";

const router = Router();

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
