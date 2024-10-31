import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./component/layout/Footer/Footer";
import Header from "./component/layout/Header/Header";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loaduser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ProtectedRoute from "./Route/ProtectedRoute.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie"; 
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Loader from "./component/layout/Loader/Loader.js";
import ProtectedRouteadmin from "./Route/ProtectedRouteadmin.js";
import About from "./component/layout/About/About.js";
import Contact from "./component/layout/Contact/Contact.js";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState(""); 
  const [loading, setLoading] = useState(true); // Added loading state

  async function getStripeApiKey() {
    try {
      const token = Cookies.get("token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      };

      const url = "http://localhost:4000/api/v1/stripeapikey";
      const { data } = await axios.get(url, config);
      setStripeApiKey(data?.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API Key", error);
    } finally {
      setLoading(false); // Stop loading after API call completes
    }
  }

  useEffect(() => {
    dispatch(loaduser());
    getStripeApiKey(); 
  }, []);

  if (loading) return <Loader/>; // Show loading until the key is fetched

  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />

        {/* Protected routes */}
        <Route path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<ProtectedRouteadmin isAdmin={false}> <Cart /></ProtectedRouteadmin>} />
        <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
        <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />

        {/* Payment route wrapped in Elements */}
        <Route path="/process/payment" element={ stripeApiKey ? (
          <Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute><Payment /></ProtectedRoute></Elements>) : null}/>

         <Route path="/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
         <Route path="/orders" element={<ProtectedRouteadmin isAdmin={false}><MyOrders /></ProtectedRouteadmin>} />
         <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

         {/* -------------------ADMIN-ROUTE----------------------- */}

         <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
         <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
         <Route path="/admin/create/product" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} />
         <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />

         <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} ><OrderList /></ProtectedRoute>} />
         <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder /></ProtectedRoute>} />

         <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>} />
         <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />

         <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true} ><ProductReviews /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
