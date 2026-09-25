import {
  Wallet,
  Receipt,
  TrendingUp,
  Package,
  AlertCircle,
  BarChart3,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useDashboard } from '../hooks/useDashboard';
import { useAuthStore } from '../stores/authStore';
import { StatCard } from '../components/ui/StatCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';
import { formatRupiah, formatNumber } from '../utils/format';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <LoadingSpinner message="Memuat data dashboard..." />;

  if (error) {
    return (
      <div className="card p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">Gagal memuat data</p>
            <p className="text-sm text-gray-500 mt-1">
              {(error as Error)?.message ?? 'Terjadi kesalahan'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const chartData = data.top_produk.map((p) => ({
    nama: p.nama.length > 15 ? p.nama.slice(0, 15) + '…' : p.nama,
    omset: Number(p.total_omset),
    qty: Number(p.total_qty),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Selamat datang kembali, <span className="font-medium">{user?.nama}</span> 👋
        </p>
      </div>

      {/* Kartu Statistik Hari Ini */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Hari Ini
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Omset Hari Ini"
            value={formatRupiah(data.hari_ini.total_omset)}
            subtitle={`Rata-rata: ${formatRupiah(data.hari_ini.rata_rata)}`}
            icon={Wallet}
            variant="default"
          />
          <StatCard
            title="Transaksi Hari Ini"
            value={formatNumber(data.hari_ini.total_transaksi)}
            subtitle={`Tunai: ${formatRupiah(data.hari_ini.total_tunai)}`}
            icon={Receipt}
            variant="success"
          />
          <StatCard
            title="Laba Kotor (Bulan)"
            value={formatRupiah(data.laba_bulan_ini.laba_kotor)}
            subtitle={`Margin: ${data.laba_bulan_ini.margin.toFixed(2)}%`}
            icon={TrendingUp}
            variant={data.laba_bulan_ini.laba_kotor >= 0 ? 'success' : 'danger'}
          />
          <StatCard
            title="Stok Rendah"
            value={formatNumber(data.stok.produk_stok_rendah)}
            subtitle={`Total produk: ${data.stok.total_produk}`}
            icon={data.stok.produk_stok_rendah > 0 ? AlertCircle : Package}
            variant={data.stok.produk_stok_rendah > 0 ? 'warning' : 'default'}
          />
        </div>
      </div>

      {/* Kartu Omset Bulan Ini */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-1">
          <p className="text-sm font-medium text-gray-500">Omset Bulan Ini</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatRupiah(data.bulan_ini.total_omset)}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tunai</span>
              <span className="font-medium text-gray-900">
                {formatRupiah(data.bulan_ini.total_tunai)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">QRIS</span>
              <span className="font-medium text-gray-900">
                {formatRupiah(data.bulan_ini.total_qris)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Transfer</span>
              <span className="font-medium text-gray-900">
                {formatRupiah(data.bulan_ini.total_transfer)}
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Top 5 Produk (Bulan Ini)</h3>
          </div>
          {chartData.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Belum ada data penjualan"
              description="Chart akan muncul setelah ada transaksi"
            />
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="nama"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(v: number) => formatRupiah(v)}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="omset" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Top Produk List */}
      <div className="card p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Detail Top Produk</h3>
        {data.top_produk.length === 0 ? (
          <EmptyState
            icon={Package}
            title="Belum ada data penjualan"
            description="Detail produk akan muncul setelah ada transaksi"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-500 text-xs uppercase tracking-wider">
                    Produk
                  </th>
                  <th className="text-left py-2 font-medium text-gray-500 text-xs uppercase tracking-wider">
                    Tipe
                  </th>
                  <th className="text-right py-2 font-medium text-gray-500 text-xs uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="text-right py-2 font-medium text-gray-500 text-xs uppercase tracking-wider">
                    Omset
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.top_produk.map((p, idx) => (
                  <tr key={idx} className="border-b border-gray-100 last:border-0">
                    <td className="py-2.5 text-gray-900">{p.nama}</td>
                    <td className="py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          p.tipe === 'produk'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-purple-50 text-purple-700'
                        }`}
                      >
                        {p.tipe}
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-gray-900">{formatNumber(p.total_qty)}</td>
                    <td className="py-2.5 text-right font-medium text-gray-900">
                      {formatRupiah(p.total_omset)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
