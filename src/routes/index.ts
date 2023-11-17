import { Router } from "express";

import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import settingRoutes from "./settingRoutes";
import apiRoutes from "./apiRoutes";
import storeRoutes from "./storeRoutes";
import verifyEmailRoutes from "./verifyEmailRoutes";
import suppliersRoutes from "./suppliersRoutes";
import productsRoutes from "./productsRoutes";


const routes = Router();

routes.use(userRoutes);
routes.use("/auth", authRoutes);
routes.use("/api/messages", apiRoutes);
routes.use(storeRoutes);
routes.use(settingRoutes)
routes.use(verifyEmailRoutes)
routes.use(suppliersRoutes)
routes.use(productsRoutes)

export default routes;
