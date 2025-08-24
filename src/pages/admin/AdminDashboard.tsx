import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, TrendingUp, Users, Sparkles, DollarSign } from 'lucide-react';
import axios from 'axios';
import { Order, OrderStatus } from '../../types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/orders`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/products`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/users`),
        ]);

        const orders = ordersRes.data.data;
        const totalRevenue = orders.reduce((sum: number, order: Order) => sum + order.totalPrice, 0);

        setStats({
          totalOrders: ordersRes.data.total,
          totalProducts: productsRes.data.total,
          totalRevenue: totalRevenue,
          totalCustomers: usersRes.data.data.length,
        });

        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Fungsi untuk memformat rupiah dengan pemisah ribuan yang rapi
  const formatRupiahCompact = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp').replace(/\s+/g, ' ');
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-yellow-900/30 text-yellow-300 border-yellow-700/50';
      case OrderStatus.PROCESSING:
        return 'bg-blue-900/30 text-blue-300 border-blue-700/50';
      case OrderStatus.SHIPPING:
        return 'bg-purple-900/30 text-purple-300 border-purple-700/50';
      case OrderStatus.DELIVERED:
        return 'bg-green-900/30 text-green-300 border-green-700/50';
      case OrderStatus.CANCELLED:
        return 'bg-red-900/30 text-red-300 border-red-700/50';
      default:
        return 'bg-neutral-800/30 text-neutral-300 border-neutral-700/50';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'Menunggu';
      case OrderStatus.PROCESSING:
        return 'Diproses';
      case OrderStatus.SHIPPING:
        return 'Dikirim';
      case OrderStatus.DELIVERED:
        return 'Terkirim';
      case OrderStatus.CANCELLED:
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold mb-2 flex items-center text-white">
          <Sparkles className="h-8 w-8 mr-3 text-primary-400" />
          Dasbor Admin
        </h1>
        <p className="text-neutral-400">Selamat datang di panel admin Artalis</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-4 lg:p-6 rounded-2xl shadow-xl border border-primary-900/30 hover:shadow-2xl transition-shadow">
          <div className="flex items-center">
            <div className="p-2 lg:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Package className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm text-neutral-400 font-medium mb-1">Total Pesanan</p>
              <h3 className="text-lg lg:text-2xl font-bold text-white">{stats.totalOrders}</h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-4 lg:p-6 rounded-2xl shadow-xl border border-primary-900/30 hover:shadow-2xl transition-shadow">
          <div className="flex items-center">
            <div className="p-2 lg:p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
              <ShoppingBag className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm text-neutral-400 font-medium mb-1">Total Parfum</p>
              <h3 className="text-lg lg:text-2xl font-bold text-white">{stats.totalProducts}</h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-4 lg:p-6 rounded-2xl shadow-xl border border-primary-900/30 hover:shadow-2xl transition-shadow">
          <div className="flex items-center">
            <div className="p-2 lg:p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex-shrink-0">
              <span className="text-white font-bold text-lg lg:text-xl">Rp</span>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm text-neutral-400 font-medium mb-1">Total Pendapatan</p>
              {/* Menggunakan whitespace-nowrap untuk mencegah teks turun ke baris baru */}
              <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white leading-none whitespace-nowrap overflow-hidden">
                {formatRupiahCompact(stats.totalRevenue)}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-4 lg:p-6 rounded-2xl shadow-xl border border-primary-900/30 hover:shadow-2xl transition-shadow">
          <div className="flex items-center">
            <div className="p-2 lg:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <Users className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm text-neutral-400 font-medium mb-1">Total Pelanggan</p>
              <h3 className="text-lg lg:text-2xl font-bold text-white">{stats.totalCustomers}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl border border-primary-900/30">
        <div className="p-6 border-b border-primary-800/30">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-heading font-semibold flex items-center text-white">
              <TrendingUp className="h-5 w-5 mr-2 text-primary-400" />
              Pesanan Terbaru
            </h2>
            <Link to="/admin/orders" className="text-primary-400 hover:text-primary-300 font-medium text-sm transition-colors">
              Lihat Semua Pesanan
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-700/50">
              <tr>
                <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">ID Pesanan</th>
                <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Pelanggan</th>
                <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Total</th>
                <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-800/30">
              {recentOrders.map((order: any) => (
                <tr key={order._id} className="hover:bg-dark-700/30 transition-colors">
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">#{order._id.slice(-6)}</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{order.user?.name || 'N/A'}</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(order.status)}`}>{getStatusText(order.status)}</span>
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs text-neutral-300 font-medium md:text-sm">{formatRupiah(order.totalPrice)}</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{new Date(order.createdAt).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {recentOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-neutral-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Belum ada pesanan</h3>
            <p className="text-neutral-400">Pesanan akan muncul di sini setelah pelanggan mulai berbelanja.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;