import "./styles/App.css";
import "./styles/Manual.css";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/root";
import { Home, Products } from "./pages";
import ProductDetails from "./pages/common/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/users/SignIn/SignIn";
import SignUp from "./pages/users/SignUp/SignUp";
import VendorSignUp from "./pages/vendor/VendorSignUp";
import UserProfile from "./layouts/UserProfile";
import UserDashboard from "./pages/users/UserDashboard";

function App() {
  return (
    <div className="rtl:font-Almarai ltr:font-Poppins">
      <Routes>
        <Route element={<RootLayout></RootLayout>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/:category" element={<Products></Products>}></Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route
            path="/vendorsignup"
            element={<VendorSignUp></VendorSignUp>}
          ></Route>
          <Route
            path="/products/:sku"
            element={<ProductDetails></ProductDetails>}
          ></Route>
        </Route>
        <Route path="/profile" element={<UserProfile></UserProfile>}>
          <Route index element={<UserDashboard></UserDashboard>}></Route>
        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
