import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Categories } from '../../../types';


interface HeroSliderProps {
    categories: Categories[];
    isPending: boolean;
}



export default function CategoriesSlider({ categories, isPending }: HeroSliderProps) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            loop={false}
            slidesPerView={7}
            slidesPerGroup={7}
            slidesOffsetBefore={-150}
            slidesOffsetAfter={-150}
            centeredSlides={false}
            navigation
            pagination={true}
            initialSlide={1}
            loopAddBlankSlides={false}
            allowTouchMove={true}
            speed={500}
            spaceBetween={-320}
            className='rounded-xl h-fit container cursor-grab bg-stone-50'
            breakpoints={{
                270: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 0,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                },
                450: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 0,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                },
                570: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 0,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                },
                850: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    spaceBetween: 0,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                },

                1280: {
                    slidesPerView: 7,
                    slidesPerGroup: 7,
                    spaceBetween: 0,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                },
                1500: {
                    slidesPerView: 8,
                    slidesPerGroup: 8,
                    spaceBetween: 0,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                }
            }}

        >
            {isPending && !categories ? (
                <div></div>
            ) : (
                <>
                    {categories.map((category) => (

                        <SwiperSlide key={category.id} className='py-5'>
                            <div className='  flexCenter flex-col gap-1'>
                                <img className=' w-24 h-24 max-md:w-16 max-md:h-16 rounded-full' src={`${import.meta.env.VITE_BACKEND_URL}/${category.image}`} alt="" />
                                <h2 className=' font-bold text-blackText max-md:text-sm text-lg'>{category.translations.ar.name}</h2>
                            </div>
                        </SwiperSlide>
                    ))}
                </>
            )}
        </Swiper>
    )
}
