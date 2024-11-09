import { t } from "i18next";
import "../../../styles/wishlist.css";
import Loader from "../../../components/reusables/Loader";
import { useQuery } from "@tanstack/react-query";

const wishlist = [];

export default function Wishlist() {
  const { data, error, isLoading } = useQuery({
    queryKey: [""],
    queryFn: () => () => {},
  });

  if (isLoading) {
    return (
      <div className="mt-44 flex justify-center items-center">
        <Loader isLoading={true}></Loader>
      </div>
    );
  }

  if (error) {
    return <div>Error loading user wishlist.</div>;
  }

  return (
    <div className="bg-white w-full mx-auto my-5 p-10">
      {wishlist.length > 0 ? (
        <>
          <p className="text-gray-700 font-semibold mb-5">{t("wishlist")}</p>
          <div className="flex flex-wrap items-center justify-center h-96 overflow-y-auto no-scrollbar">
            yes
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
