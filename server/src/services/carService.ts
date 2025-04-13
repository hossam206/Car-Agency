import Car from "../models/mongodb/car.model";
import {
  CarDto,
  CarTypeDto,
  CarDtoRetrieved,
  CarDtoRetrievedType,
} from "../dto/car.dto";
import { PDFDocument, rgb } from "pdf-lib";
import fs from "fs";
import QRCode from "qrcode";
import dotenv from "dotenv";
import { createCanvas } from "canvas";
dotenv.config();

// @ts-ignore
import fontkit from "@pdf-lib/fontkit";

class CarService {
  private static instance: CarService;

  private constructor() {}

  static getServiceInstance(): CarService {
    if (!CarService.instance) {
      CarService.instance = new CarService();
    }
    return CarService.instance;
  }

  async addCar(carData: CarTypeDto): Promise<boolean> {
    try {
      const parsed = CarDto.safeParse(carData);
      if (!parsed.success) {
        throw new Error("Car validation failed");
      }
      const car = new Car(carData);
      await car.save();
      return true;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Error add car");
    }
  }

  async deleteCar(carId: string): Promise<boolean> {
    try {
      const result = await Car.findByIdAndDelete(carId);
      return !!result;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error delete car "
      );
    }
  }

  async updateCar(carId: string, carData: any): Promise<boolean> {
    try {
      const parsed = CarDto.safeParse(carData);
      if (!parsed.success) {
        throw new Error("Car validation failed");
      }
      const result = await Car.findByIdAndUpdate(carId, parsed.data, {
        new: true,
      });
      return !!result;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error update car"
      );
    }
  }

  async getAllCars(page = 1, limit = 5): Promise<CarDtoRetrievedType[]> {
    try {
      const retrievedCars = await Car.find({})
        .skip((page - 1) * limit)
        .limit(limit);
      // const count = await Car.countDocuments();
      if (!retrievedCars.length) {
        throw new Error("No cars found!");
      }

      const carsDto = retrievedCars.map((car) => {
        const { _id, ...carWithoutId } = car.toObject();
        const parsed = CarDtoRetrieved.safeParse(carWithoutId);

        if (!parsed.success) {
          throw new Error("Car validation failed");
        }
        return { _id: _id.toString(), ...parsed.data };
      });
      return carsDto;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error fetching cars"
      );
    }
  }

  async getCarById(carId: string): Promise<CarTypeDto> {
    try {
      const retrievedCar = await Car.findById(carId);
      if (!retrievedCar) {
        throw new Error("No car found!");
      }

      const { _id, ...categoryWithoutId } = retrievedCar.toObject();
      const parsed = CarDto.safeParse(categoryWithoutId);
      if (!parsed.success) {
        throw new Error("Car validation failed");
      }
      return { _id: _id.toString(), ...parsed.data };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error fetching car"
      );
    }
  }

  async getCarCount(): Promise<number> {
    try {
      const count = await Car.countDocuments();
      return count;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error fetching car count"
      );
    }
  }

  async generateCertificate(carId: string): Promise<Buffer> {
    // Check car exist
    const carRetrieved = await this.getCarById(carId);
    if (!carRetrieved) {
      throw new Error("Car not found.");
    }

    // Load the PDF template and font from the file system and define colors
    const templateBytes = fs.readFileSync(String(process.env.PATH_PDF));
    const pdfDoc = await PDFDocument.load(templateBytes);
    pdfDoc.registerFontkit(fontkit);
    const pages = pdfDoc.getPages();
    const page = pages[0];
    const fontBytesEn = fs.readFileSync(String(process.env.PATH_FONT_EN));
    const fontBytesAr = fs.readFileSync(String(process.env.PATH_FONT_AR));
    const fontBytesBold = fs.readFileSync(String(process.env.PATH_FONT_BOLD));
    const LargeFontSize = 7.3;
    const SmallFontSize = 7.3;
    const BlueColor = rgb(51 / 255, 49 / 255, 156 / 255);
    const WhiteColor = rgb(240 / 255, 248 / 255, 1);
    const fontEn = await pdfDoc.embedFont(fontBytesEn);
    const fontAr = await pdfDoc.embedFont(fontBytesAr);
    const fontBold = await pdfDoc.embedFont(fontBytesBold);

    // Generate the QR code image for the URL
    const url = `${process.env.API}/car/view/${carId}`;
    const qrImageBytes = await this.generateQrCode(url);
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    page.drawImage(qrImage, { x: 357.5, y: 296, width: 38.5, height: 38 });

    // Function to add left-aligned text (for English)
    const addLeftAlignedText = (
      text: string,
      x: number,
      y: number,
      fontSize: number,
      color: any
    ) => {
      page.drawText(text, { x, y, size: fontSize, font: fontEn, color });
    };

    // Function to add right-aligned text (for Arabic)
    const addRightAlignedText = (
      text: string,
      rightMargin: number,
      y: number,
      fontSize: number,
      color: any
    ) => {
      const textWidth = fontAr.widthOfTextAtSize(text, fontSize);
      const startX = rightMargin - textWidth;
      page.drawText(text, {
        x: startX,
        y,
        size: fontSize,
        font: fontAr,
        color,
      });
    };

    // prettier-ignore
    // English text data
    const textEnglish: [string, number, number, number, any][] = [
      [carRetrieved.exportCountryTo       ?? "",  284, 473, SmallFontSize+1.4, WhiteColor],
      [carRetrieved.vehicleType           ?? "",  424, 540, LargeFontSize, BlueColor],
      [carRetrieved.exportPlateNumber     ?? "",  424, 517, LargeFontSize, BlueColor],
      [carRetrieved.registrationPlateNumber ?? "",424, 492, LargeFontSize, BlueColor],
      [this.DateConvertEnglish(carRetrieved.registrationDate  ?? "","EG"),  424, 469, LargeFontSize, BlueColor],
      [this.DateConvertEnglish(carRetrieved.registrationExpiryDate ?? "","EG"), 424, 443, LargeFontSize, BlueColor],
      [carRetrieved.vehicleMake           ?? "",  424, 420, LargeFontSize, BlueColor],
      [carRetrieved.category              ?? "",  424, 395, LargeFontSize, BlueColor],
      [carRetrieved.modelYear             ?? "",  424, 370, LargeFontSize, BlueColor],
      [carRetrieved.countryOfOrigin       ?? "",  424, 346, LargeFontSize, BlueColor],
      [carRetrieved.vehicleColor          ?? "",  424, 323, LargeFontSize, BlueColor],
      [carRetrieved.chassisNumber         ?? "",  424, 298, LargeFontSize, BlueColor],
      [carRetrieved.engineNumber          ?? "NILL",  508, 274, LargeFontSize, BlueColor],
      [String(carRetrieved.numberOfDoors  ?? ""), 424, 251, LargeFontSize, BlueColor],
      [carRetrieved.fuelType              ?? "",  424, 227, LargeFontSize, BlueColor],
      [String(carRetrieved.numberOfSeats  ?? ""),  424, 202, LargeFontSize, BlueColor],
      [String(carRetrieved.emptyWeight    ?? ""),  424, 177, LargeFontSize, BlueColor],
      [carRetrieved.insuranceCompany      ?? "",  424, 153, LargeFontSize, BlueColor],
      // [carRetrieved.insuranceType         ?? "",  424, 135, LargeFontSize, BlueColor],
      [carRetrieved.insurancePolicyNumber ?? "",  424, 105, LargeFontSize, BlueColor],
      [this.DateConvertEnglish(carRetrieved.insuranceExpiryDate ?? "","EG"),  424, 83, LargeFontSize, BlueColor],
      [carRetrieved.ownerName             ?? "",  189,  257, LargeFontSize, BlueColor],
      [carRetrieved.nationality           ?? "",  189,  236, LargeFontSize, BlueColor],
      [carRetrieved.passportNumber        ?? "",  275, 214, LargeFontSize, BlueColor],
      [carRetrieved.trafficCodeNumber     ?? "",  280, 197, LargeFontSize, BlueColor],
      [carRetrieved.emiratesIdNumber      ?? "",  275, 182, LargeFontSize, BlueColor],
      [carRetrieved.driverName            ?? "",  228, 146, LargeFontSize-0.3, BlueColor],
      [carRetrieved.licenseNumber         ?? "",  285, 133, LargeFontSize, BlueColor],
      [carRetrieved.driverNationality     ?? "",  285, 118, LargeFontSize, BlueColor],
      [carRetrieved.licenseSource         ?? "",  285, 95, LargeFontSize, BlueColor],
      [carRetrieved.certificateIssueDate  ?? "",  186,  378, SmallFontSize-2, WhiteColor], // In block blue - edit is english
      // [carRetrieved.certificateReferenceNumber ?? "",  362, 337, SmallFontSize-1.3, WhiteColor]
    ];

    page.drawText(
      carRetrieved.exportCompany
        ? ` تشحن بواسطة شركة ${carRetrieved.exportCompany} للنقلیات`
        : "",
      {
        x: 305,
        y: 499,
        size: SmallFontSize -2,
        font: fontBold,
        color: WhiteColor,
      }
    );

    page.drawText(carRetrieved.certificateReferenceNumber ?? "", {
      x: 362,
      y: 337,
      size: SmallFontSize - 1.2,
      font: fontBold,
      color: WhiteColor,
    });
    // prettier-ignore
    // Arabic text data
    const textArabic: [string, number, number, number, any][] = [
      [carRetrieved.exportCountryToAr ?? "", 322, 547, SmallFontSize+1.7, WhiteColor],
      [carRetrieved.vehicleTypeAr ?? "", 599, 540, LargeFontSize, BlueColor],
      [carRetrieved.exportPlateNumberAr ?? "", 599, 517, LargeFontSize, BlueColor],
      [carRetrieved.registrationPlateNumberAr ?? "", 599, 492, LargeFontSize, BlueColor],
      [ this.DateConvertEnglish(carRetrieved.registrationDateAr ?? "","ar"), 599, 469, LargeFontSize, BlueColor],
      [ this.DateConvertEnglish(carRetrieved.registrationExpiryDateAr ??"", "ar"), 599, 443, LargeFontSize, BlueColor],
      [carRetrieved.vehicleMakeAr ?? "", 599, 420, LargeFontSize, BlueColor],
      [carRetrieved.categoryAr ?? "", 599, 395, LargeFontSize, BlueColor],
      [carRetrieved.modelYearAr ?? "", 599, 370, LargeFontSize, BlueColor],
      [carRetrieved.countryOfOriginAr ?? "", 599, 346, LargeFontSize, BlueColor],
      [carRetrieved.vehicleColorAr ?? "", 599, 323, LargeFontSize, BlueColor],
      [carRetrieved.chassisNumberAr ?? "", 599, 298, LargeFontSize, BlueColor],
      // [carRetrieved.engineNumberAr ?? "", 599, 273, LargeFontSize, BlueColor],
      [String(carRetrieved.numberOfDoorsAr ?? ""), 599, 251, LargeFontSize, BlueColor],
      [carRetrieved.fuelTypeAr ?? "", 599, 227, LargeFontSize, BlueColor],
      [String(carRetrieved.numberOfSeatsAr ?? ""), 599, 202, LargeFontSize, BlueColor],
      [String(carRetrieved.emptyWeightAr ?? ""), 599, 177, LargeFontSize, BlueColor],
      [carRetrieved.insuranceCompanyAr ?? "", 599, 153, LargeFontSize, BlueColor],
      [carRetrieved.insuranceTypeAr ?? "", 599, 129, LargeFontSize, BlueColor],
      [carRetrieved.insurancePolicyNumberAr ?? "", 599, 105, LargeFontSize, BlueColor],
      [ this.DateConvertEnglish(carRetrieved.insuranceExpiryDateAr ??"", "ar"), 599, 83, SmallFontSize, BlueColor],
      [carRetrieved.ownerNameAr ?? "", 404, 277, LargeFontSize, BlueColor],
      [carRetrieved.nationalityAr ?? "",  404,  236, LargeFontSize, BlueColor],
      [carRetrieved.driverNameAr ?? "", 372, 161, LargeFontSize, BlueColor],
      // [ this.DateConvertArabic(carRetrieved.certificateIssueDateAr ?? "" , "ar"), 430, 608, SmallFontSize, WhiteColor] // In block blue - edit is arabic
    ];

    // Draw English text
    textEnglish.forEach(([text, x, y, fontSize, color]) => {
      addLeftAlignedText(text, x, y, fontSize, color);
    });

    // Draw Arabic text
    textArabic.forEach(([text, rightMargin, y, fontSize, color]) => {
      addRightAlignedText(text, rightMargin, y, fontSize, color);
    });

    const updatedPdfBytes = await pdfDoc.save();
    return Buffer.from(updatedPdfBytes);
  }

  // Generate QrCode
  async generateQrCode(url: string): Promise<Buffer> {
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

  // Convert date to arabic
  DateConvertArabic(dateString: string, type: string): string {
    // In area blue
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }

    date.setHours(
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds()
    );

    // Using to format => December 01, 2019 at 02:00:00 AM
    let formattedDateEnglish = date.toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Using to format =>  ٠١ ديسمبر ٥٢٠٢ ٠١:٥٤:٣٠ م
    if (type === "ar") {
      let formattedDateArabic = date
        .toLocaleString("ar", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
        .replace(",", " ")
        .replace("صباحًا", "ص")
        .replace("مساءً", "م");

      let partsEnglish = formattedDateEnglish.split(" ");
      let partsArabic = formattedDateArabic.split(" ");
      partsArabic[0] = partsEnglish[1]
        .split("")
        .reverse()
        .join("")
        .replace(",", "");
      partsArabic[3] = "";
      partsArabic[2] = partsEnglish[2].split("").reverse().join("");
      partsArabic[4] = partsEnglish[4]
        .split(":")
        .reverse()
        .join(":")
        .split("")
        .reverse()
        .join("");
      return partsArabic.join(" ");
    }
    return formattedDateEnglish;
  }

  // Convert date to english
  DateConvertEnglish(dateString: string, type: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }

    let day = "";
    let month = "";
    let year = "";

    if (type === "ar") {
      // Using to format =>  01 ديسمبر 2025
      day = date.toLocaleString("EG", { day: "2-digit" });
      month = date.toLocaleString("ar", { month: "long" });
      year = date.toLocaleString("EG", { year: "numeric" });
      return `${day.split("").reverse().join("")} ${month} ${year
        .split("")
        .reverse()
        .join("")}`;
    }

    // Using to format => 2025 December 10
    day = date.toLocaleString("EG", { day: "2-digit" });
    month = date.toLocaleString("EG", { month: "long" });
    year = date.toLocaleString("EG", { year: "numeric" });
    return `${day} ${month} ${year} `;
  }
}

export default CarService;
