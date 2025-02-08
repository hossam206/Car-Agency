import mongoose, { Types } from "mongoose";

const carSchema = new mongoose.Schema(
  {
    exportCountryTo: String,
    vehicleType: String,
    exportPlateNumber: String,
    registrationPlateNumber: String,
    registrationDate: String,
    registrationExpiryDate: String,
    vehicleMake: String,
    category: String,
    modelYear: String,
    countryOfOrigin: String,
    vehicleColor: String,
    chassisNumber: String,
    engineNumber: String,
    numberOfDoors: Number,
    fuelType: String,
    numberOfSeats: Number,
    emptyWeight: Number,
    insuranceCompany: String,
    insuranceType: String,
    insurancePolicyNumber: String,
    insuranceExpiryDate: String,
    ownerName: String,
    nationality: String,
    passportNumber: String,
    trafficCodeNumber: String,
    emiratesIdNumber: String,
    driverName: String,
    licenseNumber: String,
    driverNationality: String,
    licenseSource: String,
    certificateIssueDate: String,
    certificateReferenceNumber: String,
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
