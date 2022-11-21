import "./App.css";
import React, { useEffect } from 'react';
import Header from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import Home from "./components/Home";
import { ProductDetails } from './components/products/ProductDetails';
//Router brought from react-router-dom (different from express)
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/pages/Dashboard';
import ListProducts from "./components/pages/ListProducts";
import ListVentas from "./components/pages/ListVentas";
import { ModificarProducto } from "./components/pages/UpdateProducts";
import { NuevoProducto } from "./components/pages/NewProducts";
import { Login } from './components/user/Login';
import { Register } from './components/user/Register';
import { loadUser } from './actions/userActions';
import store from "./store"
import { Profile } from './components/user/Profile';
import { UpdateProfile } from './components/user/UpdateProfile';
import { UpdatePassword } from './components/user/UpdatePassword';
import { ForgotPassword } from './components/user/ForgotPassword';
import { NewPassword } from './components/user/NewPassword';
import ProtectedRoute from './routes/ProtectedRoute';

import Cart from "./components/pages/Cart";

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="d-flex flex-nowrap">
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />}/>
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element= {<Register />} />
            <Route path="/productos" element={<ListProducts />} />
            <Route path="/ventas" element={<ListVentas />} />
            <Route path="/producto/:id" element={<ModificarProducto />} />
            <Route path="/producto/new" element={<NuevoProducto />} />
            <Route path="/myAccount" element={<Profile />} />
            <Route path="/myAccount/updateProfile" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<NewPassword />} />
            {/* Route sacurity*/}
            <Route path="/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
            <Route path="/producto/:id" element={<ProtectedRoute isAdmin={true}><ModificarProducto /></ProtectedRoute>} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
        </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
