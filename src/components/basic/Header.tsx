import { useEffect, useState } from 'react'
import { headerLinks } from '../../constants'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { RiShoppingCart2Line, RiUserLine } from 'react-icons/ri'
import { GrFavorite } from 'react-icons/gr'
import { FiSearch } from 'react-icons/fi'
import SideCart from '../shared/cart/SideCart'
import { TiArrowSortedDown } from 'react-icons/ti'
import LoginPoup from '../shared/auth/LoginPoup'
import LanguageSelector from './LanguageSelector'

export default function Header() {
  const { pathname } = useLocation()

  const [isCartOpen, setIsCartOpen] = useState(false);
  const setSideCart = () => { isCartOpen ? setIsCartOpen(false) : setIsCartOpen(true) }


  const [isLoginPoupOpen, setIsLoginPoupOpen] = useState(false);
  const setLoginPoup = () => { isLoginPoupOpen ? setIsLoginPoupOpen(false) : setIsLoginPoupOpen(true) }



  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  return (

    <header className='flexCenter'>
      <div className={`flex fixed gap-2 pb-2 ${showHeader ? 'top-0' : '-top-44'} duration-200  bg-white z-10 flex-col w-full max-md:hidden`}>
        <div className={` flex z-10 flexCenter h-16 w-full `}>
          <div className='container flexBetween flex'>
            <div className='w-2/12'>
              <Link to={'/'} >
                <img className='w-24' src="./logo.png" alt="logo" />
              </Link>
            </div>


            <div className=' w-2/6'>
              <div className="relative">
                <input placeholder='البحث عن المنتجات والعلامات التجارية والفئات' type="text" className="border placeholder:text-sm outline-none focus:border-Red border-gray-400 h-12 text-lg rounded-md p-4 pr-10 pl-4 w-full" />
                <div className="absolute top-0 right-0 flex items-center justify-center h-full w-10 text-gray-400 text-xl">
                  <FiSearch />
                </div>
              </div>
            </div>

            <div className='flex gap-5 items-center'>
              <LanguageSelector></LanguageSelector>
              <span className='h-8 bg-gray-300 rounded-full w-px'></span>
              <div onClick={setLoginPoup} className='flex flexCenter cursor-pointer group'>
                <span className=' font-bold text-blackText group-hover:text-Red'>تسجيل دخول</span>
                <RiUserLine className='text-blackText text-2xl group-hover:text-Red' />
              </div>
              <span className='h-8 bg-gray-300 rounded-full w-px'></span>
              <div className="relative text-blackText text-2xl hover:text-Red cursor-pointer">
                <GrFavorite className="inline-block" />
                <div className="absolute top-0 left-4 w-4 h-4 bg-Red rounded-full flex justify-center items-center">
                  <span className="text-white text-sm">1</span>
                </div>
              </div>
              <span className='h-8 bg-gray-300 rounded-full w-px'></span>
              <button onClick={setSideCart} type='button' className="relative text-blackText text-2xl hover:text-Red cursor-pointer">
                <RiShoppingCart2Line className="inline-block" />
                <div className="absolute top-0 left-4 w-4 h-4 bg-Red rounded-full flex justify-center items-center">
                  <span className="text-white text-sm">1</span>
                </div>
              </button>
            </div>

          </div>
        </div>
        <div className={` flex z-10 flexCenter h-16 w-full `}>
          <div className='container flexBetween flex'>
            <div className=' w-11/12 gap-4 flex flexStart'>
              <div className='flex flexCenter gap-2 bg-Red px-6 py-2 '>
                <a className=' font-bold text-white' href="">جميل الفئات</a>
                <span><TiArrowSortedDown className='text-xl text-white' ></TiArrowSortedDown> </span>
              </div>
              <ul className='flex gap-6'>
                {headerLinks.map((link) => {
                  const isActive = pathname === link.route
                  return (<li key={link.route} className=' group'>
                    <NavLink className={`  hover:text-Red  pb-3 border-Red w-full h-full ${isActive ? 'text-Red border-b-2 font-extrabold' : 'text-blackText font-bold'} `} to={link.route}>{link.label}</NavLink>
                  </li>)
                }
                )}
              </ul>
            </div>
            <div className='w-1/12 flex flexEnd'>
              <img className='w-24' src="./654651.png" alt="soucond-logo" />
            </div>
          </div>
        </div>
        <SideCart isCartOpen={isCartOpen} setSideCart={setSideCart}  ></SideCart>
        <LoginPoup isLoginPoupOpen={isLoginPoupOpen} setLoginPoup={setLoginPoup}></LoginPoup>
      </div>
    </header>
  )
}
