import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <div className="rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="rounded-md object-cover mx-auto"
      />
      <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-100 text-center">
        {product.name}
      </h3>
      <p className="text-center text-gray-600 dark:text-gray-400">${product.price}</p>
    </div>
  )
}
