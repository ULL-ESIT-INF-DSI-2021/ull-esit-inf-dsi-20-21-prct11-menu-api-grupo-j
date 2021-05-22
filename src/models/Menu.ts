import * as mongoose from "mongoose";

import { ingredientType } from './Ingredient'
import { CourseInterface } from './Course'

export interface MenuInterface {
  name: string;
  menuPrice: number;
  courses: CourseInterface[];
  menuComposition: { carbohydrates: number, proteins: number, lipids: number };
  ingredientTypes: ingredientType[];
}

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  menuPrice: {
    type: Number,
    required: true
  },
  menuComposition: {
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
  courses: {
    type: [String],
    required: true,
  },
  ingredientTypes: {
    type: [String],
    enum: ["CARNES-HUEVOS-LEGUMBRES", "VERDURAS-HORTALIZAS", "LACTEOS", "CEREALES", "FRUTAS"],
    required: true,
  }
});

const Menu = mongoose.model<MenuInterface>("Menu", MenuSchema);
export default Menu;