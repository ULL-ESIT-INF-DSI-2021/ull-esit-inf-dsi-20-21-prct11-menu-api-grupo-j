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

MenuSchema.virtual("menuPrice", function (this: MenuInterface) {
  let menuPrice = 0;
  this.courses.forEach(course => {
    menuPrice += course.coursePrice;
  });
  return menuPrice;
});

MenuSchema.virtual("menuComposition", function (this: MenuInterface) {
  let cb: number = 0, pt = 0, lp = 0;
  this.courses.forEach(course => {
    const composition = course.courseComposition;
    cb += composition.carbohydrates;
    pt += composition.proteins;
    lp += composition.lipids;
  });
  return { carbohydrates: cb, proteins: pt, lipids: lp };
});

