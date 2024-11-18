import React from "react";
import { IoMdClose } from "react-icons/io";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { deleteOrderItem, getUserCart } from "../../../api/userRequests";

interface SideCartProps {
  isCartOpen: boolean;
  setSideCart: () => void;
}

const SideCart: React.FC<SideCartProps> = ({ isCartOpen, setSideCart }) => {
  const { t, i18n } = useTranslation();
  const token = sessionStorage.getItem("accessToken");

  // Use React Query for fetching cart data
  const {
    data: cartData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["userCart"], // Unique identifier for this query
    queryFn: getUserCart, // Function to fetch the data
    enabled: !!token, // Only fetch if token exists
    retry: 1, // Retry only once on failure
  });

  if (!token) {
    return (
      <Dialog open={isCartOpen} onClose={setSideCart} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-900 bg-opacity-35 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen flex items-center justify-center">
          <DialogPanel className="rounded-lg bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-medium text-gray-900">
              {t("Shopping Cart")}
            </DialogTitle>
            <p className="mt-4 text-sm text-gray-500">
              {t("Please sign in to view your cart.")}
            </p>
            <button
              onClick={setSideCart}
              className="mt-6 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              {t("Close")}
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog open={isCartOpen} onClose={setSideCart} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-900 bg-opacity-35 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <DialogPanel
            className={`fixed flex flex-col h-screen rounded-lg bg-white shadow-xl transition-all ${
              i18n.dir() === "rtl" ? "left-0" : "right-0"
            } w-96`}
          >
            <div className="flex h-full flex-col bg-white">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <DialogTitle className="text-lg font-medium text-gray-900">
                    {t("Shopping Cart")}
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={setSideCart}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <IoMdClose aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>

                {isLoading || isFetching ? (
                  <p className="mt-8 text-sm text-gray-500">
                    {t("Loading...")}
                  </p>
                ) : isError ? (
                  <p className="mt-8 text-sm text-red-500">
                    {t("Error fetching cart: {{error}}", {
                      error: error.message,
                    })}
                  </p>
                ) : cartData?.data?.items.length === 0 ? (
                  // Handle empty cart
                  <div className="mt-8 text-center text-lg font-semibold text-gray-500">
                    {t("cartEmpty")}
                  </div>
                ) : (
                  <div className="mt-8 flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cartData?.data?.items.map((item: any) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={
                                item.product.images.length > 0
                                  ? item.product.images[0].image
                                  : "https://via.placeholder.com/150" // Placeholder image if none are available
                              }
                              alt={
                                item.product.images.length > 0
                                  ? item.product.images[0].alt_text
                                  : "No Image Available"
                              }
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ltr:ml-4 rtl:mr-4 flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{item.product.name}</a>
                              </h3>
                              <p>
                                {item.product.price_after_discount}{" "}
                                {t("currency")}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">
                                {t("Quantity")}: {item.quantity}
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  deleteOrderItem(item.id);
                                  refetch();
                                }}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                {t("remove")}
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>{t("subtotal")}</p>
                  <p>
                    {cartData?.data?.total_price} {t("currency")}
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  {t("Shipping and taxes calculated at checkout.")}
                </p>
                <div className="mt-6">
                  <a
                    href="#"
                    className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    {t("reviewYourOrder")}
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SideCart;
