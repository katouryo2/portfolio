import { renderHook, act } from '@testing-library/react';
import { useGoals } from '../useGoals';

const mockSetGoals = vi.fn();
const mockSubscribeGoals = vi.fn(() => vi.fn());

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({ user: null, isGuest: true })),
}));

vi.mock('../../lib/firestoreService', () => ({
  subscribeGoals: (...args: unknown[]) => mockSubscribeGoals(...args),
  setGoals: (...args: unknown[]) => mockSetGoals(...args),
}));

import { useAuth } from '../../contexts/AuthContext';

const mockUseAuth = vi.mocked(useAuth);

describe('useGoals', () => {
  it('ゲストモードで DEFAULT_GOALS を返す', () => {
    const { result } = renderHook(() => useGoals());

    expect(result.current.goals).toEqual({
      calories: 2000,
      protein: 60,
      fat: 55,
      carbs: 300,
    });
  });

  it('ゲストモードで localStorage に保存された値を読み込む', () => {
    const saved = { calories: 1800, protein: 80, fat: 50, carbs: 250 };
    localStorage.setItem('calorie-tracker-goals', JSON.stringify(saved));

    const { result } = renderHook(() => useGoals());

    expect(result.current.goals).toEqual(saved);
  });

  it('ゲストモードで updateGoals が localStorage に保存する', () => {
    const { result } = renderHook(() => useGoals());
    const newGoals = { calories: 1500, protein: 70, fat: 40, carbs: 200 };

    act(() => {
      result.current.updateGoals(newGoals);
    });

    expect(result.current.goals).toEqual(newGoals);
    expect(JSON.parse(localStorage.getItem('calorie-tracker-goals')!)).toEqual(newGoals);
  });

  it('認証ユーザーで subscribeGoals が呼ばれる', () => {
    mockUseAuth.mockReturnValue({
      user: { uid: 'user-1' } as never,
      isGuest: false,
      loading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
    });

    renderHook(() => useGoals());

    expect(mockSubscribeGoals).toHaveBeenCalledWith('user-1', expect.any(Function), {
      calories: 2000,
      protein: 60,
      fat: 55,
      carbs: 300,
    });
  });

  it('認証ユーザーで updateGoals が Firestore に保存する', () => {
    mockUseAuth.mockReturnValue({
      user: { uid: 'user-1' } as never,
      isGuest: false,
      loading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
    });

    const { result } = renderHook(() => useGoals());
    const newGoals = { calories: 1500, protein: 70, fat: 40, carbs: 200 };

    act(() => {
      result.current.updateGoals(newGoals);
    });

    expect(mockSetGoals).toHaveBeenCalledWith('user-1', newGoals);
  });
});
