import mongoose, { Types } from "mongoose";

const carSchema = new mongoose.Schema(
  {
    category: String,
    certificateIssueDate: String,
    certificateReferenceNumber: String,
    chassisNumber: String,
    countryOfOrigin: String,
    driverName: String,
    driverNationality: String,
    emiratesIdNumber: String,
    emptyWeight: Number,
    engineNumber: String,
    exportCountryTo: String,
    exportPlateNumber: String,
    fuelType: String,
    insuranceCompany: String,
    insuranceExpiryDate: String,
    insurancePolicyNumber: String,
    insuranceType: String,
    licenseNumber: String,
    licenseSource: String,
    modelYear: String,
    nationality: String,
    numberOfDoors: Number,
    numberOfSeats: Number,
    ownerName: String,
    passportNumber: String,
    registrationDate: String,
    registrationExpiryDate: String,
    registrationPlateNumber: String,
    trafficCodeNumber: String,
    vehicleColor: String,
    vehicleMake: String,
    vehicleType: String,
  },
  {
    timestamps: true,
  },
);

const Car = mongoose.model("Car", carSchema);

export default Car;
