import { Router } from "express";

import isAuth from "../middleware/isAuth";
import * as ProductsController from "../controllers/ProductController";

const productsRoutes = Router();

productsRoutes.get("/products", isAuth, ProductsController.index);

productsRoutes.post("/products", isAuth, ProductsController.store);

productsRoutes.put("/products/:productsId", isAuth, ProductsController.update);

productsRoutes.get("/products/:productsId", isAuth, ProductsController.show);

productsRoutes.delete("/products/:productsId", isAuth, ProductsController.remove);

export default productsRoutes;
