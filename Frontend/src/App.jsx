import {React, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Layout/LoginForm/Login';
import Signup from './components/Layout/SignupForm/Signup';
import ForgotPassword from './components/Layout/ForgotPassword/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Header from './components/Header/Header';
import Profile from './pages/Profile';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import './App.css';
import SideBar from './components/SideBar/SideBar';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const location = useLocation();
  // Các path không muốn hiện Header
  const hideHeaderPaths = ['/login', '/signup', '/forgot-password'];

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path="*" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<Product selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>} />
        <Route path="/SideBar" element={<SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;