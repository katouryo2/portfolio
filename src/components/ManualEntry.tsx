import { useState } from 'react';
import { FoodItem, MealType, MEAL_LABELS } from '../types';
import './ManualEntry.css';

interface Props {
  selectedMeal: MealType;
  onAdd: (mealType: MealType, food: FoodItem) => void;
  onClose: () => void;
  onToggleFavorite?: (food: FoodItem) => void;
  isFavorite?: (name: string) => boolean;
}

export function ManualEntry({ selectedMeal, onAdd, onClose, onToggleFavorite, isFavorite }: Props) {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [servingSize, setServingSize] = useState('');

  const canSubmit = name.trim() && calories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const food: FoodItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      calories: Math.round(Number(calories) || 0),
      protein: Math.round((Number(protein) || 0) * 10) / 10,
      fat: Math.round((Number(fat) || 0) * 10) / 10,
      carbs: Math.round((Number(carbs) || 0) * 10) / 10,
      servingSize: Number(servingSize) || 0,
    };

    onAdd(selectedMeal, food);
    onClose();
  };

  return (
    <div className="manual-entry">
      <div className="manual-entry__header">
        <h3 className="manual-entry__title">手動で追加</h3>
        <button className="manual-entry__close" onClick={onClose} aria-label="閉じる">
          &#10005;
        </button>
      </div>

      <form className="manual-entry__form" onSubmit={handleSubmit}>
        <div className="manual-entry__field manual-entry__field--full">
          <label className="manual-entry__label">
            食品名 <span className="manual-entry__required">*</span>
          </label>
          <input
            type="text"
            className="manual-entry__input"
            placeholder="例: おにぎり（鮭）"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="manual-entry__row">
          <div className="manual-entry__field">
            <label className="manual-entry__label">
              カロリー <span className="manual-entry__required">*</span>
            </label>
            <div className="manual-entry__input-wrap">
              <input
                type="number"
                className="manual-entry__input"
                placeholder="0"
                min="0"
                value={calories}
                onChange={e => setCalories(e.target.value)}
              />
              <span className="manual-entry__unit">kcal</span>
            </div>
          </div>

          <div className="manual-entry__field">
            <label className="manual-entry__label">量</label>
            <div className="manual-entry__input-wrap">
              <input
                type="number"
                className="manual-entry__input"
                placeholder="0"
                min="0"
                value={servingSize}
                onChange={e => setServingSize(e.target.value)}
              />
              <span className="manual-entry__unit">g</span>
            </div>
          </div>
        </div>

        <div className="manual-entry__row">
          <div className="manual-entry__field">
            <label className="manual-entry__label manual-entry__label--protein">P</label>
            <div className="manual-entry__input-wrap">
              <input
                type="number"
                className="manual-entry__input"
                placeholder="0"
                min="0"
                step="0.1"
                value={protein}
                onChange={e => setProtein(e.target.value)}
              />
              <span className="manual-entry__unit">g</span>
            </div>
          </div>

          <div className="manual-entry__field">
            <label className="manual-entry__label manual-entry__label--fat">F</label>
            <div className="manual-entry__input-wrap">
              <input
                type="number"
                className="manual-entry__input"
                placeholder="0"
                min="0"
                step="0.1"
                value={fat}
                onChange={e => setFat(e.target.value)}
              />
              <span className="manual-entry__unit">g</span>
            </div>
          </div>

          <div className="manual-entry__field">
            <label className="manual-entry__label manual-entry__label--carbs">C</label>
            <div className="manual-entry__input-wrap">
              <input
                type="number"
                className="manual-entry__input"
                placeholder="0"
                min="0"
                step="0.1"
                value={carbs}
                onChange={e => setCarbs(e.target.value)}
              />
              <span className="manual-entry__unit">g</span>
            </div>
          </div>
        </div>

        <div className="manual-entry__actions">
          <button className="manual-entry__submit" type="submit" disabled={!canSubmit}>
            + {MEAL_LABELS[selectedMeal]}に追加
          </button>
          {onToggleFavorite && (
            <button
              type="button"
              className={`manual-entry__fav-btn ${name.trim() && isFavorite?.(name.trim()) ? 'active' : ''}`}
              disabled={!canSubmit}
              onClick={() => {
                if (!canSubmit) return;
                const food: FoodItem = {
                  id: crypto.randomUUID(),
                  name: name.trim(),
                  calories: Math.round(Number(calories) || 0),
                  protein: Math.round((Number(protein) || 0) * 10) / 10,
                  fat: Math.round((Number(fat) || 0) * 10) / 10,
                  carbs: Math.round((Number(carbs) || 0) * 10) / 10,
                  servingSize: Number(servingSize) || 0,
                };
                onToggleFavorite(food);
              }}
            >
              {name.trim() && isFavorite?.(name.trim()) ? '\u2605' : '\u2606'} お気に入り
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
