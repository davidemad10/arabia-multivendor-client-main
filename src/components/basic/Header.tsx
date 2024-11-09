import { useEffect, useState } from "react";
import { headerLinks } from "../../constants";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RiShoppingCart2Line, RiUserLine } from "react-icons/ri";
import { GrFavorite } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import SideCart from "../shared/cart/SideCart";
import LanguageSelector from "./LanguageSelector";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/slices/userSlice";
import ProfileDropdownMenu from "./profileDropdown/ProfileDropdownMenu";
import SearchBar from "./SearchBar";

export default function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const { pathname } = useLocation();
  const { i18n, t } = useTranslation();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        className={`flex fixed gap-2 p-4 ${
          showHeader ? "top-0" : "-top-44"
        } duration-200 bg-white z-10 flex-col w-full`}
      >
        {/* 1st Header */}
        <div className={`flex flexCenter justify-center h-16 w-full`}>
          <div className={` flex z-10 p-0 h-16 w-full `}>
            <div className="container flexBetween flex desktop:justify-start">
              <div className="w-2/12 ">
                <Link to="/">
                  <img
                    className="w-24"
                    src="../../../public/icons/4895665.png"
                    alt="logo"
                  />
                </Link>
              </div>
              {/* Search Bar */}
              {/* <div className="w-1/2 laptop:w-4/12 desktop:w-2/5 desktop:mr-20 mx-6 justify-center">
                <div className="relative">
                  <input
                    placeholder={t("search")}
                    type="text"
                    className="border placeholder:text-sm outline-none focus:border-Red border-gray-400 h-12 text-lg rounded-md p-4 pr-10 pl-4 w-full"
                  />
                  <div className="absolute top-0 right-0 flex items-center justify-center h-full w-10 text-gray-400 text-xl">
                    <FiSearch />
                  </div>
                </div>
              </div> */}
              <SearchBar />

              {/* Mobile Menu Button */}
              <div className="flex desktop:hidden">
                <button
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="text-xl"
                  aria-label="Toggle Menu"
                >
                  {isMenuOpen ? "" : "☰"}
                </button>
              </div>

              {/* User Actions */}
              <div
                className={`hidden desktop:flexCenter gap-5 items-center desktop:mr-7 desktop:absolute ${
                  i18n.dir() === "rtl" ? "left-4" : "right-4"
                }`}
              >
                <LanguageSelector />

                {isAuthenticated ? (
                  ""
                ) : (
                  <div className="flex flex-row gap-4">
                    <span className="h-8 bg-gray-300 rounded-full w-px"></span>
                    <div className="flex flexCenter cursor-pointer group">
                      <span className=" text-blackText whitespace-nowrap group-hover:text-Red">
                        <Link to={"signin"}>
                          <Trans i18nKey="login"></Trans>
                        </Link>
                      </span>
                      <RiUserLine className="text-blackText text-2xl group-hover:text-Red" />
                    </div>
                    <span className="h-8 bg-gray-300 rounded-full w-px"></span>
                    <div className="flex flexCenter cursor-pointer group">
                      <span className=" text-blackText whitespace-nowrap group-hover:text-Red">
                        <Link to={"signup"}>
                          <Trans i18nKey="register"></Trans>
                        </Link>
                      </span>
                      <RiUserLine className="text-blackText text-2xl group-hover:text-Red" />
                    </div>
                  </div>
                )}

                {isAuthenticated && (
                  <div>
                    <span className="h-8 bg-gray-300 rounded-full w-px"></span>
                    <div className="relative text-blackText text-2xl hover:text-Red cursor-pointer">
                      <GrFavorite className="inline-block" />
                      <div className="absolute top-0 left-4 w-4 h-4 bg-Red rounded-full flex justify-center items-center">
                        <span className="text-white text-sm">1</span>
                      </div>
                    </div>
                  </div>
                )}

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
                {/* avatar and profile */}
                {isAuthenticated && (
                  <>
                    <span className="h-8 bg-gray-300 rounded-full w-px"></span>
                    <ProfileDropdownMenu></ProfileDropdownMenu>
                  </>
                )}
              </div>

              {/* Mobile Navigation Menu */}
              {isMenuOpen && (
                <div
                  className={`fixed top-0 ${
                    i18n.dir() === "rtl" ? "left-0" : "right-0"
                  } h-full w-64 bg-white border-l border-gray-300 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                  } desktop:hidden`}
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
                    {isAuthenticated ? (
                      <ProfileDropdownMenu></ProfileDropdownMenu>
                    ) : (
                      <div>
                        <div className="flex items-center justify-center my-3 w-full cursor-pointer group">
                          <span className="text-blackText group-hover:text-Red">
                            <Link to={"signin"}>
                              <Trans i18nKey="login"></Trans>
                            </Link>
                          </span>
                          <RiUserLine className="text-blackText text-2xl group-hover:text-Red transition-colors duration-200" />
                        </div>
                        <div className="flex items-center justify-center gap-2 w-full cursor-pointer group">
                          <span className="text-blackText group-hover:text-Red">
                            <Link to={"signup"}>
                              <Trans i18nKey="register"></Trans>
                            </Link>
                          </span>
                          <RiUserLine className="text-blackText text-2xl group-hover:text-Red transition-colors duration-200" />
                        </div>
                      </div>
                    )}
                    <LanguageSelector />

                    <div className="flex items-center gap-4">
                      {isAuthenticated && (
                        <div className="relative text-blackText text-2xl hover:text-Red cursor-pointer transition-colors duration-200">
                          <GrFavorite className="inline-block" />
                          <div className="absolute top-0 left-4 w-4 h-4 bg-Red rounded-full flex justify-center items-center">
                            <span className="text-white text-sm">1</span>
                          </div>
                        </div>
                      )}
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
                      <li key={link.label}>
                        <NavLink
                          className={`block hover:text-Red pb-3 border-Red w-full h-full text-blackText ${
                            pathname === link.route
                              ? "text-Red border-b-2 font-extrabold"
                              : ""
                          } transition-colors duration-200`}
                          to={link.route}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {<Trans i18nKey={`${link.label}`}></Trans>}
                        </NavLink>
                      </li>
                    ))}
                    <li>
                      <div className=" text-blackText whitespace-nowrap group-hover:text-Red border-t laptop:hidden border-gray-300 pt-5">
                        <Link to={"vendorsignup"}>{t("sellWithArabia")}</Link>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 2nd Header */}
        <div className={`justify-center h-16 w-full hidden laptop:flexCenter`}>
          <div className={` flex p-0 h-16 w-full `}>
            <div className="container flexBetween flex">
              <div className=" w-11/12 gap-4 flex flexStart">
                <div className="flex flexCenter gap-2 bg-Red px-6 py-2 ">
                  <a className=" font-bold text-white" href="">
                    جميع الفئات
                  </a>
                </div>
                <ul className="flex gap-6">
                  {headerLinks.map((link) => (
                    <li key={link.label}>
                      <NavLink
                        className={`hover:text-Red pb-3 border-Red text-blackText ${
                          pathname === link.route
                            ? "text-Red border-b-2 font-extrabold"
                            : "font-bold"
                        }`}
                        to={link.route}
                      >
                        {<Trans i18nKey={`${link.label}`}></Trans>}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <div
                  className={`flex flexCenter cursor-pointer group fixed ${
                    i18n.dir() === "rtl" ? "left-4" : "right-4"
                  }`}
                >
                  <span className=" text-blackText whitespace-nowrap group-hover:text-Red">
                    <Link to={"vendorsignup"}>{t("sellWithArabia")}</Link>
                  </span>
                  <RiUserLine className="text-blackText text-2xl group-hover:text-Red mx-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <SideCart isCartOpen={isCartOpen} setSideCart={toggleCart} />
      </div>
    </header>
  );
}
