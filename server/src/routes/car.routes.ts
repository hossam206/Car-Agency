import express from "express";
import { Request, Response } from "express";
import CarController from "../controllers/car.controller";
import validCar, {
  generateCertificateValidator,
} from "../validation/car.validator";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import {
  expressValidator,
  requiredParamMiddleware,
} from "../middlewares/express.middleware";
const authMiddleware = AuthMiddleware.getInstance();
const controller = CarController.getControllerInstance();
const router = express.Router();

/**
 * @swagger
 * /car/add:
 *   post:
 *     tags: [Car]
 *     summary: Add a new car
 *     description: Add a new car to the system
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarAddComponent'
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
  expressValidator(validCar()),
  async (req: Request, res: Response) => {
    await controller.addCar(req, res);
  }
);

/**
 * @swagger
 * /car/remove/{carId}:
 *   delete:
 *     tags: [Car]
 *     summary: Delete a car
 *     description: Delete a car by its ID
 *     parameters:
 *       - $ref: '#/components/parameters/CarId'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/remove/:carId",
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["admin"]),
  async (req: Request, res: Response) => {
    await controller.deleteCar(req, res);
  }
);

/**
 * @swagger
 * /car/update/{carId}:
 *   put:
 *     tags: [Car]
 *     summary: Update a car
 *     description: Update car details by ID
 *     parameters:
 *       - $ref: '#/components/parameters/CarId'
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarUpdateComponent'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update/:carId",
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["admin"]),
  requiredParamMiddleware(),
  expressValidator(validCar()),
  async (req: Request, res: Response) => {
    await controller.updateCar(req, res);
  }
);

/**
 * @swagger
 * /car/count:
 *   get:
 *     tags: [Car]
 *     summary: Get total number of cars
 *     description: Returns the total count of cars in the system
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
    await controller.getCarCount(req, res);
  }
);

/**
 * @swagger
 * /car:
 *   get:
 *     tags: [Car]
 *     summary: Get all cars
 *     description: Retrieve a list of all cars
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
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
    await controller.getAllCars(req, res);
  }
);

/**
 * @swagger
 * /car/{carId}:
 *   get:
 *     tags: [Car]
 *     summary: Get car by ID
 *     description: Retrieve details of a specific car
 *     parameters:
 *       - $ref: '#/components/parameters/CarId'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/:carId",
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["admin"]),
  requiredParamMiddleware(),
  async (req: Request, res: Response) => {
    await controller.getCarById(req, res);
  }
);

/**
 * @swagger
 * /car/download:
 *   post:
 *     tags: [Car]
 *     summary: Download car certificate
 *     description: Download a PDF certificate for the given car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenerateCertificateComponent'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/CarCertificateResponse'
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/download",
  authMiddleware.refreshTokenMiddleware,
  authMiddleware.authorizationMiddleware(["user", "admin"]),
  expressValidator(generateCertificateValidator),
  async (req: Request, res: Response) => {
    await controller.downloadCertificate(req, res);
  }
);

/**
 * @swagger
 * /car/view/{carId}:
 *   get:
 *     tags: [Car]
 *     summary: View car certificate by downloading pdf file and scan qrCode
 *     description: Display the car's certificate
 *     parameters:
 *       - $ref: '#/components/parameters/CarId'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/CarCertificateResponse'
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/view/:carId",
  authMiddleware.verifyIdTokenMiddleware,
  authMiddleware.authorizationMiddleware(["user", "admin"]),
  async (req: Request, res: Response) => {
    await controller.ViewCertificate(req, res);
  }
);

export default router;
