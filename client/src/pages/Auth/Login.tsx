import React, { useState } from "react";
import { loginStyles } from "./className";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HiOutlineLockClosed } from "react-icons/hi";
import { ImSpinner8 } from "react-icons/im";
import { PiEyeClosedBold } from "react-icons/pi";
import { FaEye } from "react-icons/fa6";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useAuth } from "@/Context/AuthProvider";
import PortalLogo from "/images/Logo/logo.svg";
import LoginImg from "/images/Login/loginImg.svg";
const Login: React.FC = () => {
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
      const response = await loginService(values);

      if (response.status === 200) {
        setLoginError(false);
      } else {
        setLoginError(true);
      }
    },
  });
  return (
    <div className="h-screen grid grid-cols-12 bg-gray-50">
      <section className="  dark:bg-gray-900 my-auto  col-span-12 md:col-span-5  ">
        <div className="flex flex-col items-center justify-center px-6 mx-auto   lg:py-0">
          <div className="flex flex-row items-center justify-center gap-2  ">
            <img
              className="w-10 h-10"
              src={PortalLogo}
              loading="lazy"
              alt="logo"
            />
            <h1 className="text-3xl mb-3 font-semibold text-gray-700 dark:text-white">
              Car Agency
            </h1>
          </div>
          <div className="w-full dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700   ">
            <div className="flex flex-col sm:p-2">
              <p className="text-sm font-medium text-center text-[#747787] dark:text-white mb-4 md:mb-0 ">
                Let's get started, Sign in To Your Account
              </p>
              <form
                className="space-y-4 md:space-y-6 md:mt-10"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`customInput ${
                      formik.errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="name@company.com"
                    required
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-600 italic mt-1 text-[12px]">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      placeholder="••••••••••••"
                      className={`customInput ${
                        formik.errors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      required
                    />
                    <span
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEye size={18} />
                      ) : (
                        <PiEyeClosedBold size={18} />
                      )}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-600 italic mt-1 text-[12px]">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                {loginError && (
                  <div className="flex items-start gap-2 text-sm font-normal text-red-500">
                    <AiFillExclamationCircle size={18} />
                    <p>Email or password is incorrect, please try again.</p>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full bg-[#3c6bc2] hover:opacity-85 text-white flex items-center justify-center gap-2 text-md rounded-full p-3 ${
                    formik.isSubmitting || !formik.isValid
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {loading ? (
                    <>
                      <ImSpinner8 className="animate-spin" size={15} />
                      Loading...
                    </>
                  ) : (
                    <>
                      <HiOutlineLockClosed size={15} />
                      Login
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="md:col-span-7 w-full overflow-hidden rounded-tl-[60px] hidden md:block bg-[#2253ad]">
        <div className="mt-12 px-10 flex flex-col gap-2">
          <h1 className="text-2xl text-[#f9fcff] font-medium capitalize ">
            Control Your Business Automatically <br /> with our Smart Portal
          </h1>
          <p className="text-[#d3d8d0] text-base font-thin">
            Invest intelligently, save your time, and discover a better way{" "}
            <br /> to manage your staff.
          </p>
        </div>
        <div className="w-full h-full flex flex-col items-center  justify-start overflow-hidden opacity-90" >
          <img
            src={LoginImg}
            loading="lazy"
            alt="Login"
            className="lg:w-[600px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
