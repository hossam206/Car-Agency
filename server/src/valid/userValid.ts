import { body, validationResult } from "express-validator";

const validUser = () => {
  return [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isString()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@]).{6,}$/)
      .withMessage("Something Error"),
  ];
};
export default validUser;
