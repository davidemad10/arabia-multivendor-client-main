import { useEffect, useState } from "react";
import { headerLinks } from "../../constants";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RiShoppingCart2Line, RiUserLine } from "react-icons/ri";
import { GrFavorite } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import SideCart from "../shared/cart/SideCart";
import { TiArrowSortedDown } from "react-icons/ti";
import LoginPopUp from "../shared/auth/LoginPopUp";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const { pathname } = useLocation();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const [isLoginPopUpOpen, setIsLoginPopUpOpen] = useState(false);
  const toggleLoginPopUp = () => setIsLoginPopUpOpen((prev) => !prev);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="flexCenter">
      <div
        className={`flex fixed gap-2 pb-2 ${
          showHeader ? "top-0" : "-top-44"
        } duration-200 bg-white z-10 flex-col w-full`}
      >
        {/* Header Top Section */}
        <div className={`flex z-10 flexCenter h-16 w-full`}>
          <div className="container flexBetween flex">
            <div className="w-2/12">
              <Link to="/">
                <img
                  className="w-24"
                  src="../../../public/icons/4895665.png"
                  alt="logo"
                />
              </Link>
            </div>

            {/* header navigation */}
            <div className="container mx-auto hidden xl:flexCenter w-4 h-16">
              <ul className="flex gap-5">
                {headerLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      className={`hover:text-Red pb-3 border-Red text-blackText font-bold ${
                        pathname === link.route
                          ? "text-Red border-b-2 font-extrabold"
                          : ""
                      }`}
                      to={link.route}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Search Bar */}
            <div className="w-2/6 md:flex">
              <div className="relative">
                <input
                  placeholder="البحث عن المنتجات والعلامات التجارية والفئات"
                  type="text"
                  className="border placeholder:text-sm outline-none focus:border-Red border-gray-400 h-12 text-lg rounded-md p-4 pr-10 pl-4 w-full"
                />
                <div className="absolute top-0 right-0 flex items-center justify-center h-full w-10 text-gray-400 text-xl">
                  <FiSearch />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex xl:hidden">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="text-xl"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? "" : "☰"}
              </button>
            </div>

            {/* User Actions */}
            <div className="hidden xl:flexCenter gap-5 items-center">
              <LanguageSelector />
              <span className="h-8 bg-gray-300 rounded-full w-px"></span>
              <div
                onClick={toggleLoginPopUp}
                className="flex flexCenter cursor-pointer group"
              >
                <span className="font-bold text-blackText group-hover:text-Red">
                  تسجيل دخول
                </span>
                <RiUserLine className="text-blackText text-2xl group-hover:text-Red" />
              </div>
              <span className="h-8 bg-gray-300 rounded-full w-px"></span>
              <div className="relative text-blackText text-2xl hover:text-Red cursor-pointer">
                <GrFavorite className="inline-block" />
                <div className="absolute top-0 left-4 w-4 h-4 bg-Red rounded-full flex justify-center items-center">
                  <span className="text-white text-sm">1</span>
                </div>
              </div>
              <span className="h-8 bg-gray-300 rounded-full w-px"></span>
              <button
                onClick={toggleCart}
                type="button"
                className="relative text-blackText text-2xl hover:text-Red cursor-pointer"
              >
                <RiShoppingCart2Line className="inline-block" />
                <div className="absolute top-0 left-4 w-4 h-4 bg-Red rounded-full flex justify-center items-center">
                  <span className="text-white text-sm">1</span>
                </div>
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
              <div
                className={`fixed top-0 right-0 h-full w-64 bg-white border-l border-gray-300 transform transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? "translate-x-0" : "translate-x-full"
                } xl:hidden`}
              >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-blackText text-2xl hover:text-Red transition-colors duration-200"
                  >
                    &times; {/* This represents a close icon */}
                  </button>
                </div>

                {/* User Actions at the Top */}
                <div className="flex flex-col items-center gap-4 p-4 border-b border-gray-300">
                  <LanguageSelector />
                  <div
                    onClick={toggleLoginPopUp}
                    className="flex items-center justify-center gap-2 w-full cursor-pointer group"
                  >
                    <span className="font-bold text-blackText group-hover:text-Red">
                      تسجيل دخول
                    </span>
                    <RiUserLine className="text-blackText text-2xl group-hover:text-Red transition-colors duration-200" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative text-blackText text-2xl hover:text-Red cursor-pointer transition-colors duration-200">
                      <GrFavorite className="inline-block" />
                      <div className="absolute top-0 left-4 w-4 h-4 bg-Red rounded-full flex justify-center items-center">
                        <span className="text-white text-sm">1</span>
                      </div>
                    </div>
                    <button
                      onClick={toggleCart}
                      type="button"
                      className="relative text-blackText text-2xl hover:text-Red cursor-pointer transition-colors duration-200"
                    >
                      <RiShoppingCart2Line className="inline-block" />
                      <div className="absolute top-0 left-4 w-4 h-4 bg-Red rounded-full flex justify-center items-center">
                        <span className="text-white text-sm">1</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Navigation Links */}
                <ul className="flex flex-col gap-2 p-4">
                  {headerLinks.map((link) => (
                    <li key={link.route}>
                      <NavLink
                        className={`block hover:text-Red pb-3 border-Red w-full h-full text-blackText font-bold ${
                          pathname === link.route
                            ? "text-Red border-b-2 font-extrabold"
                            : ""
                        } transition-colors duration-200`}
                        to={link.route}
                        onClick={() => setIsMenuOpen(false)} // Close menu on link click
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <SideCart isCartOpen={isCartOpen} setSideCart={toggleCart} />
        <LoginPopUp
          isLoginPopUpOpen={isLoginPopUpOpen}
          setLoginPopUp={toggleLoginPopUp}
        />
      </div>
    </header>
  );
}
