'use client';

import { useEffect, useState, FormEvent, ChangeEvent, use } from 'react';
import { useRouter } from 'next/navigation';
import { productApi, Product } from '@/lib/api';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null as File | null,
  });

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoadingProduct(true);
      const data = await productApi.getById(Number(id));
      setProduct(data);
      setFormData({
        name: data.name,
        description: data.description,
        price: data.price.toString(),
        image: null,
      });
      if (data.imageUrl) {
        setImagePreview(`http://localhost:5057${data.imageUrl}`);
      }
    } catch (err) {
      alert('Product not found');
      router.push('/');
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await productApi.update(Number(id), {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image || undefined,
      });
      router.push(`/products/${id}`);
    } catch (err) {
      alert('Failed to update product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Product</h1>
            <p className="text-gray-600">Update product information</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-lg">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  maxLength={40}
                  required
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <p className="text-sm text-gray-500 mt-1">{formData.name.length}/40 characters</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-lg">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  maxLength={200}
                  required
                  rows={5}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">{formData.description.length}/200 characters</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-lg">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-bold">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-lg">
                  Product Image (Leave empty to keep current)
                </label>
                {imagePreview && !formData.image && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-3 font-semibold">Current Image:</p>
                    <img
                      src={imagePreview}
                      alt="Current"
                      className="max-w-md rounded-lg shadow-md mx-auto"
                    />
                  </div>
                )}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {formData.image ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview || ''}
                          alt="New preview"
                          className="max-w-md mx-auto rounded-lg shadow-md"
                        />
                        <p className="text-blue-600 font-semibold">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className="text-gray-600 font-semibold">Click to upload new image</p>
                        <p className="text-sm text-gray-500">Or keep existing image</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    '✓ Update Product'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.push(`/products/${id}`)}
                  disabled={loading}
                  className="flex-1 bg-gray-200 text-gray-800 px-8 py-4 rounded-xl hover:bg-gray-300 transition font-bold text-lg disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
