import { DailyLog, MEAL_LABELS, MealType } from '../types';
import { NutritionGoals } from '../hooks/useGoals';

const API_URL = '/api/gemini';

function buildPrompt(dailyLog: DailyLog, totals: { calories: number; protein: number; fat: number; carbs: number }, goals: NutritionGoals): string {
  const mealSummary = (Object.keys(MEAL_LABELS) as MealType[])
    .map(type => {
      const foods = dailyLog.meals[type];
      if (foods.length === 0) return `${MEAL_LABELS[type]}: なし`;
      const items = foods.map(f => `${f.name}(${f.calories}kcal)`).join('、');
      return `${MEAL_LABELS[type]}: ${items}`;
    })
    .join('\n');

  return `あなたは管理栄養士です。以下の1日の食事記録を分析して、日本語で回答してください。

## 今日の食事記録
${mealSummary}

## 合計栄養素
- カロリー: ${totals.calories} kcal（目標: ${goals.calories} kcal）
- タンパク質: ${totals.protein}g（目標: ${goals.protein}g）
- 脂質: ${totals.fat}g（目標: ${goals.fat}g）
- 炭水化物: ${totals.carbs}g（目標: ${goals.carbs}g）

## 回答フォーマット（必ずこの形式で）

### 📊 今日の評価
今日の食事バランスを100点満点で採点し、良かった点と改善点を簡潔に述べてください（3〜4文程度）。

### 🍽️ 明日のおすすめ
今日の栄養バランスを補うために、明日の朝食・昼食・夕食でそれぞれ具体的なメニューを1つずつ提案してください。`;
}

export async function getAiAdvice(
  dailyLog: DailyLog,
  totals: { calories: number; protein: number; fat: number; carbs: number },
  goals: NutritionGoals
): Promise<string> {
  const prompt = buildPrompt(dailyLog, totals, goals);

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini API エラー: ${res.status}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('AIからの応答を取得できませんでした');
  }

  return text;
}
