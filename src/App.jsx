import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage navigate={navigate} />} />
        <Route path="/products" element={<><Navbar /><ProductList /></>} />
        <Route path="/cart" element={<><Navbar /><CartItem /></>} />
        <Route path="/about" element={<><Navbar /><AboutUs /></>} />
      </Routes>
    </div>
  );
}

function LandingPage({ navigate }) {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p className="subtitle">Welcome to Paradise Nursery - Where Green Meets Serenity</p>
        <button 
          className="get-started-button"
          onClick={() => navigate('/products')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🌿 Paradise Nursery
      </Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Plants</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li>
          <Link to="/cart" className="cart-icon">
            🛒
            {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
