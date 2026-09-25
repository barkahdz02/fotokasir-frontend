import { create } from 'zustand';
import type { CartItem } from '../types/pos';

interface CartState {
  items: CartItem[];
  diskon: number;
  pelanggan_nama: string;
  catatan: string;

  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  setDiskon: (diskon: number) => void;
  setPelanggan: (nama: string) => void;
  setCatatan: (catatan: string) => void;

  subtotal: () => number;
  total: () => number;
  totalItems: () => number;
}

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  diskon: 0,
  pelanggan_nama: '',
  catatan: '',

  addItem: (item) => {
    const items = get().items;
    // Kalau produk dengan product_id sama sudah ada, tambah qty
    if (item.tipe === 'produk' && item.product_id) {
      const existing = items.find(
        (i) => i.tipe === 'produk' && i.product_id === item.product_id,
      );
      if (existing) {
        const newQty = existing.qty + item.qty;
        const newQtyDasar = existing.qty_dasar + item.qty_dasar;
        set({
          items: items.map((i) =>
            i.id === existing.id
              ? {
                  ...i,
                  qty: newQty,
                  qty_dasar: newQtyDasar,
                  subtotal: newQty * i.harga_satuan,
                }
              : i,
          ),
        });
        return;
      }
    }
    set({ items: [...items, { ...item, id: genId() }] });
  },

  removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

  updateQty: (id, qty) => {
    if (qty <= 0) {
      get().removeItem(id);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.id === id
          ? {
              ...i,
              qty,
              qty_dasar: (i.qty_dasar / i.qty) * qty,
              subtotal: qty * i.harga_satuan,
            }
          : i,
      ),
    });
  },

  clear: () => set({ items: [], diskon: 0, pelanggan_nama: '', catatan: '' }),

  setDiskon: (diskon) => set({ diskon }),
  setPelanggan: (nama) => set({ pelanggan_nama: nama }),
  setCatatan: (catatan) => set({ catatan }),

  subtotal: () => get().items.reduce((s, i) => s + i.subtotal, 0),
  total: () => Math.max(0, get().subtotal() - get().diskon),
  totalItems: () => get().items.reduce((s, i) => s + i.qty, 0),
}));
