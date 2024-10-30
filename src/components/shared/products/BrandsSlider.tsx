import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import BrandCard from "../../reusables/BrandCard";
import axiosInstance from "../../../api/axiosInstance";
import { Trans, useTranslation } from "react-i18next";

interface Brand {
  id: number;
  name: string;
  image: string;
  slug: string;
}

interface BrandsSlider {
  title: string;
  link: string;
  Brands?: Brand[];
}

export default function BrandsSlider({ title, link, Brands }: BrandsSlider) {
  const { i18n, t } = useTranslation();
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axiosInstance.get("/products/brand/");
        const brandsData = response.data.map((brand: any) => ({
          id: brand.id,
          name: brand.translations.en.name,
          image: brand.image,
          slug: brand.slug,
        }));
        setBrands(brandsData);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };
    fetchBrands();
  }, []);
  return (
    <div className="container">
      <div className="flexBetween px-8 py-2 mt-4 max-sm:flex-col max-md:gap-2">
        <h1 className="text-blackText font-extrabold max-lg:text-2xl text-3xl">
          <Trans i18nKey="EXPLORE OUR BRANDS"></Trans>
        </h1>
        {/* <Link
          to={link}
          className="button1 flexCenter max-md:px-0 max-md:text-xs px-2 h-9 max-md:w-24 w-28 text-sm font-bold"
        >
          <Trans i18nKey="view all"></Trans>
        </Link> */}
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={10}
        navigation
        breakpoints={{
          270: { slidesPerView: 1, slidesPerGroup: 1 },
          570: { slidesPerView: 3, slidesPerGroup: 3 },
          900: { slidesPerView: 3, slidesPerGroup: 3 },
          1280: { slidesPerView: 5, slidesPerGroup: 5 },
          1500: { slidesPerView: 5, slidesPerGroup: 5 },
        }}
        className="rounded-xl"
      >
        {brands.map((brand) => (
          <div className="flex flex-col">
            <SwiperSlide key={brand.id} className="flex justify-center">
              <Link to={`/brand/${brand.slug}`}>
                <BrandCard brand={brand} />
              </Link>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
}
