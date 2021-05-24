export type ingredientType = "CARNES-HUEVOS-LEGUMBRES" | "VERDURAS-HORTALIZAS" | "LACTEOS" | "CEREALES" | "FRUTAS";

export interface IngredientInterface {
  name: string;
  location: string;
  ingredientGroup: ingredientType;
  nutrients: { carbohydrates: number, proteins: number, lipids: number };
  pricePerKg: number;
}

export type CourseType = "STARTER" | "FIRSTCOURSE" | "SECONDCOURSE" | "DESSERT";

export interface CourseInterface {
  name: string;
  courseType: CourseType;
  ingredients: { ingredient: IngredientInterface, amountInGrams: number }[];
  coursePrice: number;
  courseComposition: { carbohydrates: number, proteins: number, lipids: number };
  mainNutrient: string;
}

export interface MenuInterface {
    name: string;
    menuPrice: number;
    courses: CourseInterface[];
    menuComposition: { carbohydrates: number, proteins: number, lipids: number };
    ingredientTypes: ingredientType[];
  }