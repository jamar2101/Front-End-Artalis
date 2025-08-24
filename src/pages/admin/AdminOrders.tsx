import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertCircle, Package } from 'lucide-react';
import axios from 'axios';
import { Order, OrderStatus } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const { auth } = useAuth();

  const getImageUrl = (imagePath: string) => {
    // Jika sudah URL lengkap (http/https), gunakan langsung
    if (imagePath && imagePath.startsWith('http')) {
      return imagePath;
    }

    // Jika path lokal dari upload, tambahkan base URL
    if (imagePath && imagePath.startsWith('/uploads/')) {
      return `${import.meta.env.VITE_API_URL}${imagePath}`;
    }

    // Fallback ke gambar default parfum jika tidak ada gambar
    const perfumeImages = [
      'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
      'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
      'https://images.pexels.com/photos/1961796/pexels-photo-1961796.jpeg',
      'https://images.pexels.com/photos/1961794/pexels-photo-1961794.jpeg',
      'https://images.pexels.com/photos/1961793/pexels-photo-1961793.jpeg',
    ];

    // Use a consistent image based on imagePath or random
    const imageIndex = imagePath ? parseInt(imagePath.slice(-1), 16) % perfumeImages.length : Math.floor(Math.random() * perfumeImages.length);
    return perfumeImages[imageIndex];
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg';
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Gagal mengambil data pesanan');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success('Status pesanan berhasil diperbarui');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Gagal memperbarui status pesanan');
    }
  };

  const handleViewOrderDetail = async (orderId: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setSelectedOrder(response.data.data);
      setShowOrderDetail(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Gagal mengambil detail pesanan');
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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

  const filteredOrders = orders.filter((order) => {
    const searchString = searchTerm.toLowerCase();
    const matchesSearch = order._id.toLowerCase().includes(searchString) || (order.user as any).name.toLowerCase().includes(searchString) || order.shippingAddress.fullName.toLowerCase().includes(searchString);

    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold mb-2 flex items-center text-white">
          <Package className="h-8 w-8 mr-3 text-primary-400" />
          Kelola Pesanan
        </h1>
        <p className="text-neutral-400">Lacak dan kelola pesanan pelanggan</p>
      </div>

      {!showOrderDetail ? (
        <>
          {/* Filters */}
          <div className="mb-4 lg:mb-6 flex flex-col lg:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari pesanan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 pl-10 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
              </div>
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
                className="w-full lg:min-w-[160px] px-3 py-2 pl-10 pr-8 appearance-none rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">Semua Status</option>
                <option value={OrderStatus.PENDING}>Menunggu</option>
                <option value={OrderStatus.PROCESSING}>Diproses</option>
                <option value={OrderStatus.SHIPPING}>Dikirim</option>
                <option value={OrderStatus.DELIVERED}>Terkirim</option>
                <option value={OrderStatus.CANCELLED}>Dibatalkan</option>
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl overflow-hidden border border-primary-900/30">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary-900/30 to-primary-800/20">
                  <tr>
                    <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">ID Pesanan</th>
                    <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Pelanggan</th>
                    <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Total</th>
                    <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Status</th>
                    <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider hidden md:table-cell">Tanggal</th>
                    <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-800/30">
                  {filteredOrders.map((order: any) => (
                    <tr key={order._id} className="hover:bg-dark-700/30 transition-colors">
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">#{order._id.slice(-6)}</td>
                      <td className="px-3 lg:px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">{order.shippingAddress.fullName}</div>
                          <div className="text-xs lg:text-sm text-neutral-400">{order.shippingAddress.phone}</div>
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{formatRupiah(order.totalPrice)}</td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value as OrderStatus)}
                          className={`text-xs lg:text-sm font-semibold rounded-full px-2 lg:px-3 py-1 border-0 ${getStatusColor(order.status as OrderStatus)} bg-transparent`}
                        >
                          <option value={OrderStatus.PENDING}>Menunggu</option>
                          <option value={OrderStatus.PROCESSING}>Diproses</option>
                          <option value={OrderStatus.SHIPPING}>Dikirim</option>
                          <option value={OrderStatus.DELIVERED}>Terkirim</option>
                          <option value={OrderStatus.CANCELLED}>Dibatalkan</option>
                        </select>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-neutral-300 hidden md:table-cell">
                        {new Date(order.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                        <button onClick={() => handleViewOrderDetail(order._id)} className="text-primary-400 hover:text-primary-300 font-medium transition-colors text-xs lg:text-sm">
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-neutral-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Tidak ada pesanan ditemukan</h3>
                <p className="text-neutral-400">{searchTerm ? 'Coba sesuaikan kriteria pencarian Anda' : statusFilter !== 'all' ? 'Tidak ada pesanan dengan status yang dipilih' : 'Belum ada pesanan yang dibuat'}</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Order Detail Modal */
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl border border-primary-900/30">
          <div className="p-6 border-b border-primary-800/30">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-heading font-semibold text-white">Detail Pesanan #{selectedOrder?._id.slice(-6)}</h2>
              <button onClick={() => setShowOrderDetail(false)} className="text-neutral-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>
          </div>

          {selectedOrder && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">Item Pesanan</h3>
                  <div className="space-y-4">
                    {selectedOrder.orderItems.map((item: any, index) => (
                      <div key={index} className="flex items-center p-4 bg-dark-700/50 rounded-xl border border-primary-800/30">
                        <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-dark-600 to-dark-700 rounded-lg overflow-hidden">
                          <img src={getImageUrl(item.product?.image)} alt={item.product?.name || 'Product'} className="w-full h-full object-cover" onError={handleImageError} />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="font-semibold text-white">{item.product?.name || 'Product Name'}</h4>
                          <p className="text-sm text-neutral-400">
                            {item.quantity} x {formatRupiah(item.price)}
                          </p>
                        </div>
                        <div className="font-bold text-primary-400">{formatRupiah(item.price * item.quantity)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer & Shipping Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">Informasi Pelanggan</h3>
                  <div className="bg-dark-700/50 p-4 rounded-xl border border-primary-800/30 mb-6">
                    <p className="font-semibold text-white">{selectedOrder.shippingAddress.fullName}</p>
                    <p className="text-neutral-300 mt-1">{selectedOrder.shippingAddress.phone}</p>
                    <p className="text-neutral-300 mt-1">{selectedOrder.shippingAddress.address}</p>
                    <p className="text-neutral-300">
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold mb-4 text-white">Ringkasan Pembayaran</h3>
                  <div className="bg-dark-700/50 p-4 rounded-xl border border-primary-800/30">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Subtotal:</span>
                        <span className="text-white">{formatRupiah(selectedOrder.itemsPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Ongkir:</span>
                        <span className="text-white">{formatRupiah(selectedOrder.shippingPrice)}</span>
                      </div>
                      <div className="border-t border-primary-800/30 pt-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-white">Total:</span>
                          <span className="text-primary-400">{formatRupiah(selectedOrder.totalPrice)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
