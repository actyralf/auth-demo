import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  capstoneProject: {
    type: String,
    required: false,
  },
  capstoneProjectDescription: {
    type: String,
    required: false,
  },
});

mongoose.models = {};

const Student = mongoose.model("Student", StudentSchema, "students");

export default Student;
