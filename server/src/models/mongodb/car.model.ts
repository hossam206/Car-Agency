import mongoose from "mongoose";
import { CarTypeDto } from "../../dto/car.dto";

const carSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    // English
    category: { type: String, default: "" },
    categoryArabic: { type: String, default: "" },
    certificateIssueDate: { type: String, default: "" },
    certificateReferenceNumber: { type: String, default: "" },
    chassisNumber: { type: String, default: "" },
    countryOfOrigin: { type: String, default: "" },
    driverName: { type: String, default: "" },
    driverNationality: { type: String, default: "" },
    emiratesIdNumber: { type: String, default: "" },
    emptyWeight: { type: String, default: "" },
    engineNumber: { type: String, default: "" },
    exportCountryTo: { type: String, default: "" },
    exportPlateNumber: { type: String, default: "" },
    fuelType: { type: String, default: "" },
    insuranceCompany: { type: String, default: "" },
    insuranceExpiryDate: { type: String, default: "" },
    insurancePolicyNumber: { type: String, default: "" },
    insuranceType: { type: String, default: "" },
    licenseNumber: { type: String, default: "" },
    licenseSource: { type: String, default: "" },
    modelYear: { type: String, default: "" },
    nationality: { type: String, default: "" },
    numberOfDoors: { type: String, default: "" },
    numberOfSeats: { type: String, default: "" },
    ownerName: { type: String, default: "" },
    passportNumber: { type: String, default: "" },
    registrationDate: { type: String, default: "" },
    registrationExpiryDate: { type: String, default: "" },
    registrationPlateNumber: { type: String, default: "" },
    trafficCodeNumber: { type: String, default: "" },
    vehicleColor: { type: String, default: "" },
    vehicleMake: { type: String, default: "" },
    vehicleType: { type: String, default: "" },

    // Arabic
    exportCountryToAr: { type: String, default: "" },
    vehicleTypeAr: { type: String, default: "" },
    exportPlateNumberAr: { type: String, default: "" },
    registrationPlateNumberAr: { type: String, default: "" },
    registrationDateAr: { type: String, default: "" },
    registrationExpiryDateAr: { type: String, default: "" },
    vehicleMakeAr: { type: String, default: "" },
    categoryAr: { type: String, default: "" },
    modelYearAr: { type: String, default: "" },
    countryOfOriginAr: { type: String, default: "" },
    vehicleColorAr: { type: String, default: "" },
    chassisNumberAr: { type: String, default: "" },
    engineNumberAr: { type: String, default: "" },
    numberOfDoorsAr: { type: String, default: "" },
    fuelTypeAr: { type: String, default: "" },
    numberOfSeatsAr: { type: String, default: "" },
    emptyWeightAr: { type: String, default: "" },
    insuranceCompanyAr: { type: String, default: "" },
    insuranceTypeAr: { type: String, default: "" },
    insurancePolicyNumberAr: { type: String, default: "" },
    insuranceExpiryDateAr: { type: String, default: "" },
    ownerNameAr: { type: String, default: "" },
    nationalityAr: { type: String, default: "" },
    driverNameAr: { type: String, default: "" },
    certificateIssueDateAr: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model<CarTypeDto>("Car", carSchema);

export default Car;
