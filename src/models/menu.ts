import * as mongoose from "mongoose";
import { MenuInterface, ingredientType } from "./interfaces";

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Courses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Course",
    required: true,
  },
});