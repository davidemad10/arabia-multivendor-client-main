
import HeroSlider from '../../../components/shared/advertisement/HeroSlider'
import CategoriesSlider from '../../../components/shared/products/CategoriesSlider'
import ProductsSlider from '../../../components/shared/products/ProductsSlider'
import BrandsUlove from '../../../components/shared/products/BrandsUlove'
import { Helmet } from 'react-helmet';
import { useGetHeroSliders } from '../../../lib/react-query/advertisement';
import { useTranslation } from 'react-i18next';
import { useGetCategories } from '../../../lib/react-query/product';

export default function Home() {

  const { t } = useTranslation()
  const sliders = useGetHeroSliders()
  const categories = useGetCategories('', true)


  return (
    <div>
      <Helmet>
        <title>أربيا - متجر إلكتروني متعدد البائعين</title>
        <link rel="icon" type="image/svg+xml" href="/654651.png" />
        <meta name="description" content="أربيا هو متجر إلكتروني متنوع يقدم مجموعة واسعة من المنتجات من مختلف البائعين. تسوق الآن واكتشف العروض الحصرية والمنتجات المميزة." />
        <meta name="keywords" content="أربيا, متجر إلكتروني, تسوق عبر الإنترنت, منتجات متعددة, بائعين, عروض خاصة, تسوق" />
        <meta property="og:title" content="أربيا - متجر إلكتروني متعدد البائعين" />
        <meta property="og:description" content="أربيا هو وجهتك المفضلة للتسوق عبر الإنترنت. استعرض مجموعة واسعة من المنتجات والعروض من أفضل البائعين." />
        <meta property="og:image" content="https://example.com/path/to/your/og-image.jpg" />
        <meta property="og:url" content="https://example.com/home" />
      </Helmet>
      <main>
        <div className=' flexCenter flex-col'>
          <div className=' container flex justify-center flex-col'>
            <div className='pb-1 w-full'>
              <img src="/Banner-Egypt-1697117327.jpg" alt="" />
            </div>
            <div className=''>
              <HeroSlider sliders={sliders.data || []} isPending={sliders.isPending} />
            </div>
            <div className=''>
              <CategoriesSlider categories={categories.data || []} isPending={categories.isPending}></CategoriesSlider>
            </div>
            <div className='w-full flexCenter '>
              <div className='w-1/5'>
                <img src="/25-b2s-smart-watch-ar3.jpg" alt="" />
              </div>
              <div className='w-1/5'>
                <img src="/24-b2s-gaming-monitors-ar3.jpg" alt="" />
              </div>
              <div className='w-1/5'>
                <img src="/23-b2s-smarthome-ar3.jpg" alt="" />
              </div>
              <div className='w-1/5'>
                <img src="/25-b2s-smart-watch-ar3.jpg" alt="" />
              </div>
              <div className='w-1/5'>
                <img src="/22-b2s-projectors-ar3.jpg" alt="" />
              </div>
            </div>

            {/* <div className=' container  flexCenter py-10 flex-col'>
              <h4 className=' text-blackText font-medium text-2xl '>مباشرة من نايكي</h4>
              <h3 className=' text-blackText font-bold text-4xl py-10'>مجموعة جديدة</h3>
              <div className=' flexCenter w-full md:h-[700px] mb-10  '>
                <div className=' flexCenter  h-full w-1/2   flex-wrap gap-9   '>
                  <div className='w-2/5 md:h-[47.5%] gap-14   rounded-lg  flexCenter flex-col bg-gray-100'>
                    <img className='w-2/3 ' src="./5646.png" alt="" />
                    <div className='flex flexAround w-full'>
                      <h3 className='font-bold  text-black '>نايك اس بي زووم</h3>
                      <span className=' px-3 py-1 text-orange-500 font-bold bg-white rounded-xl text-sm'>999$</span>
                    </div>
                  </div>
                  <div className='w-2/5 md:h-[47%] gap-14   rounded-lg  flexCenter flex-col bg-gray-100'>
                    <img className='w-2/3 ' src="./5646.png" alt="" />
                    <div className='flex flexAround w-full'>
                      <h3 className='font-bold  text-black '>نايك اس بي زووم</h3>
                      <span className=' px-3 py-1 text-orange-500 font-bold bg-white rounded-xl text-sm'>999$</span>
                    </div>
                  </div>
                  <div className='w-2/5 md:h-[47%] gap-14   rounded-lg  flexCenter flex-col bg-gray-100'>
                    <img className='w-2/3 ' src="./5646.png" alt="" />
                    <div className='flex flexAround w-full'>
                      <h3 className='font-bold  text-black '>نايك اس بي زووم</h3>
                      <span className=' px-3 py-1 text-orange-500 font-bold bg-white rounded-xl text-sm'>999$</span>
                    </div>
                  </div>
                  <div className='w-2/5 md:h-[47%] gap-14   rounded-lg  flexCenter flex-col bg-gray-100'>
                    <img className='w-2/3 ' src="./5646.png" alt="" />
                    <div className='flex flexAround w-full'>
                      <h3 className='font-bold  text-black '>نايك اس بي زووم</h3>
                      <span className=' px-3 py-1 text-orange-500 font-bold bg-white rounded-xl text-sm'>999$</span>
                    </div>
                  </div>
                </div>
                <div className=' gap-36 flex-col flexCenter w-2/5 rounded-lg bg-gray-100 h-full'>
                  <div className='flex flexAround gap-96 w-full'>
                    <h3 className=' text-white bg-black rounded-2xl px-3 py-1'>بيع -50%</h3>
                    <span className=' px-3 py-1 text-orange-500 font-bold bg-white rounded-xl text-sm'>999$</span>
                  </div>
                  <div className=' flexCenter w-full flex-col'>
                    <img className='w-2/3 ' src="./5646.png" alt="" />
                    <div className='flex w-full gap-5 flex-col items-start px-16 justify-center'>
                      <h3 className='font-bold text-2xl text-black'>نايك اير فورس 1 شادو</h3>
                      <p className='text-gray-400 text-sm'>العلامة التجارية: نايك</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className='button1 px-6 h-14 w-52 font-bold'>اكتشف منتجات أخرى</button>
            </div> */}


            <div className='w-full flexCenter flex-col'>
              <div className=' block'>
                <img src="/c9b30476-e522-45b1-b0db-f0614b26896d.avif" alt="" />
              </div>
              <div className='flexCenter gap-4'>
                <div>
                  <img src="/879.avif" alt="" />
                </div>
                <div>
                  <img src="/879.avif" alt="" />
                </div>
                <div>
                  <img src="/c2e07874-0e43-49e3-b73a-c481dc63c818.avif" alt="" />
                </div>
                <div>
                  <img src="/879.avif" alt="" />
                </div>
                <div>
                  <img src="/879.avif" alt="" />
                </div>
                <div>
                  <img src="/879.avif" alt="" />
                </div>
                <div>
                  <img src="/3b2804b6-956e-481d-8442-776edf7d2003.avif" alt="" />
                </div>
              </div>
            </div>
            <div className='w-full block'>
              <img src="/00ceba07-888888745.avif" alt="" />
            </div>
            <div className=''>
              <ProductsSlider></ProductsSlider>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}

{/* <Helmet>
  <title>Arbia - Multi-vendor Online Store</title>
  <meta name="description" content="Arbia is a diverse online store offering a wide range of products from various vendors. Shop now and discover exclusive deals and featured products." />
  <meta name="keywords" content="Arbia, online store, shop online, multi-vendor products, vendors, special offers, shopping" />
  <meta property="og:title" content="Arbia - Multi-vendor Online Store" />
  <meta property="og:description" content="Arbia is your go-to destination for online shopping. Browse a wide selection of products and deals from top vendors." />
  <meta property="og:image" content="https://example.com/path/to/your/og-image.jpg" />
  <meta property="og:url" content="https://example.com/home" />
  <link rel="alternate" hreflang="en" href="https://example.com/home/en" />
  <link rel="alternate" hreflang="ar" href="https://example.com/home/ar" />
  </Helmet> */}
{/* <button className='button1 px-6 h-14 w-52 font-bold text-white'>ابدأ التسوق</button> */ }