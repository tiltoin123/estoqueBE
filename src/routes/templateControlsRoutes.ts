import express from "express";
import isAuth from "../middleware/isAuth";

import * as TemplateControlsController from "../controllers/TemplateControlsController";

const templateControlsRoutes = express.Router();

templateControlsRoutes.get("/templates", isAuth, TemplateControlsController.index);

templateControlsRoutes.get(
    "/templatecontrols/:templatecontrolsId",
    isAuth,
    TemplateControlsController.show
);

export default templateControlsRoutes;
