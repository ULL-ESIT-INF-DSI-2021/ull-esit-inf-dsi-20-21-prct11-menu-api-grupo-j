import * as mongoose from "mongoose";

import {IngredientInterface} from './Ingredient'

export type CourseType = "STARTER" | "FIRSTCOURSE" | "SECONDCOURSE" | "DESSERT";

export interface CourseInterface {
  name: string;
  courseType: CourseType;
  ingredients: { ingredient: IngredientInterface, amountInGrams: number }[];
  coursePrice: number;
  courseComposition: { carbohydrates: number, proteins: number, lipids: number };
  mainNutrient: string;
}

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  courseType: {
    type: String,
    enum: ["STARTER", "FIRSTCOURSE", "SECONDCOURSE", "DESSERT"],
    required: true,
  },
  coursePrice: {
      type: Number,
      required: true
  },
  courseComposition: {
    carbohydrates: {
        type: Number,
        required: true,
      }, 
      proteins: {
        type: Number,
        required: true,
      }, 
      lipids: {
        type: Number,
        required: true,
      }
  },
  ingredients: {                    
    type: [{
      ingredient: {
        type: String,
        required: true,
      }, 
      amountInGrams: {
        type: Number,
        required: true,
      }
    }]   
  }
});

const Course = mongoose.model<CourseInterface>("Course", CourseSchema);
export default Course;