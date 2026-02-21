import { useState } from 'react';
import { MEAL_ORDER } from './types';
import type { FavoriteFoodData } from './types';
import { useAuth } from './contexts/AuthContext';
import { useMealLog } from './hooks/useMealLog';
import { useFavorites } from './hooks/useFavorites';
import { useGoals } from './hooks/useGoals';
import { DatePicker } from './components/DatePicker';
import { FoodSearch } from './components/FoodSearch';
import { Favorites } from './components/Favorites';
import { DailySummary } from './components/DailySummary';
import { MealSection } from './components/MealSection';
import { AiAdvice } from './components/AiAdvice';
import { CalendarPage } from './components/CalendarPage';
import { UserMenu } from './components/UserMenu';
import './App.css';

type Page = 'home' | 'calendar';

function App() {
  const { loading } = useAuth();
  const [page, setPage] = useState<Page>('home');

  const {
    selectedDate,
    setSelectedDate,
    dateStr,
    dailyLog,
    logs,
    addFood,
    removeFood,
    totals,
    goToPrevDay,
    goToNextDay,
  } = useMealLog();

  const { favorites, addFavorite, removeFavorite, isFavorite, toFoodItem } = useFavorites();

  const { goals, updateGoals } = useGoals();

  const toggleFavorite = (food: FavoriteFoodData) => {
    if (isFavorite(food.name)) {
      removeFavorite(food.name);
    } else {
      addFavorite(food);
    }
  };

  if (loading) {
    return (
      <div className="app app--loading">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {page === 'home' ? (
        <>
          <header className="app__header">
            <h1 className="app__title">カロリー計算</h1>
            <UserMenu />
            <DatePicker
              date={selectedDate}
              onPrev={goToPrevDay}
              onNext={goToNextDay}
              onChange={setSelectedDate}
            />
          </header>

          <DailySummary totals={totals} goals={goals} onUpdateGoals={updateGoals} />

          <FoodSearch
            onAdd={(mealType, food) => addFood(mealType, food, dateStr)}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />

          <Favorites
            favorites={favorites}
            onAdd={(mealType, food) => addFood(mealType, food, dateStr)}
            onRemoveFavorite={removeFavorite}
            toFoodItem={toFoodItem}
          />

          <div className="app__meals">
            {MEAL_ORDER.map((type) => (
              <MealSection
                key={type}
                mealType={type}
                foods={dailyLog.meals[type]}
                onRemove={(foodId) => removeFood(type, foodId, dateStr)}
              />
            ))}
          </div>

          <AiAdvice dailyLog={dailyLog} totals={totals} goals={goals} />
        </>
      ) : (
        <>
          <header className="app__header">
            <h1 className="app__title">カレンダー</h1>
            <UserMenu />
          </header>
          <CalendarPage
            selectedDate={selectedDate}
            logs={logs}
            onSelectDate={setSelectedDate}
            calorieGoal={goals.calories}
          />
        </>
      )}

      <nav className="app__nav">
        <button
          className={`app__nav-btn${page === 'home' ? ' app__nav-btn--active' : ''}`}
          onClick={() => setPage('home')}
        >
          <span className="app__nav-icon">🏠</span>
          <span className="app__nav-label">ホーム</span>
        </button>
        <button
          className={`app__nav-btn${page === 'calendar' ? ' app__nav-btn--active' : ''}`}
          onClick={() => setPage('calendar')}
        >
          <span className="app__nav-icon">📅</span>
          <span className="app__nav-label">カレンダー</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
