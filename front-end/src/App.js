import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/register';
import Customer from './pages/Customer';
import Admin from './pages/Admin';
// import Home from './pages/home';
import OrderClient from './pages/OrderClient';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="login" /> } />
      <Route path="login" element={ <Login /> } />
      <Route path="register" element={ <Register /> } />
      <Route path="customer/products" element={ <Customer /> } />
      <Route path="admin/manage" element={ <Admin /> } />
      <Route path="customer/orders/" element={ <OrderClient /> } />
      <Route path="customer/orders/:id" element={ <OrderDetails /> } />
      <Route path="customer/checkout" element={ <Checkout /> } />
    </Routes>
  );
}

export default App;
