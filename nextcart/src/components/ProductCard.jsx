import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const imageSrc = product?.image && product.image.trim() !== '' ? product.image : '/placeholder.png';
  const title = product?.title || product?.name || 'Untitled Product';

  return (
    <Link href={`/products/${product.id}`} className="block rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition">
      <Image
        src={imageSrc}
        alt={title}
        width={200}
        height={200}
        className="rounded-md object-contain mx-auto h-[200px] w-auto"
      />
      <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-100 text-center line-clamp-2">
        {title}
      </h3>
      <p className="text-center text-gray-600 dark:text-gray-400">${product.price}</p>
    </Link>
  );
}
