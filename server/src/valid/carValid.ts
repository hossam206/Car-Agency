import { body } from "express-validator";

const validCar = () => {
  return [
    body("category").optional().isString(),
    body("certificateIssueDate").optional().isString(),
    body("certificateReferenceNumber").optional().isString(),
    body("chassisNumber").optional().isString(),
    body("countryOfOrigin").optional().isString(),
    body("driverName").optional().isString(),
    body("driverNationality").optional().isString(),
    body("emiratesIdNumber").optional().isString(),
    body("emptyWeight").optional().isString(),
    body("engineNumber").optional().isString(),
    body("exportCountryTo").optional().isString(),
    body("exportPlateNumber").optional().isString(),
    body("fuelType").optional().isString(),
    body("insuranceCompany").optional().isString(),
    body("insuranceExpiryDate").optional().isString(),
    body("insurancePolicyNumber").optional().isString(),
    body("insuranceType").optional().isString(),
    body("licenseNumber").optional().isString(),
    body("licenseSource").optional().isString(),
    body("modelYear").optional().isString(),
    body("nationality").optional().isString(),
    body("numberOfDoors").optional().isString(),
    body("numberOfSeats").optional().isString(),
    body("ownerName").optional().isString(),
    body("passportNumber").optional().isString(),
    body("registrationDate").optional().isString(),
    body("registrationExpiryDate").optional().isString(),
    body("registrationPlateNumber").optional().isString(),
    body("trafficCodeNumber").optional().isString(),
    body("vehicleColor").optional().isString(),
    body("vehicleMake").optional().isString(),
    body("vehicleType").optional().isString(),
  ];
};

export default validCar;
