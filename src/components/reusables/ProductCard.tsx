import { MdOutlineFavorite, MdOutlineStar } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentFill } from "react-icons/ri";
import { motion } from "framer-motion";

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
  return (
    <div className="flex bg-white flex-col flexCenter p-4 border border-gray-200 rounded-xl shadow-lg w-56 h-[470px]">
      <div className="flex w-full relative">
        <div className="absolute -mt-3 w-full flex flexBetween">
          {product.isBestSeller && (
            <span className="bg-stone-600 rounded-xl px-2 py-px text-white text-sm">
              Best Seller
            </span>
          )}
          <div className="flex flexCenter text-2xl bg-white shadow-2xl p-2 rounded-lg cursor-pointer text-red-500">
            <MdOutlineFavorite />
          </div>
        </div>
        <img className="w-full" src={product.image} alt={product.name} />
        <div className="bottom-0 mb-2 absolute w-full flex flexBetween">
          <div className="px-2 rounded-xl bg-white shadow-2xl flexCenter flex gap-2">
            <div className="flex flexCenter">
              <span>{product.rating}</span>
              <MdOutlineStar className="text-Red" />
            </div>
            <span className="text-gray-500 text-sm">
              ({product.ratingCount})
            </span>
          </div>
          <div className="flex flexCenter text-2xl bg-white shadow-2xl p-2 rounded-lg cursor-pointer text-black">
            <TiShoppingCart />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="pb-2 text-blackText">{product.name}</h2>
        <div className="flex flexStart mt-1">
          <div className="flex gap-1">
            <strong className="px-px text-xl font-extrabold text-blackText/90">
              {product.price}
            </strong>
            {product.oldPrice && (
              <div className="flex flexEnd gap-1">
                <span className="line-through text-sm pb-2 text-gray-500">
                  {product.oldPrice}
                </span>
                <span className="font-bold text-sm pb-2 text-green-600">
                  {product.discount}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 relative h-8 overflow-hidden flex flexCenter w-full">
          <motion.div
            className="absolute gap-1 flex"
            animate={{
              translateX: ["165px", "-165px"],
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "linear",
              },
            }}
          >
            <TbTruckDelivery className="text-xl text-blue-500" />
            <p className="text-sm text-gray-400">Free Delivery</p>
          </motion.div>

          <motion.div
            className="absolute gap-1 flex"
            animate={{
              translateX: ["165px", "-165px"],
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "linear",
                delay: 4,
              },
            }}
          >
            <RiDiscountPercentFill className="text-xl text-red-500" />
            <p className="text-sm text-gray-400">Grab Discounts</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
