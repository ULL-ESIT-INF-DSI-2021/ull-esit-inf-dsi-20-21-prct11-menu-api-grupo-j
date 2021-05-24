import * as mongoose from "mongoose";
import { CourseInterface } from "./interfaces";

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  CourseType: {
    type: String,
    enum: ["STARTER", "FIRSTCOURSE", "SECONDCOURSE", "DESSERT"],
    required: true,
  },
  ingredients: {                    
    type: [{
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
        required: true,
      }, 
      amountInGrams: {
        type: Number,
        required: true,
      }
    }]   
  }
});

CourseSchema.virtual("coursePrice", function(this: CourseInterface) {
    let coursePrice = 0;
    for(const ingredient of this.ingredients) {
      coursePrice += ingredient["ingredient"].pricePerKg / 100 * ingredient["amountInGrams"];
    }
    return coursePrice;
});

CourseSchema.virtual("courseComposition", function(this: CourseInterface) {
    let cb: number = 0, pt = 0, lp = 0;
    this.ingredients.forEach(ingredient => {
      cb += ingredient.ingredient.nutrients.carbohydrates * ingredient.amountInGrams / 100;
      pt += ingredient.ingredient.nutrients.proteins * ingredient.amountInGrams / 100;
      lp += ingredient.ingredient.nutrients.lipids * ingredient.amountInGrams / 100;
    });
    return { carbohydrates: cb, proteins: pt, lipids: lp };
});

const Course = mongoose.model<CourseInterface>("Course", CourseSchema);
export default Course;