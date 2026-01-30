import mongoose from "mongoose";

export function db() {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("db connected"))
}
