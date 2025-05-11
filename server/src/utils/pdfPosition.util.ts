import { rgb, type RGB } from "pdf-lib";
const BlueColor: RGB = rgb(51 / 255, 49 / 255, 156 / 255);
const WhiteColor: RGB = rgb(240 / 255, 248 / 255, 1);
const LargeFontSize = 7.3;
const SmallFontSize = 7.3;

export const textArabicPosition: Record<string, [number, number, number, RGB]> =
  {
    exportCountryToAr: [322, 547, SmallFontSize, WhiteColor],
    vehicleTypeAr: [599, 540, LargeFontSize, BlueColor],
    exportPlateNumberAr: [599, 517, LargeFontSize, BlueColor],
    registrationPlateNumberAr: [599, 492, LargeFontSize, BlueColor],
    registrationDateAr: [599, 469, LargeFontSize, BlueColor],
    registrationExpiryDateAr: [599, 443, LargeFontSize, BlueColor],
    vehicleMakeAr: [599, 420, LargeFontSize, BlueColor],
    categoryAr: [599, 395, LargeFontSize, BlueColor],
    modelYearAr: [599, 370, LargeFontSize, BlueColor],
    countryOfOriginAr: [599, 346, LargeFontSize, BlueColor],
    vehicleColorAr: [599, 323, LargeFontSize, BlueColor],
    chassisNumberAr: [599, 298, LargeFontSize, BlueColor],
    numberOfDoorsAr: [599, 251, LargeFontSize, BlueColor],
    fuelTypeAr: [599, 227, LargeFontSize, BlueColor],
    numberOfSeatsAr: [599, 202, LargeFontSize, BlueColor],
    emptyWeightAr: [599, 177, LargeFontSize, BlueColor],
    insuranceCompanyAr: [599, 153, LargeFontSize, BlueColor],
    insuranceTypeAr: [599, 129, LargeFontSize, BlueColor],
    insurancePolicyNumberAr: [599, 105, LargeFontSize, BlueColor],
    insuranceExpiryDateAr: [599, 83, SmallFontSize, BlueColor],
    ownerNameAr: [404, 277, LargeFontSize, BlueColor],
    nationalityAr: [404, 236, LargeFontSize, BlueColor],
    driverNameAr: [372, 161, LargeFontSize, BlueColor],
  };

export const textEnglishPosition: Record<
  string,
  [number, number, number, RGB]
> = {
  exportCountryTo: [284, 473, SmallFontSize + 1.3, WhiteColor],
  vehicleType: [424, 540, LargeFontSize, BlueColor],
  exportPlateNumber: [424, 517, LargeFontSize, BlueColor],
  registrationPlateNumber: [424, 492, LargeFontSize, BlueColor],
  registrationDate: [424, 469, LargeFontSize, BlueColor],
  registrationExpiryDate: [424, 443, LargeFontSize, BlueColor],
  vehicleMake: [424, 420, LargeFontSize, BlueColor],
  category: [424, 395, LargeFontSize, BlueColor],
  modelYear: [424, 370, LargeFontSize, BlueColor],
  countryOfOrigin: [424, 346, LargeFontSize, BlueColor],
  vehicleColor: [424, 323, LargeFontSize, BlueColor],
  chassisNumber: [424, 298, LargeFontSize, BlueColor],
  engineNumber: [508, 274, LargeFontSize, BlueColor],
  numberOfDoors: [424, 251, LargeFontSize, BlueColor],
  fuelType: [424, 227, LargeFontSize, BlueColor],
  numberOfSeats: [424, 202, LargeFontSize, BlueColor],
  emptyWeight: [424, 177, LargeFontSize, BlueColor],
  insuranceCompany: [424, 153, LargeFontSize, BlueColor],
  insurancePolicyNumber: [424, 105, LargeFontSize, BlueColor],
  insuranceExpiryDate: [424, 83, LargeFontSize, BlueColor],
  ownerName: [189, 257, LargeFontSize, BlueColor],
  nationality: [189, 236, LargeFontSize, BlueColor],
  passportNumber: [275, 214, LargeFontSize, BlueColor],
  trafficCodeNumber: [280, 197, LargeFontSize, BlueColor],
  emiratesIdNumber: [275, 182, LargeFontSize, BlueColor],
  driverName: [228, 146, LargeFontSize - 0.3, BlueColor],
  licenseNumber: [285, 133, LargeFontSize, BlueColor],
  driverNationality: [285, 118, LargeFontSize, BlueColor],
  licenseSource: [285, 95, LargeFontSize, BlueColor],
  certificateIssueDate: [186, 378, SmallFontSize - 2, WhiteColor],
};
