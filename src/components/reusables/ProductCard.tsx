import { MdOutlineFavorite, MdOutlineStar } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentFill } from "react-icons/ri";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import useFavorite from "../../Hooks/useFavorite";
const BASE_URL = "http://127.0.0.1:8000";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: string;
    oldPrice?: string;
    discount?: string;
    rating?: number;
    ratingCount?: string;
    isBestSeller?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, loading, toggleFavorite } = useFavorite(product.id);

  const addToCart = async () => {
    try {
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/en/api/order/addcart/",
        {
          product_id: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("Product added to cart:", response.data);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="flex bg-white flex-col flexCenter p-3 border border-gray-200 rounded-lg shadow-md w-48 h-[420px]">
      <div className="flex w-full relative">
        <div className="absolute -mt-3 w-full flex justify-between">
          {product.isBestSeller && (
            <span className="absolute top-2 start-2 bg-stone-600 rounded-lg px-2 py-1 text-white text-xs">
              Best Seller
            </span>
          )}
          <div
            className={`absolute top-2 end-2 flex items-center text-xl bg-white shadow-lg p-1 rounded-md cursor-pointer ${
              isFavorite ? "text-red-500" : "text-gray-500"
            }`}
            onClick={toggleFavorite}
          >
            <MdOutlineFavorite />
          </div>
          {/* <div
            className={`absolute top-2 end-2 flex items-center text-xl bg-white shadow-lg p-1 rounded-md cursor-pointer ${
              isFavorite ? "text-red-500" : "text-gray-500"
            }`}
            onClick={toggleFavorite}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <MdOutlineFavorite />
            )}
          </div> */}
        </div>
        <img
          className="w-52 h-72 object-cover rounded-lg"
          src={`${BASE_URL}${product.image}`}
          alt={product.name}
        />
        <div className="bottom-0 mb-1 absolute w-full flex justify-between">
          <div className="px-1 rounded-lg bg-white shadow-lg flex items-center gap-1">
            <div className="flex items-center">
              <span className="text-sm">{product.rating}</span>
              <MdOutlineStar className="text-red-500 text-sm" />
            </div>
            <span className="text-gray-500 text-xs">
              ({product.ratingCount})
            </span>
          </div>
          <div
            className="flex items-center text-xl bg-white shadow-lg p-1 rounded-md cursor-pointer text-black"
            onClick={addToCart}
          >
            <TiShoppingCart />
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-2">
        <h2 className="pb-1 text-sm text-wrap font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <div className="flex items-center mt-1">
          <strong className="text-lg font-bold text-gray-900">
            {product.price}
          </strong>
          {product.oldPrice && (
            <div className="flex items-end gap-1 ml-2">
              <span className="line-through text-xs text-gray-500">
                {product.oldPrice}
              </span>
              <span className="font-semibold text-xs text-green-600">
                {product.discount}
              </span>
            </div>
          )}
        </div>

        {/* <div className="mt-1 relative h-6 overflow-hidden flex items-center w-full">
          <motion.div
            className="absolute gap-1 flex"
            animate={{
              translateX: ["140px", "-140px"],
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "linear",
              },
            }}
          >
            <TbTruckDelivery className="text-lg text-blue-500" />
            <p className="text-xs text-gray-400">Free Delivery</p>
          </motion.div>

          <motion.div
            className="absolute gap-1 flex"
            animate={{
              translateX: ["140px", "-140px"],
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "linear",
                delay: 4,
              },
            }}
          >
            <RiDiscountPercentFill className="text-lg text-red-500" />
            <p className="text-xs text-gray-400">Grab Discounts</p>
          </motion.div>
        </div> */}
      </div>
    </div>
  );
}
