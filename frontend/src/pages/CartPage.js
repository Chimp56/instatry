import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa"; // Shopping cart icon
import { mediaURL } from "../api/api"; // Image base URL
import "../styles/CartPage.css"; // Component styles

// Main cart page component
const CartPage = () => {
  // Extract cart state and functions
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useContext(CartContext);

  // Cost breakdown constants
  const shipping = 5.0;
  const tax = 2.99;

  // Calculate subtotal from cart items
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Calculate final total cost
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page-container">
      {/* Page header with icon */}
      <div className="cart-header">
        <h1 className="cart-header-title">
          <FaShoppingCart className="nav-icon" />
          Shopping Cart
        </h1>
      </div>

      {/* Main layout: items and summary */}
      <div className="cart-content">
        {/* Left column: cart items list */}
        <div className="cart-left">
          {cartItems.length === 0 ? (
            // Show empty cart message
            <p className="cart-empty-msg">Your cart is empty!</p>
          ) : (
            // Map through each cart item
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Product image or fallback */}
                {item.image_filename ? (
                  <div className="cart-item-image-wrapper">
                    <img
                      src={`${mediaURL}${item.image_filename}`}
                      alt={item.name}
                      className="cart-item-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/default-product.png";
                      }}
                    />
                  </div>
                ) : (
                  <div className="cart-item-image-wrapper">
                    <span>No Image</span>
                  </div>
                )}

                {/* Item name, price, quantity controls */}
                <div className="cart-item-details">
                  <h2 className="cart-item-title">{item.name}</h2>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>

                  {/* Quantity increment/decrement buttons */}
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => decrementQuantity(item.id)}
                    >
                      –
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  {/* Button to remove from cart */}
                  <div className="cart-item-remove-container">
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right column: order summary */}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            {/* Summary title */}
            <h3 className="cart-summary-title">Summary</h3>

            {/* Subtotal line */}
            <div className="cart-summary-line">
              <span>
                Subtotal ({cartItems.length}{" "}
                {cartItems.length > 1 ? "items" : "item"}):
              </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping line */}
            <div className="cart-summary-line">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            {/* Tax line */}
            <div className="cart-summary-line">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            {/* Total cost line */}
            <div className="cart-summary-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Action buttons: checkout and clear */}
            <div className="cart-summary-actions">
              <button className="cart-checkout-btn">Checkout</button>
              <button className="cart-clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
