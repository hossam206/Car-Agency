import express, { Application } from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./config/mongoDBConnect";
import router from "./router";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import bodyParser from "body-parser";
dotenv.config();

const app: Application = express();

const corsOptions = {
  origin: process.env.FORNTEND_URL,
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

app.use("/api", router);

Promise.all([connectToMongoDB()])
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Express server started on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error(err.message);
    process.exit(1);
  });

export default app;
