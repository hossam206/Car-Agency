import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    // English
    category: String,
    categoryArabic: String,
    certificateIssueDate: String,
    certificateReferenceNumber: String,
    chassisNumber: String,
    countryOfOrigin: String,
    driverName: String,
    driverNationality: String,
    emiratesIdNumber: String,
    emptyWeight: String,
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
    numberOfDoors: String,
    numberOfSeats: String,
    ownerName: String,
    passportNumber: String,
    registrationDate: String,
    registrationExpiryDate: String,
    registrationPlateNumber: String,
    trafficCodeNumber: String,
    vehicleColor: String,
    vehicleMake: String,
    vehicleType: String,

    // Arabic
    exportCountryToAr: String,
    vehicleTypeAr: String,
    exportPlateNumberAr: String,
    registrationPlateNumberAr: String,
    registrationDateAr: String,
    registrationExpiryDateAr: String,
    vehicleMakeAr: String,
    categoryAr: String,
    modelYearAr: String,
    countryOfOriginAr: String,
    vehicleColorAr: String,
    chassisNumberAr: String,
    engineNumberAr: String,
    numberOfDoorsAr: String,
    fuelTypeAr: String,
    numberOfSeatsAr: String,
    emptyWeightAr: String,
    insuranceCompanyAr: String,
    insuranceTypeAr: String,
    insurancePolicyNumberAr: String,
    insuranceExpiryDateAr: String,
    ownerNameAr: String,
    nationalityAr: String,
    driverNameAr: String,
    certificateIssueDateAr: String,
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
