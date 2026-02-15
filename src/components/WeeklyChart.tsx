import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { DailyLog } from '../types';
import './WeeklyChart.css';

interface Props {
  selectedDate: Date;
  logs: Record<string, DailyLog>;
  calorieGoal?: number;
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getDayCalories(log: DailyLog | undefined): number {
  if (!log) return 0;
  return Object.values(log.meals)
    .flat()
    .reduce((sum, f) => sum + f.calories, 0);
}

export function WeeklyChart({ selectedDate, logs, calorieGoal }: Props) {
  const data = useMemo(() => {
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(selectedDate);
      d.setDate(d.getDate() - i);
      const key = formatDateKey(d);
      const cal = getDayCalories(logs[key]);
      result.push({
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        calories: cal,
      });
    }
    return result;
  }, [selectedDate, logs]);

  const maxVal = Math.max(...data.map(d => d.calories), calorieGoal ?? 0, 500);

  return (
    <div className="weekly-chart">
      <h4 className="weekly-chart__title">過去7日間のカロリー推移</h4>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, Math.ceil(maxVal / 500) * 500]}
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip
            formatter={(value) => [`${value} kcal`, 'カロリー']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid var(--border)',
              fontSize: '0.82rem',
            }}
          />
          {calorieGoal && (
            <ReferenceLine
              y={calorieGoal}
              stroke="var(--danger)"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: `目標 ${calorieGoal}`,
                position: 'right',
                fontSize: 10,
                fill: 'var(--danger)',
              }}
            />
          )}
          <Bar
            dataKey="calories"
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6c9fff" />
              <stop offset="100%" stopColor="#4f8cff" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
