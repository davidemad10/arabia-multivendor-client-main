import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "../../reusables/ProductCard";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import Loader from "../../reusables/Loader";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  ratingCount?: string;
  isBestSeller?: boolean;
}

interface ProductsSliderProps {
  title: string;
  link: string;
  products?: Product[];
  isLoading: boolean;
}

export default function ProductsSlider({
  title,
  link,
  products = [],
  isLoading,
}: ProductsSliderProps) {
  const { i18n, t } = useTranslation();

  return (
    <div className="container">
      <div className="flexBetween px-8 py-2 mt-8 max-sm:flex-col max-md:gap-2">
        <h1 className="text-blackText font-extrabold max-lg:text-2xl text-3xl">
          {<Trans i18nKey={`${title}`}></Trans>}
        </h1>
        <Link
          to={link}
          className="button1 flexCenter max-md:px-0 max-md:text-xs px-2 h-9 max-md:w-24 w-28 text-sm font-bold"
        >
          <Trans i18nKey="view all"></Trans>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          {/* <span>Loading products...</span> */}
          {/* You could also add a spinner here */}
          <div>
            <Loader isLoading={isLoading} size={50} color="#4CAF50" />
            {!isLoading && <div>Data loaded!</div>}
          </div>
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          slidesPerView={6}
          slidesPerGroup={6}
          spaceBetween={10}
          navigation
          breakpoints={{
            270: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 8 },
            570: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 10 },
            900: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 12 },
            1280: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 10 },
            1500: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 10 },
          }}
          className="rounded-xl"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
