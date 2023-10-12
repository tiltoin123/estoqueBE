import { Router } from "express";
import isAuth from "../middleware/isAuth";

import * as StoreAiController from "../controllers/StoreAiController";

const storeAiRoutes = Router();

storeAiRoutes.get("/storeai", isAuth, StoreAiController.index);

storeAiRoutes.post("/storeai", isAuth, StoreAiController.store);

storeAiRoutes.get("/storeai/:storeAiId", isAuth, StoreAiController.show);

storeAiRoutes.put("/storeai/:storeAiId", isAuth, StoreAiController.update);

storeAiRoutes.delete("/storeai/:storeAiId", isAuth, StoreAiController.remove);

export default storeAiRoutes;
