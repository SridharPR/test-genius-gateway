
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  onChange: (rating: number) => void;
  initialRating?: number;
}

const Rating: React.FC<RatingProps> = ({ onChange, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none transition-transform hover:scale-110"
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleRating(star)}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            fill={(hoverRating || rating) >= star ? "#FFD700" : "none"}
            color={(hoverRating || rating) >= star ? "#FFD700" : "#CBD5E0"}
            size={24}
            className="transition-colors duration-150"
          />
        </button>
      ))}
    </div>
  );
};

export default Rating;
