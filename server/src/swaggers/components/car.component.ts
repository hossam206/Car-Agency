/**
 * @swagger
 * components:
 *   schemas:
 *     VehicleBaseDto:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           description: Vehicle category
 *           example: Private
 *         categoryArabic:
 *           type: string
 *           description: Vehicle category in Arabic
 *           example: خاصة
 *         certificateIssueDate:
 *           type: string
 *           description: Date the certificate was issued
 *           example: 2024-03-25
 *         certificateReferenceNumber:
 *           type: string
 *           description: Unique certificate reference number
 *           example: CRN12345678
 *         chassisNumber:
 *           type: string
 *           description: Chassis number of the vehicle
 *           example: XYZ1234567890
 *         countryOfOrigin:
 *           type: string
 *           description: Country where the vehicle was manufactured
 *           example: Japan
 *         driverName:
 *           type: string
 *           description: Full name of the driver
 *           example: John Doe
 *         driverNationality:
 *           type: string
 *           description: Nationality of the driver
 *           example: American
 *         emiratesIdNumber:
 *           type: string
 *           description: Emirates ID number
 *           example: 784-2024-1234567-1
 *         emptyWeight:
 *           type: string
 *           description: Weight of the vehicle without load
 *           example: 1500
 *         engineNumber:
 *           type: string
 *           description: Engine number of the vehicle
 *           example: ENG987654321
 *         exportCountryTo:
 *           type: string
 *           description: Country the vehicle is being exported to
 *           example: USA
 *         exportPlateNumber:
 *           type: string
 *           description: Plate number for export
 *           example: EX12345
 *         fuelType:
 *           type: string
 *           description: Type of fuel used by the vehicle
 *           example: Petrol
 *         insuranceCompany:
 *           type: string
 *           description: Name of the insurance company
 *           example: AXA Insurance
 *         insuranceExpiryDate:
 *           type: string
 *           description: Expiry date of the insurance
 *           example: 2025-03-27
 *         insurancePolicyNumber:
 *           type: string
 *           description: Insurance policy number
 *           example: POL12345678
 *         insuranceType:
 *           type: string
 *           description: Type of insurance coverage
 *           example: Comprehensive
 *         licenseNumber:
 *           type: string
 *           description: Driver’s license number
 *           example: DL123456
 *         licenseSource:
 *           type: string
 *           description: Issuing authority of the driver’s license
 *           example: Dubai
 *         modelYear:
 *           type: string
 *           description: Model year of the vehicle
 *           example: 2022
 *         nationality:
 *           type: string
 *           description: Nationality of the owner or driver
 *           example: American
 *         numberOfDoors:
 *           type: string
 *           description: Number of doors in the vehicle
 *           example: 4
 *         numberOfSeats:
 *           type: string
 *           description: Number of seats in the vehicle
 *           example: 5
 *         ownerName:
 *           type: string
 *           description: Name of the vehicle’s owner
 *           example: John Doe
 *         passportNumber:
 *           type: string
 *           description: Passport number of the driver or owner
 *           example: P123456789
 *         registrationDate:
 *           type: string
 *           description: Vehicle registration date
 *           example: 2024-03-27
 *         registrationExpiryDate:
 *           type: string
 *           description: Vehicle registration expiry date
 *           example: 2026-03-27
 *         registrationPlateNumber:
 *           type: string
 *           description: Vehicle registration plate number
 *           example: AB123CD
 *         trafficCodeNumber:
 *           type: string
 *           description: Traffic file number
 *           example: TC987654
 *         vehicleColor:
 *           type: string
 *           description: Color of the vehicle
 *           example: White
 *         vehicleMake:
 *           type: string
 *           description: Manufacturer of the vehicle
 *           example: Toyota
 *         vehicleType:
 *           type: string
 *           description: Type of the vehicle
 *           example: Sedan
 *         exportCountryToAr:
 *           type: string
 *           description: Export country in Arabic
 *           example: الولايات المتحدة
 *         vehicleTypeAr:
 *           type: string
 *           description: Vehicle type in Arabic
 *           example: سيدان
 *         exportPlateNumberAr:
 *           type: string
 *           description: Export plate number in Arabic
 *           example: EX12345
 *         registrationPlateNumberAr:
 *           type: string
 *           description: Registration plate number in Arabic
 *           example: AB123CD
 *         registrationDateAr:
 *           type: string
 *           description: Registration date in Arabic format
 *           example: 2024-03-27
 *         registrationExpiryDateAr:
 *           type: string
 *           description: Registration expiry date in Arabic format
 *           example: 2026-03-27
 *         vehicleMakeAr:
 *           type: string
 *           description: Vehicle manufacturer in Arabic
 *           example: تويوتا
 *         categoryAr:
 *           type: string
 *           description: Vehicle category in Arabic
 *           example: خاصة
 *         modelYearAr:
 *           type: string
 *           description: Model year in Arabic
 *           example: 2022
 *         countryOfOriginAr:
 *           type: string
 *           description: Country of origin in Arabic
 *           example: اليابان
 *         vehicleColorAr:
 *           type: string
 *           description: Vehicle color in Arabic
 *           example: أبيض
 *         chassisNumberAr:
 *           type: string
 *           description: Chassis number in Arabic
 *           example: XYZ1234567890
 *         engineNumberAr:
 *           type: string
 *           description: Engine number in Arabic
 *           example: ENG987654321
 *         numberOfDoorsAr:
 *           type: string
 *           description: Number of doors in Arabic
 *           example: 4
 *         fuelTypeAr:
 *           type: string
 *           description: Fuel type in Arabic
 *           example: بنزين
 *         numberOfSeatsAr:
 *           type: string
 *           description: Number of seats in Arabic
 *           example: 5
 *         emptyWeightAr:
 *           type: string
 *           description: Empty weight in Arabic
 *           example: 1500
 *         insuranceCompanyAr:
 *           type: string
 *           description: Insurance company in Arabic
 *           example: أكسا للتأمين
 *         insuranceTypeAr:
 *           type: string
 *           description: Insurance type in Arabic
 *           example: شامل
 *         insurancePolicyNumberAr:
 *           type: string
 *           description: Insurance policy number in Arabic
 *           example: POL12345678
 *         insuranceExpiryDateAr:
 *           type: string
 *           description: Insurance expiry date in Arabic
 *           example: 2025-03-27
 *         ownerNameAr:
 *           type: string
 *           description: Owner’s name in Arabic
 *           example: جون دو
 *         nationalityAr:
 *           type: string
 *           description: Nationality in Arabic
 *           example: أمريكي
 *         driverNameAr:
 *           type: string
 *           description: Driver’s name in Arabic
 *           example: جون دو
 *         certificateIssueDateAr:
 *           type: string
 *           description: Certificate issue date in Arabic
 *           example: 2024-03-25
 *
 *     VehicleCertificateGetDto:
 *       type: object
 *       allOf:
 *         - $ref: '#/components/schemas/VehicleBaseDto'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *             userId:
 *               type: string
 *
 *     CarAddComponent:
 *       type: object
 *       allOf:
 *         - $ref: '#/components/schemas/VehicleBaseDto'
 *         - type: object
 *           properties:
 *             userId:
 *               type: string
 *
 *     CarUpdateComponent:
 *       type: object
 *       allOf:
 *         - $ref: '#/components/schemas/VehicleBaseDto'
 *
 *     GenerateCertificateComponent:
 *       type: object
 *       required: false
 *       properties:
 *         userId:
 *           type: string
 *           example: 68220fade4d3b06e5a77513c
 *         carId:
 *           type: string
 *           example: 6822181b80c874e620daabe5
 */
