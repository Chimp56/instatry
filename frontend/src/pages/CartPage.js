// src/pages/CartPage.js
import React, { useState, useEffect } from "react";
import { fetchCart, addToCartAPI, removeFromCartAPI, clearCartAPI } from "../api/api";

const CartPage = ({ username }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cart = await fetchCart(username);
        setCartItems(cart.items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (username) {
      loadCart();
    }
  }, [username]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const cart = await addToCartAPI(username, productId, quantity);
      setCartItems(cart.items);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const cart = await removeFromCartAPI(username, productId);
      setCartItems(cart.items);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const cart = await clearCartAPI(username);
      setCartItems(cart.items);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.product} style={{ marginBottom: "1rem" }}>
              <h2>{item.name}</h2>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.product)}>Remove</button>
            </div>
          ))}
          <hr />
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
