import { render, screen, fireEvent } from '@testing-library/react';
import { Favorites } from '../Favorites';

import type { FavoriteFoodData, FoodItem } from '../../types';

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

const mockToFoodItem = (fav: FavoriteFoodData): FoodItem => ({
  ...fav,
  id: 'test-id',
});

describe('Favorites', () => {
  it('お気に入りが空なら何も表示しない', () => {
    const { container } = render(
      <Favorites
        favorites={[]}
        onAdd={vi.fn()}
        onRemoveFavorite={vi.fn()}
        toFoodItem={mockToFoodItem}
      />,
    );

    expect(container.innerHTML).toBe('');
  });

  it('お気に入りの件数を表示する', () => {
    render(
      <Favorites
        favorites={[apple, banana]}
        onAdd={vi.fn()}
        onRemoveFavorite={vi.fn()}
        toFoodItem={mockToFoodItem}
      />,
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('トグルボタンでパネルが開き食品が表示される', () => {
    render(
      <Favorites
        favorites={[apple]}
        onAdd={vi.fn()}
        onRemoveFavorite={vi.fn()}
        toFoodItem={mockToFoodItem}
      />,
    );

    fireEvent.click(screen.getByText('お気に入り'));

    expect(screen.getByText('りんご')).toBeInTheDocument();
    expect(screen.getByText('95 kcal / 180g')).toBeInTheDocument();
  });

  it('食品クリックで onAdd が呼ばれる', () => {
    const onAdd = vi.fn();
    render(
      <Favorites
        favorites={[apple]}
        onAdd={onAdd}
        onRemoveFavorite={vi.fn()}
        toFoodItem={mockToFoodItem}
      />,
    );

    fireEvent.click(screen.getByText('お気に入り'));
    fireEvent.click(screen.getByText('りんご'));

    expect(onAdd).toHaveBeenCalledWith('breakfast', expect.objectContaining({ name: 'りんご' }));
  });

  it('削除ボタンで onRemoveFavorite が呼ばれる', () => {
    const onRemoveFavorite = vi.fn();
    render(
      <Favorites
        favorites={[apple]}
        onAdd={vi.fn()}
        onRemoveFavorite={onRemoveFavorite}
        toFoodItem={mockToFoodItem}
      />,
    );

    fireEvent.click(screen.getByText('お気に入り'));
    fireEvent.click(screen.getByRole('button', { name: '削除' }));

    expect(onRemoveFavorite).toHaveBeenCalledWith('りんご');
  });
});
