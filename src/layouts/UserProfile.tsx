import { Outlet } from "react-router-dom";
import Footer from "../components/basic/Footer";
import ProfileHeader from "../components/basic/ProfileHeader";

export default function UserProfile() {
  return (
    <>
      <ProfileHeader></ProfileHeader>
      <div className="pt-24 min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
}
