import { apiClient } from './client';

export interface Product {
  id: number;
  sku: string;
  barcode?: string;
  nama: string;
  category_id: number;
  tipe: string;
  stok_qty: number;
  stok_minimum: number;
  harga_beli?: number;
  harga_jual: number;
  satuan_dasar_id?: number;
  is_active: number;
}

export const productsApi = {
  list: async (): Promise<Product[]> => {
    const res = await apiClient.get<Product[]>('/products');
    return res.data;
  },

  byBarcode: async (barcode: string): Promise<Product> => {
    const res = await apiClient.get<Product>(`/products/barcode/${barcode}`);
    return res.data;
  },

  get: async (id: number): Promise<Product> => {
    const res = await apiClient.get<Product>(`/products/${id}`);
    return res.data;
  },
};
