export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export const MEAL_LABELS: Record<MealType, string> = {
  breakfast: '朝食',
  lunch: '昼食',
  dinner: '夕食',
  snack: '間食',
};

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  servingSize: number;
}

export interface MealEntry {
  mealType: MealType;
  foods: FoodItem[];
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  meals: Record<MealType, FoodItem[]>;
}

export interface CalorieNinjasFood {
  name: string;
  calories: number;
  protein_g: number;
  fat_total_g: number;
  carbohydrates_total_g: number;
  serving_size_g: number;
}
