import { useState } from "react";
import { Rating } from "@mui/material";
import "../../../styles/product-overview.css";
import { calculateAverageRating } from "../../../constants";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductOverview({ product }) {
  const [mainImage, setMainImage] = useState(product.thumbnail);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

  const averageRating = parseFloat(
    calculateAverageRating(product.reviews).toString()
  );

  return (
    <div className="bg-white">
      <div className="pt-6 pb-10">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {/* Breadcrumbs */}
            <li className="text-sm">
              <a
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.translations.en.name} {/* Use the new name */}
              </a>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row w-full">
          {/* Image gallery */}
          <div className="flex-1 mt-6 px-6 sm:px-6 lg:px-8 flex justify-center">
            {/* Main Container for Main Image and Thumbnails */}
            <div className="flex flex-col items-center lg:items-start max-w-fit">
              {/* Main Image */}
              <div className="w-full aspect-h-3 aspect-w-2 overflow-hidden rounded-lg">
                <img
                  alt={product.translations.en.name}
                  src={product.thumbnail} // Use the new thumbnail
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="mx-auto mt-4 flex space-x-4 justify-center lg:justify-start">
                {[
                  product.thumbnail,
                  product.image1,
                  product.image2,
                  product.image3,
                  product.image4,
                ].map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 aspect-h-1 aspect-w-1 overflow-hidden rounded-lg cursor-pointer border-2 ${
                      mainImage.src === image
                        ? "border-blue-500"
                        : "border-transparent"
                    } hover:border-blue-500 transition-all duration-300`}
                    onClick={() =>
                      setMainImage({
                        src: image,
                        alt: product.translations.en.name,
                      })
                    }
                  >
                    <img
                      alt={product.translations.en.name}
                      src={image}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product basic info */}
          <div className="pt-10 px-8 sm:px-6 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              {product.translations.en.name} {/* Use the new name */}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl tracking-tight text-gray-900">
              ${product.price_after_discount} {/* Use the new price */}
            </p>

            {/* Available Colors */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">
                Available Colors
              </h3>
              <div className="mt-2 flex space-x-2">
                {product.color.map((color) => (
                  <span
                    className={classNames(
                      "h-6 w-6 rounded-full border border-gray-300 cursor-pointer",
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-indigo-500"
                        : ""
                    )}
                    key={color.id}
                    style={{ backgroundColor: color.name.toLowerCase() }}
                    title={color.name}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="flex items-center mt-6 gap-3">
              {/* Assuming you have a function to calculate average rating */}
              <Rating
                name="half-rating-read"
                defaultValue={averageRating}
                precision={0.1}
                readOnly
              />
              {averageRating}
              <span>({product.reviews.length} reviews)</span>
            </div>

            {/* Quantity */}
            <div className="mt-4 flex items-center">
              <h3 className="text-sm font-medium text-gray-900">Quantity:</h3>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 h-10 border border-gray-300 rounded-md px-2 mx-2"
              />
            </div>

            {/* Add to Cart Button */}
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
