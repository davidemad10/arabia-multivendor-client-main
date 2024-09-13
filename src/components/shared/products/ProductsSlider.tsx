import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

export default function ProductsSlider() {

    return (
        <div className='container'>
            <div className='flexBetween px-8 py-4 max-sm:flex-col max-md:gap-2'>
                <h1 className=' text-blackText font-extrabold max-lg:text-2xl text-3xl'>اهم المنتجات</h1>
                <Link to={''} className='button1 flexCenter max-md:px-0 max-md:text-xs  px-2 h-9 max-md:w-24 w-28 text-sm font-bold'>مشاهدة الكل</Link>

            </div>
            <Swiper
                modules={[Navigation]}
                loop={false}
                slidesPerView={6}
                slidesOffsetBefore={-150}
                slidesOffsetAfter={-150}
                slidesPerGroup={6}
                centeredSlides={false}
                navigation
                initialSlide={25}
                loopAddBlankSlides={false}
                allowTouchMove={true}
                speed={500}
                spaceBetween={20}
                className='rounded-xl h-fit'
                breakpoints={{
                    270: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        spaceBetween: 0,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },

                    570: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 0,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },
                    900: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        spaceBetween: 10,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },


                    1280: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                        spaceBetween: 0,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },
                    1500: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                        spaceBetween: 0,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },

                }}

            >
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flexCenter'>
                        <ProductCard></ProductCard>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    )
}
