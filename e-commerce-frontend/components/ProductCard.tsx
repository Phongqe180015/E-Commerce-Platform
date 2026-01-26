import Link from 'next/link';
import { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.imageUrl 
    ? `http://localhost:5057${product.imageUrl}` 
    : '/placeholder-product.svg';

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer h-full flex flex-col">
        <div className="relative h-56 bg-gray-100 flex items-center justify-center p-2">
          <img
            src={imageUrl}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.svg';
            }}
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
