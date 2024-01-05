import React,{ useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, Toast } from 'react-toastify';
import HomePage from './Home/HomePage';   
import AboutUsPage from './Home/AboutUsPage';
import ContactUsPage from './Home/ContactUsPage';
import SignInPage from './Home/SignInPage'
import Header from './Header/Header';
// import SignInPageVendor from './components/SignInPageVendor';
import RegistrationPage from './Home/RegistrationPage';
// import RegistrationPageVendor from './components/RegistrationPageVendor';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import AddImage from './components/AddImage';
// import Header from './components/Header';
import Categories from './Customer/Categories';
// import Footer from './components/Footer';
import Sidebar from './Vendor/Sidebar';
import GetOrders from './Vendor/GetOrders'
// import GetOrders from './Vendor/GetOrders';
import VenderDetails from './Vendor/VenderDetails';
import UpdateServices from './Vendor/UpdateServices';
import UpdateVenderDetails from './Vendor/UpdateVenderDetails';
import VendorServices from './Vendor/VendorServices';
import UpdateOrderStatus from './Vendor/UpdateOrderStatus';
import AddService from './Vendor/AddService';
import LogoutVendor from './Vendor/LogoutVendor';
import MyAccount from './Customer/MyAccount';
import UpdateCustomer from './Customer/UpdateCustomer';
import ServicesList from './Customer/ServiceList';
import MyOrders from './Customer/MyOrders';
// import NavigationBar from './components/NavigationBar';
import Cart from './Customer/Cart';
function App() {
  const [isLoggedInVendor, setIsLoggedInVendor] = useState(false);
  const [isLoggedInCustomer, setIsLoggedInCustomer] = useState(false);
  const [userRole,setUserRole] = useState(null);
  var vendor = JSON.parse(localStorage.getItem('vendor'));

  var customer = localStorage.getItem('customer');

  useEffect(()=>{
    const HomePage = window.location.pathname ==='/';
    if(HomePage){
      localStorage.clear();
    }
  },[]);

  //var userRole = localStorage.getItem('user');

  return (
    <div>
            <ToastContainer />

<Header></Header>
       {/* <Header></Header> */}
        <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/* <Route path="/register/vendor" element={<RegistrationPageVendor />} /> */}
        <Route path="/register/vendor/addimage" element={<AddImage />} />
        <Route path="/signin" element={<SignInPage setIsLoggedInVendor={setIsLoggedInVendor} setUserRole={setUserRole} />} />
        {/* <Route path="/signin/vendor" element={<SignInPageVendor setIsLoggedInVendor={setIsLoggedInVendor} />} /> */}
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />


        <Route path="/customer/categories" element={<Categories />} />
        <Route path="/customer/my-account" element={<MyAccount />} />
        <Route path="/updatecustomerdetails" element={<UpdateCustomer />} />
        <Route path="/customer/categories/:category/service" element={<ServicesList />} />
        <Route path="/customer/cart" element={<Cart />} />
        <Route path="/customer/my-orders" element={<MyOrders />} />






      </Routes>

      
      {isLoggedInVendor && ( 
          <Sidebar>
            <Routes>
              <Route path="/getorders" element={<GetOrders />} />
              <Route path="/vendor/:id" element={<VenderDetails />} />
              <Route path="/update/:id" element={<UpdateServices />} />
              <Route path="/addService" element={<AddService />} />
              <Route path="/updateOrderStatus" element={<UpdateOrderStatus />} />
              <Route path="/updatevendordetails" element={<UpdateVenderDetails />} />
              <Route path="/serviceDetails" element={<VendorServices />} />
              <Route path="/logoutVendor" element={<LogoutVendor setIsLoggedInVendor={setIsLoggedInVendor}/>} />
            </Routes>
            </Sidebar>
        )}   
        {/* {customer && ( 
            <Routes>
        <Route path="/customer/categories" element={<Categories />} />

        </Routes>
          
        )} */}
    </div>
  );
}

export default App;
