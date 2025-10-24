'use client';
import Link from 'next/link';

export default function HomeClient() {
  return (
    <Link
      href="/products"
      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
    >
      Shop Now
    </Link>
  );
}
