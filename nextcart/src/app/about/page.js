export const metadata = {
  title: 'NextCart | About',
  description: 'Learn more about the team and technologies behind NextCart.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto p-6 max-w-2xl text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">About NextCart</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        NextCart is a minimal e‑commerce demo built with Next.js and Tailwind CSS. It highlights
        App Router patterns, server rendering for data fetching, and a clean component structure.
      </p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        The catalog is powered by a public API for convenience. Authentication is handled with
        NextAuth. A Firebase Admin connection is prepared to back user accounts and profiles.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        This project is intentionally lightweight and focused on clarity: product browsing,
        a persistent cart, and simple checkout messaging. More features can be layered on easily
        such as order history, payment integration, and real‑time inventory.
      </p>
    </div>
  );
}
