import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Slider } from '../../../types';




interface HeroSliderProps {
  sliders: Slider[];
  isPending: boolean;
}


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
      className=' container h-96 cursor-grab'
    >
      {isPending && !sliders ? (
        <div className='w-full relative flex flexCenter h-screen bg-[url("./panar")] bg-cover'>
          logking
        </div>
      ) : (
        <>
          {sliders.map((slider) => (
          <SwiperSlide key={slider.id}>
            <div className='w-full bg-cover flex flexCenter h-screen'>
              <img className='h-full w-full' src={slider.translations.ar.image } alt="" />
            </div>
          </SwiperSlide>
          ))}
        </>
      )}


    </Swiper>
  )
}
