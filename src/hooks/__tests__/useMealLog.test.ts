import { renderHook, act } from '@testing-library/react';
import { useMealLog } from '../useMealLog';

import type { FoodItem } from '../../types';

const mockSetDailyLog = vi.fn();
const mockSubscribeLogs = vi.fn(() => vi.fn());

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({ user: null, isGuest: true })),
}));

vi.mock('../../lib/firestoreService', () => ({
  subscribeLogs: (...args: unknown[]) => mockSubscribeLogs(...args),
  setDailyLog: (...args: unknown[]) => mockSetDailyLog(...args),
}));

import { useAuth } from '../../contexts/AuthContext';

const mockUseAuth = vi.mocked(useAuth);

const rice: FoodItem = {
  id: 'food-1',
  name: 'ごはん',
  calories: 252,
  protein: 3.8,
  fat: 0.5,
  carbs: 55.7,
  servingSize: 150,
};

const miso: FoodItem = {
  id: 'food-2',
  name: '味噌汁',
  calories: 40,
  protein: 3.3,
  fat: 1.2,
  carbs: 3.5,
  servingSize: 200,
};

describe('useMealLog', () => {
  describe('ゲストモード', () => {
    it('初期状態で空の dailyLog を返す', () => {
      const { result } = renderHook(() => useMealLog());

      expect(result.current.dailyLog.meals).toEqual({
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      });
    });

    it('addFood で食品を追加し localStorage に保存する', () => {
      const { result } = renderHook(() => useMealLog());
      const targetDate = result.current.dateStr;

      act(() => {
        result.current.addFood('breakfast', rice, targetDate);
      });

      expect(result.current.dailyLog.meals.breakfast).toEqual([rice]);
      expect(localStorage.getItem('calorie-tracker-logs')).toBeTruthy();
    });

    it('removeFood で食品を ID 指定で削除する', () => {
      const { result } = renderHook(() => useMealLog());
      const targetDate = result.current.dateStr;

      act(() => {
        result.current.addFood('breakfast', rice, targetDate);
        result.current.addFood('breakfast', miso, targetDate);
      });

      act(() => {
        result.current.removeFood('breakfast', 'food-1', targetDate);
      });

      expect(result.current.dailyLog.meals.breakfast).toEqual([miso]);
    });

    it('totals がカロリーとマクロの合計を正しく計算する', () => {
      const { result } = renderHook(() => useMealLog());
      const targetDate = result.current.dateStr;

      act(() => {
        result.current.addFood('breakfast', rice, targetDate);
        result.current.addFood('lunch', miso, targetDate);
      });

      expect(result.current.totals).toEqual({
        calories: 292,
        protein: 7.1,
        fat: 1.7,
        carbs: 59.2,
      });
    });

    it('食品がない場合 totals はすべて 0', () => {
      const { result } = renderHook(() => useMealLog());

      expect(result.current.totals).toEqual({
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      });
    });

    it('goToPrevDay で前日に移動する', () => {
      const { result } = renderHook(() => useMealLog());
      const initialDate = result.current.selectedDate;

      act(() => {
        result.current.goToPrevDay();
      });

      const expected = new Date(initialDate);
      expected.setDate(expected.getDate() - 1);
      expect(result.current.selectedDate.toDateString()).toBe(expected.toDateString());
    });

    it('goToNextDay で翌日に移動する', () => {
      const { result } = renderHook(() => useMealLog());
      const initialDate = result.current.selectedDate;

      act(() => {
        result.current.goToNextDay();
      });

      const expected = new Date(initialDate);
      expected.setDate(expected.getDate() + 1);
      expect(result.current.selectedDate.toDateString()).toBe(expected.toDateString());
    });
  });

  describe('認証ユーザー', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: { uid: 'user-1' } as never,
        isGuest: false,
        loading: false,
        login: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
      });
    });

    it('subscribeLogs が呼ばれる', () => {
      renderHook(() => useMealLog());

      expect(mockSubscribeLogs).toHaveBeenCalledWith('user-1', expect.any(Function));
    });

    it('addFood が Firestore に保存する', () => {
      const { result } = renderHook(() => useMealLog());
      const targetDate = result.current.dateStr;

      act(() => {
        result.current.addFood('breakfast', rice, targetDate);
      });

      expect(mockSetDailyLog).toHaveBeenCalledWith(
        'user-1',
        targetDate,
        expect.objectContaining({
          meals: expect.objectContaining({
            breakfast: [rice],
          }),
        }),
      );
    });
  });
});
