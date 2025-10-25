import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundImage from '@/components/BackgroundImage';

export const metadata = {
  title: 'NextCart',
  description: 'Minimal e-commerce demo built with Next.js and Tailwind',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="relative flex-1">
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black" />
          <BackgroundImage />
          <div className="container mx-auto p-6">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
