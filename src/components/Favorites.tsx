import { useState } from 'react';
import { FavoriteFoodData, FoodItem, MealType, MEAL_LABELS } from '../types';
import './Favorites.css';

interface Props {
  favorites: FavoriteFoodData[];
  onAdd: (mealType: MealType, food: FoodItem) => void;
  onRemoveFavorite: (name: string) => void;
  toFoodItem: (fav: FavoriteFoodData) => FoodItem;
}

export function Favorites({ favorites, onAdd, onRemoveFavorite, toFoodItem }: Props) {
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [open, setOpen] = useState(false);

  if (favorites.length === 0) return null;

  return (
    <div className="favorites">
      <button className="favorites__toggle" onClick={() => setOpen(v => !v)}>
        <div className="favorites__header">
          <span className="favorites__icon">&#9733;</span>
          <h3 className="favorites__title">お気に入り</h3>
          <span className="favorites__count">{favorites.length}</span>
        </div>
        <span className={`favorites__chevron${open ? ' favorites__chevron--open' : ''}`}>
          &#8250;
        </span>
      </button>

      {open && (
        <div className="favorites__body">
          <div className="favorites__meal-select">
            {(Object.keys(MEAL_LABELS) as MealType[]).map(type => (
              <button
                key={type}
                className={`favorites__meal-btn ${selectedMeal === type ? 'active' : ''}`}
                onClick={() => setSelectedMeal(type)}
              >
                {MEAL_LABELS[type]}
              </button>
            ))}
          </div>

          <div className="favorites__grid">
            {favorites.map(fav => (
              <div key={fav.name} className="favorites__chip">
                <button
                  className="favorites__chip-remove"
                  onClick={() => onRemoveFavorite(fav.name)}
                  aria-label="削除"
                >
                  &#10005;
                </button>
                <button
                  className="favorites__chip-main"
                  onClick={() => onAdd(selectedMeal, toFoodItem(fav))}
                >
                  <span className="favorites__chip-name">{fav.name}</span>
                  <span className="favorites__chip-detail">
                    {fav.calories} kcal / {fav.servingSize}g
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
