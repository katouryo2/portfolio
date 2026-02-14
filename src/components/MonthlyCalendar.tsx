import { useState, useMemo } from 'react';
import { DailyLog, FoodItem } from '../types';
import './MonthlyCalendar.css';

interface Props {
  selectedDate: Date;
  logs: Record<string, DailyLog>;
  onSelectDate: (date: Date) => void;
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

function formatDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getDayCalories(log: DailyLog | undefined): number {
  if (!log) return 0;
  return Object.values(log.meals)
    .flat()
    .reduce((sum: number, f: FoodItem) => sum + f.calories, 0);
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function MonthlyCalendar({ selectedDate, logs, onSelectDate }: Props) {
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());

  const today = useMemo(() => new Date(), []);

  const cells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const result: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) result.push(d);
    return result;
  }, [viewYear, viewMonth]);

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(y => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(y => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const handleSelect = (day: number) => {
    onSelectDate(new Date(viewYear, viewMonth, day));
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button className="calendar__nav-btn" onClick={goToPrevMonth}>‹</button>
        <span className="calendar__month-label">
          {viewYear}年{viewMonth + 1}月
        </span>
        <button className="calendar__nav-btn" onClick={goToNextMonth}>›</button>
      </div>

      <div className="calendar__grid">
        {WEEKDAYS.map(w => (
          <div key={w} className="calendar__weekday">{w}</div>
        ))}

        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} className="calendar__cell calendar__cell--empty" />;

          const dateKey = formatDateKey(viewYear, viewMonth, day);
          const cal = getDayCalories(logs[dateKey]);
          const cellDate = new Date(viewYear, viewMonth, day);
          const isSelected = isSameDay(cellDate, selectedDate);
          const isToday = isSameDay(cellDate, today);

          return (
            <button
              key={day}
              className={`calendar__cell${isSelected ? ' calendar__cell--selected' : ''}${isToday ? ' calendar__cell--today' : ''}`}
              onClick={() => handleSelect(day)}
            >
              <span className="calendar__day">{day}</span>
              {cal > 0 && <span className="calendar__cal">{cal}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
