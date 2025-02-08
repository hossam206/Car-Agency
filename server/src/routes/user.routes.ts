import express from "express";
import { Request, Response } from "express";
import UserController from "../controllers/user.controller";
import AuthenticationMiddleware from "../middlewares/Authentication";

const router = express.Router();
const userController = UserController.getControllerInstance();

router.post(
  "/login",
  async (req: Request, res: Response) => {
    await userController.login(req, res);
  }
  // AuthenticationMiddleware.authenticate
);

router.get("/logout", async (req: Request, res: Response) => {
  await userController.logout(req, res);
});

export default router;
