import { body, ValidationChain } from "express-validator";
const emailPattern =
  /^[a-zA-Z0-9._-]+@(gmail|yahoo|outlook|hotmail|icloud|example)\.com$/;
export const addUserValidator = (): ValidationChain[] => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .matches(emailPattern)
      .withMessage("Invalid email"),
    body("username")
      .isString()
      .withMessage("Invalid username")
      .isLength({ min: 3, max: 20 })
      .withMessage("username must be between 3 and 20 characters long"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword({
        minLength: 10,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 2,
        minSymbols: 1,
      })
      .withMessage(
        "Password must be at least 10 characters long, contain at least two uppercase letters, two lowercase letters, two numbers, and two symbols."
      ),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ];
};
export const loginValidator = (): ValidationChain[] => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .matches(emailPattern)
      .withMessage("Invalid email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword({
        minLength: 10,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 2,
        minSymbols: 1,
      })
      .withMessage(
        "Invalid password."
      )
  ];
};

export const updatePasswordValidator = (): ValidationChain[] => {
  return [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword({
        minLength: 10,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 2,
        minSymbols: 1,
      })
      .withMessage(
        "Password must be at least 10 characters long, contain at least two uppercase letters, two lowercase letters, two numbers, and two symbols."
      ),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ];
};
