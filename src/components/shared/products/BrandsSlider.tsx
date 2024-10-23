import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import BrandCard from "../../reusables/BrandCard";

// Define the structure for the Brand
interface Brand {
  id: number;
  name: string;
  image: string;
}

// Define the props for the BrandsSlider component
interface BrandsSlider {
  title: string;
  link: string;
  Brands?: Brand[]; // Optional, with default mock data provided
}

// Static data for testing purposes
const mockBrands: Brand[] = [
  {
    id: 1,
    name: "Brand A",
    image:
      "https://parkmallsetif-dz.com/wp-content/uploads/2023/12/defacto.jpg",
  },
  {
    id: 2,
    name: "Brand B",
    image:
      "https://parkmallsetif-dz.com/wp-content/uploads/2023/12/defacto.jpg",
  },
  {
    id: 3,
    name: "Brand B",
    image:
      "https://parkmallsetif-dz.com/wp-content/uploads/2023/12/defacto.jpg",
  },
  {
    id: 4,
    name: "Brand B",
    image:
      "https://parkmallsetif-dz.com/wp-content/uploads/2023/12/defacto.jpg",
  },
  {
    id: 5,
    name: "Brand B",
    image:
      "https://parkmallsetif-dz.com/wp-content/uploads/2023/12/defacto.jpg",
  },
  {
    id: 6,
    name: "Brand B",
    image:
      "https://parkmallsetif-dz.com/wp-content/uploads/2023/12/defacto.jpg",
  },
  {
    id: 7,
    name: "Brand B",
    image:
      "https://parkmallsetif-dz.com/wp-content/uploads/2023/12/defacto.jpg",
  },
  {
    id: 8,
    name: "Brand B",
    image:
      "https://parkmallsetif-dz.com/wp-content/uploads/2023/12/defacto.jpg",
  },
  {
    id: 9,
    name: "Brand B",
    image:
      "https://parkmallsetif-dz.com/wp-content/uploads/2023/12/defacto.jpg",
  },
  {
    id: 10,
    name: "Brand B",
    image:
      "https://parkmallsetif-dz.com/wp-content/uploads/2023/12/defacto.jpg",
  },
  // Add more brand data here...
];

export default function BrandsSlider({
  title,
  link,
  Brands = mockBrands, // Default to mock data for testing
}: BrandsSlider) {
  return (
    <div className="container">
      <div className="flexBetween px-8 py-4 max-sm:flex-col max-md:gap-2">
        <h1 className="text-blackText font-extrabold max-lg:text-2xl text-3xl">
          EXPLORE OUR BRANDs
        </h1>
        <Link
          to={link}
          className="button1 flexCenter max-md:px-0 max-md:text-xs px-2 h-9 max-md:w-24 w-28 text-sm font-bold"
        >
          View All
        </Link>
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={20}
        navigation
        breakpoints={{
          270: { slidesPerView: 1, slidesPerGroup: 1 },
          570: { slidesPerView: 2, slidesPerGroup: 2 },
          900: { slidesPerView: 2, slidesPerGroup: 2 },
          1280: { slidesPerView: 4, slidesPerGroup: 4 },
          1500: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
        className="rounded-xl"
      >
        {Brands.map((brand) => (
          <SwiperSlide key={brand.id} className="flex justify-center">
            <BrandCard brand={brand} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
