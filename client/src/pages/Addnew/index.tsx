import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/Components/ui/button";
import { ImSpinner8 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { addItem } from "@/services/globalService";
import { Input } from "@/Components/ui/input";
import Navbar from "@/Components/Navbar";
import { toast } from "sonner";
import { FaCircleCheck } from "react-icons/fa6";
// Yup validation schema
const validationSchema = Yup.object({
  exportCountryTo: Yup.string(),
  vehicleType: Yup.string(),
  exportPlateNumber: Yup.string(),
  registrationPlateNumber: Yup.string(),
  registrationDate: Yup.string(),
  registrationExpiryDate: Yup.string(),
  vehicleMake: Yup.string(),
  category: Yup.string(),
  modelYear: Yup.string(),
  countryOfOrigin: Yup.string(),
  vehicleColor: Yup.string(),
  chassisNumber: Yup.string(),
  engineNumber: Yup.string(),
  numberOfDoors: Yup.string(),
  fuelType: Yup.string(),
  numberOfSeats: Yup.string(),
  emptyWeight: Yup.string(),
  insuranceCompany: Yup.string(),
  insuranceType: Yup.string(),
  insurancePolicyNumber: Yup.string(),
  insuranceExpiryDate: Yup.string(),
  ownerName: Yup.string(),
  nationality: Yup.string(),
  passportNumber: Yup.string(),
  trafficCodeNumber: Yup.string(),
  emiratesIdNumber: Yup.string(),
  driverName: Yup.string(),
  licenseNumber: Yup.string(),
  driverNationality: Yup.string(),
  licenseSource: Yup.string(),
  certificateIssueDate: Yup.string(),
  certificateReferenceNumber: Yup.string(),
});

export default function Addnew() {
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize Formik with the fetched data
  const formik = useFormik({
    initialValues: {
      exportCountryTo: "",
      vehicleType: "",
      exportPlateNumber: "",
      registrationPlateNumber: "",
      registrationDate: "",
      registrationExpiryDate: "",
      vehicleMake: "",
      category: "",
      modelYear: "",
      countryOfOrigin: "",
      vehicleColor: "",
      chassisNumber: "",
      engineNumber: "",
      numberOfDoors: "",
      fuelType: "",
      numberOfSeats: "",
      emptyWeight: "",
      insuranceCompany: "",
      insuranceType: "",
      insurancePolicyNumber: "",
      insuranceExpiryDate: "",
      ownerName: "",
      nationality: "",
      passportNumber: "",
      trafficCodeNumber: "",
      emiratesIdNumber: "",
      driverName: "",
      licenseNumber: "",
      driverNationality: "",
      licenseSource: "",
      certificateIssueDate: "",
      certificateReferenceNumber: "",
    },
    validationSchema,
    // Reinitialize the form when initialData changes
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await addItem("car/add", values);
        if (response?.status === 201) {
          setLoading(false);
          toast.success("add new car Info Success!", {
            icon: <FaCircleCheck className="h-5 w-5   text-green-600" />,
          });
          // Show success message
          resetForm();
        }
      } catch (error) {
        console.error("Error updating car:", error);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <h1 className="font-bold text-2xl my-4">Add new Car Info</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border border-solid rounded-lg p-4 my-4">
            {/* Export Country To */}
            <Input
              labelName="Export Country To"
              placeholder="e.g Uman"
              id="exportCountryTo"
              type="text"
              name="exportCountryTo"
              value={formik.values.exportCountryTo}
              onChange={formik.handleChange}
            />

            {/* Vehicle Type */}
            <Input
              labelName="Vehicle Type"
              name="vehicleType"
              placeholder="e.g sedan"
              id="vehicleType"
              type="text"
              value={formik.values.vehicleType}
              onChange={formik.handleChange}
            />

            {/* Export Plate Number */}
            <Input
              labelName="Export Plate Number"
              name="exportPlateNumber"
              placeholder="e.g 235434"
              id="exportPlateNumber"
              type="text"
              value={formik.values.exportPlateNumber}
              onChange={formik.handleChange}
            />

            {/* Registration Plate Number */}
            <Input
              labelName="Registration Plate Number"
              name="registrationPlateNumber"
              placeholder="e.g 235434"
              id="registrationPlateNumber"
              type="text"
              value={formik.values.registrationPlateNumber}
              onChange={formik.handleChange}
            />

            {/* Registration Date */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="registrationDate"
                className="text-sm font-medium mb-1 text-gray-500"
              >
                Registration Date
              </label>
              <input
                id="registrationDate"
                name="registrationDate"
                type="Date"
                placeholder="MM/DD/YYYY"
                value={formik.values.registrationDate}
                onChange={formik.handleChange}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 text-base shadow-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Registration Expiry Date */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="registrationExpiryDate"
                className="text-sm font-medium mb-1 text-gray-500"
              >
                Registration Expiry Date
              </label>
              <input
                id="registrationExpiryDate"
                name="registrationExpiryDate"
                type="date"
                placeholder="MM/DD/YYYY"
                value={formik.values.registrationExpiryDate}
                onChange={formik.handleChange}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 text-base shadow-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Vehicle Make */}
            <Input
              labelName="Vehicle Make"
              name="vehicleMake"
              placeholder="e.g Toyota"
              id="vehicleMake"
              type="text"
              value={formik.values.vehicleMake}
              onChange={formik.handleChange}
            />

            {/* Category */}
            <Input
              labelName="Category"
              name="category"
              placeholder="e.g Sedan"
              id="category"
              type="text"
              value={formik.values.category}
              onChange={formik.handleChange}
            />

            {/* Model Year */}
            <Input
              labelName="Model Year"
              name="modelYear"
              placeholder="e.g 2023"
              id="modelYear"
              type="text"
              value={formik.values.modelYear}
              onChange={formik.handleChange}
            />

            {/* Country of Origin */}
            <Input
              labelName="Country of Origin"
              name="countryOfOrigin"
              placeholder="e.g Japan"
              id="countryOfOrigin"
              type="text"
              value={formik.values.countryOfOrigin}
              onChange={formik.handleChange}
            />

            {/* Vehicle Color */}
            <Input
              labelName="Vehicle Color"
              name="vehicleColor"
              placeholder="e.g Red"
              id="vehicleColor"
              type="text"
              value={formik.values.vehicleColor}
              onChange={formik.handleChange}
            />

            {/* Chassis Number */}
            <Input
              labelName="Chassis Number"
              name="chassisNumber"
              placeholder="e.g 123456789"
              id="chassisNumber"
              type="text"
              value={formik.values.chassisNumber}
              onChange={formik.handleChange}
            />

            {/* Engine Number */}
            <Input
              labelName="Engine Number"
              name="engineNumber"
              placeholder="e.g 987654321"
              id="engineNumber"
              type="text"
              value={formik.values.engineNumber}
              onChange={formik.handleChange}
            />

            {/* Number of Doors */}
            <Input
              labelName="Number of Doors"
              name="numberOfDoors"
              placeholder="e.g 4"
              id="numberOfDoors"
              type="text"
              value={formik?.values?.numberOfDoors}
              onChange={formik.handleChange}
            />

            {/* Fuel Type */}
            <Input
              labelName="Fuel Type"
              name="fuelType"
              placeholder="e.g Petrol"
              id="fuelType"
              type="text"
              value={formik.values.fuelType}
              onChange={formik.handleChange}
            />

            {/* Number of Seats */}
            <Input
              labelName="Number of Seats"
              name="numberOfSeats"
              placeholder="e.g 5"
              id="numberOfSeats"
              type="text"
              value={formik.values.numberOfSeats}
              onChange={formik.handleChange}
            />

            {/* Empty Weight */}
            <Input
              labelName="Empty Weight"
              name="emptyWeight"
              placeholder="e.g 1500 kg"
              id="emptyWeight"
              type="text"
              value={formik.values.emptyWeight}
              onChange={formik.handleChange}
            />

            {/* Insurance Company */}
            <Input
              labelName="Insurance Company"
              name="insuranceCompany"
              placeholder="e.g XYZ Insurance"
              id="insuranceCompany"
              type="text"
              value={formik.values.insuranceCompany}
              onChange={formik.handleChange}
            />

            {/* Insurance Type */}
            <Input
              labelName="Insurance Type"
              name="insuranceType"
              placeholder="e.g Comprehensive"
              id="insuranceType"
              type="text"
              value={formik.values.insuranceType}
              onChange={formik.handleChange}
            />

            {/* Insurance Policy Number */}
            <Input
              labelName="Insurance Policy Number"
              name="insurancePolicyNumber"
              placeholder="e.g 123456"
              id="insurancePolicyNumber"
              type="text"
              value={formik.values.insurancePolicyNumber}
              onChange={formik.handleChange}
            />

            {/* Insurance Expiry Date */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="insuranceExpiryDate"
                className="text-sm font-medium mb-1 text-gray-500"
              >
                Insurance Expiry Date
              </label>
              <input
                id="insuranceExpiryDate"
                name="insuranceExpiryDate"
                type="date"
                placeholder="MM/DD/YYYY"
                value={formik.values.insuranceExpiryDate}
                onChange={formik.handleChange}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 text-base shadow-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Owner Name */}
            <Input
              labelName="Owner Name"
              name="ownerName"
              placeholder="e.g John Doe"
              id="ownerName"
              type="text"
              value={formik.values.ownerName}
              onChange={formik.handleChange}
            />

            {/* Nationality */}
            <Input
              labelName="Nationality"
              name="nationality"
              placeholder="e.g American"
              id="nationality"
              type="text"
              value={formik.values.nationality}
              onChange={formik.handleChange}
            />

            {/* Passport Number */}
            <Input
              labelName="Passport Number"
              name="passportNumber"
              placeholder="e.g 123456789"
              id="passportNumber"
              type="text"
              value={formik.values.passportNumber}
              onChange={formik.handleChange}
            />

            {/* Traffic Code Number */}
            <Input
              labelName="Traffic Code Number"
              name="trafficCodeNumber"
              placeholder="e.g 987654321"
              id="trafficCodeNumber"
              type="text"
              value={formik.values.trafficCodeNumber}
              onChange={formik.handleChange}
            />

            {/* Emirates ID Number */}
            <Input
              labelName="Emirates ID Number"
              name="emiratesIdNumber"
              placeholder="e.g 784-1234-5678901-2"
              id="emiratesIdNumber"
              type="text"
              value={formik.values.emiratesIdNumber}
              onChange={formik.handleChange}
            />

            {/* Driver Name */}
            <Input
              labelName="Driver Name"
              name="driverName"
              placeholder="e.g Jane Doe"
              id="driverName"
              type="text"
              value={formik.values.driverName}
              onChange={formik.handleChange}
            />

            {/* License Number */}
            <Input
              labelName="License Number"
              name="licenseNumber"
              placeholder="e.g 123456789"
              id="licenseNumber"
              type="text"
              value={formik.values.licenseNumber}
              onChange={formik.handleChange}
            />

            {/* Driver Nationality */}
            <Input
              labelName="Driver Nationality"
              name="driverNationality"
              placeholder="e.g Canadian"
              id="driverNationality"
              type="text"
              value={formik.values.driverNationality}
              onChange={formik.handleChange}
            />

            {/* License Source */}
            <Input
              labelName="License Source"
              name="licenseSource"
              placeholder="e.g Dubai RTA"
              id="licenseSource"
              type="text"
              value={formik.values.licenseSource}
              onChange={formik.handleChange}
            />

            {/* Certificate Issue Date */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="certificateIssueDate"
                className="text-sm font-medium mb-1 text-gray-500"
              >
                Certificate Issue Date
              </label>
              <input
                id="certificateIssueDate"
                name="certificateIssueDate"
                type="date"
                placeholder="MM/DD/YYYY"
                value={formik.values.certificateIssueDate}
                onChange={formik.handleChange}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 text-base shadow-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Certificate Reference Number */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="certificateReferenceNumber"
                className="text-sm font-medium mb-1 text-gray-500"
              >
                Certificate Reference Number
              </label>
              <input
                id="certificateReferenceNumber"
                name="certificateReferenceNumber"
                type="text"
                placeholder="e.g 123456"
                value={formik.values.certificateReferenceNumber}
                onChange={formik.handleChange}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 text-base shadow-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <div className="flex flex-row item-center justify-center">
            <Button
              variant={"default"}
              type="submit"
              size="lg"
              className="mx-auto"
            >
              <span>
                {loading ? (
                  <ImSpinner8 className="animate-spin transition-all duration-200 ease-in-out" />
                ) : (
                  <MdAdd />
                )}
              </span>
              {loading ? "Adding..." : "Add New"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
