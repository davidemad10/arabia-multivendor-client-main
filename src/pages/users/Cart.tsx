import { deleteOrderItem, updateOrderItem } from "../../api/userRequests";

const CartPage = () => {
  const handleQuantityChange = async (itemId: string, increment: number) => {
    try {
      const response = await updateOrderItem(itemId, increment);
      console.log(`Item ID: ${itemId}, Quantity Change: ${increment}`);
      console.log(response);
      //! handle reponse.success and any error
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const response = await deleteOrderItem(itemId);
      console.log(`Item ID: ${itemId} removed from the cart.`);
      console.log(response);
      //! handle reponse.success and any error
    } catch (error) {
      console.log(error);
    }
  };

  const cart = {
    id: "8c321a04-4b9c-4b91-b9cc-065f777b712e",
    items: [
      {
        id: "6aa0f2f1-1d77-4946-a7f0-ddb53b82900d",
        cart: "8c321a04-4b9c-4b91-b9cc-065f777b712e",
        product: {
          id: "7609aa27-eb5f-4053-8016-f079de3cfaa6",
          name: "Tshirt",
          price_after_discount: "400.00",
          images: [
            {
              id: 1,
              image:
                "http://localhost:8000/media/product/images/tshirt/download_2.jpeg",
              alt_text: "test1",
            },
            {
              id: 2,
              image:
                "http://localhost:8000/media/product/images/tshirt/download_3.jpeg",
              alt_text: "test2",
            },
          ],
        },
        quantity: 3,
        sub_total: 400.0,
      },
      {
        id: "c69f5b24-1607-4433-a4db-36c72ad448eb",
        cart: "8c321a04-4b9c-4b91-b9cc-065f777b712e",
        product: {
          id: "94b216cd-9770-4970-901d-15b7fe163fde",
          name: "Man Oversize Fit Hooded Long Sleeve Denim Jacket",
          price_after_discount: "1500.00",
          images: [
            {
              id: 6,
              image:
                "http://localhost:8000/media/product/images/Man%20Oversize%20Fit%20Hooded%20Long%20Sleeve%20Denim%20Jacket/defacto_jacket.jpg",
              alt_text: "man-oversize-fit-hooded-long-sleeve-denim-jacket",
            },
          ],
        },
        quantity: 1,
        sub_total: 1500.0,
      },
    ],
    total_price: 1900.0,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>
      <div className="space-y-8">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-6 p-4 border-b border-gray-200"
          >
            {/* Product Image Carousel */}
            <div className="w-36 h-36 flex justify-center items-center overflow-hidden me-5">
              <img
                src={item.product.images[0].image}
                alt={item.product.images[0].alt_text}
                className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {item.product.name}
              </h3>
              <p className="text-lg text-gray-600 mt-2">
                Price: ${item.product.price_after_discount}
              </p>

              <div className="flex items-center mt-3">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
                >
                  -
                </button>
                <div className="text-lg font-semibold mx-4">
                  {item.quantity}
                </div>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
                >
                  +
                </button>
              </div>

              <p className="mt-3 text-lg font-semibold text-gray-900">
                Subtotal: ${item.sub_total.toFixed(2)}
              </p>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="mt-3 text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 text-right">
        <h3 className="text-2xl font-semibold text-gray-900">
          Total: ${cart.total_price.toFixed(2)}
        </h3>
        <button className="mt-6 px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
