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
    const LargeFontSize = 10;
    const SmallFontSize = 10;
    const BlueColor = rgb(53 / 255, 60 / 255, 145 / 255);
    const WhiteColor = rgb(249 / 255, 251 / 255, 1);
    const url = `http://localhost:8080/api/car/download/${car}`;

    // Generate QR code as a Data URL (PNG format)
    const qrDataUrl = await QRCode.toDataURL(url, { width: 150, margin: 1 });
    // Extract the Base64 portion (remove "data:image/png;base64,")
    const base64Data = qrDataUrl.split(",")[1];
    const qrImageBytes = Buffer.from(base64Data, "base64");

    // Read the JPEG template from disk.
    const templateBytes = fs.readFileSync(TemplatePath);

    // Create a new PDF document.
    const pdfDoc = await PDFDocument.create();
    // const page = pdfDoc.addPage([595.28, 841.89]);
    const page = pdfDoc.addPage([850, 1000]);

    // Embed the JPEG template image as the background.
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
      x: 250,
      y: 397,
      width: 100,
      height: 100,
    });

    // Embed a bold Helvetica font.
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Helper function to add text to the page.
    const addText = (
      text: string,
      x: number,
      y: number,
      fontSize: number,
      color: any
    ) => {
      page.drawText(text, { x, y, size: fontSize, font, color });
    };

    // Define all text elements with their positions, font sizes, and colors.
    const textElements: [string, number, number, number, any][] = [
      [carRetrieved.exportCountryTo ?? "", 173, 725, LargeFontSize, WhiteColor],
      [carRetrieved.exportCountryTo ?? "", 150, 624, LargeFontSize, WhiteColor],
      [carRetrieved.vehicleType ?? "", 340, 714, LargeFontSize, BlueColor],
      [
        carRetrieved.exportPlateNumber ?? "",
        340,
        683,
        LargeFontSize,
        BlueColor,
      ],
      [
        carRetrieved.registrationPlateNumber ?? "",
        340,
        652,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.registrationDate ?? "", 340, 619, LargeFontSize, BlueColor],
      [
        carRetrieved.registrationExpiryDate ?? "",
        340,
        586,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.vehicleMake ?? "", 340, 554, LargeFontSize, BlueColor],
      [carRetrieved.category ?? "", 340, 521, LargeFontSize, BlueColor],
      [carRetrieved.modelYear ?? "", 340, 488, LargeFontSize, BlueColor],
      [carRetrieved.countryOfOrigin ?? "", 340, 456, LargeFontSize, BlueColor],
      [carRetrieved.vehicleColor ?? "", 340, 424, LargeFontSize, BlueColor],
      [carRetrieved.chassisNumber ?? "", 340, 394, LargeFontSize, BlueColor],
      [carRetrieved.engineNumber ?? "", 410, 359, LargeFontSize, BlueColor],
      [
        String(carRetrieved.numberOfDoors ?? 0),
        340,
        329,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.fuelType ?? "", 340, 297, LargeFontSize, BlueColor],
      [
        String(carRetrieved.numberOfSeats ?? 0),
        340,
        266,
        LargeFontSize,
        BlueColor,
      ],
      [
        String(carRetrieved.emptyWeight ?? 0),
        340,
        233,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.insuranceCompany ?? "", 340, 200, LargeFontSize, BlueColor],
      [carRetrieved.insuranceType ?? "", 340, 170, LargeFontSize, BlueColor],
      [
        carRetrieved.insurancePolicyNumber ?? "",
        340,
        139,
        LargeFontSize,
        BlueColor,
      ],
      [
        carRetrieved.insuranceExpiryDate ?? "",
        340,
        107,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.ownerName ?? "", 268, 365, LargeFontSize, BlueColor],
      [carRetrieved.ownerName ?? "", 25, 338, LargeFontSize, BlueColor],
      [carRetrieved.nationality ?? "", 25, 311, LargeFontSize, BlueColor],
      [carRetrieved.passportNumber ?? "", 140, 280, LargeFontSize, BlueColor],
      [
        carRetrieved.trafficCodeNumber ?? "",
        140,
        258,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.emiratesIdNumber ?? "", 140, 228, LargeFontSize, BlueColor],
      [carRetrieved.driverName ?? "", 220, 210, LargeFontSize, BlueColor],
      [carRetrieved.driverName ?? "", 78, 189, LargeFontSize, BlueColor],
      [carRetrieved.licenseNumber ?? "", 140, 172, LargeFontSize, BlueColor],
      [
        carRetrieved.driverNationality ?? "",
        140,
        152,
        LargeFontSize,
        BlueColor,
      ],
      [carRetrieved.licenseSource ?? "", 140, 122, LargeFontSize, BlueColor],
      [
        carRetrieved.certificateIssueDate ?? "",
        22,
        500,
        SmallFontSize,
        WhiteColor,
      ],
      [
        carRetrieved.certificateIssueDate ?? "",
        260,
        492,
        SmallFontSize,
        WhiteColor,
      ],
      [
        carRetrieved.certificateReferenceNumber ?? "",
        242,
        450,
        SmallFontSize,
        WhiteColor,
      ],
    ];

    // Add each text element onto the PDF page.
    textElements.forEach(([text, x, y, fontSize, color]) => {
      addText(text, x, y, fontSize, color);
    });

    // Save the updated PDF and return it as a Buffer.
    const updatedPdfBytes = await pdfDoc.save();
    return Buffer.from(updatedPdfBytes);
  }
}

export default CarService;
