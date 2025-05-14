import Car from "../models/mongodb/car.model";
import { PDFPage } from "pdf-lib";
import { rgb, type RGB } from "pdf-lib";
import { createCanvas } from "canvas";
import QRCode from "qrcode";
import {
  CarDto,
  CarDtoRetrieved,
  CarUpdateDtoType,
  CarAddDtoType,
} from "../dto/car.dto";
import { CarUpdateDto } from "../dto/car.dto";
import { CustomError } from "../utils/customError";
import { warpASync } from "../utils/warpAsync.util";
import { pdfProperties } from "../utils/pdfProperties.utils";
import {
  textArabicPosition,
  textEnglishPosition,
} from "../utils/pdfPosition.util";
import { ResponseType } from "../types/response.type";
import dotenv from "dotenv";
import TokenService from "./token.service";
import User from "../models/mongodb/user.model";
dotenv.config();

class CarService {
  private static instance: CarService;
  private tokenService: TokenService;

  private constructor() {
    this.tokenService = TokenService.getInstance();
  }

  static getServiceInstance(): CarService {
    if (!CarService.instance) {
      CarService.instance = new CarService();
      ``;
    }
    return CarService.instance;
  }

  addCar = warpASync(async (carData: CarAddDtoType): Promise<ResponseType> => {
    const parsed = CarDto.safeParse(carData);
    if (!parsed.success)
      return {
        success: false,
        status: 400,
        statusText: "BadRequest",
        message: "Car validation failed",
      };
    await Car.create({ ...carData });
    return { success: true, message: "Car added successfully" };
  });

  deleteCar = warpASync(async (_id: string): Promise<ResponseType> => {
    const deleteCar = await Car.deleteOne({ _id });
    if (deleteCar.deletedCount == 0)
      return {
        success: false,
        status: 404,
        statusText: "NotFound",
        message: "Car not found",
      };
    return {
      success: true,
      message: "Car deleted successfully",
      deletedCount: deleteCar.deletedCount,
    };
  });

  updateCar = warpASync(
    async (_id: string, data: CarUpdateDtoType): Promise<ResponseType> => {
      const parsed = CarUpdateDto.safeParse(data);
      if (!parsed.success)
        return {
          success: false,
          status: 400,
          statusText: "BadRequest",
          message: "Car validation failed",
        };
      const updateCar = await Car.updateOne({ _id }, { $set: data });
      return {
        success: true,
        message: "Car updated successfully",
        modifiedCount: updateCar.modifiedCount,
      };
    }
  );

  getAllCars = warpASync(
    async (query: { page: number; limit: number }): Promise<ResponseType> => {
      const page = Math.max(query.page || 1, 1);
      const limit = Math.max(query.limit || 1, 5);
      const getCars = await Car.find({})
        .skip((page - 1) * limit)
        .limit(limit);
      if (!getCars.length)
        return {
          success: false,
          status: 404,
          statusText: "NotFound",
          message: "Car not found",
        };

      const data = getCars.map((car) => {
        const parsed = CarDtoRetrieved.safeParse(car);
        if (!parsed.success)
          return {
            success: false,
            status: 400,
            statusText: "BadRequest",
            message: "Car validation failed",
          };
        return parsed.data;
      });
      return { success: true, message: "Car updated successfully", data };
    }
  );

  getCarById = warpASync(async (_id: string): Promise<ResponseType> => {
    const data = await Car.findById({ _id });
    if (!data)
      return {
        success: false,
        status: 404,
        statusText: "NotFound",
        message: "Car not found",
      };
    return { success: true, message: "Car updated successfully", data };
  });

  getCarCount = warpASync(async (): Promise<number> => {
    return await Car.countDocuments();
  });

  generateCertificate = warpASync(
    async (body: { carId: string; userId: string }): Promise<Buffer> => {
      const [car, user] = await Promise.all([
        Car.findById({ _id: body.carId }),
        User.findById({ _id: body.userId }),
      ]);
      if (!car) throw new CustomError("Car not found", "NotFound", 404, false);
      if (!user)
        throw new CustomError("User not found", "NotFound", 404, false);
      const {
        page,
        fontEn,
        fontAr,
        fontBold,
        pdfDoc,
        WhiteColor,
        SmallFontSize,
      } = await pdfProperties();

      // Add QR Code
      const idToken = this.tokenService.generateIdToken(user, body.carId);
      const url = `${process.env.BACKEND_URL}/car/view/${idToken}`;
      const qrImageBytes = await this.generateQrCode(url);
      const qrImage = await pdfDoc.embedPng(qrImageBytes);
      page.drawImage(qrImage, { x: 357.5, y: 296, width: 38.5, height: 38 });

      // Add custom text
      page.drawText(
        car.exportCompany
          ? ` تشحن بواسطة شركة ${car.exportCompany} للنقلیات`
          : "",
        {
          x: 305,
          y: 499,
          size: SmallFontSize - 2,
          font: fontBold,
          color: WhiteColor,
        }
      );
      page.drawText(car.certificateReferenceNumber ?? "", {
        x: 362,
        y: 337,
        size: SmallFontSize - 1.2,
        font: fontBold,
        color: WhiteColor,
      });

      // Add text arabic

      Object.entries(textArabicPosition).forEach(
        ([key, [x, y, fontSize, color]]) => {
          const value = (car as any)[key];
          this.addAlignedText(
            page,
            null,
            fontAr,
            value,
            x,
            y,
            fontSize,
            color,
            "AR"
          );
        }
      );

      // Add text english
      Object.entries(textEnglishPosition).forEach(
        ([key, [x, y, fontSize, color]]) => {
          const value = (car as any)[key];
          this.addAlignedText(
            page,
            fontEn,
            null,
            value,
            x,
            y,
            fontSize,
            color,
            "EN"
          );
        }
      );

      const updatedPdfBytes = await pdfDoc.save();
      return Buffer.from(updatedPdfBytes);
    }
  );

  private async generateQrCode(url: string): Promise<Buffer> {
    const size = 70;
    const margin = 3;
    const canvas = createCanvas(size, size);

    await QRCode.toCanvas(canvas, url, {
      width: size,
      margin: margin,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    return canvas.toBuffer("image/png");
  }

  private addAlignedText = (
    page: PDFPage,
    fontEn: any,
    fontAr: any,
    text: string,
    x: number,
    y: number,
    fontSize: number,
    color: RGB,
    lang: "EN" | "AR"
  ) => {
    if (lang == "EN") {
      return page.drawText(text, {
        x,
        y,
        size: fontSize,
        font: fontEn,
        color,
      });
    }
    const textWidth = fontAr.widthOfTextAtSize(text, fontSize);
    const startX = x - textWidth;
    return page.drawText(text, {
      x: startX,
      y,
      size: fontSize,
      font: fontAr,
      color,
    });
  };
}

export default CarService;
