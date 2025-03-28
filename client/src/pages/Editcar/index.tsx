import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/Components/ui/button";
import { ImSpinner8 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { getItem, updateItem } from "@/services/globalService";
import { Input } from "@/Components/ui/input";
import Navbar from "@/Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { CarsData } from "@/types/CarsData";
import { toast } from "sonner";
import { FaCircleCheck } from "react-icons/fa6";
import ContentLoader from "@/Components/ContentLoader/inedx";

// Yup validation schema matched with initialValues and response data
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

export default function EditCar() {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<CarsData | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await getItem("car", `${id}`);
        if (response?.status === 200) {
          setInitialData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      exportCountryTo: initialData?.exportCountryTo || "",
      exportCountryToAr: initialData?.exportCountryToAr || "",
      categoryArabic: initialData?.categoryArabic || "",
      vehicleType: initialData?.vehicleType || "",
      vehicleTypeAr: initialData?.vehicleTypeAr || "",
      exportPlateNumber: initialData?.exportPlateNumber || "",
      exportPlateNumberAr: initialData?.exportPlateNumberAr || "",
      registrationPlateNumber: initialData?.registrationPlateNumber || "",
      registrationPlateNumberAr: initialData?.registrationPlateNumberAr || "",
      registrationDate: initialData?.registrationDate || "",
      registrationDateAr: initialData?.registrationDateAr || "",
      registrationExpiryDate: initialData?.registrationExpiryDate || "",
      registrationExpiryDateAr: initialData?.registrationExpiryDateAr || "",
      vehicleMake: initialData?.vehicleMake || "",
      vehicleMakeAr: initialData?.vehicleMakeAr || "",
      category: initialData?.category || "",
      categoryAr: initialData?.categoryAr || "",
      modelYear: initialData?.modelYear || "",
      modelYearAr: initialData?.modelYearAr || "",
      countryOfOrigin: initialData?.countryOfOrigin || "",
      countryOfOriginAr: initialData?.countryOfOriginAr || "",
      vehicleColor: initialData?.vehicleColor || "",
      vehicleColorAr: initialData?.vehicleColorAr || "",
      chassisNumber: initialData?.chassisNumber || "",
      chassisNumberAr: initialData?.chassisNumberAr || "",
      engineNumber: initialData?.engineNumber || "",
      engineNumberAr: initialData?.engineNumberAr || "",
      numberOfDoors: initialData?.numberOfDoors || "",
      numberOfDoorsAr: initialData?.numberOfDoorsAr || "",
      fuelType: initialData?.fuelType || "",
      fuelTypeAr: initialData?.fuelTypeAr || "",
      numberOfSeats: initialData?.numberOfSeats || "",
      numberOfSeatsAr: initialData?.numberOfSeatsAr || "",
      emptyWeight: initialData?.emptyWeight || "",
      emptyWeightAr: initialData?.emptyWeightAr || "",
      insuranceCompany: initialData?.insuranceCompany || "",
      insuranceCompanyAr: initialData?.insuranceCompanyAr || "",
      insuranceType: initialData?.insuranceType || "",
      insuranceTypeAr: initialData?.insuranceTypeAr || "",
      insurancePolicyNumber: initialData?.insurancePolicyNumber || "",
      insurancePolicyNumberAr: initialData?.insurancePolicyNumberAr || "",
      insuranceExpiryDate: initialData?.insuranceExpiryDate || "",
      insuranceExpiryDateAr: initialData?.insuranceExpiryDateAr || "",
      ownerName: initialData?.ownerName || "",
      ownerNameAr: initialData?.ownerNameAr || "",
      nationality: initialData?.nationality || "",
      nationalityAr: initialData?.nationalityAr || "",
      passportNumber: initialData?.passportNumber || "",
      passportNumberAr: initialData?.passportNumberAr || "",
      trafficCodeNumber: initialData?.trafficCodeNumber || "",
      trafficCodeNumberAr: initialData?.trafficCodeNumberAr || "",
      emiratesIdNumber: initialData?.emiratesIdNumber || "",
      emiratesIdNumberAr: initialData?.emiratesIdNumberAr || "",
      driverName: initialData?.driverName || "",
      driverNameAr: initialData?.driverNameAr || "",
      licenseNumber: initialData?.licenseNumber || "",
      licenseNumberAr: initialData?.licenseNumberAr || "",
      driverNationality: initialData?.driverNationality || "",
      driverNationalityAr: initialData?.driverNationalityAr || "",
      licenseSource: initialData?.licenseSource || "",
      licenseSourceAr: initialData?.licenseSourceAr || "",
      certificateIssueDate: initialData?.certificateIssueDate || "",
      certificateIssueDateAr: initialData?.certificateIssueDateAr || "",
      certificateReferenceNumber: initialData?.certificateReferenceNumber || "",
      certificateReferenceNumberAr:
        initialData?.certificateReferenceNumberAr || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await updateItem("car/update", `${id}`, values);
        if (response?.status === 200) {
          setLoading(false);
          toast.success("Car Info Updated Successfully!", {
            icon: <FaCircleCheck className="h-5 w-5 text-green-500" />,
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error updating car:", error);
        setLoading(false);
      }
    },
  });

  if (!initialData) {
    return <ContentLoader />;
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <h1 className="font-bold text-2xl my-4">Edit Car Info</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border border-solid rounded-lg p-4 my-4">
            {/* Export Country To */}
            <Input
              labelName="Export Country To"
              placeholder="e.g USA"
              id="exportCountryTo"
              type="text"
              name="exportCountryTo"
              value={formik.values.exportCountryTo}
              onChange={formik.handleChange}
            />
            <Input
              labelName="بلد التصدير إلى"
              placeholder="مثال: الولايات المتحدة"
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
              placeholder="e.g Sedan"
              id="vehicleType"
              type="text"
              name="vehicleType"
              value={formik.values.vehicleType}
              onChange={formik.handleChange}
            />
            <Input
              labelName="نوع المركبة"
              placeholder="مثال: سيدان"
              id="vehicleTypeAr"
              type="text"
              name="vehicleTypeAr"
              value={formik.values.vehicleTypeAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Export Plate Number */}
            <Input
              labelName="Export Plate Number"
              placeholder="e.g EX12345"
              id="exportPlateNumber"
              type="text"
              name="exportPlateNumber"
              value={formik.values.exportPlateNumber}
              onChange={formik.handleChange}
            />
            <Input
              labelName="رقم لوحة التصدير"
              placeholder="مثال: EX12345"
              id="exportPlateNumberAr"
              type="text"
              name="exportPlateNumberAr"
              value={formik.values.exportPlateNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Registration Plate Number */}
            <Input
              labelName="Registration Plate Number"
              placeholder="e.g AB123CD"
              id="registrationPlateNumber"
              type="text"
              name="registrationPlateNumber"
              value={formik.values.registrationPlateNumber}
              onChange={formik.handleChange}
            />
            <Input
              labelName="رقم لوحة التسجيل"
              placeholder="مثال: AB123CD"
              id="registrationPlateNumberAr"
              type="text"
              name="registrationPlateNumberAr"
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
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 text-base shadow-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
                className="customInput "
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
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 text-base shadow-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
                className="customInput"
                dir="rtl"
              />
            </div>
            {/* Vehicle Make */}
            <Input
              labelName="Vehicle Make"
              placeholder="e.g Toyota"
              id="vehicleMake"
              type="text"
              name="vehicleMake"
              value={formik.values.vehicleMake}
              onChange={formik.handleChange}
            />
            <Input
              labelName="صنع المركبة"
              placeholder="مثال: تويوتا"
              id="vehicleMakeAr"
              type="text"
              name="vehicleMakeAr"
              value={formik.values.vehicleMakeAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Category */}
            <Input
              labelName="Category"
              placeholder="e.g Private"
              id="category"
              type="text"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            />
            <Input
              labelName="الفئة"
              placeholder="مثال: خاصة"
              id="categoryAr"
              type="text"
              name="categoryAr"
              value={formik.values.categoryAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Model Year */}
            <Input
              labelName="Model Year"
              placeholder="e.g 2022"
              id="modelYear"
              type="text"
              name="modelYear"
              value={formik.values.modelYear}
              onChange={formik.handleChange}
            />
            <Input
              labelName="سنة الصنع"
              placeholder="مثال: ٢٠٢٢"
              id="modelYearAr"
              type="text"
              name="modelYearAr"
              value={formik.values.modelYearAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Country of Origin */}
            <Input
              labelName="Country of Origin"
              placeholder="e.g Japan"
              id="countryOfOrigin"
              type="text"
              name="countryOfOrigin"
              value={formik.values.countryOfOrigin}
              onChange={formik.handleChange}
            />
            <Input
              labelName="بلد المنشأ"
              placeholder="مثال: اليابان"
              id="countryOfOriginAr"
              type="text"
              name="countryOfOriginAr"
              value={formik.values.countryOfOriginAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Vehicle Color */}
            <Input
              labelName="Vehicle Color"
              placeholder="e.g White"
              id="vehicleColor"
              type="text"
              name="vehicleColor"
              value={formik.values.vehicleColor}
              onChange={formik.handleChange}
            />
            <Input
              labelName="لون المركبة"
              placeholder="مثال: أبيض"
              id="vehicleColorAr"
              type="text"
              name="vehicleColorAr"
              value={formik.values.vehicleColorAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Chassis Number */}
            <Input
              labelName="Chassis Number"
              placeholder="e.g XYZ1234567890"
              id="chassisNumber"
              type="text"
              name="chassisNumber"
              value={formik.values.chassisNumber}
              onChange={formik.handleChange}
            />
            <Input
              labelName="رقم الهيكل"
              placeholder="مثال: XYZ1234567890"
              id="chassisNumberAr"
              type="text"
              name="chassisNumberAr"
              value={formik.values.chassisNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Engine Number */}
            <Input
              labelName="Engine Number"
              placeholder="e.g ENG987654321"
              id="engineNumber"
              type="text"
              name="engineNumber"
              value={formik.values.engineNumber}
              onChange={formik.handleChange}
            />
            <Input
              labelName="رقم المحرك"
              placeholder="مثال: ENG987654321"
              id="engineNumberAr"
              type="text"
              name="engineNumberAr"
              value={formik.values.engineNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Number of Doors */}
            <Input
              labelName="Number of Doors"
              placeholder="e.g 4"
              id="numberOfDoors"
              type="text"
              name="numberOfDoors"
              value={formik.values.numberOfDoors}
              onChange={formik.handleChange}
            />
            <Input
              labelName="عدد الأبواب"
              placeholder="مثال: ٤"
              id="numberOfDoorsAr"
              type="text"
              name="numberOfDoorsAr"
              value={formik.values.numberOfDoorsAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Fuel Type */}
            <Input
              labelName="Fuel Type"
              placeholder="e.g Petrol"
              id="fuelType"
              type="text"
              name="fuelType"
              value={formik.values.fuelType}
              onChange={formik.handleChange}
            />
            <Input
              labelName="نوع الوقود"
              placeholder="مثال: بنزين"
              id="fuelTypeAr"
              type="text"
              name="fuelTypeAr"
              value={formik.values.fuelTypeAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Number of Seats */}
            <Input
              labelName="Number of Seats"
              placeholder="e.g 5"
              id="numberOfSeats"
              type="text"
              name="numberOfSeats"
              value={formik.values.numberOfSeats}
              onChange={formik.handleChange}
            />
            <Input
              labelName="عدد المقاعد"
              placeholder="مثال: ٥"
              id="numberOfSeatsAr"
              type="text"
              name="numberOfSeatsAr"
              value={formik.values.numberOfSeatsAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Empty Weight */}
            <Input
              labelName="Empty Weight"
              placeholder="e.g 1500"
              id="emptyWeight"
              type="text"
              name="emptyWeight"
              value={formik.values.emptyWeight}
              onChange={formik.handleChange}
            />
            <Input
              labelName="الوزن الفارغ"
              placeholder="مثال: ١٥٠٠"
              id="emptyWeightAr"
              type="text"
              name="emptyWeightAr"
              value={formik.values.emptyWeightAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Insurance Company */}
            <Input
              labelName="Insurance Company"
              placeholder="e.g AXA Insurance"
              id="insuranceCompany"
              type="text"
              name="insuranceCompany"
              value={formik.values.insuranceCompany}
              onChange={formik.handleChange}
            />
            <Input
              labelName="شركة التأمين"
              placeholder="مثال: أكسا للتأمين"
              id="insuranceCompanyAr"
              type="text"
              name="insuranceCompanyAr"
              value={formik.values.insuranceCompanyAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Insurance Type */}
            <Input
              labelName="Insurance Type"
              placeholder="e.g Comprehensive"
              id="insuranceType"
              type="text"
              name="insuranceType"
              value={formik.values.insuranceType}
              onChange={formik.handleChange}
            />
            <Input
              labelName="نوع التأمين"
              placeholder="مثال: شامل"
              id="insuranceTypeAr"
              type="text"
              name="insuranceTypeAr"
              value={formik.values.insuranceTypeAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Insurance Policy Number */}
            <Input
              labelName="Insurance Policy Number"
              placeholder="e.g POL12345678"
              id="insurancePolicyNumber"
              type="text"
              name="insurancePolicyNumber"
              value={formik.values.insurancePolicyNumber}
              onChange={formik.handleChange}
            />
            <Input
              labelName="رقم وثيقة التأمين"
              placeholder="مثال: POL12345678"
              id="insurancePolicyNumberAr"
              type="text"
              name="insurancePolicyNumberAr"
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
                className="customInput"
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
                className="customInput"
                dir="rtl"
              />
            </div>
            {/* Owner Name */}
            <Input
              labelName="Owner Name"
              placeholder="e.g John Doe"
              id="ownerName"
              type="text"
              name="ownerName"
              value={formik.values.ownerName}
              onChange={formik.handleChange}
            />
            <Input
              labelName="اسم المالك"
              placeholder="مثال: جون دو"
              id="ownerNameAr"
              type="text"
              name="ownerNameAr"
              value={formik.values.ownerNameAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Nationality */}
            <Input
              labelName="Nationality"
              placeholder="e.g American"
              id="nationality"
              type="text"
              name="nationality"
              value={formik.values.nationality}
              onChange={formik.handleChange}
            />
            <Input
              labelName="الجنسية"
              placeholder="مثال: أمريكي"
              id="nationalityAr"
              type="text"
              name="nationalityAr"
              value={formik.values.nationalityAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Passport Number */}
            <Input
              labelName="Passport Number"
              placeholder="e.g P123456789"
              id="passportNumber"
              type="text"
              name="passportNumber"
              value={formik.values.passportNumber}
              onChange={formik.handleChange}
            />
            <Input
              labelName="رقم جواز السفر"
              placeholder="مثال: P123456789"
              id="passportNumberAr"
              type="text"
              name="passportNumberAr"
              value={formik.values.passportNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Traffic Code Number */}
            <Input
              labelName="Traffic Code Number"
              placeholder="e.g TC987654"
              id="trafficCodeNumber"
              type="text"
              name="trafficCodeNumber"
              value={formik.values.trafficCodeNumber}
              onChange={formik.handleChange}
            />
            <Input
              labelName="رقم رمز المرور"
              placeholder="مثال: TC987654"
              id="trafficCodeNumberAr"
              type="text"
              name="trafficCodeNumberAr"
              value={formik.values.trafficCodeNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Emirates ID Number */}
            <Input
              labelName="Emirates ID Number"
              placeholder="e.g 784-2024-1234567-1"
              id="emiratesIdNumber"
              type="text"
              name="emiratesIdNumber"
              value={formik.values.emiratesIdNumber}
              onChange={formik.handleChange}
            />
            <Input
              labelName="رقم الهوية الإماراتية"
              placeholder="مثال: ٧٨٤-٢٠٢٤-١٢٣٤٥٦٧-١"
              id="emiratesIdNumberAr"
              type="text"
              name="emiratesIdNumberAr"
              value={formik.values.emiratesIdNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Driver Name */}
            <Input
              labelName="Driver Name"
              placeholder="e.g John Doe"
              id="driverName"
              type="text"
              name="driverName"
              value={formik.values.driverName}
              onChange={formik.handleChange}
            />
            <Input
              labelName="اسم السائق"
              placeholder="مثال: جون دو"
              id="driverNameAr"
              type="text"
              name="driverNameAr"
              value={formik.values.driverNameAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* License Number */}
            <Input
              labelName="License Number"
              placeholder="e.g DL123456"
              id="licenseNumber"
              type="text"
              name="licenseNumber"
              value={formik.values.licenseNumber}
              onChange={formik.handleChange}
            />
            <Input
              labelName="رقم الرخصة"
              placeholder="مثال: DL123456"
              id="licenseNumberAr"
              type="text"
              name="licenseNumberAr"
              value={formik.values.licenseNumberAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* Driver Nationality */}
            <Input
              labelName="Driver Nationality"
              placeholder="e.g American"
              id="driverNationality"
              type="text"
              name="driverNationality"
              value={formik.values.driverNationality}
              onChange={formik.handleChange}
            />
            <Input
              labelName="جنسية السائق"
              placeholder="مثال: أمريكي"
              id="driverNationalityAr"
              type="text"
              name="driverNationalityAr"
              value={formik.values.driverNationalityAr}
              onChange={formik.handleChange}
              dir="rtl"
            />
            {/* License Source */}
            <Input
              labelName="License Source"
              placeholder="e.g Dubai"
              id="licenseSource"
              type="text"
              name="licenseSource"
              value={formik.values.licenseSource}
              onChange={formik.handleChange}
            />
            <Input
              labelName="مصدر الرخصة"
              placeholder="مثال: دبي"
              id="licenseSourceAr"
              type="text"
              name="licenseSourceAr"
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
                className="customInput  "
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
                className="customInput"
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
                placeholder="e.g CRN12345678"
                value={formik.values.certificateReferenceNumber}
                onChange={formik.handleChange}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 text-base shadow-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Input
              labelName="رقم مرجع الشهادة"
              placeholder="مثال: 5456"
              id="certificateReferenceNumberAr"
              type="text"
              name="certificateReferenceNumberAr"
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
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
