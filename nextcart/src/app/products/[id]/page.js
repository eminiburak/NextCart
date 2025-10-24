import ProductDetails from '@/components/ProductDetails';
import { getProductById } from '@/lib/api';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product)
    return {
      title: 'Product Not Found | NextCart',
      description: 'This product could not be located.',
    };
  return {
    title: `${product.title} | NextCart`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return <p>Product not found.</p>;
  return <ProductDetails product={product} />;
}
