import * as mongoose from "mongoose";
import { IngredientInterface } from "./interfaces";

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ingredientGroup: {
    type: String,
    enum: ["CARNES-HUEVOS-LEGUMBRES", "VERDURAS-HORTALIZAS", "LACTEOS", "CEREALES", "FRUTAS"],
    required: true,
  },
  nutrients: {
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
    }, 
  },
  pricePerKg: {
    type: Number, 
    required: true,
  }
});

