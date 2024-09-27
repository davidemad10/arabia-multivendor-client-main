import React, { useRef } from "react";
import ProductYouLikeCard from "./ProductYouLikeCard";

export default function ProductsYouMayLike({ products }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <div className="relative p-10 pt-14">
      <h2 className="text-xl font-bold my-4 mx-4 text-gray-500">
        Products You May Like
      </h2>
      <div className="flex items-center justify-between">
        {products.length > 4 && (
          <button
            onClick={scrollLeft}
            className="mr-2 bg-gray-300 p-2 rounded hover:bg-gray-400"
          >
            &lt;
          </button>
        )}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide gap-5"
          style={{ scrollSnapType: "x mandatory", width: "100%" }} // Ensure full width for the scrolling area
        >
          {products.map((product) => (
            <div className="flex-shrink-0" key={product.id}>
              <ProductYouLikeCard product={product} />
            </div>
          ))}
        </div>
        {products.length > 4 && (
          <button
            onClick={scrollRight}
            className="ml-2 bg-gray-300 p-2 rounded hover:bg-gray-400"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}
