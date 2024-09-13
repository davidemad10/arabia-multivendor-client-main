import './App.css'
import './Manual.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import { Home,Products } from './_root/pages'
import ProductDetails from './_root/pages/shared/ProductDetails'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className='rtl:font-Almarai ltr:font-Poppins'>
      <Routes>
        {/* <Route element={<AuthLayout></AuthLayout>}>
            <Route path='/sign-in' element={<SigninForm></SigninForm>}></Route>
            <Route path='/sign-up' element={<SignupForm></SignupForm>}></Route>
          </Route> */}

        <Route element={<RootLayout></RootLayout>}>
          <Route index element={<Home></Home>}></Route>
          <Route path='/:category' element={<Products></Products>}></Route>
          <Route path='/product/:P-slug/:P-sku' element={<ProductDetails></ProductDetails>}></Route>
        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
