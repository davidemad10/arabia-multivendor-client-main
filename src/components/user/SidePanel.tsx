import { t } from "i18next";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../public/utils/functions";

interface MenuItem {
  title: string;
  icon: ReactNode;
  component: ReactNode;
}

interface SidePanelProps {
  menuItems: MenuItem[];
  setActivePanel: (activePanel: string) => void;
}

export default function SidePanel({
  menuItems,
  setActivePanel,
}: SidePanelProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("accessToken");
  const user = getUser(token);
  const email = user?.email;
  console.log("this is user email:", email);

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/");
    console.log("User logged out");
  };

  return (
    <div className="bg-white w-80 min-h-screen start-0 top-0 p-10 ps-16 max-laptop:hidden">
      <div className="border-b-2 border-gray-200 pb-6">
        <p className="font-bold text-gray-700">{t("hala")}</p>
        <p className="font-light text-xs text-gray-400 break-words">{email} </p>
      </div>
      <div className="py-5 border-b-2 border-gray-200">
        {menuItems.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 hover:bg-gray-200 active:bg-gray-300 p-5 transition-all duration-200 rounded-xl cursor-pointer"
            onClick={() => {
              setActivePanel(item.title);
            }}
          >
            <span>{item.icon}</span>
            <p className=" text-gray-400 ">{t(item.title)}</p>
          </div>
        ))}
      </div>
      <div>
        <button
          className="py-5 text-gray-400 hover:text-gray-500"
          onClick={handleLogout}
        >
          {t("logout")}
        </button>
      </div>
    </div>
  );
}
