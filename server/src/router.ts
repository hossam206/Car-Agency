import { Request, Response, Router } from "express";
import UserRouters from "./routes/user.routes";
import CarRouters from "./routes/car.routes";
const router = Router();

// Health Check
router.get("/health-check", (req: Request, res: Response) => {
  console.log("Server is running");
  res.send("Server is running");
});

// Routes
router.use("/user", UserRouters);

router.use("/car", CarRouters);

export default router;
