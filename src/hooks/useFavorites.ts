import { useState, useCallback, useEffect } from 'react';
import { FavoriteFoodData, FoodItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { subscribeFavorites, setFavorites as setFirestoreFavorites } from '../lib/firestoreService';

const STORAGE_KEY = 'calorie-tracker-favorites';

function loadFavoritesLocal(): FavoriteFoodData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavoritesLocal(favs: FavoriteFoodData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

function toFavData(food: FoodItem): FavoriteFoodData {
  return {
    name: food.name,
    calories: food.calories,
    protein: food.protein,
    fat: food.fat,
    carbs: food.carbs,
    servingSize: food.servingSize,
  };
}

export function useFavorites() {
  const { user, isGuest } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteFoodData[]>(isGuest ? loadFavoritesLocal : () => []);

  useEffect(() => {
    if (isGuest || !user) {
      setFavorites(loadFavoritesLocal());
      return;
    }
    const unsubscribe = subscribeFavorites(user.uid, (firestoreFavs) => {
      setFavorites(firestoreFavs);
    });
    return unsubscribe;
  }, [isGuest, user]);

  const addFavorite = useCallback((food: FoodItem) => {
    setFavorites(prev => {
      if (prev.some(f => f.name === food.name)) return prev;
      const next = [...prev, toFavData(food)];

      if (isGuest) {
        saveFavoritesLocal(next);
      } else if (user) {
        setFirestoreFavorites(user.uid, next);
      }

      return next;
    });
  }, [isGuest, user]);

  const removeFavorite = useCallback((name: string) => {
    setFavorites(prev => {
      const next = prev.filter(f => f.name !== name);

      if (isGuest) {
        saveFavoritesLocal(next);
      } else if (user) {
        setFirestoreFavorites(user.uid, next);
      }

      return next;
    });
  }, [isGuest, user]);

  const isFavorite = useCallback((name: string) => {
    return favorites.some(f => f.name === name);
  }, [favorites]);

  const toFoodItem = useCallback((fav: FavoriteFoodData): FoodItem => {
    return { ...fav, id: crypto.randomUUID() };
  }, []);

  return { favorites, addFavorite, removeFavorite, isFavorite, toFoodItem };
}
