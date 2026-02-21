import { DailyLog, FoodItem } from '../types';

/** Date を "YYYY-MM-DD" 形式の文字列に変換する */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** DailyLog から合計カロリーを計算する */
export function getDayCalories(log: DailyLog | undefined): number {
  if (!log) return 0;
  return Object.values(log.meals)
    .flat()
    .reduce((sum: number, f: FoodItem) => sum + f.calories, 0);
}

/** DailyLog からカロリー・マクロの合計を計算する */
export function calculateTotals(log: DailyLog | undefined) {
  if (!log) return { calories: 0, protein: 0, fat: 0, carbs: 0 };
  const allFoods = Object.values(log.meals).flat();
  return {
    calories: allFoods.reduce((sum, f) => sum + f.calories, 0),
    protein: Math.round(allFoods.reduce((sum, f) => sum + f.protein, 0) * 10) / 10,
    fat: Math.round(allFoods.reduce((sum, f) => sum + f.fat, 0) * 10) / 10,
    carbs: Math.round(allFoods.reduce((sum, f) => sum + f.carbs, 0) * 10) / 10,
  };
}
