import { Request, Response } from "express";
import CarService from "../services/carService";

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
  ): void {
    res.status(status).send({
      message,
      error: error instanceof Error ? error.message : error,
    });
  }

  // Add Car
  async addCar(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.serviceInstance.addCar(req.body);
      if (!result) {
        res.status(400).json({ message: "Something went wrong" });
        return;
      }
      res.status(201).json({ message: "Car added successfully" });
    } catch (error) {
      this.handleError(res, "Failed to add car", error);
    }
  }

  // Delete Car
  async deleteCar(req: Request, res: Response): Promise<void> {
    try {
      const { carId } = req.params;
      const result = await this.serviceInstance.deleteCar(carId);
      if (!result) {
        res.status(404).json({ message: "Car not found" });
        return;
      }
      res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
      this.handleError(res, "Failed to delete car", error);
    }
  }

  // Update Car
  async updateCar(req: Request, res: Response): Promise<void> {
    try {
      const { carId } = req.params;
      const result = await this.serviceInstance.updateCar(carId, req.body);
      if (!result) {
        res.status(400).json({ message: "Car not found" });
        return;
      }
      res.status(200).json({ message: "Car updated successfully" });
    } catch (error) {
      this.handleError(res, "Failed to update car", error);
    }
  }

  // Get all Cars
  async getAllCars(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit } = req.query;
      const result = await this.serviceInstance.getAllCars(
        Number(page),
        Number(limit)
      );
      if (!result) {
        res.status(404).json({ message: "No cars found" });
        return;
      }
      res
        .status(200)
        .json({ message: "Cars retrieved successfully", data: result });
    } catch (error) {
      this.handleError(res, "Failed to retrieve cars", error);
    }
  }

  // Get Car by ID
  async getCarById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.serviceInstance.getCarById(id);
      if (!result) {
        res.status(404).json({ message: "Car not found" });
        return;
      }
      res
        .status(200)
        .json({ message: "Car retrieved successfully", data: result });
    } catch (error) {
      this.handleError(res, "Failed to retrieve car", error);
    }
  }

  // Get Car Count
  async getCarCount(req: Request, res: Response): Promise<void> {
    try {
      const count = await this.serviceInstance.getCarCount();
      res
        .status(200)
        .json({ message: "Car count retrieved successfully", count });
    } catch (error) {
      this.handleError(res, "Failed to retrieve car count", error);
    }
  }

  // Download Export Certificate
  async downloadCertificate(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pdfStream = await this.serviceInstance.generateCertificate(id);
      if (!pdfStream || pdfStream.length === 0) {
        res.status(400).json({ message: "Error generating PDF" });
        return;
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="Certificate_${id}.pdf"`
      );
      res.send(pdfStream);
    } catch (error) {
      this.handleError(res, "Failed to generate certificate", error);
    }
  }

  // View Export Certificate
  async ViewCertificate(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pdfStream = await this.serviceInstance.generateCertificate(id);
      if (!pdfStream || pdfStream.length === 0) {
        res.status(400).json({ message: "Error view PDF" });
        return;
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="Certificate_${id}.pdf"`
      );
      res.send(pdfStream);
    } catch (error) {
      this.handleError(res, "Failed to generate certificate", error);
    }
  }
}

export default CarController;
