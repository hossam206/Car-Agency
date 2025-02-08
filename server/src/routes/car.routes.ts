import express from "express";
import { Request, Response } from "express";
import CarController from "../controllers/car.controller";
import AuthenticationMiddleware from "../middlewares/Authentication";

const router = express.Router();
const controller = CarController.getControllerInstance();

// Add Car
router.post(
  "/add",
  AuthenticationMiddleware.authenticate,
  async (req: Request, res: Response) => {
    await controller.addCar(req, res);
  }
);

// Delete Car
router.delete(
  "/remove/:carId",
  AuthenticationMiddleware.authenticate,
  async (req: Request, res: Response) => {
    await controller.deleteCar(req, res);
  }
);

// Update Car
router.put(
  "/update/:carId",
  AuthenticationMiddleware.authenticate,
  async (req: Request, res: Response) => {
    await controller.updateCar(req, res);
  }
);

// Get Car Count
router.get(
  "/count",
  AuthenticationMiddleware.authenticate,
  async (req: Request, res: Response) => {
    await controller.getCarCount(req, res);
  }
);

// Get all Cars
router.get(
  "/",
  AuthenticationMiddleware.authenticate,
  async (req: Request, res: Response) => {


    await controller.getAllCars(req, res);
  }
);

// Get Car by ID
router.get(
  "/:id",
  AuthenticationMiddleware.authenticate,
  async (req: Request, res: Response) => {
    await controller.getCarById(req, res);
  }
);

// Download Export Certificate
router.get(
  "/download/:id",
  AuthenticationMiddleware.authenticate,
  async (req: Request, res: Response) => {
    await controller.downloadCertificate(req, res);
  }
);

router.get(
  "/view/:id",
  AuthenticationMiddleware.authenticate,
  async (req: Request, res: Response) => {
    await controller.ViewCertificate(req, res);
  }
);

export default router;
