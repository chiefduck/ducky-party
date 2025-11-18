import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  readonly?: boolean;
}

export const StarRating = ({ rating, setRating, readonly = false }: StarRatingProps) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && setRating(star)}
          disabled={readonly}
          className={`transition-all ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};
