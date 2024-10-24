import { useEffect, useState } from "react";
import { headerLinks } from "../../constants";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RiShoppingCart2Line, RiUserLine } from "react-icons/ri";
import { GrFavorite } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import SideCart from "../shared/cart/SideCart";
import LanguageSelector from "./LanguageSelector";
import { Trans, useTranslation } from "react-i18next";
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export default function Header() {
  const loggedInUser = true;

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
        {/* Header Top Section */}
        <div className={`flex z-10 flexCenter justify-center h-16 w-full`}>
          <div className="container flexBetween flex justify-evenly gap-10">
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
            <div className="container hidden desktop:flexCenter w-min h-16">
              <ul className="mx-auto flex gap-5">
                {headerLinks.map((link) => (
                  <li key={link.label}>
                    <NavLink
                      className={`hover:text-Red pb-3 border-Red text-blackText ${
                        pathname === link.route
                          ? "text-Red border-b-2 font-extrabold"
                          : ""
                      }`}
                      to={link.route}
                    >
                      {<Trans i18nKey={`${link.label}`}></Trans>}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <span className="h-8 bg-gray-300 rounded-full w-px mx-5"></span>
              <div className="flex flexCenter cursor-pointer group">
                <span className=" text-blackText whitespace-nowrap group-hover:text-Red">
                  <Link to={"vendorsignup"}>{t("sellWithArabia")}</Link>
                </span>
                <RiUserLine className="text-blackText text-2xl group-hover:text-Red mx-2" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-5/12 tablet:flex mx-6 justify-center">
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
            </div>

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
            <div className="hidden desktop:flexCenter gap-5 items-center">
              <LanguageSelector />
              {loggedInUser ? (
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

              {loggedInUser && (
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
            </div>
            {/* avatar and profile */}
            {loggedInUser && (
              <div className="w-500 mx-6 flex flexCenter">
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  alt="UserName"
                  src="User Profile Pic"
                />
                <p>dropDown</p>
                {/* //! i couldnt find a good drop down menu sorry 😢 */}
                {/* //! Dont forget to add it into the mobile menu as well */}
              </div>
            )}

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
                  <LanguageSelector />
                  {loggedInUser ? (
                    ""
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
                  <div className="flex items-center gap-4">
                    {loggedInUser && (
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
                </ul>
              </div>
            )}
          </div>
        </div>

        <SideCart isCartOpen={isCartOpen} setSideCart={toggleCart} />
      </div>
    </header>
  );
}
