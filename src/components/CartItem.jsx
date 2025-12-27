import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { incrementQuantity, decrementQuantity, removeItem } from '../redux/CartSlice';
import './CartItem.css';

function CartItem() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const calculateItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    setShowCheckoutMessage(true);
    setTimeout(() => {
      setShowCheckoutMessage(false);
    }, 3000);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some beautiful plants to your cart!</p>
          <button className="continue-shopping-btn" onClick={handleContinueShopping}>
            Browse Plants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-unit-price">Unit Price: ${item.price}</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleDecrement(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                </div>
                
                <div className="item-total">
                  <span className="total-label">Total:</span>
                  <span className="total-price">${calculateItemTotal(item)}</span>
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateCartTotal()}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="free-shipping">FREE</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total-row">
              <span>Total:</span>
              <span className="total-amount">${calculateCartTotal()}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>

            {showCheckoutMessage && (
              <div className="checkout-message">
                <p>🚀 Coming Soon!</p>
                <p>Checkout feature will be available shortly.</p>
              </div>
            )}
          </div>

          <div className="benefits-card">
            <h3>Shopping Benefits</h3>
            <ul>
              <li>✓ Free shipping on all orders</li>
              <li>✓ 30-day money-back guarantee</li>
              <li>✓ Plant care instructions included</li>
              <li>✓ Expert support available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
