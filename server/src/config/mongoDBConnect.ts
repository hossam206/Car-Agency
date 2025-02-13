import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in your .env file"
  );
}

// ✅ Disable Mongoose Caching (if used)
mongoose.set("bufferCommands", false); // Prevents caching queries
mongoose.set("strictQuery", true); // Ensures strict mode
mongoose.set("debug", process.env.NODE_ENV === "development"); // Debug mode in dev

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      autoIndex: process.env.NODE_ENV !== "production", // ✅ Disables index creation in production
      readPreference: "primary",
      maxPoolSize: 10,
    });

    console.log("✅ Connected to MongoDB!");
    console.log(`MongoDB Connection State: ${mongoose.connection.readyState}`);

    const db = mongoose.connection.db;

    // ✅ Handle connection errors
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Connection Error:", err);
    });

    return db;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
};

// ✅ Graceful shutdown on server exit
process.on("SIGINT", async () => {
  console.log("⚠️ Closing MongoDB connection...");
  await mongoose.connection.close();
  process.exit(0);
});

export default connectToMongoDB;
