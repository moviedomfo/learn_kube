
//import container from "@common/DependencyInj/Container";
import express from "express";
import Container from "@common/ContainerOk";
import AuthController from "@infra/controllers/auth.controller";


export const authRouter = express.Router();
const authController: AuthController = Container.resolve("authController") as AuthController;

authRouter.post("/authenticate", authController.Auth);
// authRouter.post("/refreshToken", authController.RefreshToken);
authRouter.get("/hash", authController.Hash);
// authRouter.get("/getUserSec", checkTokenMeddeware, authController.GetUser);
