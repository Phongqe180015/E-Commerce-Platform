import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5057';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface ProductCreateRequest {
  name: string;
  description: string;
  price: number;
  image?: File;
}

export const productApi = {
  async getAll(): Promise<Product[]> {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data;
  },

  async getById(id: number): Promise<Product> {
    const response = await axios.get(`${API_URL}/api/products/${id}`);
    return response.data;
  },

  async create(data: ProductCreateRequest): Promise<Product> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await axios.post(`${API_URL}/api/products`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async update(id: number, data: ProductCreateRequest): Promise<Product> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await axios.put(`${API_URL}/api/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/api/products/${id}`);
  },
};
