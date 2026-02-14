import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [], totalPrice: 0 });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  };

  const addToCart = async (bookId) => {
    try {
      const response = await axios.post('/api/cart/add', { bookId });
      setCart(response.data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateQuantity = async (bookId, quantity) => {
    try {
      const response = await axios.put('/api/cart/update', { bookId, quantity });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating quantity', error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const response = await axios.delete(`/api/cart/remove/${bookId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.post('/api/cart/clear');
      setCart({ items: [], totalPrice: 0 });
    } catch (error) {
      console.error('Error clearing cart', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);