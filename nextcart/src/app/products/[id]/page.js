import ProductDetails from '@/components/ProductDetails';
import { getProductById } from '@/lib/api';
import CartProvider from '@/context/CartContext';

export async function generateMetadata() {
  return {
    title: 'Product | NextCart',
    description: 'Product details',
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return <p>Product not found.</p>;
  return (
    <CartProvider>
      <ProductDetails product={product} />
    </CartProvider>
  );
}
