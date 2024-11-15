import { t } from "i18next";
import "../../../styles/wishlist.css";
import Loader from "../../../components/reusables/Loader";
import { useQuery } from "@tanstack/react-query";
import {
  getUserWishlist,
  removeProductFromWishlist,
} from "../../../api/userRequests";

export default function Wishlist() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["account", "favorites", "products"],
    queryFn: () => getUserWishlist(),
  });

  function removeFromWishlist(id: string) {
    console.log("Product with id:" + id + " was removed from wishlist");
    const response = removeProductFromWishlist(id);
    console.log(response);
    if (response.status == 204) {
      data?.data.filter((item) => item.id == id);
    }
    refetch();
  }

  if (isLoading) {
    return (
      <div className="mt-44 flex justify-center items-center">
        <Loader isLoading={true} />
      </div>
    );
  }

  if (error) {
    return <div>Error loading user wishlist.</div>;
  }

  return (
    <div className="bg-white w-full mx-auto my-5 p-10 pb-20">
      {data?.data.length > 0 ? (
        <>
          <p className="text-gray-700 font-semibold mb-10">{t("wishlist")}</p>
          <div className="flex flex-wrap items-center justify-center h-96 gap-4">
            {data?.data.map((product) => (
              <div
                key={product.id}
                className="w-64 bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
                style={{ height: "430px" }}
              >
                <img
                  src={product.images[0]}
                  alt={product.translations.en.name}
                  className="w-48 h-48 object-cover rounded-md mb-4"
                />
                <p className="text-sm text-gray-500 font-medium">
                  {product.brand.translations.en.name}
                </p>
                <p className="text-gray-800 font-semibold text-center mt-2 mb-1 line-clamp-2">
                  {product.translations.en.name}
                </p>
                <div className="flex items-center space-x-2 mt-auto gap-2">
                  <span className="text-gray-500 line-through">
                    {product.price_before_discount} {t("currency")}
                  </span>
                  <span className="text-red-500 font-bold">
                    {product.price_after_discount} {t("currency")}
                  </span>
                </div>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full"
                >
                  {t("remove")}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center ">
          <img
            className="rounded-full w-52 h-52 object-cover shadow-2xl mt-5 mb-12"
            src="public/images/pexels-photo-4068314.webp"
            alt="profile"
          />
          <p className="font-bold text-gray-700 text-xl mb-3">
            {t("readyToMakeAWish")}
          </p>
          <p className="font-light text-gray-500 text-sm">
            {t("addToWishlistMessage")}
          </p>
        </div>
      )}
    </div>
  );
}
