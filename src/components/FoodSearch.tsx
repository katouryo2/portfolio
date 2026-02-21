import { useState } from 'react';
import { searchFood } from '../api/nutritionix';
import { FoodItem, MealType, MEAL_LABELS } from '../types';
import { ManualEntry } from './ManualEntry';
import './FoodSearch.css';

interface Props {
  onAdd: (mealType: MealType, food: FoodItem) => void;
  onToggleFavorite: (food: FoodItem) => void;
  isFavorite: (name: string) => boolean;
}

export function FoodSearch({ onAdd, onToggleFavorite, isFavorite }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [showManual, setShowManual] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError('');
    setResults([]);
    setShowManual(false);

    try {
      const foods = await searchFood(trimmed);
      setResults(foods);
      setQuery('');
      if (foods.length === 0) setError('該当する食品が見つかりませんでした');
    } catch (err) {
      setError(err instanceof Error ? err.message : '検索に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (food: FoodItem) => {
    onAdd(selectedMeal, food);
    setResults((prev) => prev.filter((f) => f.id !== food.id));
  };

  return (
    <div className="food-search">
      <form className="food-search__form" onSubmit={handleSearch}>
        <input
          type="text"
          className="food-search__input"
          placeholder="食品を入力（例: rice 200g, banana）"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="food-search__btn" type="submit" disabled={loading}>
          {loading ? '検索中...' : '検索'}
        </button>
      </form>

      <div className="food-search__actions">
        <div className="food-search__meal-select">
          {(Object.keys(MEAL_LABELS) as MealType[]).map((type) => (
            <button
              key={type}
              className={`food-search__meal-btn ${selectedMeal === type ? 'active' : ''}`}
              onClick={() => setSelectedMeal(type)}
            >
              {MEAL_LABELS[type]}
            </button>
          ))}
        </div>
        <button
          className={`food-search__manual-btn ${showManual ? 'active' : ''}`}
          onClick={() => setShowManual((v) => !v)}
          type="button"
        >
          &#9998; 手動入力
        </button>
      </div>

      {error && (
        <div className="food-search__error-wrap">
          <p className="food-search__error">{error}</p>
          {!showManual && (
            <button
              className="food-search__manual-hint"
              onClick={() => setShowManual(true)}
              type="button"
            >
              手動で栄養素を入力する &rarr;
            </button>
          )}
        </div>
      )}

      {results.length > 0 && (
        <ul className="food-search__results">
          {results.map((food) => (
            <li key={food.id} className="food-search__result">
              <div className="food-search__result-info">
                <div>
                  <span className="food-search__result-name">{food.name}</span>
                  <span className="food-search__result-serving">{food.servingSize}g</span>
                </div>
              </div>
              <div className="food-search__result-nutrients">
                <span>{food.calories} kcal</span>
                <span>P: {food.protein}g</span>
                <span>F: {food.fat}g</span>
                <span>C: {food.carbs}g</span>
              </div>
              <button
                className={`food-search__fav-btn ${isFavorite(food.name) ? 'active' : ''}`}
                onClick={() => onToggleFavorite(food)}
                aria-label="お気に入り"
              >
                {isFavorite(food.name) ? '\u2605' : '\u2606'}
              </button>
              <button className="food-search__add-btn" onClick={() => handleAdd(food)}>
                + {MEAL_LABELS[selectedMeal]}
              </button>
            </li>
          ))}
        </ul>
      )}

      {showManual && (
        <ManualEntry
          selectedMeal={selectedMeal}
          onAdd={onAdd}
          onClose={() => setShowManual(false)}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
}
