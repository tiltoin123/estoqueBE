import express from "express";
import * as verifyEmailController from "../controllers/verifyEmailController";

const verifyEmailRoutes = express.Router();

verifyEmailRoutes.post("/verify/:confirmationToken", verifyEmailController.update);

verifyEmailRoutes.get("/verify/", verifyEmailController.show)

export default verifyEmailRoutes;
