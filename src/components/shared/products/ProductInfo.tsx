import { useState } from "react";
import { t } from "i18next";

import { calculateAverageRating } from "../../../constants";
import { Rating } from "@mui/material";
import "../../../styles/product-info.css";

export default function ProductInfo({ product }) {
  const [activeTab, setActiveTab] = useState("product-details");

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const averageRating = parseFloat(
    calculateAverageRating(product.reviews).toString()
  );

  return (
    <div className="mt-6">
      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 sm:gap-14 border-b border-gray-300 pb-5">
        <button
          className={classNames(
            activeTab === "product-details" ? "text-gray-900" : "text-gray-400",
            "text-sm font-medium hover:text-gray-700 focus:outline-none transition-colors duration-300"
          )}
          onClick={() => setActiveTab("product-details")}
        >
          {t("productDetails")}
        </button>
        <button
          className={classNames(
            activeTab === "reviews" ? "text-gray-900" : "text-gray-400",
            "text-sm font-medium hover:text-gray-700 focus:outline-none transition-colors duration-300"
          )}
          onClick={() => setActiveTab("reviews")}
        >
          {t("reviews")} ({product.reviews.length})
        </button>
      </div>

      {/* Content */}
      <div className="mt-8 mb-9">
        {/* Product Details Tab */}
        {activeTab === "product-details" && (
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 p-6">
            {/* Product Description */}
            <div className="lg:w-5/12 w-full max-h-40">
              <h2 className="text-lg font-medium text-gray-900">
                {t("productDetails")}
              </h2>
              <p className="mt-4 text-sm text-gray-600">
                {product.translations.en.description}
              </p>
            </div>

            {/* Product Highlights */}
            {product.specifications && (
              <div className="lg:w-5/12 w-full">
                <h2 className="text-lg font-medium text-gray-900">
                  {t("highlights")}
                </h2>
                <ul className="mt-4 list-disc pl-5 text-sm text-gray-600 max-h-40 overflow-y-auto custom-scrollbar">
                  {Object.keys(product.specifications).map(
                    (specifications, index) => (
                      <li key={index} className="mb-2">
                        <div className="w-full">
                          <div className="p-2">
                            <strong>{specifications}</strong>
                            <br /> {product.specifications[specifications]}
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="max-w-3xl mx-auto px-4">
            {product.reviews.length > 0 ? (
              <div className="mt-4 max-h-80 space-y-6 overflow-y-auto custom-scrollbar">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-300 pb-6">
                    <div className="flex space-x-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={review.avatar} // Assuming there's an avatar property
                          alt={`${review.username}'s avatar`}
                        />
                      </div>

                      {/* Review Content */}
                      <div className="flex-1">
                        {/* Username and Rating */}
                        <div className="flex items-center justify-between">
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
                        {/* Review Comment */}
                        <p className="mt-2 text-sm text-gray-600">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center min-h-32">{t("noReviews")}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
