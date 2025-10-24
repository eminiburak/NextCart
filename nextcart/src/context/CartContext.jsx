'use client';
import { createContext, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart-items', []);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + quantity } : p
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: Math.max(1, Number(quantity) || 1) } : p))
        .filter((p) => (p.quantity || 0) > 0)
    );
  };

  const increment = (id) => updateQuantity(id, (cart.find((p) => p.id === id)?.quantity || 1) + 1);
  const decrement = (id) => updateQuantity(id, (cart.find((p) => p.id === id)?.quantity || 1) - 1);

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, increment, decrement }}>
      {children}
    </CartContext.Provider>
  );
}
