import { motion } from 'framer-motion';
import { MdAddShoppingCart, MdOutlineFavorite, MdOutlineStar } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { TiShoppingCart } from 'react-icons/ti';


export default function ProductCard() {
    return (
        <div className='flex bg-white  flex-col flexCenter p-4 border border-gray-200 rounded-xl shadow-lg w-56 h-[470px]'>
            <div className='flex w-full relative'>
                <div className=' absolute -mt-3 w-full flex flexBetween'>
                    <span className=' bg-stone-600 rounded-xl px-2 py-px text-white text-sm'>الأكثر مبيعا</span>
                    <div className='flex flexCenter text-2xl bg-white shadow-2xl  p-2 rounded-lg cursor-pointer text-Red'>
                        <MdOutlineFavorite></MdOutlineFavorite >
                    </div>
                </div>
                <img className='w-full' src="./465.jpg" alt="" />
                <div className=' bottom-0 mb-2 absolute w-full flex flexBetween'>
                    <div className=' px-2 rounded-xl bg-white shadow-2xl flexCenter flex gap-2'>
                        <div className='flex flexCenter'>
                            <span>4.6</span>
                            <span> <MdOutlineStar className='text-Red'></MdOutlineStar> </span>
                        </div>
                        <span className='text-gray-500 text-sm'>(1.2K)</span>
                    </div>
                    <div className='flex flexCenter text-2xl bg-white shadow-2xl  p-2 rounded-lg cursor-pointer text-blackText'>
                        <TiShoppingCart ></TiShoppingCart>
                    </div>
                </div>
            </div>
            
            <div className='flex flex-col'>
                <h2 className='pb-2 text-blackText'>ابل ايوفن 15 بسعة  256 تيتانيوم طبيعي,4....</h2>
                <h2 className=' text-blackText/50 text-sm font-bold '>apple</h2>
                <div className='flex flexStart mt-1'>
                    <div className='flex gap-1'>
                        <div className=''>
                            <span className='text-gray-500 text-sm'>جنية</span>
                            <strong className='px-px text-xl font-extrabold text-blackText/90 '>1000</strong>
                        </div>
                        <div className='flex flexEnd gap-1'>
                            <span className=' line-through text-sm pb-2 text-gray-500'>45465</span>
                            <span className=' font-bold text-sm pb-2 text-green-600'>خصم 20%</span>
                        </div>
                    </div>
                </div>
                <div className=' mt-2 relative h-8 overflow-hidden flex flexCenter w-full '>
                    <motion.div
                        className='absolute gap-1 flex'
                        animate={{
                            translateX: ['165px', '-165px'],
                            transition: { duration: 8, repeat: Infinity, repeatDelay: 5, ease: 'linear' }
                        }}
                    >
                        <TbTruckDelivery className='text-xl text-blue-500'></TbTruckDelivery>
                        <p className='text-sm text-gray-400'>توصيل مجاني</p>
                    </motion.div>

                    <motion.div
                        className='absolute gap-1 flex'
                        animate={{
                            translateX: ['165px', '-165px'],
                            transition: { duration: 8, repeat: Infinity, repeatDelay: 5, ease: 'linear', delay: 4 }
                        }}
                    >
                        <RiDiscountPercentFill className='text-xl text-Red'></RiDiscountPercentFill>
                        <p className='text-sm text-gray-400'>الحق الخصومات</p>
                    </motion.div>


                </div>
                <div className='flex mt-2 flexStart'>
                    <span className='w-fit font-extrabold text-white px-2 py-px bg-Red text-xs rounded-b-xl font-Reem rounded-tr-xl'>Arpia</span>
                </div>
            </div>
        </div>
    )
}
