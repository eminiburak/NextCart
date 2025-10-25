'use client';
import { useContext, useMemo, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Modal from '@/components/Modal';
import Image from 'next/image';
import SessionProvider from '@/components/SessionProvider';
import CartProvider from '@/context/CartContext';

function CartPageInner() {
  const { data: session } = useSession();
  const { cart, removeFromCart, clearCart, updateQuantity, increment, decrement } =
    useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [paidTotal, setPaidTotal] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { items, total } = useMemo(() => {
    const list = (cart || []).map((p) => ({ ...p, quantity: p.quantity || 1 }));
    const sum = list.reduce((acc, it) => acc + (Number(it.price) || 0) * it.quantity, 0);
    return { items: list, total: sum };
  }, [cart]);

  if (!items.length) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-white">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="text-center p-8 rounded border border-gray-800 bg-transparent text-white">
          <p className="mb-4">Your cart is empty.</p>
          <Link
            href="/products"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <ul className="divide-y dark:divide-gray-800 mb-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 py-4">
            <Image
              src={item.image}
              alt={item.title || item.name}
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
              loading="lazy"
              sizes="64px"
            />
            <div className="flex-1">
              <p className="font-medium">{item.title || item.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => decrement(item.id)}
                  className="px-2 py-1 border dark:border-gray-700 rounded"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  className="w-16 px-2 py-1 border dark:border-gray-700 rounded bg-transparent"
                />
                <button
                  onClick={() => increment(item.id)}
                  className="px-2 py-1 border dark:border-gray-700 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${(Number(item.price) || 0).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Clear cart
        </button>
        <div className="text-right">
          <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
          {session ? (
            <button
              onClick={() => {
                setPaidTotal(total);
                setIsConfirmed(false);
                setOpen(true);
              }}
              className="mt-2 w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Checkout
            </button>
          ) : (
            <Link
              href="/auth/signin"
              className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Sign in to checkout
            </Link>
          )}
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center">
          {isConfirmed ? (
            <>
              <h3 className="text-lg font-semibold mb-2">Payment successful</h3>
              <p className="text-sm text-white mb-4">
                Charged ${paidTotal.toFixed(2)}. Thank you for your purchase!
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-800 text-white rounded"
                >
                  Close
                </button>
                <Link
                  href="/profile"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Go to Profile
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-2">Confirm purchase</h3>
              <p className="text-sm text-white mb-4">
                You will be charged ${paidTotal.toFixed(2)}.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-800 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    setIsConfirmed(true);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Confirm
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default function CartPage() {
  return (
    <SessionProvider>
      <CartProvider>
        <CartPageInner />
      </CartProvider>
    </SessionProvider>
  );
}
