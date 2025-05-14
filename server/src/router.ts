import { Request, Response, Router } from "express";
import UserRouters from "./routes/user.routes";
import CarRouters from "./routes/car.routes";
const router = Router();

/**
 * @swagger
 * /health-check:
 *   get:
 *     tags: [User]
 *     summary: Health check
 *     description: Health check
 *     responses:
 *       200:
 *       description: Server is running
 *       500:
 *         description: Internal Server Error
 */
router.get("/health-check", (req: Request, res: Response) => {
  console.log("Server is running");
  res.send("Server is running");
});

// Routes
router.use("/auth", UserRouters);
// router.use("/user", UserRouters);
router.use("/car", CarRouters);

export default router;
