import { useState } from "react";
import { Rating } from "@mui/material";
import "../../../styles/product-overview.css";
import { calculateAverageRating } from "../../../constants";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductOverview({ product }) {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(0);
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
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        <div className="flex flex-row w-full">
          {/* Image gallery */}
          <div className=" flex-1 mt-6 px-6 lg:px-8 flex justify-center">
            {/* Main Container for Main Image and Thumbnails */}
            <div className="flex flex-col items-center lg:items-start max-w-fit">
              {/* Main Image */}
              <div className="w-full  aspect-h-3 aspect-w-2 overflow-hidden rounded-lg">
                <img
                  alt={mainImage.alt}
                  src={mainImage.src}
                  className="h-full w-full object-cover object-center main-image"
                />
              </div>

              {/* Thumbnail Images - Aligned Horizontally Below Main Image */}
              <div className="mt-4 flex space-x-4 justify-center lg:justify-start">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 aspect-h-1 aspect-w-1 overflow-hidden rounded-lg cursor-pointer border-2 ${
                      mainImage.src === image.src
                        ? "border-blue-500"
                        : "border-transparent"
                    } hover:border-blue-500 transition-all duration-300`}
                    onClick={() => setMainImage(image)}
                  >
                    <img
                      alt={image.alt}
                      src={image.src}
                      className="h-full w-full object-cover object-center thumbnail"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Product basic info */}
          <div className="pt-10 flex-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            <p className="text-3xl tracking-tight text-gray-900">
              {product.price}
            </p>
            {/* Available Colors */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">
                Available Colors
              </h3>
              <div className="mt-2 flex space-x-2">
                {product.colors.map((color) => (
                  <span
                    key={color.name}
                    className={classNames(
                      color.class,
                      "h-6 w-6 rounded-full border border-gray-300 cursor-pointer",
                      selectedColor === color.name
                        ? "ring-2 ring-indigo-500"
                        : ""
                    )}
                    title={color.name}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>
            {/* Reviews */}
            <div className="flex items-center mt-6">
              <Rating
                name="half-rating-read"
                defaultValue={averageRating}
                precision={0.1}
                readOnly
              />{" "}
              <span>({averageRating})</span>
              <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {product.reviews.length} reviews
              </p>
            </div>
            {/* quantity */}
            <div className="mt-4 flex items-center">
              <h3 className="text-sm mt-1 mr-3 font-medium text-gray-900">
                Quantity :
              </h3>
              <div className="mt-2 flex items-center">
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="mx-2 text-gray-900">{quantity}</span>
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 "
                  onClick={() =>
                    setQuantity((prevQuantity) =>
                      prevQuantity < 10 ? prevQuantity + 1 : prevQuantity
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="mt-16 flex w-3/4 items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Add to bag
            </button>
            <button
              type="submit"
              className="mt-5 flex w-3/4 items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
