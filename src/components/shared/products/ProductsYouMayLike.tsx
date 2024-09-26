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
      <div className="flex items-center">
        {products.length > 4 && (
          <button onClick={scrollLeft} className="mr-2 bg-gray-300 p-2 rounded">
            &lt;
          </button>
        )}
        <div
          ref={sliderRef}
          className="flex overflow-x-hidden space-x-2 scrollbar-hide gap-5"
          style={{ scrollSnapType: "x mandatory", width: "100%" }} // Set width for the scrolling area
        >
          <div className="flex space-x-4">
            {" "}
            {/* Wrap product cards in an additional flex container */}
            {products.map((product) => (
              <ProductYouLikeCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        {products.length > 4 && (
          <button
            onClick={scrollRight}
            className="ml-2 bg-gray-300 p-2 rounded"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}
