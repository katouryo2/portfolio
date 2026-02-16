import { FoodItem, MealType, MEAL_LABELS } from '../types';
import { FoodItemRow } from './FoodItem';
import './MealSection.css';

interface Props {
  mealType: MealType;
  foods: FoodItem[];
  onRemove: (foodId: string) => void;
}

const MEAL_ICONS: Record<MealType, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍪',
};

export function MealSection({ mealType, foods, onRemove }: Props) {
  const totalCalories = foods.reduce((sum, f) => sum + f.calories, 0);

  return (
    <div className={`meal-section meal-section--${mealType}`}>
      <div className="meal-section__header">
        <span className="meal-section__icon">{MEAL_ICONS[mealType]}</span>
        <h3 className="meal-section__title">{MEAL_LABELS[mealType]}</h3>
        <span className="meal-section__total">{totalCalories} kcal</span>
      </div>
      {foods.length === 0 ? (
        <p className="meal-section__empty">まだ記録がありません</p>
      ) : (
        <div className="meal-section__list">
          {foods.map(food => (
            <FoodItemRow
              key={food.id}
              food={food}
              onRemove={() => onRemove(food.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
