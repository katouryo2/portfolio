import './DailySummary.css';

interface Props {
  totals: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

const CALORIE_GOAL = 2000;

interface NutrientBarProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

function NutrientBar({ label, value, max, unit, color }: NutrientBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="nutrient-bar">
      <div className="nutrient-bar__label">
        <span>{label}</span>
        <span>
          {value}{unit} / {max}{unit}
        </span>
      </div>
      <div className="nutrient-bar__track">
        <div
          className="nutrient-bar__fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export function DailySummary({ totals }: Props) {
  const calPct = Math.min((totals.calories / CALORIE_GOAL) * 100, 100);
  const remaining = CALORIE_GOAL - totals.calories;

  return (
    <div className="daily-summary">
      <div className="daily-summary__cal">
        <div className="daily-summary__ring">
          <svg viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="var(--border)"
              strokeWidth="8"
            />
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${calPct * 2.64} 264`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="daily-summary__ring-text">
            <span className="daily-summary__cal-value">{totals.calories}</span>
            <span className="daily-summary__cal-unit">kcal</span>
          </div>
        </div>
        <p className="daily-summary__remaining">
          {remaining > 0 ? `あと ${remaining} kcal` : `${Math.abs(remaining)} kcal オーバー`}
        </p>
      </div>

      <div className="daily-summary__nutrients">
        <NutrientBar label="タンパク質" value={totals.protein} max={60} unit="g" color="var(--protein)" />
        <NutrientBar label="脂質" value={totals.fat} max={55} unit="g" color="var(--fat)" />
        <NutrientBar label="炭水化物" value={totals.carbs} max={300} unit="g" color="var(--carbs)" />
      </div>
    </div>
  );
}
