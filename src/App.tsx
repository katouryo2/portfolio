import { MealType } from './types';
import { useMealLog } from './hooks/useMealLog';
import { DatePicker } from './components/DatePicker';
import { FoodSearch } from './components/FoodSearch';
import { DailySummary } from './components/DailySummary';
import { MealSection } from './components/MealSection';
import './App.css';

const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

function App() {
  const {
    selectedDate,
    setSelectedDate,
    dailyLog,
    addFood,
    removeFood,
    totals,
    goToPrevDay,
    goToNextDay,
  } = useMealLog();

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">カロリー計算</h1>
        <DatePicker
          date={selectedDate}
          onPrev={goToPrevDay}
          onNext={goToNextDay}
          onChange={setSelectedDate}
        />
      </header>

      <DailySummary totals={totals} />

      <FoodSearch onAdd={addFood} />

      <div className="app__meals">
        {MEAL_ORDER.map(type => (
          <MealSection
            key={type}
            mealType={type}
            foods={dailyLog.meals[type]}
            onRemove={foodId => removeFood(type, foodId)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
