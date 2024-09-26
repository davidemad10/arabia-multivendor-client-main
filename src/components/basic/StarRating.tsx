import { StarIcon } from "@heroicons/react/solid"; // For filled stars
import { StarIcon as OutlineStarIcon } from "@heroicons/react/outline"; // For outlined (empty) stars

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // Full stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a fractional part
  const emptyStars = 5 - Math.ceil(rating); // Calculate remaining empty stars

  return (
    <div className="flex items-center">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={index} className="h-5 w-5 text-gray-900" />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <div className="relative h-5 w-5">
          <StarIcon className="absolute inset-0 text-gray-900" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: "50%" }}
          >
            <StarIcon className="text-gray-200" />
          </div>
        </div>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <OutlineStarIcon
          key={index + fullStars + 1}
          className="h-5 w-5 text-gray-200"
        />
      ))}
    </div>
  );
};

export default StarRating;
