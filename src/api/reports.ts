import { apiClient } from './client';
import type { DashboardData, TopProduk } from '../types/api';

export interface PenjualanResponse {
  periode: string;
  dari: string;
  sampai: string;
  ringkasan: {
    total_transaksi: number;
    total_omset: number;
    rata_rata: number;
    total_tunai: number;
    total_qris: number;
    total_transfer: number;
  };
  transaksi: any[];
}

export interface LabaRugiResponse {
  periode: string;
  dari: string;
  sampai: string;
  omset: number;
  cogs: number;
  laba_kotor: number;
  margin: number;
}

export interface StokResponse {
  total_produk: number;
  total_nilai_stok: number;
  produk_stok_rendah: number;
  list_stok_rendah: any[];
  semua_produk: any[];
}

export const reportsApi = {
  dashboard: async (): Promise<DashboardData> => {
    const res = await apiClient.get<DashboardData>('/reports/dashboard');
    return res.data;
  },

  penjualan: async (periode: 'hari' | 'minggu' | 'bulan' = 'hari'): Promise<PenjualanResponse> => {
    const res = await apiClient.get<PenjualanResponse>('/reports/penjualan', {
      params: { periode },
    });
    return res.data;
  },

  labaRugi: async (periode: 'hari' | 'minggu' | 'bulan' = 'bulan'): Promise<LabaRugiResponse> => {
    const res = await apiClient.get<LabaRugiResponse>('/reports/laba-rugi', {
      params: { periode },
    });
    return res.data;
  },

  topProducts: async (
    periode: 'hari' | 'minggu' | 'bulan' = 'bulan',
    limit = 10,
  ): Promise<TopProduk[]> => {
    const res = await apiClient.get<TopProduk[]>('/reports/top-products', {
      params: { periode, limit },
    });
    return res.data;
  },

  stok: async (): Promise<StokResponse> => {
    const res = await apiClient.get<StokResponse>('/reports/stok');
    return res.data;
  },
};
