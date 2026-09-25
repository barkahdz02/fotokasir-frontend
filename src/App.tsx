import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MainLayout from './layouts/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

function ComingSoon({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <div className="card p-8 text-center text-gray-500">
        Halaman <span className="font-semibold">{title}</span> akan dibangun di sub-fase berikutnya.
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/kasir" element={<ComingSoon title="Kasir" />} />
          <Route path="/transaksi" element={<ComingSoon title="Transaksi" />} />
          <Route path="/produk" element={<ComingSoon title="Produk" />} />
          <Route path="/layanan" element={<ComingSoon title="Layanan" />} />
          <Route path="/inventory" element={<ComingSoon title="Inventory" />} />
          <Route path="/laporan" element={<ComingSoon title="Laporan" />} />
          <Route path="/users" element={<ComingSoon title="Users" />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
