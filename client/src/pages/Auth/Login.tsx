import React, { useState } from "react";
import { loginStyles } from "./className";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { ImSpinner8 } from "react-icons/im";
import { IoIosLock } from "react-icons/io";
import { Button } from "@/Components/ui/button";
import { useAuth } from "@/Context/AuthProvider";

const Login: React.FC = () => {
  type ApiResponse = {
    status: number;
    data: any; // Adjust this type according to your actual API response
  };

  const { loginService, loading } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);

  // formik setUp
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values): Promise<void> => {
      try {
        const response: ApiResponse = await loginService(values);
        if (response?.status == 200) {
          setLoginError(false);
        } else {
          setLoginError(true);
        }
      } catch (error) {
        console.error("Error while logging in", error);
      }
    },
  });
  return (
    <div className="container mx-auto flex flex-col justify-center  h-screen   ">
      <section className="flex flex-col items-center pt-6">
        <div className={loginStyles.formContainer}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className={loginStyles.HeadingStyles}>Welcome Login</h1>
            {loginError && (
              <div className="p-2 bg-red-200 font-medium text-red-600 rounded-md m-0">
                <span>email or password is incorrect,Try again</span>
              </div>
            )}
            <form
              className="space-y-4 md:space-y-4"
              method="POST"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm   text-gray-900 dark:text-white placeholder:text-xs placeholder:font-normal"
                >
                  Email
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g John23@gmail.com"
                  name="email"
                  className={`${loginStyles.inputStyles} ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="relative overflow-hidden">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className={`${loginStyles.inputStyles} ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "focus:border-slate-700"
                  }`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}
                <span
                  className="absolute right-1 top-8 transform   cursor-pointer w-6 h-6 rounded-full flex items-center justify-center text-gray-800 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <BiSolidShow /> : <BiSolidHide />}
                </span>
              </div>
              <Button
                variant={"default"}
                type="submit"
                size="lg"
                className="w-full"
                // disabled={formik.errors || formik.isValid}
              >
                <span>
                  {loading ? (
                    <ImSpinner8 className="animate-spin transition-all duration-500 ease-in-out" />
                  ) : (
                    <IoIosLock />
                  )}
                </span>
                {loading ? "loading.." : "Login"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
