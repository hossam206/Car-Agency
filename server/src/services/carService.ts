import Car from "../models/mongodb/car.model";
import {
  CarDto,
  CarTypeDto,
  CarDtoRetrieved,
  CarDtoRetrievedType,
} from "../dto/car.dto";
import { clip, PDFDocument, rgb } from "pdf-lib";
import fs from "fs";
import QRCode from "qrcode";
import dotenv from "dotenv";
dotenv.config();

// @ts-ignore
import translate from "translate-google";
import { Response } from "express";
import fontkit from "@pdf-lib/fontkit";
import OpenAI from "openai";
import axios from "axios";


class CarService {
  private static instance: CarService;
  private readonly LargeFontSize = 13.55;
  private readonly SmallFontSize = 10.55;
  private readonly BlueColor = rgb(53 / 255, 60 / 255, 145 / 255);
  private readonly WhiteColor = rgb(240 / 255, 248 / 255, 1);

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

  async generateCertificate(car: any, res: Response): Promise<Buffer> {
    // Retrieve the car details

    const carRetrieved = await this.getCarById(car);
    if (!carRetrieved) {
      throw new Error("Car not found.");
    }

    //#region

    //endregion
    // Translate car details for Arabic fields
    const translatedCar = await this.TranslatedCar(carRetrieved);

    //#region PDF Properties
    // Load the PDF template and font from the file system
    const templateBytes = fs.readFileSync(
      String(process.env.PATH_LOCATION_PDF)
    );

    // Font
    const fontBytes = fs.readFileSync(String(process.env.PATH_FONT));
    const LargeFontSize = 12;
    const SmallFontSize = 11;

    // Define colors
    const BlueColor = rgb(53 / 255, 60 / 255, 145 / 255);
    const WhiteColor = rgb(240 / 255, 248 / 255, 1);

    //#endregion

    // Generate the QR code image for the URL
    const url = `${process.env.API}/car/view/${car}`;
    const qrDataUrl = await QRCode.toDataURL(url, { width: 150, margin: 1 });
    const base64Data = qrDataUrl.split(",")[1];
    const qrImageBytes = Buffer.from(base64Data, "base64");

    // Create a new PDF document and add a page
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const page = pdfDoc.addPage([850, 1000]);

    // Embed the font and background image in the PDF
    const font = await pdfDoc.embedFont(fontBytes);
    const backgroundImage = await pdfDoc.embedJpg(templateBytes);
    page.drawImage(backgroundImage, {
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
    });

    // Embed and draw the QR code image
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    page.drawImage(qrImage, { x: 360, y: 482, width: 73, height: 67 });

    // Helper function to add left-aligned text (for English)
    const addLeftAlignedText = (
      text: string,
      x: number,
      y: number,
      fontSize: number,
      color: any
    ) => {
      page.drawText(text, { x, y, size: fontSize, font, color });
    };

    // Helper function to add right-aligned text (for Arabic)
    // This function calculates the text width and subtracts it from the right margin
    const addRightAlignedText = (
      text: string,
      rightMargin: number,
      y: number,
      fontSize: number,
      color: any
    ) => {
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const startX = rightMargin - textWidth;
      page.drawText(text, { x: startX, y, size: fontSize, font, color });
    };

    // prettier-ignore
    // English text data
    const textEnglish: [string, number, number, number, any][] = [
      [carRetrieved.exportCountryTo       ?? "",  217, 771, SmallFontSize, WhiteColor],
      [carRetrieved.vehicleType           ?? "",  484, 880, LargeFontSize, BlueColor],
      [carRetrieved.exportPlateNumber     ?? "",  485, 841, LargeFontSize, BlueColor],
      [carRetrieved.registrationPlateNumber ?? "",485, 805, LargeFontSize, BlueColor],
      [this.DateConvertEnglish(carRetrieved.registrationDate  ?? "","EG"),  485, 764, LargeFontSize, BlueColor],
      [this.DateConvertEnglish(carRetrieved.registrationExpiryDate ?? "","EG"), 485, 723, LargeFontSize, BlueColor],
      [carRetrieved.vehicleMake           ?? "",  485, 685, LargeFontSize, BlueColor],
      [carRetrieved.category              ?? "",  485, 645, LargeFontSize, BlueColor],
      [carRetrieved.modelYear             ?? "",  485, 600, LargeFontSize, BlueColor],
      [carRetrieved.countryOfOrigin       ?? "",  485, 565, LargeFontSize, BlueColor],
      [carRetrieved.vehicleColor          ?? "",  485, 527, LargeFontSize, BlueColor],
      [carRetrieved.chassisNumber         ?? "",  485, 485, LargeFontSize, BlueColor],
      [carRetrieved.engineNumber          ?? "NULL",  485, 445, LargeFontSize, BlueColor],
      [String(carRetrieved.numberOfDoors  ?? ""), 485, 408, LargeFontSize, BlueColor],
      [carRetrieved.fuelType              ?? "",  485, 365, LargeFontSize, BlueColor],
      [String(carRetrieved.numberOfSeats  ?? ""),  485, 329, LargeFontSize, BlueColor],
      [String(carRetrieved.emptyWeight    ?? ""),  485, 288, LargeFontSize, BlueColor],
      [carRetrieved.insuranceCompany      ?? "",  485, 250, LargeFontSize, BlueColor],
      [carRetrieved.insuranceType         ?? "",  485, 210, LargeFontSize, BlueColor],
      [carRetrieved.insurancePolicyNumber ?? "",  485, 172, LargeFontSize, BlueColor],
      [this.DateConvertEnglish(carRetrieved.insuranceExpiryDate ?? "","EG"),  485, 134, LargeFontSize, BlueColor],
      [carRetrieved.ownerName             ?? "",  36,  418, LargeFontSize, BlueColor],
      [carRetrieved.nationality           ?? "",  36,  383, LargeFontSize, BlueColor],
      [carRetrieved.passportNumber        ?? "",  200, 348, LargeFontSize, BlueColor],
      [carRetrieved.trafficCodeNumber     ?? "",  200, 320, LargeFontSize, BlueColor],
      [carRetrieved.emiratesIdNumber      ?? "",  200, 285, LargeFontSize, BlueColor],
      [carRetrieved.driverName            ?? "",  116, 238, LargeFontSize, BlueColor],
      [carRetrieved.licenseNumber         ?? "",  200, 216, LargeFontSize, BlueColor],
      [carRetrieved.driverNationality     ?? "",  200, 190, LargeFontSize, BlueColor],
      [carRetrieved.licenseSource         ?? "",  200, 150, LargeFontSize, BlueColor],
      [this.DateConvertArabic(carRetrieved.certificateIssueDate  ?? "","EG"),  30,  615, SmallFontSize-2, WhiteColor], // In block blue - edit is english
      [carRetrieved.certificateReferenceNumber ?? "",  370, 556, SmallFontSize, WhiteColor]
    ];

    // prettier-ignore
    // Arabic text data
    const textArabic: [string, number, number, number, any][] = [
      [translatedCar.exportCountryTo ?? "", 291, 892, SmallFontSize, WhiteColor],
      [translatedCar.vehicleType ?? "", 816, 880, LargeFontSize, BlueColor],
      [carRetrieved.exportPlateNumber ?? "", 816, 841, LargeFontSize, BlueColor],
      [carRetrieved.registrationPlateNumber ?? "", 816, 805, LargeFontSize, BlueColor],
      [ this.DateConvertEnglish(carRetrieved.registrationDate ?? "","ar"), 816, 764, LargeFontSize, BlueColor],
      [ this.DateConvertEnglish(carRetrieved.registrationExpiryDate ??"", "ar"), 816, 723, LargeFontSize, BlueColor],
      [carRetrieved.vehicleMake ?? "", 816, 685, LargeFontSize, BlueColor],
      [carRetrieved.categoryArabic ?? "", 816, 645, LargeFontSize, BlueColor],
      [carRetrieved.modelYear ?? "", 816, 600, LargeFontSize, BlueColor],
      [translatedCar.countryOfOrigin ?? "", 816, 565, LargeFontSize, BlueColor],
      [translatedCar.vehicleColor ?? "", 816, 527, LargeFontSize, BlueColor],
      [carRetrieved.chassisNumber ?? "", 816, 485, LargeFontSize, BlueColor],
      [carRetrieved.engineNumber ?? "", 816, 445, LargeFontSize, BlueColor],
      [String(carRetrieved.numberOfDoors ?? ""), 816, 408, LargeFontSize, BlueColor],
      [translatedCar.fuelType ?? "", 816, 365, LargeFontSize, BlueColor],
      [String(carRetrieved.numberOfSeats ?? ""), 816, 329, LargeFontSize, BlueColor],
      [String(carRetrieved.emptyWeight ?? ""), 816, 288, LargeFontSize, BlueColor],
      [translatedCar.insuranceCompany ?? "", 816, 250, LargeFontSize, BlueColor],
      [translatedCar.insuranceType ?? "", 816, 210, LargeFontSize, BlueColor],
      [carRetrieved.insurancePolicyNumber ?? "", 816, 172, LargeFontSize, BlueColor],
      [ this.DateConvertEnglish(carRetrieved.insuranceExpiryDate ??"", "ar"), 816, 134, SmallFontSize, BlueColor],
      [translatedCar.ownerName ?? "", 448, 450, LargeFontSize, BlueColor],
      [translatedCar.nationality ?? "",  448,  383, LargeFontSize, BlueColor],
      [translatedCar.driverName ?? "", 390, 264, LargeFontSize, BlueColor],
      [ this.DateConvertArabic(carRetrieved.certificateIssueDate ??"" , "ar"), 430, 608, SmallFontSize, WhiteColor] // In block blue - edit is arabic
    ];

    // Draw English text
    textEnglish.forEach(([text, x, y, fontSize, color]) => {
      addLeftAlignedText(text, x, y, fontSize, color);
    });

    // Draw Arabic text
    textArabic.forEach(([text, rightMargin, y, fontSize, color]) => {
      addRightAlignedText(text, rightMargin, y, fontSize, color);
    });

    // Save the PDF and return it as a Buffer
    const updatedPdfBytes = await pdfDoc.save();
    return Buffer.from(updatedPdfBytes);
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

      let partsArabic = formattedDateArabic.split(" ");
      let partsEnglish = formattedDateEnglish.split(" ");
      partsArabic[0] = partsEnglish[1].split("").reverse().join("").replace(",","");
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
      return `${day} ${month} ${year.split("").reverse().join("")}`;
    }

    // Using to format => 2025 December 10
    day = date.toLocaleString("EG", { day: "2-digit" });
    month = date.toLocaleString("EG", { month: "long" });
    year = date.toLocaleString("EG", { year: "numeric" });
    return `${year} ${month} ${day}`;
  }

  // // Translate to arabic by using translate
  // async TranslatedCar(carRetrieved: any): Promise<any> {
  //   return Object.fromEntries(
  //     await Promise.all(
  //       Object.entries(carRetrieved).map(async ([key, value]) => {
  //         if (typeof value === "string" && value.trim() !== "") {
  //           const translatedText = await translate(value, { to: "ar" });
  //           // const translatedText = await translateWithOpenAI(value, "Arabic");
  //           return [key, translatedText];
  //         }
  //         return [key, value];
  //       })
  //     )
  //   );
  // }

  async  TranslatedCar(carRetrieved: any): Promise<any> {
    return Object.fromEntries(
        await Promise.all(
            Object.entries(carRetrieved).map(async ([key, value]) => {
                if (typeof value === "string" && value.trim() !== "") {
                    try {
                        const response = await axios.post(
                            "https://api-free.deepl.com/v2/translate",
                            new URLSearchParams({
                                auth_key: "1d6dbfc0-f72f-4ea0-b851-02ec5775e52a:fx",
                                text: value,
                                target_lang: "AR"
                            }).toString(),
                            {
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            }
                        );

                        const translatedText = response.data.translations[0].text;
                        return [key, translatedText];
                    } catch (error) {
                        console.error(`Error translating key: ${key}`, error);
                        return [key, value]; 
                    }
                }
                return [key, value];
            })
        )
    );
}

}



export default CarService;
