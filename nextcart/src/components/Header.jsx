'use client';
import Link from 'next/link';
import Image from 'next/image';
import AuthButtons from './AuthButtons';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="NextCart Logo"
            width={32}
            height={32}
            className="rounded-sm"
            priority={true}
          />
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            NextCart
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300">
            <li>
              <Link href="/products" className="hover:text-blue-600 dark:hover:text-blue-400">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-blue-600 dark:hover:text-blue-400">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-blue-600 dark:hover:text-blue-400">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
          <ThemeToggle />
          <div className="flex items-center gap-6">
          <AuthButtons />
        </div>
        </div>
      </nav>
    </header>
  );
}
