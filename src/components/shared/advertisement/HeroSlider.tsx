import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Slider } from "../../../types";

interface HeroSliderProps {
  sliders: Slider[];
  isPending: boolean;
}

const lang = "ar";

export default function HeroSlider({ sliders, isPending }: HeroSliderProps) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      effect="cards"
      loop
      pagination={true}
      autoplay={{ delay: 7000 }}
      className=" container h-96 cursor-grab my-10"
    >
      {isPending && !sliders ? (
        <div className='w-full relative flex flexCenter h-screen bg-[url("./panar")] bg-cover'>
          loading
        </div>
      ) : (
        <>
          {sliders.map((slider) => (
            <SwiperSlide key={slider.id}>
              <div
                className="w-full flex flexCenter h-screen bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slider.translations[lang].image})`,
                }}
              ></div>
            </SwiperSlide>
          ))}
        </>
      )}
    </Swiper>
  );
}
