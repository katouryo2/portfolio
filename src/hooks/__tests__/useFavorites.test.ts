import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '../useFavorites';

import type { FavoriteFoodData } from '../../types';

const mockSetFavorites = vi.fn();
const mockSubscribeFavorites = vi.fn(() => vi.fn());

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({ user: null, isGuest: true })),
}));

vi.mock('../../lib/firestoreService', () => ({
  subscribeFavorites: (...args: unknown[]) => mockSubscribeFavorites(...args),
  setFavorites: (...args: unknown[]) => mockSetFavorites(...args),
}));

import { useAuth } from '../../contexts/AuthContext';

const mockUseAuth = vi.mocked(useAuth);

const apple: FavoriteFoodData = {
  name: 'りんご',
  calories: 95,
  protein: 0.5,
  fat: 0.3,
  carbs: 25,
  servingSize: 180,
};

const banana: FavoriteFoodData = {
  name: 'バナナ',
  calories: 86,
  protein: 1.1,
  fat: 0.2,
  carbs: 22.5,
  servingSize: 100,
};

describe('useFavorites', () => {
  describe('ゲストモード', () => {
    it('初期状態は空配列', () => {
      const { result } = renderHook(() => useFavorites());
      expect(result.current.favorites).toEqual([]);
    });

    it('localStorage から初期値を読み込む', () => {
      localStorage.setItem('calorie-tracker-favorites', JSON.stringify([apple]));

      const { result } = renderHook(() => useFavorites());
      expect(result.current.favorites).toEqual([apple]);
    });

    it('addFavorite でお気に入りを追加し localStorage に保存する', () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.addFavorite(apple);
      });

      expect(result.current.favorites).toEqual([apple]);
      expect(JSON.parse(localStorage.getItem('calorie-tracker-favorites')!)).toEqual([apple]);
    });

    it('同じ名前のお気に入りは重複追加されない', () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.addFavorite(apple);
        result.current.addFavorite(apple);
      });

      expect(result.current.favorites).toHaveLength(1);
    });

    it('removeFavorite で名前指定で削除する', () => {
      localStorage.setItem('calorie-tracker-favorites', JSON.stringify([apple, banana]));

      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.removeFavorite('りんご');
      });

      expect(result.current.favorites).toEqual([banana]);
    });

    it('isFavorite が存在チェックを返す', () => {
      localStorage.setItem('calorie-tracker-favorites', JSON.stringify([apple]));

      const { result } = renderHook(() => useFavorites());

      expect(result.current.isFavorite('りんご')).toBe(true);
      expect(result.current.isFavorite('バナナ')).toBe(false);
    });

    it('toFoodItem が FavoriteFoodData を FoodItem に変換する', () => {
      const { result } = renderHook(() => useFavorites());

      const foodItem = result.current.toFoodItem(apple);

      expect(foodItem).toMatchObject({
        name: 'りんご',
        calories: 95,
        protein: 0.5,
        fat: 0.3,
        carbs: 25,
        servingSize: 180,
      });
      expect(foodItem.id).toBeDefined();
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

    it('subscribeFavorites が呼ばれる', () => {
      renderHook(() => useFavorites());

      expect(mockSubscribeFavorites).toHaveBeenCalledWith('user-1', expect.any(Function));
    });

    it('addFavorite が Firestore に保存する', () => {
      const { result } = renderHook(() => useFavorites());

      act(() => {
        result.current.addFavorite(apple);
      });

      expect(mockSetFavorites).toHaveBeenCalledWith('user-1', [apple]);
    });
  });
});
