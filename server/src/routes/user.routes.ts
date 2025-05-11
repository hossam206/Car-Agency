import express from "express";
import { Request, Response } from "express";
import UserController from "../controllers/user.controller";
import {
  addUserValidator,
  loginValidator,
  updatePasswordValidator,
} from "../validation/user.validator";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import {
  expressValidator,
  requiredParamMiddleware,
} from "../middlewares/express.middleware";
const authMiddleware = AuthMiddleware.getInstance();
const userController = UserController.getControllerInstance();
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [User]
 *     summary: Login by email
 *     description: Login by email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserDto'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/login",
  expressValidator(loginValidator()),
  async (req: Request, res: Response) => {
    await userController.login(req, res);
  }
);

/**
 * @swagger
 * /auth/add:
 *   post:
 *     tags: [User]
 *     summary: Add user by admin
 *     description: Add user by admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddUserDto'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/add",
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["admin"]),
  expressValidator(addUserValidator()),
  async (req: Request, res: Response) => {
    await userController.addUser(req, res);
  }
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [User]
 *     summary: logout
 *     description: logout
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/logout",
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["user", "admin"]),
  async (req: Request, res: Response) => {
    await userController.logout(req, res);
  }
);

/**
 * @swagger
 * /user/remove/{userId}:
 *   delete:
 *     tags: [User]
 *     summary: Delete a user
 *     description: Delete a user by its ID
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/remove/:userId",
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["admin"]),
  async (req: Request, res: Response) => {
    await userController.deleteUser(req, res);
  }
);

/**
 * @swagger
 * /user/update/{userId}:
 *   put:
 *     tags: [User]
 *     summary: Update a user
 *     description: Update user details by ID
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update/:userId",
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["user", "admin"]),
  requiredParamMiddleware(),
  expressValidator(updatePasswordValidator()),
  async (req: Request, res: Response) => {
    await userController.updateUser(req, res);
  }
);

/**
 * @swagger
 * /user/count:
 *   get:
 *     tags: [User]
 *     summary: Get total number of users
 *     description: Returns the total count of users in the system
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/count",
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["admin"]),
  async (req: Request, res: Response) => {
    await userController.getUserCount(req, res);
  }
);

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User]
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/",
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["admin"]),
  async (req: Request, res: Response) => {
    await userController.getAllUsers(req, res);
  }
);

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     tags: [User]
 *     summary: Get user by ID
 *     description: Retrieve details of a specific user
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/:userId",
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["user", "admin"]),
  requiredParamMiddleware(),
  async (req: Request, res: Response) => {
    await userController.getUserById(req, res);
  }
);

export default router;
