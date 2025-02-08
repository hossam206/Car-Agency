import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/Components/ui/button";
import { ImSpinner8 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { addItem } from "@/services/globalService";
import { Input } from "@/Components/ui/Input";

// Yup validation schema
const validationSchema = Yup.object({
  ExportCountryTo: Yup.string(),
  VehicleType: Yup.string(),
  ExportPlateNumber: Yup.string(),
  RegistrationPlateNumber: Yup.string(),
  RegistrationDate: Yup.string(),
  RegistrationExpiryDate: Yup.string(),
  VehicleMake: Yup.string(),
  Category: Yup.string(),
  ModelYear: Yup.string(),
  CountryOfOrigin: Yup.string(),
  VehicleColor: Yup.string(),
  ChassisNumber: Yup.string(),
  EngineNumber: Yup.string(),
  NumberOfDoors: Yup.number(),
  FuelType: Yup.string(),
  NumberOfSeats: Yup.number(),
  EmptyWeight: Yup.number(),
  InsuranceCompany: Yup.string(),
  InsuranceType: Yup.string(),
  InsurancePolicyNumber: Yup.string(),
  InsuranceExpiryDate: Yup.string(),
  OwnerName: Yup.string(),
  Nationality: Yup.string(),
  PassportNumber: Yup.string(),
  TrafficCodeNumber: Yup.string(),
  EmiratesIdNumber: Yup.string(),
  DriverName: Yup.string(),
  LicenseNumber: Yup.string(),
  DriverNationality: Yup.string(),
  LicenseSource: Yup.string(),
  CertificateIssueDate: Yup.string(),
  CertificateReferenceNumber: Yup.string(),
});

export default function Addnew() {
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      ExportCountryTo: "",
      VehicleType: "",
      ExportPlateNumber: "",
      RegistrationPlateNumber: "",
      RegistrationDate: "",
      RegistrationExpiryDate: "",
      VehicleMake: "",
      Category: "",
      ModelYear: "",
      CountryOfOrigin: "",
      VehicleColor: "",
      ChassisNumber: "",
      EngineNumber: "",
      NumberOfDoors: "",
      FuelType: "",
      NumberOfSeats: "",
      EmptyWeight: "",
      InsuranceCompany: "",
      InsuranceType: "",
      InsurancePolicyNumber: "",
      InsuranceExpiryDate: "",
      OwnerName: "",
      Nationality: "",
      PassportNumber: "",
      TrafficCodeNumber: "",
      EmiratesIdNumber: "",
      DriverName: "",
      LicenseNumber: "",
      DriverNationality: "",
      LicenseSource: "",
      CertificateIssueDate: "",
      CertificateReferenceNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await addItem("", values);
        if (response.status === 2000) {
          setLoading(false);
        }
      } catch (error) {}
    },
  });

  return (
    <>
      <div className="container py-10">
        <h1 className="font-bold text-2xl my-4">Add New Car Info</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border border-solid rounded-lg p-4">
            {/* Export Country To */}
            <Input
              labelName="Export Country To"
              placeholder="e.g Uman"
              id="Export Country To"
              type="text"
              name="ExportCountryTo"
              value={formik.values.ExportCountryTo}
              onChange={formik.handleChange}
            />

            {/* Vehicle Type */}
            <Input
              labelName="Vehicle Type"
              name="VehicleType"
              placeholder="e.g sadan"
              id="Vehicle Type"
              type="text"
              value={formik.values.VehicleType}
              onChange={formik.handleChange}
            />

            {/* Export Plate Number */}
            <Input
              labelName="Export Plate Number"
              name="ExportPlateNumber"
              placeholder="e.g 235434"
              id="Export Plate Number"
              type="text"
              value={formik.values.ExportPlateNumber}
              onChange={formik.handleChange}
            />

            {/* Registration Plate Number */}
            <Input
              labelName="Registration Plate Number"
              name="RegistrationPlateNumber"
              placeholder="e.g 235434"
              id="RegistrationPlateNumber"
              type="text"
              value={formik.values.RegistrationPlateNumber}
              onChange={formik.handleChange}
            />

            {/* Registration Date */}
            <Input
              labelName="Registration Date"
              name="RegistrationDate"
              placeholder="e.g 00/00/0000"
              id="Registration Date"
              type="date"
              value={formik.values.RegistrationDate}
              onChange={formik.handleChange}
            />

            {/* Registration Expiry Date */}
            <Input
              labelName="Registration Expiry Date"
              name="RegistrationExpiryDate"
              placeholder="e.g 00/00/0000"
              id="Registration Expiry Date"
              type="date"
              value={formik.values.RegistrationExpiryDate}
              onChange={formik.handleChange}
            />

            {/* Vehicle Make */}
            <Input
              labelName="Vehicle Make"
              name="VehicleMake"
              placeholder="e.g china"
              id="Vehicle Make"
              type="text"
              value={formik.values.VehicleMake}
              onChange={formik.handleChange}
            />

            {/* Category */}
            <Input
              labelName="Category"
              name="Category"
              placeholder="e.g sadan"
              id="Category"
              type="text"
              value={formik.values.Category}
              onChange={formik.handleChange}
            />

            {/* Model Year */}
            <Input
              labelName="Model Year"
              name="ModelYear"
              placeholder="e.g 2025"
              id="Model Year"
              type="text"
              value={formik.values.ModelYear}
              onChange={formik.handleChange}
            />

            {/* Country of Origin */}
            <Input
              labelName="Country of Origin"
              name="CountryOfOrigin"
              placeholder="e.g Germany"
              id="Country of Origin"
              type="text"
              value={formik.values.CountryOfOrigin}
              onChange={formik.handleChange}
            />

            {/* Vehicle Color */}
            <Input
              labelName="Vehicle Color"
              name="VehicleColor"
              placeholder="e.g red"
              id="Vehicle Color"
              type="text"
              value={formik.values.VehicleColor}
              onChange={formik.handleChange}
            />

            {/* Chassis Number */}
            <Input
              labelName="Chassis Number"
              name="ChassisNumber"
              placeholder="e.g 346782"
              id="Chassis Number"
              type="text"
              value={formik.values.ChassisNumber}
              onChange={formik.handleChange}
            />

            {/* Engine Number */}
            <Input
              labelName="Engine Number"
              name="EngineNumber"
              placeholder="e.g 346782"
              id="Engine Number"
              type="text"
              value={formik.values.EngineNumber}
              onChange={formik.handleChange}
            />

            {/* Number of Doors */}
            <Input
              labelName="Number of Doors"
              name="NumberOfDoors"
              placeholder="e.g 2"
              id="Number of Doors"
              type="number"
              value={formik.values.NumberOfDoors}
              onChange={formik.handleChange}
            />

            {/* Fuel Type */}
            <Input
              labelName="Fuel Type"
              name="FuelType"
              placeholder="e.g gas"
              id="Fuel Type"
              type="text"
              value={formik.values.FuelType}
              onChange={formik.handleChange}
            />

            {/* Number of Seats */}
            <Input
              labelName="Number of Seats"
              name="NumberOfSeats"
              placeholder="e.g 4"
              id="Number of Seats"
              type="number"
              value={formik.values.NumberOfSeats}
              onChange={formik.handleChange}
            />

            {/* Empty Weight */}
            <Input
              labelName="Empty Weight"
              name="EmptyWeight"
              placeholder="e.g 4"
              id="Empty Weight"
              type="text"
              value={formik.values.EmptyWeight}
              onChange={formik.handleChange}
            />

            {/* Insurance Company */}
            <Input
              labelName="Insurance Company"
              name="InsuranceCompany"
              placeholder="e.g xyz"
              id="Insurance Company"
              type="text"
              value={formik.values.InsuranceCompany}
              onChange={formik.handleChange}
            />

            {/* Insurance Type */}
            <Input
              labelName="Insurance Type"
              name="InsuranceType"
              placeholder="e.g xyz"
              id="Insurance Type"
              type="text"
              value={formik.values.InsuranceType}
              onChange={formik.handleChange}
            />

            {/* Insurance Policy Number */}
            <Input
              labelName="Insurance Policy Number"
              name="InsurancePolicyNumber"
              placeholder="e.g xyz"
              id="Insurance Policy Number"
              type="text"
              value={formik.values.InsurancePolicyNumber}
              onChange={formik.handleChange}
            />

            {/* Insurance Expiry Date */}
            <Input
              labelName="Insurance Expiry Date"
              name="InsuranceExpiryDate"
              placeholder="e.g 00/00/0000"
              id="Insurance Expiry Date"
              type="date"
              value={formik.values.InsuranceExpiryDate}
              onChange={formik.handleChange}
            />

            {/* Owner Name */}
            <Input
              labelName="Owner Name"
              name="OwnerName"
              placeholder="e.g xyz"
              id="Owner Name"
              type="text"
              value={formik.values.OwnerName}
              onChange={formik.handleChange}
            />

            {/* Nationality */}
            <Input
              labelName="Nationality"
              name="Nationality"
              placeholder="e.g xyz"
              id="Nationality"
              type="text"
              value={formik.values.Nationality}
              onChange={formik.handleChange}
            />

            {/* Passport Number */}
            <Input
              labelName="Passport Number"
              name="PassportNumber"
              placeholder="e.g xyz"
              id="Passport Number"
              type="text"
              value={formik.values.PassportNumber}
              onChange={formik.handleChange}
            />

            {/* Traffic Code Number */}
            <Input
              labelName="Traffic Code Number"
              name="TrafficCodeNumber"
              placeholder="e.g xyz"
              id="Traffic Code Number"
              type="text"
              value={formik.values.TrafficCodeNumber}
              onChange={formik.handleChange}
            />

            {/* Emirates ID Number */}
            <Input
              labelName="Emirates ID Number"
              name="EmiratesIdNumber"
              placeholder="e.g xyz"
              id="Emirates ID Number"
              type="text"
              value={formik.values.EmiratesIdNumber}
              onChange={formik.handleChange}
            />

            {/* Driver Name */}
            <Input
              labelName="Driver Name"
              name="DriverName"
              placeholder="e.g xyz"
              id="Driver Name"
              type="text"
              value={formik.values.DriverName}
              onChange={formik.handleChange}
            />

            {/* License Number */}
            <Input
              labelName="License Number"
              name="LicenseNumber"
              placeholder="e.g xyz"
              id="License Number"
              type="text"
              value={formik.values.LicenseNumber}
              onChange={formik.handleChange}
            />

            {/* Driver Nationality */}
            <Input
              labelName="Driver Nationality"
              name="DriverNationality"
              placeholder="e.g xyz"
              id="Driver Nationality"
              type="text"
              value={formik.values.DriverNationality}
              onChange={formik.handleChange}
            />

            {/* License Source */}
            <Input
              labelName="License Source"
              name="LicenseSource"
              placeholder="e.g xyz"
              id="License Source"
              type="text"
              value={formik.values.LicenseSource}
              onChange={formik.handleChange}
            />

            {/* Certificate Issue Date */}
            <Input
              labelName="Certificate Issue Date"
              name="CertificateIssueDate"
              placeholder="e.g xyz"
              id="Certificate Issue Date"
              type="date"
              value={formik.values.LicenseSource}
              onChange={formik.handleChange}
            />
            <Input
              labelName="Certificate Reference Number"
              name="CertificateReferenceNumber"
              placeholder="e.g xyz"
              id="Certificate Reference Number"
              type="date"
              value={formik.values.CertificateReferenceNumber}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-row item-center justify-center">
            <Button
              variant={"default"}
              type="submit"
              size="lg"
              className="mx-auto "
            >
              <span>{loading ? <ImSpinner8 /> : <MdAdd />}</span>
              {loading ? "Adding.." : "Add new"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
