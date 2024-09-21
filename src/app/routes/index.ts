import { Router } from "express";
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
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
