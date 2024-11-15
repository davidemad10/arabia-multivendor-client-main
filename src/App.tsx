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
import VendorDashboard from "./components/VendorDashboard/VedorDashboard";
import Dashboard from "./components/VendorDashboard/Pages/Dashboard/Dashboard";
import AddProduct from "./components/VendorDashboard/Pages/Products/AddProduct";
import UpdateProduct from "./components/VendorDashboard/Pages/Products/UpdateProduct";
import Orders from "./components/VendorDashboard/Pages/Orders/Orders";
import Wallet from "./components/VendorDashboard/Pages/Wallet/Wallet";
import Earnings from "./components/VendorDashboard/Pages/Earnings/Earnings";
import Discount from "./components/VendorDashboard/Pages/Discount/Discount";
import VendorProfile from "./components/VendorDashboard/Pages/VendorProfile/VendorProfile";

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

        
         {/* Vendor  dashboard Routes */}
      
        <Route element={<VendorDashboard />}>
          <Route index path="/VedorDashboard" element={<Dashboard />}></Route>
          <Route path="/AddProducts" element={<AddProduct />}></Route>
          <Route path="/UpdateProduct" element={<UpdateProduct />}></Route>
          <Route path="/Orders" element={<Orders />}></Route>
          <Route path="/Wallet"  element={<Wallet totalBalance={0} />}></Route>
          <Route path="/Earnings" element={<Earnings totalEarnings={0} monthlyEarnings={[]} weeklyEarnings={[]} />}></Route>
          <Route path="/Discount" element={<Discount />}></Route>
          <Route  path="/VendorProfile" element={<VendorProfile name={""} email={""}/>}></Route>
        </Route>
        
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
