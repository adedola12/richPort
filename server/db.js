import mongoose from "mongoose";

let connectPromise = null;

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose;
  if (connectPromise) return connectPromise;

  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  mongoose.set("strictQuery", true);

  connectPromise = mongoose
    .connect(mongoURI, {
      // no dbName here – it will use the one from the URI path
      serverSelectionTimeoutMS: 5000,
    })
    .then((m) => {
      console.log("Connected to MongoDB:", m.connection.name);
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
