import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Generate from "./pages/Generate";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import View from "./pages/View";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserPage from "./pages/UserPage";
import Checkout from "./pages/Checkout";

const App = () => {
  const location = useLocation();
  const applyPadding = location.pathname !== "/view";
  const showFooter = location.pathname !== "/view";

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div
        className={
          applyPadding ? "px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]" : ""
        }
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/view" element={<View />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </>
  );
};

export default App;
