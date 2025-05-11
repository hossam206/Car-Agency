import { z } from "zod";
import { ObjectId } from "mongodb";

export const CarDto = z
  .object({
    _id: z.union([z.string(), z.instanceof(ObjectId)]),
    userId: z.union([z.string(), z.instanceof(ObjectId)]),
    exportCountryTo: z.string().default(""),
    vehicleType: z.string().default(""),
    exportPlateNumber: z.string().default(""),
    registrationPlateNumber: z.string().default(""),
    registrationDate: z.string().default(""),
    registrationExpiryDate: z.string().default(""),
    vehicleMake: z.string().default(""),
    category: z.string().default(""),
    modelYear: z.string().default(""),
    countryOfOrigin: z.string().default(""),
    vehicleColor: z.string().default(""),
    chassisNumber: z.string().default(""),
    engineNumber: z.string().default(""),
    numberOfDoors: z.string().default(""),
    fuelType: z.string().default(""),
    numberOfSeats: z.string().default(""),
    emptyWeight: z.string().default(""),
    insuranceCompany: z.string().default(""),
    insuranceType: z.string().default(""),
    insurancePolicyNumber: z.string().default(""),
    insuranceExpiryDate: z.string().default(""),
    ownerName: z.string().default(""),
    nationality: z.string().default(""),
    passportNumber: z.string().default(""),
    trafficCodeNumber: z.string().default(""),
    emiratesIdNumber: z.string().default(""),
    driverName: z.string().default(""),
    licenseNumber: z.string().default(""),
    driverNationality: z.string().default(""),
    licenseSource: z.string().default(""),
    certificateIssueDate: z.string().default(""),
    certificateReferenceNumber: z.string().default(""),

    exportCompany: z.string().default(""),
    exportCountryToAr: z.string().default(""),
    vehicleTypeAr: z.string().default(""),
    exportPlateNumberAr: z.string().default(""),
    registrationPlateNumberAr: z.string().default(""),
    registrationDateAr: z.string().default(""),
    registrationExpiryDateAr: z.string().default(""),
    vehicleMakeAr: z.string().default(""),
    categoryAr: z.string().default(""),
    modelYearAr: z.string().default(""),
    countryOfOriginAr: z.string().default(""),
    vehicleColorAr: z.string().default(""),
    chassisNumberAr: z.string().default(""),
    engineNumberAr: z.string().default(""),
    numberOfDoorsAr: z.string().default(""),
    fuelTypeAr: z.string().default(""),
    numberOfSeatsAr: z.string().default(""),
    emptyWeightAr: z.string().default(""),
    insuranceCompanyAr: z.string().default(""),
    insuranceTypeAr: z.string().default(""),
    insurancePolicyNumberAr: z.string().default(""),
    insuranceExpiryDateAr: z.string().default(""),
    ownerNameAr: z.string().default(""),
    nationalityAr: z.string().default(""),
    driverNameAr: z.string().default(""),
    certificateIssueDateAr: z.string().default(""),
  })
  .partial();

export const CarDtoRetrieved = z.object({
  _id: z.union([z.string(), z.instanceof(ObjectId)]),
  userId: z.union([z.string(), z.instanceof(ObjectId)]),
  ownerName: z.string().default(""),
  vehicleType: z.string().default(""),
  chassisNumber: z.string().default(""),
  registrationDate: z.string().default(""),
  registrationExpiryDate: z.string().default(""),
  driverNationality: z.string().default(""),
  driverName: z.string().default(""),
  count: z.number().default(0),
});

export const CarAddDto = CarDto;

export const CarUpdateDto = CarDto.omit({
  _id: true,
  userId: true,
});

export type CarTypeDto = z.infer<typeof CarDto>;
export type CarAddDtoType = z.infer<typeof CarAddDto>;
export type CarUpdateDtoType = z.infer<typeof CarUpdateDto>;
export type CarDtoRetrievedType = z.infer<typeof CarDtoRetrieved>;
