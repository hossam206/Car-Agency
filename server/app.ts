import express, { Application } from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./src/config/mongoDBConnect";
import router from "./src/router";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

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
