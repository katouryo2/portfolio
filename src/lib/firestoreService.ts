import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebase';
import { DailyLog, FavoriteFoodData } from '../types';

// --- Meal Logs ---

export function subscribeLogs(
  uid: string,
  callback: (logs: Record<string, DailyLog>) => void,
): Unsubscribe {
  const col = collection(db, 'users', uid, 'logs');
  return onSnapshot(col, (snapshot) => {
    const logs: Record<string, DailyLog> = {};
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as DailyLog;
      logs[docSnap.id] = data;
    });
    callback(logs);
  });
}

export async function setDailyLog(uid: string, dateStr: string, log: DailyLog): Promise<void> {
  const ref = doc(db, 'users', uid, 'logs', dateStr);
  await setDoc(ref, log);
}

// --- Favorites ---

export function subscribeFavorites(
  uid: string,
  callback: (favorites: FavoriteFoodData[]) => void,
): Unsubscribe {
  const ref = doc(db, 'users', uid, 'favorites', 'all');
  return onSnapshot(ref, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data() as { items: FavoriteFoodData[] };
      callback(data.items ?? []);
    } else {
      callback([]);
    }
  });
}

export async function setFavorites(uid: string, favorites: FavoriteFoodData[]): Promise<void> {
  const ref = doc(db, 'users', uid, 'favorites', 'all');
  await setDoc(ref, { items: favorites });
}

// --- Goals ---

export interface NutritionGoals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export function subscribeGoals(
  uid: string,
  callback: (goals: NutritionGoals) => void,
  defaults: NutritionGoals,
): Unsubscribe {
  const ref = doc(db, 'users', uid, 'goals', 'current');
  return onSnapshot(ref, (docSnap) => {
    if (docSnap.exists()) {
      callback({ ...defaults, ...docSnap.data() } as NutritionGoals);
    } else {
      callback(defaults);
    }
  });
}

export async function setGoals(uid: string, goals: NutritionGoals): Promise<void> {
  const ref = doc(db, 'users', uid, 'goals', 'current');
  await setDoc(ref, goals);
}
