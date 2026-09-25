export interface CartItem {
  id: string;
  tipe: 'produk' | 'jasa';
  product_id?: number;
  service_type_id?: number;
  nama_snapshot: string;
  sku_snapshot?: string;
  qty: number;
  satuan: string;
  qty_dasar: number;
  harga_satuan: number;
  subtotal: number;
  detail_jasa?: Record<string, any>;
}

export interface ServiceSelection {
  service_type_id: number;
  service_nama: string;
  kombinasi: Record<string, string>;
  harga: number;
  qty: number;
}
