import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Products from "./screens/Products";
import ProductDetail from "./screens/productDetail/ProductDetail";
import Dashboard from "./screens/Dashboard/Dashboard";
import { NavBar } from "./screens/NavBar/NavBar";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
