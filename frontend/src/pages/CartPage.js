import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa"; // Using same icon as in Navbar
import { mediaURL } from "../api/api"; // Used to build the image URL
import "../styles/CartPage.css"; // Import the CSS file

// CartPage component to display the shopping cart items, their prices,
// quantities, and the total cost including shipping and tax.
const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useContext(CartContext);

  const shipping = 5.0;
  const tax = 2.99;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page-container">
      {/* Header with the shopping cart icon */}
      <div className="cart-header">
        <h1 className="cart-header-title">
          <FaShoppingCart className="nav-icon" />
          Shopping Cart
        </h1>
      </div>

      {/* Two-column layout for cart items and order summary */}
      <div className="cart-content">
        {/* Left Column: Cart Items */}
        <div className="cart-left">
          {cartItems.length === 0 ? (
            <p className="cart-empty-msg">Your cart is empty!</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Display the actual product image */}
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

                <div className="cart-item-details">
                  <h2 className="cart-item-title">{item.name}</h2>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>

                  {/* Quantity controls */}
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

                  {/* Remove button, centered below the quantity controls */}
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

        {/* Right Column: Cart Summary */}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3 className="cart-summary-title">Summary</h3>
            <div className="cart-summary-line">
              <span>
                Subtotal ({cartItems.length}{" "}
                {cartItems.length > 1 ? "items" : "item"}):
              </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Action Buttons: Primary (Checkout) and Secondary (Clear Cart) */}
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
