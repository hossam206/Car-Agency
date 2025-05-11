import express, { Application } from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./src/config/mongo.config";
import router from "./src/router";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import bodyParser from "body-parser";
import { swaggerDoc } from "./src/config/swagger.config";
dotenv.config();

const app: Application = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Headers Helmet
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

// MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "You have exceeded the allowed request limit. Please try again later.",
});
app.use(limiter);

swaggerDoc(app);
app.use("/api/v1", router);

const PORT = process.env.PORT || 8080;
Promise.all([connectToMongoDB()])
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Express server started on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error(err.message);
    process.exit(1);
  });

export default app;
