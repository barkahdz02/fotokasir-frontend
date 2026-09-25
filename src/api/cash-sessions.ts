import { apiClient } from './client';

export interface CashSession {
  id: number;
  kasir_id: number;
  waktu_buka: string;
  waktu_tutup: string | null;
  saldo_awal: number;
  total_penjualan: number;
  total_qris: number;
  total_transfer: number;
  saldo_akhir_sistem: number | null;
  saldo_akhir_aktual: number | null;
  selisih: number | null;
  catatan: string | null;
  status: 'buka' | 'tutup';
}

export interface OpenSessionDto {
  saldo_awal: number;
  catatan?: string;
}

export interface CloseSessionDto {
  saldo_akhir_aktual: number;
  catatan?: string;
}

export const cashSessionsApi = {
  active: async (): Promise<CashSession | null> => {
    try {
      const res = await apiClient.get<CashSession>('/cash-sessions/active');
      return res.data;
    } catch (err: any) {
      if (err?.response?.status === 404) return null;
      throw err;
    }
  },

  open: async (data: OpenSessionDto): Promise<CashSession> => {
    const res = await apiClient.post<CashSession>('/cash-sessions/open', data);
    return res.data;
  },

  close: async (data: CloseSessionDto): Promise<CashSession> => {
    const res = await apiClient.post<CashSession>('/cash-sessions/close', data);
    return res.data;
  },

  list: async (): Promise<CashSession[]> => {
    const res = await apiClient.get<CashSession[]>('/cash-sessions');
    return res.data;
  },
};
