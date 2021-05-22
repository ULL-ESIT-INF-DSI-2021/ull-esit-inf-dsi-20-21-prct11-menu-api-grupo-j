import mongoose from 'mongoose'

export type ingredientType = "CARNES-HUEVOS-LEGUMBRES" | "VERDURAS-HORTALIZAS" | "LACTEOS" | "CEREALES" | "FRUTAS";

export interface IngredientInterface {
    name: string;
    location: string;
    ingredientGroup: ingredientType;
    nutrients: { carbohydrates: number, proteins: number, lipids: number };
    pricePerKg: number;
}

const IngredientSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
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
  
  const Ingredient = mongoose.model<IngredientInterface>("Ingredient", IngredientSchema);
  export default Ingredient;