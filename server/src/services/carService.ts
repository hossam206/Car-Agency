import Car from "../models/mongodb/car.model";
import { CarDto, CarTypeDto } from "../dto/car.dto";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import QRCode from "qrcode";

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

  async getAllCars(page = 1): Promise<CarTypeDto[]> {
    try {
      const retrievedCars = await Car.find({})
        .skip((page - 1) * 10)
        .limit(10);
      if (!retrievedCars.length) {
        throw new Error("No cars found!");
      }
      const carsDto = retrievedCars.map((car) => {
        const parsed = CarDto.safeParse(car);
        if (!parsed.success) {
          throw new Error("Car validation failed");
        }
        return parsed.data;
      });
      return carsDto;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error fetching car count"
      );
    }
  }

  async getCarById(carId: string): Promise<CarTypeDto> {
    try {
      const retrievedCar = await Car.findById(carId);
      if (!retrievedCar) {
        throw new Error("No car found!");
      }
      const parsed = CarDto.safeParse(retrievedCar);
      if (!parsed.success) {
        throw new Error("Car validation failed");
      }
      return parsed.data;
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

  async generateCertificate(car: any): Promise<Buffer> {
    const carRetrieved = await this.getCarById(car);
    if (!carRetrieved) {
      throw new Error("Car not found.");
    }

    const TemplatePath =
      "D:\\project\\Car-AgencyNew\\src\\pdf\\ExportCertificate.jpeg";
    const LargeFontSize = 15;
    const SmallFontSize = 13;
    const BlueColor = rgb(53 / 255, 60 / 255, 145 / 255);
    const WhiteColor = rgb(240 / 255, 248 / 250, 1);
    const url = `http://localhost:8080/api/car/download/${car}`;

    // Generate QR code
    const qrDataUrl = await QRCode.toDataURL(url, { width: 150, margin: 1 });
    const base64Data = qrDataUrl.split(",")[1];
    const qrImageBytes = Buffer.from(base64Data, "base64");

    // Read the JPEG template from server.
    const templateBytes = fs.readFileSync(TemplatePath);

    // Create a new PDF document.
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([850, 1000]);

    // Image as the background.
    const backgroundImage = await pdfDoc.embedJpg(templateBytes);
    page.drawImage(backgroundImage, {
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
    });

    // Embed the QR code image (PNG).
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    page.drawImage(qrImage, {
      x: 360,
      y: 482,
      width: 73,
      height: 67,
    });

    // Font.
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Add text to the page.
    const addText = (
      text: string,
      x: number,
      y: number,
      fontSize: number,
      color: any
    ) => {
      page.drawText(text, { x, y, size: fontSize, font, color });
    };

    // Define all text elements with positions, font sizes, and colors. [ English ]
    const textEnglish: [string, number, number, number, any][] = [
      [carRetrieved.exportCountryTo ?? "", 217, 772, LargeFontSize, WhiteColor],
      [carRetrieved.vehicleType ?? "", 786, 880, LargeFontSize, BlueColor],
      [carRetrieved.vehicleType ?? "", 484, 880, LargeFontSize, BlueColor],
      [
        carRetrieved.exportPlateNumber ?? "",
        485,
        841,
        LargeFontSize,
        BlueColor,
      ],
      [
        carRetrieved.registrationPlateNumber ?? "",
        485,
        805,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.registrationDate ?? "", 485, 764, LargeFontSize, BlueColor],
      [
        carRetrieved.registrationExpiryDate ?? "",
        485,
        723,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.vehicleMake ?? "", 485, 685, LargeFontSize, BlueColor],
      [carRetrieved.category ?? "", 485, 645, LargeFontSize, BlueColor],
      [carRetrieved.modelYear ?? "", 485, 600, LargeFontSize, BlueColor],
      [carRetrieved.countryOfOrigin ?? "", 485, 565, LargeFontSize, BlueColor],
      [carRetrieved.vehicleColor ?? "", 485, 527, LargeFontSize, BlueColor],
      [carRetrieved.chassisNumber ?? "", 485, 485, LargeFontSize, BlueColor],
      [carRetrieved.engineNumber ?? "", 485, 445, LargeFontSize, BlueColor],
      [
        String(carRetrieved.numberOfDoors ?? 0),
        485,
        408,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.fuelType ?? "", 485, 365, LargeFontSize, BlueColor],
      [
        String(carRetrieved.numberOfSeats ?? 0),
        485,
        329,
        LargeFontSize,
        BlueColor,
      ],
      [
        String(carRetrieved.emptyWeight ?? 0),
        485,
        288,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.insuranceCompany ?? "", 485, 250, LargeFontSize, BlueColor],
      [carRetrieved.insuranceType ?? "", 485, 210, LargeFontSize, BlueColor],
      [
        carRetrieved.insurancePolicyNumber ?? "",
        485,
        172,
        LargeFontSize,
        BlueColor,
      ],
      [
        carRetrieved.insuranceExpiryDate ?? "",
        485,
        134,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.ownerName ?? "", 36, 418, LargeFontSize, BlueColor],
      [carRetrieved.nationality ?? "", 36, 383, LargeFontSize, BlueColor],
      [carRetrieved.passportNumber ?? "", 200, 348, LargeFontSize, BlueColor],
      [
        carRetrieved.trafficCodeNumber ?? "",
        200,
        320,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.emiratesIdNumber ?? "", 200, 285, LargeFontSize, BlueColor],
      [carRetrieved.driverName ?? "", 117, 238, LargeFontSize, BlueColor],
      [carRetrieved.licenseNumber ?? "", 200, 216, LargeFontSize, BlueColor],
      [
        carRetrieved.driverNationality ?? "",
        200,
        190,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.licenseSource ?? "", 200, 150, LargeFontSize, BlueColor],
      [
        carRetrieved.certificateIssueDate ?? "",
        30,
        615,
        SmallFontSize,
        WhiteColor,
      ],
      [
        carRetrieved.certificateReferenceNumber ?? "",
        370,
        556,
        SmallFontSize,
        WhiteColor,
      ],
    ];

    // Add each text element onto the PDF page.  [ English ]
    textEnglish.forEach(([text, x, y, fontSize, color]) => {
      addText(text, x, y, fontSize, color);
    });

    // Define all text elements with positions, font sizes, and colors. [ arabic ]
    const textArabic: [string, number, number, number, any][] = [
      [carRetrieved.exportCountryTo ?? "", 260, 892, LargeFontSize, WhiteColor],
      [carRetrieved.vehicleType ?? "", 786, 880, LargeFontSize, BlueColor],
      [
        carRetrieved.exportPlateNumber ?? "",
        786,
        841,
        LargeFontSize,
        BlueColor,
      ],
      [
        carRetrieved.registrationPlateNumber ?? "",
        786,
        805,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.registrationDate ?? "", 786, 764, LargeFontSize, BlueColor],
      [
        carRetrieved.registrationExpiryDate ?? "",
        786,
        723,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.vehicleMake ?? "", 786, 685, LargeFontSize, BlueColor],
      [carRetrieved.category ?? "", 786, 645, LargeFontSize, BlueColor],
      [carRetrieved.modelYear ?? "", 786, 600, LargeFontSize, BlueColor],
      [carRetrieved.countryOfOrigin ?? "", 786, 565, LargeFontSize, BlueColor],
      [carRetrieved.vehicleColor ?? "", 786, 527, LargeFontSize, BlueColor],
      [carRetrieved.chassisNumber ?? "", 786, 485, LargeFontSize, BlueColor],
      [carRetrieved.engineNumber ?? "", 786, 445, LargeFontSize, BlueColor],
      [
        String(carRetrieved.numberOfDoors ?? 0),
        786,
        408,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.fuelType ?? "", 786, 365, LargeFontSize, BlueColor],
      [
        String(carRetrieved.numberOfSeats ?? 0),
        786,
        329,
        LargeFontSize,
        BlueColor,
      ],
      [
        String(carRetrieved.emptyWeight ?? 0),
        786,
        288,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.insuranceCompany ?? "", 786, 250, LargeFontSize, BlueColor],
      [carRetrieved.insuranceType ?? "", 786, 210, LargeFontSize, BlueColor],
      [
        carRetrieved.insurancePolicyNumber ?? "",
        786,
        172,
        LargeFontSize,
        BlueColor,
      ],
      [
        carRetrieved.insuranceExpiryDate ?? "",
        786,
        134,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.ownerName ?? "", 380, 450, LargeFontSize, BlueColor],
      [carRetrieved.driverName ?? "", 320, 264, LargeFontSize, BlueColor],
      [
        carRetrieved.certificateIssueDate ?? "",
        369,
        608,
        SmallFontSize,
        WhiteColor,
      ],
    ];

    // Add each text element onto the PDF page.  [ Arabic ]
    textArabic.forEach(([text, x, y, fontSize, color]) => {
      addText(text, x, y, fontSize, color);
    });

    // Save the updated PDF and return it as a Buffer.
    const updatedPdfBytes = await pdfDoc.save();
    return Buffer.from(updatedPdfBytes);
  }
}

export default CarService;
