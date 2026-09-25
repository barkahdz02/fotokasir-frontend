export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  require_role_selection: boolean;
  role_aktif?: string;
}

export interface User {
  id: number;
  nama: string;
  username: string;
  is_super_admin: boolean;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
  roles?: Role[];
}

export interface Role {
  id: number;
  kode: string;
  nama: string;
  deskripsi?: string;
  warna?: string;
  urutan?: number;
}

export interface DashboardData {
  hari_ini: RingkasanPenjualan;
  bulan_ini: RingkasanPenjualan;
  laba_bulan_ini: {
    omset: number;
    laba_kotor: number;
    margin: number;
  };
  stok: {
    total_produk: number;
    produk_stok_rendah: number;
    total_nilai_stok: number;
  };
  top_produk: TopProduk[];
}

export interface RingkasanPenjualan {
  total_transaksi: number;
  total_omset: number;
  rata_rata: number;
  total_tunai: number;
  total_qris: number;
  total_transfer: number;
}

export interface TopProduk {
  nama: string;
  tipe: string;
  total_qty: number;
  total_omset: number;
}
