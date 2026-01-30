import mongoose from "mongoose";

export function db() {
  mongoose.connect("mongodb+srv://Waqas:Waqas1290@firstproject.8ewahxi.mongodb.net/day-7").then(()=>{
    console.log("db connected");
  })
}