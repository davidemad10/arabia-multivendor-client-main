import { useState } from "react";
import { calculateAverageRating } from "../../../constants";
import { Rating } from "@mui/material";

export default function ProductInfo({ product }) {
  const [activeTab, setActiveTab] = useState("product-details");

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const averageRating = parseFloat(
    calculateAverageRating(product.reviews).toString()
  );

  return (
    <div className="mt-16 h-96">
      {/* navigation buttons */}
      <div className="mt-5 flex justify-center gap-14 border-b border-gray-300 pb-5">
        <button
          className={classNames(
            activeTab === "product-details" ? "text-gray-900" : "text-gray-400",
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
          REVIEWS ({product.reviews.length})
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

      {/* content */}
      <div className="mt-8">
        {activeTab === "product-details" && (
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Product Details
            </h2>
            <p className="mt-4 text-sm text-gray-600">{product.description}</p>
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
            <div className="mt-4 space-y-4">
              {product.reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {review.username}
                    </div>
                    <Rating
                      name="half-rating-read"
                      defaultValue={review.rating}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
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
  );
}
