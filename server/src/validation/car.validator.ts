import { body, ValidationChain } from "express-validator";

const validCar = (): ValidationChain[] => {
  const validator = (field: string): ValidationChain => {
    return body(field)
      .trim()
      .optional({checkFalsy: true})
      .isString()
      .bail()
      .isLength({ min: 1, max: 50 })
      .bail()
      .escape();
  };

  return [
    validator("category"),
    validator("certificateIssueDate"),
    validator("certificateReferenceNumber"),
    validator("chassisNumber"),
    validator("countryOfOrigin"),
    validator("driverName"),
    validator("driverNationality"),
    validator("emiratesIdNumber"),
    validator("emptyWeight"),
    validator("engineNumber"),
    validator("exportCountryTo"),
    validator("exportPlateNumber"),
    validator("fuelType"),
    validator("insuranceCompany"),
    validator("insuranceExpiryDate"),
    validator("insurancePolicyNumber"),
    validator("insuranceType"),
    validator("licenseNumber"),
    validator("licenseSource"),
    validator("modelYear"),
    validator("nationality"),
    validator("numberOfDoors"),
    validator("numberOfSeats"),
    validator("ownerName"),
    validator("passportNumber"),
    validator("registrationDate"),
    validator("registrationExpiryDate"),
    validator("registrationPlateNumber"),
    validator("trafficCodeNumber"),
    validator("vehicleColor"),
    validator("vehicleMake"),
    validator("vehicleType"),

    validator("exportCountryToAr"),
    validator("vehicleTypeAr"),
    validator("exportPlateNumberAr"),
    validator("registrationPlateNumberAr"),
    validator("registrationDateAr"),
    validator("registrationExpiryDateAr"),
    validator("vehicleMakeAr"),
    validator("categoryAr"),
    validator("modelYearAr"),
    validator("countryOfOriginAr"),
    validator("vehicleColorAr"),
    validator("chassisNumberAr"),
    validator("engineNumberAr"),
    validator("numberOfDoorsAr"),
    validator("fuelTypeAr"),
    validator("numberOfSeatsAr"),
    validator("emptyWeightAr"),
    validator("insuranceCompanyAr"),
    validator("insuranceTypeAr"),
    validator("insurancePolicyNumberAr"),
    validator("insuranceExpiryDateAr"),
    validator("ownerNameAr"),
    validator("nationalityAr"),
    validator("driverNameAr"),
    validator("certificateIssueDateAr"),
  ];
};

export const generateCertificateValidator = [
  body("userId").isMongoId().withMessage("Invalid carId"),
  body("carId").isMongoId().withMessage("Invalid carId"),
];

export default validCar;
