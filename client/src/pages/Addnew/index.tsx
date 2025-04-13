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
import fieldConfig from "./inputsData";
import { useNavigate } from "react-router-dom";

// Create Yup validation schema dynamically
const validationSchema = Yup.object(
  fieldConfig.reduce((schema, field) => {
    schema[field.id] = Yup.string();
    schema[`${field.id}Ar`] = Yup.string();
    return schema;
  }, {} as Record<string, any>)
);

export default function AddNew() {
  const navigate = useNavigate();
  // handle cancel
  const handleCancel = () => {
    formik.resetForm();
    navigate("/");
  };

  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await addItem("car/add", values);
        if (response?.status === 201) {
          toast.success("New car added successfully!", {
            icon: <FaCircleCheck className="h-5 w-5 text-green-600" />,
          });
          resetForm();
        }
      } catch (error) {
        console.error("Error adding car:", error);
        toast.error("Failed to add new car");
      } finally {
        setLoading(false);
      }
    },
  });

  const renderInput = (
    field: (typeof fieldConfig)[0],
    isArabic: boolean = false
  ) => {
    const fieldId = isArabic ? `${field.id}Ar` : field.id;
    const label = isArabic ? field.labelAr : field.labelEn;
    const dir = isArabic ? "rtl" : "ltr";
    const placeholder = isArabic ? `مثال: ...` : `e.g ...`;

    if (field.type === "date") {
      return (
        <div className="flex flex-col gap-2" key={fieldId}>
          <label
            htmlFor={fieldId}
            className={`text-sm font-medium mb-1 text-gray-500 ${
              isArabic ? "text-right" : ""
            }`}
          >
            {label}
          </label>

          <input
            id={fieldId}
            name={fieldId}
            type="date"
            value={formik.values[fieldId]}
            onChange={formik.handleChange}
            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 text-base shadow-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            dir={dir}
          />
          {formik.touched[fieldId] && formik.errors[fieldId] ? (
            <div className="text-red-500 text-xs">{formik.errors[fieldId]}</div>
          ) : null}
        </div>
      );
    }

    return (
      <Input
        key={fieldId}
        labelName={label}
        placeholder={placeholder}
        id={fieldId}
        type={field.type}
        name={fieldId}
        value={formik.values[fieldId]}
        onChange={formik.handleChange}
        error={formik.touched[fieldId] && formik.errors[fieldId]}
        dir={dir}
      />
    );
  };

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <h1 className="font-bold text-2xl my-4">Add New Car Info</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border border-solid shadow-sm rounded-lg p-6 my-4">
            {fieldConfig.map((field) => (
              <>
                {renderInput(field)}
                {renderInput(field, true)}
              </>
            ))}
          </div>
          <div className="flex flex-row item-center justify-center gap-4">
            <Button
              variant={"destructive"}
              type="button"
              size="lg"
              onClick={() => handleCancel()}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant={"default"}
              type="submit"
              size="lg"
              disabled={loading}
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
