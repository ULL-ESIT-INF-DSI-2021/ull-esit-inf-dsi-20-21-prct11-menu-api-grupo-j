import * as mongoose from "mongoose";
import { CourseInterface } from "./interfaces";

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },