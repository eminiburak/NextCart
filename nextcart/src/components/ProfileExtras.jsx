'use client';
import { useContext, useMemo } from 'react';
import { CartContext } from '@/context/CartContext';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function ProfileExtras() {
  const { cart } = useContext(CartContext);

  const { itemsCount, total } = useMemo(() => {
    const list = cart || [];
    const count = list.reduce((acc, p) => acc + (p.quantity || 1), 0);
    const sum = list.reduce((acc, p) => acc + (Number(p.price) || 0) * (p.quantity || 1), 0);
    return { itemsCount: count, total: sum };
  }, [cart]);

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded border dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
        <h3 className="font-semibold mb-1">Cart summary</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{itemsCount} items</p>
        <p className="font-bold mt-1">${total.toFixed(2)}</p>
      </div>
      <div className="rounded border dark:border-gray-800 p-4 bg-white dark:bg-gray-900 flex items-center justify-center">
        <Link href="/cart" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          View cart
        </Link>
      </div>
      <div className="rounded border dark:border-gray-800 p-4 bg-white dark:bg-gray-900 flex items-center justify-center">
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
