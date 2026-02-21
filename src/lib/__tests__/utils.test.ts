import { formatDate, getDayCalories, calculateTotals } from '../utils';

import type { DailyLog, FoodItem } from '../../types';

function makeFoodItem(overrides: Partial<FoodItem> = {}): FoodItem {
  return {
    id: '1',
    name: 'test',
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    servingSize: 100,
    ...overrides,
  };
}

describe('formatDate', () => {
  it('月と日をゼロパディングする', () => {
    expect(formatDate(new Date(2025, 0, 5))).toBe('2025-01-05');
  });

  it('2桁の月と日はそのまま', () => {
    expect(formatDate(new Date(2025, 11, 25))).toBe('2025-12-25');
  });

  it('年境界を正しく処理する', () => {
    expect(formatDate(new Date(2024, 11, 31))).toBe('2024-12-31');
    expect(formatDate(new Date(2025, 0, 1))).toBe('2025-01-01');
  });
});

describe('getDayCalories', () => {
  it('undefined なら 0 を返す', () => {
    expect(getDayCalories(undefined)).toBe(0);
  });

  it('食事が空なら 0 を返す', () => {
    const log: DailyLog = {
      date: '2025-01-01',
      meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
    };
    expect(getDayCalories(log)).toBe(0);
  });

  it('全食事のカロリーを合計する', () => {
    const log: DailyLog = {
      date: '2025-01-01',
      meals: {
        breakfast: [makeFoodItem({ calories: 200 })],
        lunch: [makeFoodItem({ calories: 500 }), makeFoodItem({ calories: 100 })],
        dinner: [makeFoodItem({ calories: 600 })],
        snack: [],
      },
    };
    expect(getDayCalories(log)).toBe(1400);
  });
});

describe('calculateTotals', () => {
  it('undefined なら全て 0 を返す', () => {
    expect(calculateTotals(undefined)).toEqual({ calories: 0, protein: 0, fat: 0, carbs: 0 });
  });

  it('カロリーとマクロの合計を計算する', () => {
    const log: DailyLog = {
      date: '2025-01-01',
      meals: {
        breakfast: [makeFoodItem({ calories: 252, protein: 3.8, fat: 0.5, carbs: 55.7 })],
        lunch: [makeFoodItem({ calories: 40, protein: 3.3, fat: 1.2, carbs: 3.5 })],
        dinner: [],
        snack: [],
      },
    };
    expect(calculateTotals(log)).toEqual({
      calories: 292,
      protein: 7.1,
      fat: 1.7,
      carbs: 59.2,
    });
  });
});
