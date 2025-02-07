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

export const Addnew = () => {
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
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
    >
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
        id="VehicleType"
        type="text"
        value={formik.values.VehicleType}
        onChange={formik.handleChange}
      />

      {/* Export Plate Number */}
      <Input
        labelName="Export Plate Number"
        name="ExportPlateNumber"
        placeholder="e.g 235434"
        id="ExportPlateNumber"
        type="text"
        value={formik.values.ExportPlateNumber}
        onChange={formik.handleChange}
      />

      {/* Registration Plate Number */}
      <Input
        labelName="Registration Plate Number"
        name="RegistrationPlateNumber"
        value={formik.values.RegistrationPlateNumber}
        onChange={formik.handleChange}
      />

      {/* Registration Date */}
      <Input
        labelName="Registration Date"
        name="RegistrationDate"
        value={formik.values.RegistrationDate}
        onChange={formik.handleChange}
      />

      {/* Registration Expiry Date */}
      <Input
        labelName="Registration Expiry Date"
        name="RegistrationExpiryDate"
        value={formik.values.RegistrationExpiryDate}
        onChange={formik.handleChange}
      />

      {/* Vehicle Make */}
      <Input
        labelName="Vehicle Make"
        name="VehicleMake"
        value={formik.values.VehicleMake}
        onChange={formik.handleChange}
      />

      {/* Category */}
      <Input
        labelName="Category"
        name="Category"
        value={formik.values.Category}
        onChange={formik.handleChange}
      />

      {/* Model Year */}
      <Input
        labelName="Model Year"
        name="ModelYear"
        value={formik.values.ModelYear}
        onChange={formik.handleChange}
      />

      {/* Country of Origin */}
      <Input
        labelName="Country of Origin"
        id="Country of Origin"
        name="CountryOfOrigin"
        value={formik.values.CountryOfOrigin}
        onChange={formik.handleChange}
      />

      {/* Vehicle Color */}
      <Input
        labelName="Vehicle Color"
        name="VehicleColor"
        value={formik.values.VehicleColor}
        onChange={formik.handleChange}
      />

      {/* Chassis Number */}
      <Input
        labelName="Chassis Number"
        name="ChassisNumber"
        value={formik.values.ChassisNumber}
        onChange={formik.handleChange}
      />

      {/* Engine Number */}
      <Input
        labelName="Engine Number"
        name="EngineNumber"
        value={formik.values.EngineNumber}
        onChange={formik.handleChange}
      />

      {/* Number of Doors */}
      <Input
        labelName="Number of Doors"
        name="NumberOfDoors"
        value={formik.values.NumberOfDoors}
        onChange={formik.handleChange}
      />

      {/* Fuel Type */}
      <Input
        labelName="Fuel Type"
        name="FuelType"
        value={formik.values.FuelType}
        onChange={formik.handleChange}
      />

      {/* Number of Seats */}
      <Input
        labelName="Number of Seats"
        name="NumberOfSeats"
        value={formik.values.NumberOfSeats}
        onChange={formik.handleChange}
      />

      {/* Empty Weight */}
      <Input
        labelName="Empty Weight"
        name="EmptyWeight"
        value={formik.values.EmptyWeight}
        onChange={formik.handleChange}
      />

      {/* Insurance Company */}
      <Input
        labelName="Insurance Company"
        name="InsuranceCompany"
        value={formik.values.InsuranceCompany}
        onChange={formik.handleChange}
        error={
          formik.touched.InsuranceCompany && formik.errors.InsuranceCompany
        }
      />

      {/* Insurance Type */}
      <Input
        labelName="Insurance Type"
        name="InsuranceType"
        value={formik.values.InsuranceType}
        onChange={formik.handleChange}
        error={formik.touched.InsuranceType && formik.errors.InsuranceType}
      />

      {/* Insurance Policy Number */}
      <Input
        labelName="Insurance Policy Number"
        name="InsurancePolicyNumber"
        value={formik.values.InsurancePolicyNumber}
        onChange={formik.handleChange}
        error={
          formik.touched.InsurancePolicyNumber &&
          formik.errors.InsurancePolicyNumber
        }
      />

      {/* Insurance Expiry Date */}
      <Input
        labelName="Insurance Expiry Date"
        name="InsuranceExpiryDate"
        value={formik.values.InsuranceExpiryDate}
        onChange={formik.handleChange}
        error={
          formik.touched.InsuranceExpiryDate &&
          formik.errors.InsuranceExpiryDate
        }
      />

      {/* Owner Name */}
      <Input
        labelName="Owner Name"
        name="OwnerName"
        value={formik.values.OwnerName}
        onChange={formik.handleChange}
        error={formik.touched.OwnerName && formik.errors.OwnerName}
      />

      {/* Nationality */}
      <Input
        labelName="Nationality"
        name="Nationality"
        value={formik.values.Nationality}
        onChange={formik.handleChange}
        error={formik.touched.Nationality && formik.errors.Nationality}
      />

      {/* Passport Number */}
      <Input
        labelName="Passport Number"
        name="PassportNumber"
        value={formik.values.PassportNumber}
        onChange={formik.handleChange}
        error={formik.touched.PassportNumber && formik.errors.PassportNumber}
      />

      {/* Traffic Code Number */}
      <Input
        labelName="Traffic Code Number"
        name="TrafficCodeNumber"
        value={formik.values.TrafficCodeNumber}
        onChange={formik.handleChange}
        error={
          formik.touched.TrafficCodeNumber && formik.errors.TrafficCodeNumber
        }
      />

      {/* Emirates ID Number */}
      <Input
        labelName="Emirates ID Number"
        name="EmiratesIdNumber"
        value={formik.values.EmiratesIdNumber}
        onChange={formik.handleChange}
        error={
          formik.touched.EmiratesIdNumber && formik.errors.EmiratesIdNumber
        }
      />

      {/* Driver Name */}
      <Input
        labelName="Driver Name"
        name="DriverName"
        value={formik.values.DriverName}
        onChange={formik.handleChange}
        error={formik.touched.DriverName && formik.errors.DriverName}
      />

      {/* License Number */}
      <Input
        labelName="License Number"
        name="LicenseNumber"
        value={formik.values.LicenseNumber}
        onChange={formik.handleChange}
        error={formik.touched.LicenseNumber && formik.errors.LicenseNumber}
      />

      {/* Driver Nationality */}
      <Input
        labelName="Driver Nationality"
        name="DriverNationality"
        value={formik.values.DriverNationality}
        onChange={formik.handleChange}
        error={
          formik.touched.DriverNationality && formik.errors.DriverNationality
        }
      />

      {/* License Source */}
      <Input
        labelName="License Source"
        name="LicenseSource"
        value={formik.values.LicenseSource}
        onChange={formik.handleChange}
        error={formik.touched.LicenseSource && formik.errors.LicenseSource}
      />

      {/* Certificate Issue Date */}
      <Input
        labelName="Certificate Issue Date"
        name="Certificate"
        value={formik.values.LicenseSource}
        onChange={formik.handleChange}
        error={formik.touched.LicenseSource && formik.errors.LicenseSource}
      />
      <Input
        labelName="Certificate Issue Date"
        name="Certificate"
        value={formik.values.CertificateReferenceNumber}
        onChange={formik.handleChange}
        error={
          formik.touched.CertificateReferenceNumber &&
          formik.errors.CertificateReferenceNumber
        }
      />
      <div>
        <Button variant={"default"} type="submit" size="lg" className="w-full">
          <span>{loading ? <ImSpinner8 /> : <MdAdd />}</span>
          {loading ? "loading.." : "Login"}
        </Button>
      </div>
    </form>
  );
};
