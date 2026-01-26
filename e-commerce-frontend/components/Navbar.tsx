import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition">
            E-Commerce Store
          </Link>
          <div className="space-x-6">
            <Link href="/" className="hover:text-blue-200 transition">
              Products
            </Link>
            <Link href="/products/create" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-semibold">
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
