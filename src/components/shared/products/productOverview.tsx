import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

import "../../../styles/product-overview.css";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1562424995-2efe650421dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1667891838018-a6df081da495?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1665413642308-c5c1ed052d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(0);
  const [activeTab, setActiveTab] = useState("product-details");
  return (
    <div className="bg-white">
      <div className="pt-6">
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
                      "h-6 w-6 rounded-full border border-gray-300"
                    )}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            {/* Reviews */}
            <div className="flex items-center mt-6">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      reviews.average > rating
                        ? "text-gray-900"
                        : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                  />
                ))}
              </div>
              <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {reviews.totalCount} reviews
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
        <div className="mt-16 h-96">
          {/* Product Details */}
          <div className="mt-5 flex justify-center gap-14 border-b border-gray-300 pb-5">
            <button
              className={classNames(
                activeTab === "product-details"
                  ? "text-gray-900"
                  : "text-gray-400",
                "text-sm font-medium hover:text-gray-700 focus:outline-none"
              )}
              onClick={() => setActiveTab("product-details")}
            >
              PRODUCT DETAILS
            </button>
            <button
              className={classNames(
                activeTab === "reviews" ? "text-gray-900" : "text-gray-400",
                "text-sm font-medium hover:text-gray-700 focus:outline-none"
              )}
              onClick={() => setActiveTab("reviews")}
            >
              REVIEWS
            </button>
            <button
              className={classNames(
                activeTab === "shipping-payment"
                  ? "text-gray-900"
                  : "text-gray-400",
                "text-sm font-medium hover:text-gray-700 focus:outline-none"
              )}
              onClick={() => setActiveTab("shipping-payment")}
            >
              SHIPPING & PAYMENT
            </button>
          </div>
          <div className="mt-8">
            {activeTab === "product-details" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Product Details
                </h2>
                <p className="mt-4 text-sm text-gray-600">
                  {product.description}
                </p>
                <ul className="mt-4 list-disc pl-5 text-sm text-gray-600">
                  {product.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-600">{product.details}</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">Reviews</h2>
                <p className="mt-4 text-sm text-gray-600">
                  Customer reviews will go here.
                </p>
              </div>
            )}
            {activeTab === "shipping-payment" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping & Payment
                </h2>
                <p className="mt-4 text-sm text-gray-600">
                  Shipping and payment details will go here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
