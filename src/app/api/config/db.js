import mongoose from "mongoose";

const MONGODB_URI = process.env.Mongo_Url || "mongodb://localhost:27017/biolink";

if (!MONGODB_URI) {
  throw new Error("Please define Mongo_Url in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "User",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
