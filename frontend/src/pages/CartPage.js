// src/pages/CartPage.js
import React, { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useContext(CartContext);

  // Calculate subtotal, shipping, tax, and total dynamically
  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );
  const shipping = subtotal < 100 ? 6.99 : 0;
  let taxRate = 0.0844;
  const tax = useMemo(() => subtotal * taxRate, [subtotal, taxRate]);
  const total = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={{ marginBottom: "1rem" }}>
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>

              {/* Increment/Decrement Buttons */}
              <button onClick={() => decrementQuantity(item.id)}>-</button>
              <span style={{ margin: "0 0.5rem" }}>{item.quantity}</span>
              <button onClick={() => incrementQuantity(item.id)}>+</button>

              {/* Remove from cart entirely */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{ marginLeft: "1rem" }}
              >
                Remove
              </button>
            </div>
          ))}
          <hr />
          <h3>Summary</h3>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Shipping: ${shipping.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          <h2>Total: ${total.toFixed(2)}</h2>
          <button>Checkout</button>
          <button onClick={clearCart} style={{ marginLeft: "1rem" }}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
