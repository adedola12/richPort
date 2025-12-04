import mongoose from "mongoose";

let connectPromise = null;

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose;
  if (connectPromise) return connectPromise;

  const mongoURI =
    process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
  if (!mongoURI)
    throw new Error("MONGO_URI is not defined in environment variables");

  mongoose.set("strictQuery", true);

  const authDbName = process.env.MONGO_AUTH_DB || "admin";

  connectPromise = mongoose
    .connect(mongoURI, {
      dbName: authDbName,
      serverSelectionTimeoutMS: 5000,
    })
    .then((m) => {
      console.log("Connected to MongoDB");
      return m;
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      connectPromise = null;
      throw err;
    });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
    connectPromise = null;
  });
  return connectPromise;
}
