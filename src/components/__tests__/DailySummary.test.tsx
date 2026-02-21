import { render, screen, fireEvent } from '@testing-library/react';
import { DailySummary } from '../DailySummary';

import type { NutritionGoals } from '../../types';

const defaultGoals: NutritionGoals = { calories: 2000, protein: 60, fat: 55, carbs: 300 };
const defaultTotals = { calories: 800, protein: 30, fat: 20, carbs: 100 };

describe('DailySummary', () => {
  it('カロリーの合計と残りを表示する', () => {
    render(<DailySummary totals={defaultTotals} goals={defaultGoals} onUpdateGoals={vi.fn()} />);

    expect(screen.getByText('800')).toBeInTheDocument();
    expect(screen.getByText('あと 1200 kcal')).toBeInTheDocument();
  });

  it('目標超過時にオーバー表示する', () => {
    const over = { calories: 2500, protein: 70, fat: 60, carbs: 350 };
    render(<DailySummary totals={over} goals={defaultGoals} onUpdateGoals={vi.fn()} />);

    expect(screen.getByText('500 kcal オーバー')).toBeInTheDocument();
  });

  it('目標設定ボタンでモーダルが開く', () => {
    render(<DailySummary totals={defaultTotals} goals={defaultGoals} onUpdateGoals={vi.fn()} />);

    fireEvent.click(screen.getByText(/目標設定/));

    expect(screen.getByText('1日の目標を設定')).toBeInTheDocument();
  });

  it('保存ボタンで onUpdateGoals が呼ばれモーダルが閉じる', () => {
    const onUpdateGoals = vi.fn();
    render(
      <DailySummary totals={defaultTotals} goals={defaultGoals} onUpdateGoals={onUpdateGoals} />,
    );

    fireEvent.click(screen.getByText(/目標設定/));

    const caloriesInput = screen.getByLabelText('カロリー');
    fireEvent.change(caloriesInput, { target: { value: '1800' } });

    fireEvent.click(screen.getByText('保存'));

    expect(onUpdateGoals).toHaveBeenCalledWith(expect.objectContaining({ calories: 1800 }));
    expect(screen.queryByText('1日の目標を設定')).not.toBeInTheDocument();
  });

  it('キャンセルでモーダルが閉じる', () => {
    render(<DailySummary totals={defaultTotals} goals={defaultGoals} onUpdateGoals={vi.fn()} />);

    fireEvent.click(screen.getByText(/目標設定/));
    fireEvent.click(screen.getByText('キャンセル'));

    expect(screen.queryByText('1日の目標を設定')).not.toBeInTheDocument();
  });
});
