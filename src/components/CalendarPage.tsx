import { useMemo } from 'react';
import { MEAL_ORDER, MEAL_ICONS, MEAL_LABELS } from '../types';
import type { DailyLog, FoodItem } from '../types';
import { MonthlyCalendar } from './MonthlyCalendar';
import { WeeklyChart } from './WeeklyChart';
import { formatDate } from '../lib/utils';
import './CalendarPage.css';

interface Props {
  selectedDate: Date;
  logs: Record<string, DailyLog>;
  onSelectDate: (date: Date) => void;
  calorieGoal?: number;
}

export function CalendarPage({ selectedDate, logs, onSelectDate, calorieGoal }: Props) {
  const dateStr = formatDate(selectedDate);
  const dayLog = logs[dateStr];

  const totals = useMemo(() => {
    if (!dayLog) return { calories: 0, protein: 0, fat: 0, carbs: 0 };
    const allFoods = Object.values(dayLog.meals).flat();
    return {
      calories: allFoods.reduce((sum, f) => sum + f.calories, 0),
      protein: Math.round(allFoods.reduce((sum, f) => sum + f.protein, 0) * 10) / 10,
      fat: Math.round(allFoods.reduce((sum, f) => sum + f.fat, 0) * 10) / 10,
      carbs: Math.round(allFoods.reduce((sum, f) => sum + f.carbs, 0) * 10) / 10,
    };
  }, [dayLog]);

  const displayDate = `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日`;

  return (
    <div className="calendar-page">
      <div className="calendar-page__calendar">
        <MonthlyCalendar
          selectedDate={selectedDate}
          logs={logs}
          onSelectDate={onSelectDate}
        />
        <WeeklyChart
          selectedDate={selectedDate}
          logs={logs}
          calorieGoal={calorieGoal}
        />
      </div>

      <div className="calendar-page__detail">
        <h3 className="calendar-page__detail-title">{displayDate}の記録</h3>

        {totals.calories > 0 ? (
          <>
            <div className="calendar-page__summary">
              <div className="calendar-page__summary-item calendar-page__summary-item--cal">
                <span className="calendar-page__summary-value">{totals.calories}</span>
                <span className="calendar-page__summary-label">kcal</span>
              </div>
              <div className="calendar-page__summary-item">
                <span className="calendar-page__summary-value">{totals.protein}g</span>
                <span className="calendar-page__summary-label">タンパク質</span>
              </div>
              <div className="calendar-page__summary-item">
                <span className="calendar-page__summary-value">{totals.fat}g</span>
                <span className="calendar-page__summary-label">脂質</span>
              </div>
              <div className="calendar-page__summary-item">
                <span className="calendar-page__summary-value">{totals.carbs}g</span>
                <span className="calendar-page__summary-label">炭水化物</span>
              </div>
            </div>

            <div className="calendar-page__meals">
              {MEAL_ORDER.map(type => {
                const foods: FoodItem[] = dayLog?.meals[type] ?? [];
                if (foods.length === 0) return null;
                const mealCal = foods.reduce((s, f) => s + f.calories, 0);
                return (
                  <div key={type} className="calendar-page__meal">
                    <div className="calendar-page__meal-header">
                      <span>{MEAL_ICONS[type]} {MEAL_LABELS[type]}</span>
                      <span className="calendar-page__meal-cal">{mealCal} kcal</span>
                    </div>
                    <ul className="calendar-page__food-list">
                      {foods.map(f => (
                        <li key={f.id} className="calendar-page__food-item">
                          <span>{f.name}</span>
                          <span className="calendar-page__food-cal">{f.calories} kcal</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="calendar-page__empty">この日の記録はありません</p>
        )}
      </div>
    </div>
  );
}
