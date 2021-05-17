import mongoose, { model } from "mongoose";
import dbConnection from "../lib/db";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let Student;
let conx = dbConnection();
try {
  const StudentSchema = new Schema({
    firstname: { type: String, required: [true, "Please add first name"] },
    lastname: { type: String, required: [true, "Please add last name"] },
    currentLevel: {
      type: String,
      required: [true, "You have ot be in a level"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter an email address"],
    },
    courses: { type: [ObjectId] },
  });
  Student = conx.models.Student || conx.model("Student", StudentSchema);
} catch (err) {
  console.log(err.message || err.toString());
}

export default Student;
