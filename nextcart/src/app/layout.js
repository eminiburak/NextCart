import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SessionProvider } from '@/components/SessionProvider';
import CartProvider from '@/context/CartContext';

export const metadata = {
  title: 'NextCart',
  description: 'Minimal e-commerce demo built with Next.js and Tailwind',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <SessionProvider>
        <CartProvider>
          <Header />
          <main className="flex-1 container mx-auto p-6">{children}</main>
          <Footer />
        </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
