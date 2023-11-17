import { Router } from "express";

import isAuth from "../middleware/isAuth";
import * as SupplierController from "../controllers/SupplierController";

const suppliersRoutes = Router();

suppliersRoutes.get("/suppliers", isAuth, SupplierController.index);

suppliersRoutes.post("/suppliers", isAuth, SupplierController.store);

suppliersRoutes.put("/suppliers/:supplierId", isAuth, SupplierController.update);

suppliersRoutes.get("/suppliers/:supplierId", isAuth, SupplierController.show);

suppliersRoutes.delete("/suppliers/:supplierId", isAuth, SupplierController.remove);

export default suppliersRoutes;
