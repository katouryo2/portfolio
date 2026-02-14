import { useState, useCallback } from 'react';

export interface NutritionGoals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

const STORAGE_KEY = 'calorie-tracker-goals';

const DEFAULT_GOALS: NutritionGoals = {
  calories: 2000,
  protein: 60,
  fat: 55,
  carbs: 300,
};

function loadGoals(): NutritionGoals {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_GOALS, ...JSON.parse(raw) } : DEFAULT_GOALS;
  } catch {
    return DEFAULT_GOALS;
  }
}

export function useGoals() {
  const [goals, setGoals] = useState<NutritionGoals>(loadGoals);

  const updateGoals = useCallback((newGoals: NutritionGoals) => {
    setGoals(newGoals);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newGoals));
  }, []);

  return { goals, updateGoals };
}
