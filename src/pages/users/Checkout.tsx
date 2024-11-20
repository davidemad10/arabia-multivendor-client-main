import { useState } from "react";
import Address from "./UserDashboardComponents/Address";
import Phone from "./checkoutComponents/Phone";
import Payment from "./checkoutComponents/Payment";

export default function CheckoutPage() {
  const menuItems = [
    {
      title: "address",
      component: (
        <Address
          address="confirmYourAddress"
          navigate={() => setActivepanel("phone")}
        ></Address>
      ),
    },
    {
      title: "phone",
      component: <Phone navigate={() => setActivepanel("payment")}></Phone>,
    },
    {
      title: "payment",
      component: <Payment></Payment>,
    },
  ];
  const [activePanel, setActivepanel] = useState("address");

  return (
    <div className="flex">
      <div className="mx-auto w-2/3 p-10">
        {menuItems.map((item) =>
          item.title === activePanel ? (
            <div key={item.title}>{item.component}</div>
          ) : null
        )}
      </div>
    </div>
  );
}
