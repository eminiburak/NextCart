'use client';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { useState } from 'react';
import Modal from './Modal';

export default function ProductDetails({ product }) {
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <Image
        src={product.image}
        alt={product.title || product.name}
        width={400}
        height={400}
        priority
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-contain w-auto h-[400px]"
      />
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title || product.name}</h1>
        <p className="mb-2 text-gray-600">{product.description}</p>
        <p className="text-2xl font-semibold mb-4">${product.price}</p>
        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm text-gray-600 dark:text-gray-400">Quantity</label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="w-20 px-2 py-1 border dark:border-gray-700 rounded bg-transparent"
          />
        </div>
        <button
          onClick={() => {
            addToCart(product, qty);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Added to cart</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {qty} × {product.title || product.name}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded"
            >
              Continue shopping
            </button>
            <a href="/cart" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Go to cart
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
