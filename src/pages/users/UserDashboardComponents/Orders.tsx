import { t } from "i18next";

const rows = [];

export default function Orders() {
  return (
    <div className="bg-white w-full mx-auto my-5 p-10">
      {rows.length > 0 ? (
        ""
      ) : (
        <div className="flex flex-col items-center justify-center ">
          <img
            className="rounded-full w-52 h-52 object-cover shadow-2xl mt-5 mb-12"
            src="public\images\pexels-photo-6348126.jpeg"
            alt="profile"
          />
          <p className="font-bold text-gray-700 text-xl mb-3">
            {t("noPreviousOrders")}
          </p>
          <p className="font-light text-gray-500 text-sm">
            {t("startOrdering")}
          </p>
        </div>
      )}
    </div>
  );
}
