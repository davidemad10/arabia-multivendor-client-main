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
import CategoryPage from "./pages/common/CategoryPage";
import BrandProducts from "./pages/common/BrandProducts";
import UserProfile from "./layouts/UserProfile";
import UserDashboard from "./pages/users/UserDashboard";
import CartPage from "./pages/users/Cart";

function App() {
  return (
    <div className="rtl:font-Almarai ltr:font-Poppins">
      <Routes>
        <Route element={<RootLayout></RootLayout>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route
            path="/vendorsignup"
            element={<VendorSignUp></VendorSignUp>}
          ></Route>
          <Route
            path="/products/:id"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route path="/category/:category" element={<CategoryPage />} />

          <Route path="/brand/:slug" element={<BrandProducts />} />
        </Route>
        <Route path="/profile" element={<UserProfile></UserProfile>}>
          <Route index element={<UserDashboard></UserDashboard>}></Route>
          <Route path="cart" element={<CartPage></CartPage>}></Route>
        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
