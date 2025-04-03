// src/pages/CartPage.js
import React from "react";

const CartPage = () => {
  // In a real scenario, you'd get cart items from React Context or Redux
  const cartItems = [
    {
      id: 1,
      name: "Cargo Pants Beige",
      price: 30.0,
      quantity: 1,
    },
    {
      id: 2,
      name: "Blue Button Up",
      price: 25.0,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.0;
  const tax = 2.99;
  const total = subtotal + shipping + tax;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Shopping Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} style={{ marginBottom: "1rem" }}>
          <h2>{item.name}</h2>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <hr />
      <h3>Summary</h3>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Shipping: ${shipping.toFixed(2)}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h2>Total: ${total.toFixed(2)}</h2>
      <button>Checkout</button>
    </div>
  );
};

export default CartPage;
