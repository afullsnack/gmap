import mongoose, { model } from "mongoose";
import { connectDB } from "../lib/db";
let User;
try {
  const db = connectDB();
  const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: [true, "Please add first name"] },
    lastname: { type: String, required: [true, "Please add last name"] },
    username: { type: String, required: [true, "Please add a username"] },
    password: { type: String, required: [true, "Please add a password"] },
    email: {
      type: String,
      required: [true, "Please add a valid email account"],
    },
    // phone: {
    //   type: String,
    //   required: [true, "Please add a valid phone number"],
    // },
  });
  User = mongoose.model("User", UserSchema);
} catch (err) {
  console.log(err.message || err.toString());
}

export default User;
