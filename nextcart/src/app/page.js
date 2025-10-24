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
        url: 'https://placehold.co/600x400.png',
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
      <h1 className="text-4xl font-bold mb-4">Welcome to NextCart 🛒</h1>
      <p className="text-gray-600 mb-8">Browse modern products built with Next.js and Tailwind.</p>
      <HomeClient />
    </div>
  );
}
