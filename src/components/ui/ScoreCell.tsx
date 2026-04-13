interface ScoreCellProps {
  score: number;
}

export default function ScoreCell({ score }: ScoreCellProps) {
  const color =
    score > 65
      ? 'var(--red-mid)'
      : score > 35
        ? 'var(--amber-mid)'
        : 'var(--green-mid)';

  return (
    <div className="score-cell">
      <span className="score-n">{score}</span>
      <div className="score-tr">
        <div
          className="score-fill"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
    </div>
  );
}
