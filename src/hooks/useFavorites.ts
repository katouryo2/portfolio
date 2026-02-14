import { useState, useCallback } from 'react';
import { FavoriteFoodData, FoodItem } from '../types';

const STORAGE_KEY = 'calorie-tracker-favorites';

function loadFavorites(): FavoriteFoodData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favs: FavoriteFoodData[]) {
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
  const [favorites, setFavorites] = useState<FavoriteFoodData[]>(loadFavorites);

  const addFavorite = useCallback((food: FoodItem) => {
    setFavorites(prev => {
      if (prev.some(f => f.name === food.name)) return prev;
      const next = [...prev, toFavData(food)];
      saveFavorites(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((name: string) => {
    setFavorites(prev => {
      const next = prev.filter(f => f.name !== name);
      saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((name: string) => {
    return favorites.some(f => f.name === name);
  }, [favorites]);

  const toFoodItem = useCallback((fav: FavoriteFoodData): FoodItem => {
    return { ...fav, id: crypto.randomUUID() };
  }, []);

  return { favorites, addFavorite, removeFavorite, isFavorite, toFoodItem };
}
