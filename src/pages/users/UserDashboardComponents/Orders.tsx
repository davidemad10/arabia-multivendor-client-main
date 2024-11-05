import { t } from "i18next";
import { getUserOrders } from "../../../api/userRequests";
import { useQuery } from "@tanstack/react-query";

// const orders = [
//   {
//     id: "24a29635-ed6a-4339-b899-53f88f142b44",
//     is_paid: true,
//     created: "2024-10-29T08:34:30.262101Z",
//     payment_method: "COD",
//     total_price: "400.00",
//     order_items: [
//       {
//         id: 4,
//         product: {
//           productName: "tshirt",
//           brand: { translations: { en: { name: "adidas" } } },
//           category: { translations: { en: { name: "clothes" } } },
//           price_after_discount: "400.00",
//           images: [
//             {
//               image:
//                 "http://localhost:8000/media/product/images/tshirt/download_2.jpeg",
//               alt_text: "test1",
//             },
//           ],
//         },
//         quantity: 1,
//         total_price: 400.0,
//       },
//     ],
//   },
//   {
//     id: "37b29635-ed6a-4339-b899-53f88f142b35",
//     is_paid: false,
//     created: "2024-10-30T11:45:10.000Z",
//     payment_method: "Credit Card",
//     total_price: "950.00",
//     order_items: [
//       {
//         id: 5,
//         product: {
//           productName: "sneakers",
//           brand: { translations: { en: { name: "Nike" } } },
//           category: { translations: { en: { name: "footwear" } } },
//           price_after_discount: "500.00",
//           images: [
//             {
//               image:
//                 "http://localhost:8000/media/product/images/sneakers/download_3.jpeg",
//               alt_text: "sneakers",
//             },
//           ],
//         },
//         quantity: 1,
//         total_price: 500.0,
//       },
//       {
//         id: 6,
//         product: {
//           productName: "backpack",
//           brand: { translations: { en: { name: "North Face" } } },
//           category: { translations: { en: { name: "accessories" } } },
//           price_after_discount: "450.00",
//           images: [
//             {
//               image:
//                 "http://localhost:8000/media/product/images/backpack/download_4.jpeg",
//               alt_text: "backpack",
//             },
//           ],
//         },
//         quantity: 1,
//         total_price: 450.0,
//       },
//     ],
//   },
//   {
//     id: "12a29635-ed6a-4339-b899-53f88f142b50",
//     is_paid: true,
//     created: "2024-11-01T14:20:50.000Z",
//     payment_method: "PayPal",
//     total_price: "1200.00",
//     order_items: [
//       {
//         id: 7,
//         product: {
//           productName: "smartwatch",
//           brand: { translations: { en: { name: "Apple" } } },
//           category: { translations: { en: { name: "electronics" } } },
//           price_after_discount: "1200.00",
//           images: [
//             {
//               image:
//                 "http://localhost:8000/media/product/images/smartwatch/download_5.jpeg",
//               alt_text: "smartwatch",
//             },
//           ],
//         },
//         quantity: 1,
//         total_price: 1200.0,
//       },
//     ],
//   },
//   {
//     id: "56d29635-ed6a-4339-b899-53f88f142b78",
//     is_paid: false,
//     created: "2024-11-02T09:15:30.000Z",
//     payment_method: "Bank Transfer",
//     total_price: "700.00",
//     order_items: [
//       {
//         id: 8,
//         product: {
//           productName: "laptop stand",
//           brand: { translations: { en: { name: "Generic" } } },
//           category: { translations: { en: { name: "office supplies" } } },
//           price_after_discount: "300.00",
//           images: [
//             {
//               image:
//                 "http://localhost:8000/media/product/images/laptop_stand/download_6.jpeg",
//               alt_text: "laptop stand",
//             },
//           ],
//         },
//         quantity: 1,
//         total_price: 300.0,
//       },
//       {
//         id: 9,
//         product: {
//           productName: "wireless mouse",
//           brand: { translations: { en: { name: "Logitech" } } },
//           category: { translations: { en: { name: "electronics" } } },
//           price_after_discount: "400.00",
//           images: [
//             {
//               image:
//                 "http://localhost:8000/media/product/images/mouse/download_7.jpeg",
//               alt_text: "wireless mouse",
//             },
//           ],
//         },
//         quantity: 1,
//         total_price: 400.0,
//       },
//     ],
//   },
// ];

export default function Orders() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["order", "orders"],
    queryFn: () => getUserOrders(),
  });
  console.log(data);

  {
    isLoading && <div>Loading ...</div>;
  }
  {
    error && <div>Error ..</div>;
  }
  return (
    <div className="bg-white w-full mx-auto my-5 p-10">
      {data?.data?.length > 0 ? (
        <div className="space-y-8">
          {data?.data?.map((order) => (
            <div key={order.id} className="border p-5 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {t("order")} #{order.id}
              </h2>
              <p className="text-sm text-gray-600">
                {t("orderDate")}: {new Date(order.created).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                {t("totalPrice")}: ${order.total_price}
              </p>
              <p className="text-sm text-gray-600">
                {t("paymentMethod")}: {order.payment_method}
              </p>
              <p className="text-sm text-gray-600">
                {t("status")}: {order.is_paid ? t("paid") : t("unpaid")}
              </p>

              <div className="mt-5 space-y-4">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex space-x-4 items-start">
                    <img
                      src={item.product.images[0].image}
                      alt={item.product.images[0].alt_text}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-md font-semibold text-gray-700">
                        {item.product.productName} (
                        {item.product.brand.translations.en.name})
                      </h3>
                      <p className="text-sm text-gray-500">
                        {t("category")}:{" "}
                        {item.product.category.translations.en.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("price")}: ${item.product.price_after_discount}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("quantity")}: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("total")}: ${item.total_price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center ">
          <img
            className="rounded-full w-52 h-52 object-cover shadow-2xl mt-5 mb-12"
            src="public/images/pexels-photo-6348126.jpeg"
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
