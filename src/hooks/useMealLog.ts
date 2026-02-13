import { useState, useCallback, useMemo } from 'react';
import { DailyLog, FoodItem, MealType } from '../types';

const STORAGE_KEY = 'calorie-tracker-logs';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function loadLogs(): Record<string, DailyLog> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLogs(logs: Record<string, DailyLog>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

function emptyDailyLog(date: string): DailyLog {
  return { date, meals: { breakfast: [], lunch: [], dinner: [], snack: [] } };
}

export function useMealLog() {
  const [logs, setLogs] = useState<Record<string, DailyLog>>(loadLogs);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const dateStr = formatDate(selectedDate);
  const dailyLog = logs[dateStr] || emptyDailyLog(dateStr);

  const updateLogs = useCallback((updater: (prev: Record<string, DailyLog>) => Record<string, DailyLog>) => {
    setLogs(prev => {
      const next = updater(prev);
      saveLogs(next);
      return next;
    });
  }, []);

  const addFood = useCallback((mealType: MealType, food: FoodItem) => {
    updateLogs(prev => {
      const log = prev[dateStr] || emptyDailyLog(dateStr);
      return {
        ...prev,
        [dateStr]: {
          ...log,
          meals: {
            ...log.meals,
            [mealType]: [...log.meals[mealType], food],
          },
        },
      };
    });
  }, [dateStr, updateLogs]);

  const removeFood = useCallback((mealType: MealType, foodId: string) => {
    updateLogs(prev => {
      const log = prev[dateStr];
      if (!log) return prev;
      return {
        ...prev,
        [dateStr]: {
          ...log,
          meals: {
            ...log.meals,
            [mealType]: log.meals[mealType].filter(f => f.id !== foodId),
          },
        },
      };
    });
  }, [dateStr, updateLogs]);

  const totals = useMemo(() => {
    const allFoods = Object.values(dailyLog.meals).flat();
    return {
      calories: allFoods.reduce((sum, f) => sum + f.calories, 0),
      protein: Math.round(allFoods.reduce((sum, f) => sum + f.protein, 0) * 10) / 10,
      fat: Math.round(allFoods.reduce((sum, f) => sum + f.fat, 0) * 10) / 10,
      carbs: Math.round(allFoods.reduce((sum, f) => sum + f.carbs, 0) * 10) / 10,
    };
  }, [dailyLog]);

  const goToPrevDay = useCallback(() => {
    setSelectedDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });
  }, []);

  const goToNextDay = useCallback(() => {
    setSelectedDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d;
    });
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    dateStr,
    dailyLog,
    addFood,
    removeFood,
    totals,
    goToPrevDay,
    goToNextDay,
  };
}
