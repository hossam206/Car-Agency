import { z } from "zod";

export const CarDto = z.object({
  _id: z.string().optional(),
  exportCountryTo: z.string().optional(),
  vehicleType: z.string().optional(),
  exportPlateNumber: z.string().optional(),
  registrationPlateNumber: z.string().optional(),
  registrationDate: z.string().optional(),
  registrationExpiryDate: z.string().optional(),
  vehicleMake: z.string().optional(),
  category: z.string().optional(),
  categoryArabic: z.string().optional(),
  modelYear: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  vehicleColor: z.string().optional(),
  chassisNumber: z.string().optional(),
  engineNumber: z.string().optional(),
  numberOfDoors: z.string().optional(),
  fuelType: z.string().optional(),
  numberOfSeats: z.string().optional(),
  emptyWeight: z.string().optional(),
  insuranceCompany: z.string().optional(),
  insuranceType: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  insuranceExpiryDate: z.string().optional(),
  ownerName: z.string().optional(),
  nationality: z.string().optional(),
  passportNumber: z.string().optional(),
  trafficCodeNumber: z.string().optional(),
  emiratesIdNumber: z.string().optional(),
  driverName: z.string().optional(),
  licenseNumber: z.string().optional(),
  driverNationality: z.string().optional(),
  licenseSource: z.string().optional(),
  certificateIssueDate: z.string().optional(),
  certificateReferenceNumber: z.string().optional(),
});

export const CarDtoRetrieved = z.object({
  _id: z.string().optional(),
  ownerName: z.string().optional(),
  vehicleType: z.string().optional(),
  chassisNumber: z.string().optional(),
  registrationDate: z.string().optional(),
  registrationExpiryDate: z.string().optional(),
  driverNationality: z.string().optional(),
  driverName: z.string().optional(),
});

export type CarTypeDto = z.infer<typeof CarDto>;
export type CarDtoRetrievedType = z.infer<typeof CarDtoRetrieved>;
