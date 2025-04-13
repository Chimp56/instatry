// src/context/CartContext.js
import React, { createContext, useState, useEffect } from "react";
import { fetchCart, addToCartAPI, removeFromCartAPI, clearCartAPI } from "../api/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cart = await fetchCart();
        setCartItems(cart.items);
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };
    loadCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const cart = await addToCartAPI(productId, quantity);
      setCartItems(cart.items);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const cart = await removeFromCartAPI(productId);
      setCartItems(cart.items);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const cart = await clearCartAPI();
      setCartItems(cart.items);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
