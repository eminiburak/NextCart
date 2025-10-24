import ProductGrid from '@/components/ProductGrid';
import { getAllProducts } from '@/lib/api';

export const metadata = {
  title: 'NextCart | Products',
  description: 'Shop trending tech, fashion, and lifestyle items from FakeStoreAPI.',
  openGraph: {
    title: 'NextCart | Products',
    description: 'Shop trending tech, fashion, and lifestyle items from FakeStoreAPI.',
    url: '#',
    siteName: 'NextCart',
    images: [
      {
        url: 'https://placehold.co/600x400.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: 'products, shopping, tech, fashion, lifestyle',
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
