// 사용법 : <Rating value={...} className={...} />

const RATINGS: number[] = [1, 2, 3, 4, 5];
const SELECTSTAR: string = "text-light-purple-100 drop-shadow-lg";
const UNSELECTSTAR: string = "text-light-gray-300 drop-shadow-sm";

interface StarProps {
  selected?: boolean;
  rating: number;
  onSelect?: (rating: number) => void;
  onHover?: (rating: number) => void;
}

function Star({ selected = false, rating, onSelect, onHover }: StarProps) {
  const className = `${selected ? SELECTSTAR : UNSELECTSTAR}`;
  const handleClick = onSelect ? () => onSelect(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
}

interface PartialStarProps {
  percentage: number;
}

function PartialStar({ percentage }: PartialStarProps) {
  return (
    <span className="relative">
      <span className={UNSELECTSTAR}>★</span>
      <span
        className="absolute left-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        <span className={SELECTSTAR}>★</span>
      </span>
    </span>
  );
}

interface RatingProps {
  className?: string;
  value?: number;
  onSelect?: (rating: number) => void;
  onHover?: (rating: number) => void;
  onMouseOut?: () => void;
}

export default function Rating({
  className,
  value = 0,
  onSelect,
  onHover,
  onMouseOut,
}: RatingProps) {
  const fullStars = Math.floor(value);
  const partialStarPercentage = (value - fullStars) * 100;

  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => {
        if (rating <= fullStars) {
          return (
            <Star
              key={rating}
              selected={true}
              rating={rating}
              onSelect={onSelect}
              onHover={onHover}
            />
          );
        } else if (rating === fullStars + 1 && partialStarPercentage > 0) {
          return (
            <PartialStar key={rating} percentage={partialStarPercentage} />
          );
        } else {
          return (
            <Star
              key={rating}
              selected={false}
              rating={rating}
              onSelect={onSelect}
              onHover={onHover}
            />
          );
        }
      })}
    </div>
  );
}
