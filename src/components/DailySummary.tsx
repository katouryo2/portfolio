import { useState } from 'react';
import { NutritionGoals } from '../hooks/useGoals';
import './DailySummary.css';

interface Props {
  totals: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  goals: NutritionGoals;
  onUpdateGoals: (goals: NutritionGoals) => void;
}

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

export function DailySummary({ totals, goals, onUpdateGoals }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(goals);

  const calPct = Math.min((totals.calories / goals.calories) * 100, 100);
  const remaining = goals.calories - totals.calories;

  const handleOpen = () => {
    setDraft(goals);
    setEditing(true);
  };

  const handleSave = () => {
    onUpdateGoals(draft);
    setEditing(false);
  };

  return (
    <div className="daily-summary">
      <div className="daily-summary__cal">
        <div className="daily-summary__ring">
          <svg viewBox="0 0 100 100">
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f8cff" />
                <stop offset="100%" stopColor="#6c63ff" />
              </linearGradient>
            </defs>
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="8"
            />
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${calPct * 2.64} 264`}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dasharray 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
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

      <div className="daily-summary__right">
        <div className="daily-summary__nutrients">
          <NutrientBar label="タンパク質" value={totals.protein} max={goals.protein} unit="g" color="var(--protein)" />
          <NutrientBar label="脂質" value={totals.fat} max={goals.fat} unit="g" color="var(--fat)" />
          <NutrientBar label="炭水化物" value={totals.carbs} max={goals.carbs} unit="g" color="var(--carbs)" />
        </div>
        <button className="daily-summary__edit-btn" onClick={handleOpen}>
          &#9881; 目標設定
        </button>
      </div>

      {editing && (
        <div className="daily-summary__modal-overlay" onClick={() => setEditing(false)}>
          <div className="daily-summary__modal" onClick={e => e.stopPropagation()}>
            <h4 className="daily-summary__modal-title">1日の目標を設定</h4>
            <div className="daily-summary__modal-fields">
              <label>
                <span>カロリー</span>
                <div className="daily-summary__modal-input-wrap">
                  <input
                    type="number"
                    value={draft.calories}
                    min={0}
                    onChange={e => setDraft(d => ({ ...d, calories: Number(e.target.value) || 0 }))}
                  />
                  <span className="daily-summary__modal-unit">kcal</span>
                </div>
              </label>
              <label>
                <span>タンパク質</span>
                <div className="daily-summary__modal-input-wrap">
                  <input
                    type="number"
                    value={draft.protein}
                    min={0}
                    onChange={e => setDraft(d => ({ ...d, protein: Number(e.target.value) || 0 }))}
                  />
                  <span className="daily-summary__modal-unit">g</span>
                </div>
              </label>
              <label>
                <span>脂質</span>
                <div className="daily-summary__modal-input-wrap">
                  <input
                    type="number"
                    value={draft.fat}
                    min={0}
                    onChange={e => setDraft(d => ({ ...d, fat: Number(e.target.value) || 0 }))}
                  />
                  <span className="daily-summary__modal-unit">g</span>
                </div>
              </label>
              <label>
                <span>炭水化物</span>
                <div className="daily-summary__modal-input-wrap">
                  <input
                    type="number"
                    value={draft.carbs}
                    min={0}
                    onChange={e => setDraft(d => ({ ...d, carbs: Number(e.target.value) || 0 }))}
                  />
                  <span className="daily-summary__modal-unit">g</span>
                </div>
              </label>
            </div>
            <div className="daily-summary__modal-actions">
              <button className="daily-summary__modal-cancel" onClick={() => setEditing(false)}>
                キャンセル
              </button>
              <button className="daily-summary__modal-save" onClick={handleSave}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
