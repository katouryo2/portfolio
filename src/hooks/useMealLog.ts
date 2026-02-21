import { useState, useCallback, useMemo, useEffect } from 'react';
import type { DailyLog, FoodItem, MealType } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { subscribeLogs, setDailyLog } from '../lib/firestoreService';
import { formatDate } from '../lib/utils';

const STORAGE_KEY = 'calorie-tracker-logs';

function loadLogsLocal(): Record<string, DailyLog> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('Failed to parse meal logs from localStorage', e);
    return {};
  }
}

function saveLogsLocal(logs: Record<string, DailyLog>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

function emptyDailyLog(date: string): DailyLog {
  return { date, meals: { breakfast: [], lunch: [], dinner: [], snack: [] } };
}

export function useMealLog() {
  const { user, isGuest } = useAuth();
  const [logs, setLogs] = useState<Record<string, DailyLog>>(isGuest ? loadLogsLocal : () => ({}));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    if (isGuest || !user) return;
    const unsubscribe = subscribeLogs(user.uid, (firestoreLogs) => {
      setLogs(firestoreLogs);
    });
    return unsubscribe;
  }, [isGuest, user]);

  const dateStr = formatDate(selectedDate);
  const dailyLog = logs[dateStr] || emptyDailyLog(dateStr);

  const addFood = useCallback((mealType: MealType, food: FoodItem, targetDate: string) => {
    setLogs(prev => {
      const log = prev[targetDate] || emptyDailyLog(targetDate);
      const updated: DailyLog = {
        ...log,
        meals: {
          ...log.meals,
          [mealType]: [...log.meals[mealType], food],
        },
      };
      const next = { ...prev, [targetDate]: updated };

      if (isGuest) {
        saveLogsLocal(next);
      } else if (user) {
        setDailyLog(user.uid, targetDate, updated);
      }

      return next;
    });
  }, [isGuest, user]);

  const removeFood = useCallback((mealType: MealType, foodId: string, targetDate: string) => {
    setLogs(prev => {
      const log = prev[targetDate];
      if (!log) return prev;
      const updated: DailyLog = {
        ...log,
        meals: {
          ...log.meals,
          [mealType]: log.meals[mealType].filter(f => f.id !== foodId),
        },
      };
      const next = { ...prev, [targetDate]: updated };

      if (isGuest) {
        saveLogsLocal(next);
      } else if (user) {
        setDailyLog(user.uid, targetDate, updated);
      }

      return next;
    });
  }, [isGuest, user]);

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
    logs,
    addFood,
    removeFood,
    totals,
    goToPrevDay,
    goToNextDay,
  };
}
