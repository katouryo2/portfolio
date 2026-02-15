import { useState } from 'react';
import { getAiAdvice } from '../api/gemini';
import { DailyLog } from '../types';
import { NutritionGoals } from '../hooks/useGoals';
import './AiAdvice.css';

interface Props {
  dailyLog: DailyLog;
  totals: { calories: number; protein: number; fat: number; carbs: number };
  goals: NutritionGoals;
}

export function AiAdvice({ dailyLog, totals, goals }: Props) {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const hasAnyFood = Object.values(dailyLog.meals).some(foods => foods.length > 0);

  const handleAsk = async () => {
    setLoading(true);
    setError('');
    setAdvice('');

    try {
      const result = await getAiAdvice(dailyLog, totals, goals);
      setAdvice(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AIアドバイスの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-advice">
      <div className="ai-advice__header">
        <span className="ai-advice__icon">&#129302;</span>
        <h3 className="ai-advice__title">AI 栄養アドバイス</h3>
        <span className="ai-advice__badge">Gemini</span>
      </div>

      {!advice && !loading && !error && (
        <div className="ai-advice__prompt">
          <p className="ai-advice__description">
            今日の食事記録をAIが分析し、栄養バランスの評価と明日のおすすめメニューを提案します。
          </p>
          <button
            className="ai-advice__btn"
            onClick={handleAsk}
            disabled={!hasAnyFood}
          >
            {hasAnyFood ? 'AIに聞いてみる' : '食事を記録してから利用できます'}
          </button>
        </div>
      )}

      {loading && (
        <div className="ai-advice__loading">
          <div className="ai-advice__spinner" />
          <span>AIが分析中...</span>
        </div>
      )}

      {error && (
        <div className="ai-advice__error">
          <p>{error}</p>
          <button className="ai-advice__retry" onClick={handleAsk}>
            再試行
          </button>
        </div>
      )}

      {advice && (
        <div className="ai-advice__content">
          <div className="ai-advice__text">
            {advice.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (trimmed === '') return null;
              // ## or ### headings
              const headingMatch = trimmed.match(/^(#{2,3})\s+(.+)/);
              if (headingMatch) {
                return <h4 key={i} className="ai-advice__section-title">{headingMatch[2]}</h4>;
              }
              // bullet lists (- or *)
              const listMatch = trimmed.match(/^[-*]\s+(.+)/);
              if (listMatch) {
                return <li key={i} className="ai-advice__list-item">{listMatch[1].replace(/\*\*/g, '')}</li>;
              }
              // numbered lists
              const numMatch = trimmed.match(/^\d+\.\s+(.+)/);
              if (numMatch) {
                return <li key={i} className="ai-advice__list-item">{numMatch[1].replace(/\*\*/g, '')}</li>;
              }
              // bold-only lines
              if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                return <p key={i} className="ai-advice__bold">{trimmed.replace(/\*\*/g, '')}</p>;
              }
              // inline bold within text
              const parts = trimmed.split(/\*\*(.+?)\*\*/g);
              if (parts.length > 1) {
                return (
                  <p key={i}>
                    {parts.map((part, j) =>
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )}
                  </p>
                );
              }
              return <p key={i}>{trimmed}</p>;
            })}
          </div>
          <button className="ai-advice__btn ai-advice__btn--refresh" onClick={handleAsk}>
            &#128260; もう一度聞く
          </button>
        </div>
      )}
    </div>
  );
}
