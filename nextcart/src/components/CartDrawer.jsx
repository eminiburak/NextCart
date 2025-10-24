'use client';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import Modal from './Modal';

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <ul className="space-y-3">
          {cart.map((item, i) => (
            <li key={i} className="flex justify-between items-center">
              <span>{item.name}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
