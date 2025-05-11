import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const expressValidator = (validators: any[]): any => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    for (const validator of validators) {
      await validator?.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (!res.headersSent) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Validation failed",
          errors: errors.array().map((err) => ({
            field: (err as any).path || "unknown",
            message: err.msg,
            type: err.type,
          })),
        });
      }
    }
    return next();
  };
};

export const requiredParamMiddleware = (): any => {
  return (req: Request, res: Response, next: NextFunction): void | Response => {
    const id = req.params?.carId || req.params?.userId;
    if (!id|| !/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    return next();
  };
};
