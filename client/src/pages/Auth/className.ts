import clx from "classnames";
export const loginStyles = {
  formContainer: clx(
    "w-full bg-white rounded-lg shadow  border border-solid md:mt-0 sm:max-w-md xl:p-0   "
  ),
  HeadingStyles: clx(
    "text-xl font-semibold text-center leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white"
  ),
  inputStyles: clx(
    "bg-gray-50 border border-gray-300 text-gray-900 text-md font-semibold sm:text-sm rounded-lg w-full py-2 px-3 outline-none  transition-all duration-200 "
  ),

  submitButton: clx(
    "w-full h-12 bg-slate-800 hover:bg-slate-600 transition-all duration-700 rounded-lg shadow-xs text-white text-base font-medium leading-6"
  ),
};
