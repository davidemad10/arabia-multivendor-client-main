import { Link } from "react-router-dom";
import {  FaFacebookSquare, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {

  return (
    <footer className="w-full flex flex-col mt-14">
      <div className="flexCenter w-full  flex-col">
        <div className="flexCenter gap-3 flex-col">
          <img className=" w-24 -mb-8" src="./assets/icons/4895665.png" alt="logo" />
          <h2 className="text-2xl max-md:text-xl text-blackText font-bold">تواصل معنا</h2>
          <div className="flexCenter mt-2 gap-3">
            <Link to={''} className=" border-2 border-gray-400 p-1 rounded-full">
              <div className=" p-1 rounded-full text-2xl max-md:text-xl text-black">
                <FaFacebookSquare ></FaFacebookSquare>
              </div>
            </Link>
            <Link to={''} className=" border-2 border-gray-400 p-1 rounded-full">
              <div className=" p-1 rounded-full text-2xl max-md:text-xl text-black">
                <FaInstagram  ></FaInstagram>
              </div>
            </Link>
            <Link to={''} className=" border-2 border-gray-400 p-1 rounded-full">
              <div className=" p-1 rounded-full text-2xl max-md:text-xl text-black">
                <FaWhatsapp  ></FaWhatsapp>
              </div>
            </Link>
            <Link to={''} className=" border-2 border-gray-400 p-1 rounded-full">
              <div className=" p-1 rounded-full text-2xl max-md:text-xl text-black">
                <FaLinkedin  ></FaLinkedin>
              </div>
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            © 2024 اربيا. جميع الحقوق محفوظة
          </div>
        </div>
      </div>

      <div className="flexBetween px-6 bg-stone-200 h-12 max-md:gap-3 max-md:h-fit py-2  max-md:flex-col mt-4 w-full">
        <div className="flex ">
          <img className="w-20 h-12" src="./assets/icons/instapay.png" alt="" />
          <img className="w-9 h-12" src="./assets/icons/card-mastercard.svg" alt="" />
          <img className="w-9 h-12" src="./assets/icons/cod-en.svg" alt="" />
          <img className="w-9 h-12" src="./assets/icons/card-visa.svg" alt="" />
        </div>
        <ul className="flex gap-5">
          <li>
            <Link to={''} className="text-xs text-gray-600">سياسة الخصوصية</Link>
          </li>
          <li>
            <Link to={''} className="text-xs text-gray-600">شروط الاستخدام</Link>
          </li>
          <li>
            <Link to={''} className="text-xs text-gray-600">شروط البيع </Link>
          </li>
          <li>
            <Link to={''} className="text-xs text-gray-600">كُن بائع معنا</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
