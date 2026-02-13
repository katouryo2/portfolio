import { FoodItem, CalorieNinjasFood } from '../types';
import { translateQuery, containsJapanese } from './foodDictionary';

const API_URL = '/api/nutrition';

export async function searchFood(query: string): Promise<FoodItem[]> {
  const apiKey = import.meta.env.VITE_CALORIENINJAS_API_KEY;

  if (!apiKey) {
    throw new Error('API キーが未設定です。.env に VITE_CALORIENINJAS_API_KEY を設定してください');
  }

  const originalQuery = query.trim();
  let apiQuery = originalQuery;

  if (containsJapanese(originalQuery)) {
    const { translated, success } = translateQuery(originalQuery);
    if (!success) {
      throw new Error('この食品名は辞書に登録されていません。英語で入力するか、別の日本語名をお試しください');
    }
    apiQuery = translated;
  }

  const res = await fetch(`${API_URL}?query=${encodeURIComponent(apiQuery)}`, {
    headers: {
      'X-Api-Key': apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`API エラー: ${res.status}`);
  }

  const data = await res.json();
  return (data.items as CalorieNinjasFood[]).map(food =>
    toFoodItem(food, originalQuery, containsJapanese(originalQuery))
  );
}

function toFoodItem(food: CalorieNinjasFood, originalQuery: string, wasJapanese: boolean): FoodItem {
  // 日本語入力の場合、元の入力を表示名に使う（単品の場合）
  const displayName = wasJapanese
    ? `${originalQuery} (${food.name})`
    : food.name;

  return {
    id: crypto.randomUUID(),
    name: displayName,
    calories: Math.round(food.calories),
    protein: Math.round(food.protein_g * 10) / 10,
    fat: Math.round(food.fat_total_g * 10) / 10,
    carbs: Math.round(food.carbohydrates_total_g * 10) / 10,
    servingSize: food.serving_size_g,
  };
}
