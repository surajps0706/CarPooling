import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface RatingStarsProps {
  value?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  value = 0,
  onChange,
  readonly = false,
  size = 'md'
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const currentRating = hoverRating || value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= currentRating;

        return (
          <motion.button
            key={star}
            type="button"
            disabled={readonly}
            whileHover={readonly ? undefined : { scale: 1.2 }}
            whileTap={readonly ? undefined : { scale: 0.9 }}
            onClick={() => !readonly && onChange && onChange(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            className={`p-0.5 transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <Star
              className={`${starSizes[size]} ${
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-[#D1D5DB] fill-transparent'
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
};
