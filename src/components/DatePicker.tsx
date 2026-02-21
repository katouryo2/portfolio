import './DatePicker.css';

interface Props {
  date: Date;
  onPrev: () => void;
  onNext: () => void;
  onChange: (date: Date) => void;
}

export function DatePicker({ date, onPrev, onNext, onChange }: Props) {
  const isToday = date.toDateString() === new Date().toDateString();

  const formatted = date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <div className="date-picker">
      <button className="date-picker__btn" onClick={onPrev} aria-label="前日">
        ‹
      </button>
      <div className="date-picker__display">
        <span className="date-picker__label">{formatted}</span>
        {isToday && <span className="date-picker__today">今日</span>}
        <input
          type="date"
          className="date-picker__input"
          value={date.toISOString().split('T')[0]}
          onChange={(e) => {
            const d = new Date(e.target.value + 'T00:00:00');
            if (!isNaN(d.getTime())) onChange(d);
          }}
        />
      </div>
      <button className="date-picker__btn" onClick={onNext} aria-label="翌日">
        ›
      </button>
    </div>
  );
}
