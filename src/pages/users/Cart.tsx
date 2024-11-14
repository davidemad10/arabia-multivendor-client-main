import { useQuery } from "@tanstack/react-query";
import {
  deleteOrderItem,
  getUserCart,
  updateOrderItem,
} from "../../api/userRequests";
import Loader from "../../components/reusables/Loader";
import { t } from "i18next";

const CartPage = () => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["order", "cart", "details"],
    queryFn: () => getUserCart(),
  });

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    try {
      const response = await updateOrderItem(itemId, quantity);
      console.log(`Item ID: ${itemId}, Quantity Change: ${quantity}`);
      console.log(response);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const response = await deleteOrderItem(itemId);
      console.log(`Item ID: ${itemId} removed from the cart.`);
      console.log(response);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || isRefetching) {
    return (
      <div className="mt-44 flex justify-center items-center">
        <Loader isLoading={true}></Loader>
      </div>
    );
  }

  if (error) {
    return <div>Error loading user cart.</div>;
  }

  // Conditional rendering for empty cart
  if (data?.data.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-20">
        <img
          className="rounded-full w-52 h-52 object-cover shadow-2xl mt-5 mb-12"
          src="https://images.pexels.com/photos/20614095/pexels-photo-20614095/free-photo-of-shopping-cart-against-orange-background.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Empty Cart"
        />
        <p className="font-bold text-gray-700 text-xl mb-3">{t("cartEmpty")}</p>
        <p className="font-light text-gray-500 text-sm">{t("startShopping")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl my-10 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>
      <div className="space-y-8">
        {data?.data.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-6 p-4 border-b border-gray-200"
          >
            {/* Product Image Carousel */}
            <div className="w-36 h-36 flex justify-center items-center overflow-hidden me-5">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {item.product.name}
              </h3>
              <span className="flex align-middle">
                <label className="mx-1 text-lg text-gray-700">
                  {t("price")} {":  "}
                </label>
                <p className="text-lg text-gray-600">
                  {item.product.price_after_discount} {t("currency")}
                </p>
              </span>

              <div className="flex items-center mt-3">
                <label className="mr-4 text-lg font-semibold text-gray-700">
                  {t("quantity")} :
                </label>
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="w-24 h-10 px-2 py-1 text-center text-gray-900 font-semibold bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  {[...Array(10)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mt-3 text-lg font-semibold text-gray-900">
                {t("subtotal")} : {item.sub_total.toFixed(2)} {t("currency")}
              </p>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="mt-3 text-red-600 hover:text-red-800 text-sm"
              >
                {t("remove")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 text-right">
        <h3 className="text-2xl font-semibold text-gray-900">
          Total: ${data?.data.total_price.toFixed(2)}
        </h3>
        <button className="mt-6 px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-800">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
