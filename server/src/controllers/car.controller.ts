import { Request, Response } from "express";
import CarService from "../services/car.service";
const { validationResult } = require("express-validator");

class CarController {
  private serviceInstance: CarService;
  private static instance: CarController;

  private constructor() {
    this.serviceInstance = CarService.getServiceInstance();
  }

  static getControllerInstance(): CarController {
    if (!CarController.instance) {
      CarController.instance = new CarController();
    }
    return CarController.instance;
  }

  private handleError(
    res: Response,
    message: string,
    error: unknown,
    status = 500
  ): Response {
    return res.status(status).send({
      message,
      error: error instanceof Error ? error.message : error,
    });
  }

  async addCar(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.serviceInstance.addCar(req.body);
      if (!result.success) return res.status(400).json(result);
      return res.status(201).json(result);
    } catch (error) {
      return this.handleError(res, "Failed to add car", error);
    }
  }

  async deleteCar(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.serviceInstance.deleteCar(req.params.carId);
      if (!result.success) return res.status(404).json(result);
      return res.status(200).json(result);
    } catch (error) {
      return this.handleError(res, "Failed to delete car", error);
    }
  }

  async updateCar(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.serviceInstance.updateCar(
        req.params.carId,
        req.body
      );
      if (!result.success) return res.status(400).json(result);
      return res.status(200).json(result);
    } catch (error) {
      return this.handleError(res, "Failed to update car", error);
    }
  }

  async getAllCars(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.serviceInstance.getAllCars(req.query);
      const count = await this.serviceInstance.getCarCount();
      if (!result.success) return res.status(404).json(result);
      return res.status(200).json({
        message: "Cars retrieved successfully",
        data: result,
        count: count,
      });
    } catch (error) {
      return this.handleError(res, "Failed to retrieve cars", error);
    }
  }

  async getCarById(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.serviceInstance.getCarById(req.params.carId);
      if (!result.success) return res.status(404).json(result);
      return res.status(200).json(result);
    } catch (error) {
      return this.handleError(res, "Failed to retrieve car", error);
    }
  }

  async getCarCount(req: Request, res: Response): Promise<Response> {
    try {
      const count = await this.serviceInstance.getCarCount();
      return res
        .status(200)
        .json({ message: "Car count retrieved successfully", count });
    } catch (error) {
      return this.handleError(res, "Failed to retrieve car count", error);
    }
  }

  async downloadCertificate(req: Request, res: Response): Promise<Response> {
    try {
      const pdfStream = await this.serviceInstance.generateCertificate(
        req.body
      );
      if (!pdfStream || pdfStream.length === 0) {
        return res.status(400).json({ message: "Error generating PDF" });
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="Certificate_${new Date().getTime()}.pdf"`
      );
      return res.send(pdfStream);
    } catch (error) {
      return this.handleError(
        res,
        "Failed to download please try again",
        error
      );
    }
  }

  async ViewCertificate(req: Request, res: Response): Promise<Response> {
    try {
      const pdfStream = await this.serviceInstance.generateCertificate(
        req.user
      );
      if (!pdfStream || pdfStream.length === 0) {
        return res.status(400).json({ message: "Error view PDF" });
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="Certificate_${new Date().getTime()}.pdf"`
      );
      return res.send(pdfStream);
    } catch (error) {
      return this.handleError(
        res,
        `Failed to view please try again ${error}`,
        error
      );
    }
  }
}

export default CarController;
