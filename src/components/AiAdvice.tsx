import { useState, useEffect, ReactNode } from 'react';
import { getAiAdvice } from '../api/gemini';
import { DailyLog } from '../types';
import type { NutritionGoals } from '../types';
import './AiAdvice.css';

interface Props {
  dailyLog: DailyLog;
  totals: { calories: number; protein: number; fat: number; carbs: number };
  goals: NutritionGoals;
}

type BlockType = 'heading' | 'bullet' | 'numbered' | 'paragraph';

interface Block {
  type: BlockType;
  lines: string[];
}

/** インライン Markdown（**bold**）を ReactNode に変換する */
function renderInline(text: string): ReactNode {
  const stripped = text.replace(/\*\*/g, '');
  const parts = text.split(/\*\*(.+?)\*\*/g);
  if (parts.length <= 1) return stripped;
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
  );
}

/** Markdown テキストをブロック単位にパースする */
function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];

  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (trimmed === '') continue;

    let type: BlockType;
    let content: string;

    if (/^#{2,3}\s+/.test(trimmed)) {
      type = 'heading';
      content = trimmed.replace(/^#{2,3}\s+/, '');
    } else if (/^[-*]\s+/.test(trimmed)) {
      type = 'bullet';
      content = trimmed.replace(/^[-*]\s+/, '');
    } else if (/^\d+\.\s+/.test(trimmed)) {
      type = 'numbered';
      content = trimmed.replace(/^\d+\.\s+/, '');
    } else {
      type = 'paragraph';
      content = trimmed;
    }

    const prev = blocks[blocks.length - 1];
    if (prev && prev.type === type && (type === 'bullet' || type === 'numbered')) {
      prev.lines.push(content);
    } else {
      blocks.push({ type, lines: [content] });
    }
  }

  return blocks;
}

/** パース済みブロックを React 要素に変換する */
function renderBlocks(blocks: Block[]): ReactNode[] {
  return blocks.map((block, i) => {
    switch (block.type) {
      case 'heading':
        return (
          <h4 key={i} className="ai-advice__section-title">
            {renderInline(block.lines[0])}
          </h4>
        );
      case 'bullet':
        return (
          <ul key={i} className="ai-advice__list">
            {block.lines.map((line, j) => (
              <li key={j} className="ai-advice__list-item">{renderInline(line)}</li>
            ))}
          </ul>
        );
      case 'numbered':
        return (
          <ol key={i} className="ai-advice__list">
            {block.lines.map((line, j) => (
              <li key={j} className="ai-advice__list-item">{renderInline(line)}</li>
            ))}
          </ol>
        );
      case 'paragraph':
        return <p key={i}>{renderInline(block.lines[0])}</p>;
    }
  });
}

export function AiAdvice({ dailyLog, totals, goals }: Props) {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setAdvice('');
    setError('');
    setLoading(false);
  }, [dailyLog.date]);

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
            {renderBlocks(parseBlocks(advice))}
          </div>
          <button className="ai-advice__btn ai-advice__btn--refresh" onClick={handleAsk}>
            &#128260; もう一度聞く
          </button>
        </div>
      )}
    </div>
  );
}
