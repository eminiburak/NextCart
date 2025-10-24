'use client'
import { useContext, useMemo } from 'react'
import { CartContext } from '@/context/CartContext'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function CartPage() {
  const { data: session } = useSession()
  const { cart, removeFromCart, clearCart, updateQuantity, increment, decrement } = useContext(CartContext)

  const { items, total } = useMemo(() => {
    const list = (cart || []).map((p) => ({ ...p, quantity: p.quantity || 1 }))
    const sum = list.reduce((acc, it) => acc + (Number(it.price) || 0) * it.quantity, 0)
    return { items: list, total: sum }
  }, [cart])

  if (!items.length) {
    return (
      <div className="text-center p-8">
        <p className="mb-4">Your cart is empty.</p>
        <Link href="/products" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <ul className="divide-y dark:divide-gray-800 mb-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 py-4">
            <img src={item.image} alt={item.title || item.name} className="h-16 w-16 object-contain" />
            <div className="flex-1">
              <p className="font-medium">{item.title || item.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <button onClick={() => decrement(item.id)} className="px-2 py-1 border dark:border-gray-700 rounded">-</button>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  className="w-16 px-2 py-1 border dark:border-gray-700 rounded bg-transparent"
                />
                <button onClick={() => increment(item.id)} className="px-2 py-1 border dark:border-gray-700 rounded">+</button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${(Number(item.price) || 0).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:underline text-sm">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <button onClick={clearCart} className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded">Clear cart</button>
        <div className="text-right">
          <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
          {session ? (
            <button
              onClick={() => alert(`Payment successful! Charged $${total.toFixed(2)}.`)}
              className="mt-2 w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Checkout
            </button>
          ) : (
            <Link href="/auth/signin" className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Sign in to checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
