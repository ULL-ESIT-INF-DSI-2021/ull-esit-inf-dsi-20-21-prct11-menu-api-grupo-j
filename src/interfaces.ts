export type ingredientType = "CARNES-HUEVOS-LEGUMBRES" | "VERDURAS-HORTALIZAS" | "LACTEOS" | "CEREALES" | "FRUTAS";

export interface IngredientInterface {
  name: string;
  location: string;
  ingredientGroup: ingredientType;
  nutrients: { carbohydrates: number, proteins: number, lipids: number };
  pricePerKg: number;
}