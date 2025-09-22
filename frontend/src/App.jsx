import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Sustainability from './pages/Sustainability';
import QualityAssurance from './pages/QualityAssurance';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import ForgotPassword from './pages/ForgotPassword';
import MyAccount from './pages/MyAccount';
import OrderHistory from './pages/OrderHistory';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import Ingredients from './pages/ingredients';
import IngredientDetail from "./pages/IngredientDetail";
// import Categories from './components/Categories';      
// import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/quality-assurance" element={<QualityAssurance />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/search-products" element={<Search />} />
        <Route path="/ingredient/:slug" element={<IngredientDetail />} />

        {/* 🔒 Protected Routes */}
        <Route
          path="/my-account"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-history"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shopping-cart"
          element={
            <ProtectedRoute>
              <ShoppingCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
