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