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

  const incrementQuantity = async (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.product === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart); // Optimistically update the cart

    try {
      const cart = await addToCartAPI(username, productId, 1);
      setCartItems(cart.items); // Update with the server response
    } catch (error) {
      console.error("Error incrementing quantity:", error);
      setCartItems(cartItems); // Revert to the previous state if the API call fails
    }
  };

  const decrementQuantity = async (productId) => {
    const item = cartItems.find((item) => item.product === productId);
    if (item.quantity > 1) {
      const updatedCart = cartItems.map((item) =>
        item.product === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCartItems(updatedCart); // Optimistically update the cart

      try {
        const cart = await addToCartAPI(username, productId, -1);
        setCartItems(cart.items); // Update with the server response
      } catch (error) {
        console.error("Error decrementing quantity:", error);
        setCartItems(cartItems); // Revert to the previous state if the API call fails
      }
    } else {
      console.warn("Cannot decrement quantity below 1");
    }
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cartItems.filter((item) => item.product !== productId);
    setCartItems(updatedCart); // Optimistically update the cart

    try {
      const cart = await removeFromCartAPI(username, productId);
      setCartItems(cart.items); // Update with the server response
    } catch (error) {
      console.error("Error removing from cart:", error);
      setCartItems(cartItems); // Revert to the previous state if the API call fails
    }
  };

  const clearCart = async () => {
    const previousCart = [...cartItems];
    setCartItems([]); // Optimistically clear the cart

    try {
      const cart = await clearCartAPI(username);
      setCartItems(cart.items); // Update with the server response
    } catch (error) {
      console.error("Error clearing cart:", error);
      setCartItems(previousCart); // Revert to the previous state if the API call fails
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

              {/* Increment/Decrement Buttons */}
              <button onClick={() => decrementQuantity(item.product)}>-</button>
              <span style={{ margin: "0 0.5rem" }}>{item.quantity}</span>
              <button onClick={() => incrementQuantity(item.product)}>+</button>
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
