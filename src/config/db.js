import mongoose from "mongoose";

export function db() {
  console.log("Mongo URI:", process.env.MONGODB); // DEBUG

  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("db connected"))
    .catch(err => console.error(err))
}
