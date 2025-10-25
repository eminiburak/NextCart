import HomeClient from '../components/HomeClient';

export const metadata = {
  title: 'NextCart | Home',
  description: 'Browse stylish, affordable products built with Next.js and Tailwind CSS.',
  openGraph: {
    title: 'NextCart | Home',
    description: 'Browse stylish, affordable products built with Next.js and Tailwind CSS.',
    url: '#',
    siteName: 'NextCart',
    images: [
      {
        url: '/lightImg.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Welcome to NextCart 🛒
      </h1>
      <p className="mb-8 text-gray-700 dark:text-gray-300">
        Browse modern products built with Next.js and Tailwind.
      </p>
      <HomeClient />
    </div>
  );
}
