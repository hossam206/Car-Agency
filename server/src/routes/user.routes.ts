import express from "express";
import { Request, Response } from "express";
import UserController from "../controllers/user.controller";
import AuthenticationMiddleware from "../middlewares/Authentication";

const router = express.Router();
const userController = UserController.getControllerInstance();

router.post("/login", async (req: Request, res: Response) => {
  const result = await userController.login(req, res);
});

router.get(
  "/logout",
  AuthenticationMiddleware.authenticate,
  async (req: Request, res: Response) => {
    await userController.logout(req, res);
  }
);

export default router;
