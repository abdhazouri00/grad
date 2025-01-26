import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import { Route , Routes } from "react-router";
import Generate from './pages/Generate';
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
