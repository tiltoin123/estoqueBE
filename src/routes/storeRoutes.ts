import express from "express";
import isAuth from "../middleware/isAuth";

import * as StoreController from "../controllers/StoreController";

const storeRoutes = express.Router();

storeRoutes.get(
    "/stores/:storeId",
    isAuth,
    StoreController.show
);

export default storeRoutes;
