import { useState, useCallback, useEffect } from 'react';
import type { NutritionGoals } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { subscribeGoals, setGoals as setFirestoreGoals } from '../lib/firestoreService';

const STORAGE_KEY = 'calorie-tracker-goals';

const DEFAULT_GOALS: NutritionGoals = {
  calories: 2000,
  protein: 60,
  fat: 55,
  carbs: 300,
};

function loadGoalsLocal(): NutritionGoals {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_GOALS, ...JSON.parse(raw) } : DEFAULT_GOALS;
  } catch (e) {
    console.warn('Failed to parse goals from localStorage', e);
    return DEFAULT_GOALS;
  }
}

export function useGoals() {
  const { user, isGuest } = useAuth();
  const [goals, setGoals] = useState<NutritionGoals>(isGuest ? loadGoalsLocal : () => DEFAULT_GOALS);

  useEffect(() => {
    if (isGuest || !user) return;
    const unsubscribe = subscribeGoals(user.uid, (firestoreGoals) => {
      setGoals(firestoreGoals);
    }, DEFAULT_GOALS);
    return unsubscribe;
  }, [isGuest, user]);

  const updateGoals = useCallback((newGoals: NutritionGoals) => {
    setGoals(newGoals);

    if (isGuest) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newGoals));
    } else if (user) {
      setFirestoreGoals(user.uid, newGoals);
    }
  }, [isGuest, user]);

  return { goals, updateGoals };
}
