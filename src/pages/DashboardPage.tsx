import { Sparkles } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Selamat datang kembali, <span className="font-medium">{user?.nama}</span> 👋
        </p>
      </div>

      <div className="card p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Dashboard siap dibangun</h2>
        <p className="text-sm text-gray-500">
          Statistik penjualan, grafik, dan ringkasan akan tampil di sini pada Sub-FASE 10.4.
        </p>
      </div>
    </div>
  );
}
