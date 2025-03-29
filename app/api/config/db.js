import mongoose from "mongoose";

const DATABASE_URL = "mongodb+srv://vatsal00:StyleDiva2025@cluster0.cvuh3.mongodb.net/StyleDivaa?retryWrites=true&w=majority&appName=Cluster0StyleDivaa";
// const DATABASE_URL = "mongodb://housenplots_dkleanuser:a47PJkc&K@localhost:27017/housenplots_dkleandb";


if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;