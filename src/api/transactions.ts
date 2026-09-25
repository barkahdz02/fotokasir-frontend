import { apiClient } from './client';

export interface CartItemDto {
  tipe: 'produk' | 'jasa';
  product_id?: number;
  nama_snapshot: string;
  sku_snapshot?: string;
  qty: number;
  satuan: string;
  qty_dasar: number;
  harga_satuan: number;
  subtotal: number;
  detail_jasa?: Record<string, any>;
}

export interface CreateTransactionDto {
  items: CartItemDto[];
  diskon_total?: number;
  metode_bayar: 'tunai' | 'qris' | 'transfer';
  bayar: number;
  pelanggan_nama?: string;
  catatan?: string;
}

export interface Transaction {
  id: number;
  invoice_no: string;
  kasir_id: number;
  session_id: number | null;
  subtotal: number;
  diskon_total: number;
  total: number;
  metode_bayar: string;
  bayar: number;
  kembalian: number;
  status: string;
  catatan: string | null;
  pelanggan_nama: string | null;
  created_at: string;
  items?: CartItemDto[];
}

export const transactionsApi = {
  create: async (data: CreateTransactionDto): Promise<Transaction> => {
    const res = await apiClient.post<Transaction>('/transactions', data);
    return res.data;
  },

  list: async (): Promise<Transaction[]> => {
    const res = await apiClient.get<Transaction[]>('/transactions');
    return res.data;
  },

  get: async (id: number): Promise<Transaction> => {
    const res = await apiClient.get<Transaction>(`/transactions/${id}`);
    return res.data;
  },
};
