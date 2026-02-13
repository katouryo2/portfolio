import { FoodItem as FoodItemType } from '../types';
import './FoodItem.css';

interface Props {
  food: FoodItemType;
  onRemove: () => void;
}

export function FoodItemRow({ food, onRemove }: Props) {
  return (
    <div className="food-item">
      <div className="food-item__info">
        <div>
          <span className="food-item__name">{food.name}</span>
          <span className="food-item__serving">{food.servingSize}g</span>
        </div>
      </div>
      <div className="food-item__nutrients">
        <span className="food-item__cal">{food.calories} kcal</span>
        <span>P: {food.protein}g</span>
        <span>F: {food.fat}g</span>
        <span>C: {food.carbs}g</span>
      </div>
      <button className="food-item__remove" onClick={onRemove} aria-label="削除">
        ×
      </button>
    </div>
  );
}
