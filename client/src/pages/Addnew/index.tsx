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
import { initialValues } from "../../utils/FormikIntials";
// Yup validation schema
const validationSchema = Yup.object({
  exportCountryTo: Yup.string(),
  exportCountryToAr: Yup.string(),
  categoryArabic: Yup.string(),
  vehicleType: Yup.string(),
  vehicleTypeAr: Yup.string(),
  exportPlateNumber: Yup.string(),
  exportPlateNumberAr: Yup.string(),
  registrationPlateNumber: Yup.string(),
  registrationPlateNumberAr: Yup.string(),
  registrationDate: Yup.string(),
  registrationDateAr: Yup.string(),
  registrationExpiryDate: Yup.string(),
  registrationExpiryDateAr: Yup.string(),
  vehicleMake: Yup.string(),
  vehicleMakeAr: Yup.string(),
  category: Yup.string(),
  categoryAr: Yup.string(),
  modelYear: Yup.string(),
  modelYearAr: Yup.string(),
  countryOfOrigin: Yup.string(),
  countryOfOriginAr: Yup.string(),
  vehicleColor: Yup.string(),
  vehicleColorAr: Yup.string(),
  chassisNumber: Yup.string(),
  chassisNumberAr: Yup.string(),
  engineNumber: Yup.string(),
  engineNumberAr: Yup.string(),
  numberOfDoors: Yup.string(),
  numberOfDoorsAr: Yup.string(),
  fuelType: Yup.string(),
  fuelTypeAr: Yup.string(),
  numberOfSeats: Yup.string(),
  numberOfSeatsAr: Yup.string(),
  emptyWeight: Yup.string(),
  emptyWeightAr: Yup.string(),
  insuranceCompany: Yup.string(),
  insuranceCompanyAr: Yup.string(),
  insuranceType: Yup.string(),
  insuranceTypeAr: Yup.string(),
  insurancePolicyNumber: Yup.string(),
  insurancePolicyNumberAr: Yup.string(),
  insuranceExpiryDate: Yup.string(),
  insuranceExpiryDateAr: Yup.string(),
  ownerName: Yup.string(),
  ownerNameAr: Yup.string(),
  nationality: Yup.string(),
  nationalityAr: Yup.string(),
  passportNumber: Yup.string(),
  passportNumberAr: Yup.string(),
  trafficCodeNumber: Yup.string(),
  trafficCodeNumberAr: Yup.string(),
  emiratesIdNumber: Yup.string(),
  emiratesIdNumberAr: Yup.string(),
  driverName: Yup.string(),
  driverNameAr: Yup.string(),
  licenseNumber: Yup.string(),
  licenseNumberAr: Yup.string(),
  driverNationality: Yup.string(),
  driverNationalityAr: Yup.string(),
  licenseSource: Yup.string(),
  licenseSourceAr: Yup.string(),
  certificateIssueDate: Yup.string(),
  certificateIssueDateAr: Yup.string(),
  certificateReferenceNumber: Yup.string(),
  certificateReferenceNumberAr: Yup.string(),
});

export default function Addnew() {
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await addItem("car/add", values);
        if (response?.status === 201) {
          setLoading(false);
          toast.success("add new car Info Success!", {
            icon: <FaCircleCheck className="h-5 w-5 text-green-600" />,
          });
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
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border border-solid shadow-sm rounded-lg p-6 my-4">
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
            <Input
              labelName="بلد التصدير إلى"
              placeholder="مثال: عمان"
              id="exportCountryToAr"
              type="text"
              name="exportCountryToAr"
              value={formik.values.exportCountryToAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="نوع المركبة"
              name="vehicleTypeAr"
              placeholder="مثال: سيدان"
              id="vehicleTypeAr"
              type="text"
              value={formik.values.vehicleTypeAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="رقم لوحة التصدير"
              name="exportPlateNumberAr"
              placeholder="مثال: ٢٣٥٤٣٤"
              id="exportPlateNumberAr"
              type="text"
              value={formik.values.exportPlateNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="رقم لوحة التسجيل"
              name="registrationPlateNumberAr"
              placeholder="مثال: ٢٣٥٤٣٤"
              id="registrationPlateNumberAr"
              type="text"
              value={formik.values.registrationPlateNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
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
                type="date"
                value={formik.values.registrationDate}
                onChange={formik.handleChange}
                className=" customInput"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="registrationDateAr"
                className="text-sm font-medium mb-1 text-gray-500 text-right"
              >
                تاريخ التسجيل
              </label>
              <input
                id="registrationDateAr"
                name="registrationDateAr"
                type="date"
                value={formik.values.registrationDateAr}
                onChange={formik.handleChange}
                className=" customInput"
                dir="rtl"
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
                value={formik.values.registrationExpiryDate}
                onChange={formik.handleChange}
                className=" customInput"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="registrationExpiryDateAr"
                className="text-sm font-medium mb-1 text-gray-500 text-right"
              >
                تاريخ انتهاء التسجيل
              </label>
              <input
                id="registrationExpiryDateAr"
                name="registrationExpiryDateAr"
                type="date"
                value={formik.values.registrationExpiryDateAr}
                onChange={formik.handleChange}
                className=" customInput"
                dir="rtl"
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
            <Input
              labelName="صنع المركبة"
              name="vehicleMakeAr"
              placeholder="مثال: تويوتا"
              id="vehicleMakeAr"
              type="text"
              value={formik.values.vehicleMakeAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="الفئة"
              name="categoryAr"
              placeholder="مثال: خاصة"
              id="categoryAr"
              type="text"
              value={formik.values.categoryAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="سنة الصنع"
              name="modelYearAr"
              placeholder="مثال: ٢٠٢٣"
              id="modelYearAr"
              type="text"
              value={formik.values.modelYearAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="بلد المنشأ"
              name="countryOfOriginAr"
              placeholder="مثال: اليابان"
              id="countryOfOriginAr"
              type="text"
              value={formik.values.countryOfOriginAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="لون المركبة"
              name="vehicleColorAr"
              placeholder="مثال: أحمر"
              id="vehicleColorAr"
              type="text"
              value={formik.values.vehicleColorAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="رقم الهيكل"
              name="chassisNumberAr"
              placeholder="مثال: ١٢٣٤٥٦٧٨٩"
              id="chassisNumberAr"
              type="text"
              value={formik.values.chassisNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="رقم المحرك"
              name="engineNumberAr"
              placeholder="مثال: ٩٨٧٦٥٤٣٢١"
              id="engineNumberAr"
              type="text"
              value={formik.values.engineNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
            />

            {/* Number of Doors */}
            <Input
              labelName="Number of Doors"
              name="numberOfDoors"
              placeholder="e.g 4"
              id="numberOfDoors"
              type="text"
              value={formik.values.numberOfDoors}
              onChange={formik.handleChange}
            />
            <Input
              labelName="عدد الأبواب"
              name="numberOfDoorsAr"
              placeholder="مثال: ٤"
              id="numberOfDoorsAr"
              type="text"
              value={formik.values.numberOfDoorsAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="نوع الوقود"
              name="fuelTypeAr"
              placeholder="مثال: بنزين"
              id="fuelTypeAr"
              type="text"
              value={formik.values.fuelTypeAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="عدد المقاعد"
              name="numberOfSeatsAr"
              placeholder="مثال: ٥"
              id="numberOfSeatsAr"
              type="text"
              value={formik.values.numberOfSeatsAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="الوزن الفارغ"
              name="emptyWeightAr"
              placeholder="مثال: ١٥٠٠ كجم"
              id="emptyWeightAr"
              type="text"
              value={formik.values.emptyWeightAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="شركة التأمين"
              name="insuranceCompanyAr"
              placeholder="مثال: أكسا للتأمين"
              id="insuranceCompanyAr"
              type="text"
              value={formik.values.insuranceCompanyAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="نوع التأمين"
              name="insuranceTypeAr"
              placeholder="مثال: شامل"
              id="insuranceTypeAr"
              type="text"
              value={formik.values.insuranceTypeAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="رقم وثيقة التأمين"
              name="insurancePolicyNumberAr"
              placeholder="مثال: ١٢٣٤٥٦"
              id="insurancePolicyNumberAr"
              type="text"
              value={formik.values.insurancePolicyNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
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
                value={formik.values.insuranceExpiryDate}
                onChange={formik.handleChange}
                className=" customInput"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="insuranceExpiryDateAr"
                className="text-sm font-medium mb-1 text-gray-500 text-right"
              >
                تاريخ انتهاء التأمين
              </label>
              <input
                id="insuranceExpiryDateAr"
                name="insuranceExpiryDateAr"
                type="date"
                value={formik.values.insuranceExpiryDateAr}
                onChange={formik.handleChange}
                className=" customInput"
                dir="rtl"
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
            <Input
              labelName="اسم المالك"
              name="ownerNameAr"
              placeholder="مثال: جون دو"
              id="ownerNameAr"
              type="text"
              value={formik.values.ownerNameAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="الجنسية"
              name="nationalityAr"
              placeholder="مثال: أمريكي"
              id="nationalityAr"
              type="text"
              value={formik.values.nationalityAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="رقم جواز السفر"
              name="passportNumberAr"
              placeholder="مثال: ١٢٣٤٥٦٧٨٩"
              id="passportNumberAr"
              type="text"
              value={formik.values.passportNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="رقم رمز المرور"
              name="trafficCodeNumberAr"
              placeholder="مثال: ٩٨٧٦٥٤٣٢١"
              id="trafficCodeNumberAr"
              type="text"
              value={formik.values.trafficCodeNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="رقم الهوية الإماراتية"
              name="emiratesIdNumberAr"
              placeholder="مثال: ٧٨٤-١٢٣٤-٥٦٧٨٩٠١-٢"
              id="emiratesIdNumberAr"
              type="text"
              value={formik.values.emiratesIdNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="اسم السائق"
              name="driverNameAr"
              placeholder="مثال: جون دو"
              id="driverNameAr"
              type="text"
              value={formik.values.driverNameAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="رقم الرخصة"
              name="licenseNumberAr"
              placeholder="مثال: ١٢٣٤٥٦٧٨٩"
              id="licenseNumberAr"
              type="text"
              value={formik.values.licenseNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="جنسية السائق"
              name="driverNationalityAr"
              placeholder="مثال: كندي"
              id="driverNationalityAr"
              type="text"
              value={formik.values.driverNationalityAr}
              onChange={formik.handleChange}
              dir="rtl"
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
            <Input
              labelName="مصدر الرخصة"
              name="licenseSourceAr"
              placeholder="مثال: هيئة الطرق والمواصلات دبي"
              id="licenseSourceAr"
              type="text"
              value={formik.values.licenseSourceAr}
              onChange={formik.handleChange}
              dir="rtl"
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
                value={formik.values.certificateIssueDate}
                onChange={formik.handleChange}
                className=" customInput"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="certificateIssueDateAr"
                className="text-sm font-medium mb-1 text-gray-500 text-right"
              >
                تاريخ إصدار الشهادة
              </label>
              <input
                id="certificateIssueDateAr"
                name="certificateIssueDateAr"
                type="date"
                value={formik.values.certificateIssueDateAr}
                onChange={formik.handleChange}
                className=" customInput"
                dir="rtl"
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
                className="customInput"
              />
            </div>

            <Input
              labelName=" رقم مرجع الشهادة"
              name="certificateReferenceNumberAr"
              placeholder="مثال: ١٢٣٤٥٦"
              id="certificateReferenceNumberAr"
              type="text"
              value={formik.values.certificateReferenceNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
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
