import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Sparkles, Calendar, DollarSign } from 'lucide-react';
import axios from 'axios';
import { Order, OrderStatus } from '../types';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
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

    

    // Use a consistent image based on imagePath or random
    const imageIndex = imagePath ? parseInt(imagePath.slice(-1), 16) % perfumeImages.length : Math.floor(Math.random() * perfumeImages.length);
    return perfumeImages[imageIndex];
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg';
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (auth.token) {
      fetchOrders();
    }
  }, [auth.token]);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 to-dark-900">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="py-6 md:py-10 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-white">
            Riwayat <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Pesanan</span>
          </h1>
          <p className="text-neutral-300">Lacak pembelian dan pengiriman parfum Anda</p>
        </div>

        {orders.length > 0 ? (
          <>
            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-6 rounded-2xl shadow-xl border border-primary-900/30">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-neutral-400">Total Pesanan</p>
                    <h3 className="text-2xl font-bold text-white">{orders.length}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-6 rounded-2xl shadow-xl border border-primary-900/30">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                    <span className="text-white font-bold text-xl">Rp</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-neutral-400">Total Belanja</p>
                    <h3 className="text-2xl font-bold text-white">Rp{orders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString()}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-6 rounded-2xl shadow-xl border border-primary-900/30">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-neutral-400">Terkirim</p>
                    <h3 className="text-2xl font-bold text-white">{orders.filter((order) => order.status === OrderStatus.DELIVERED).length}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {orders.map((order) => (
                <Link
                  key={order._id}
                  to={`/orders/${order._id}`}
                  className="block bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-primary-900/30 hover:border-primary-700/50 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Order Info */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                          <Package className="h-5 w-5 text-primary-400" />
                          <h2 className="font-heading font-semibold text-lg text-white">Pesanan #{order._id.slice(-8)}</h2>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>{getStatusText(order.status)}</span>
                        </div>

                        <div className="flex items-center text-sm text-neutral-400 mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          Dipesan pada{' '}
                          {new Date(order.createdAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>

                        {/* Order Items Preview */}
                        <div className="flex items-center gap-4 overflow-x-auto py-2">
                          {order.orderItems.slice(0, 4).map((item: any, index) => (
                            <div key={item._id || index} className="flex-shrink-0">
                              <div className="w-16 h-16 bg-gradient-to-br from-dark-700 to-dark-800 rounded-lg overflow-hidden border border-primary-800/30">
                                <img src={getImageUrl(item.product.image)} alt={item.product.name} className="w-full h-full object-cover" onError={handleImageError} />
                              </div>
                            </div>
                          ))}
                          {order.orderItems.length > 4 && (
                            <div className="w-16 h-16 bg-dark-700 rounded-lg flex items-center justify-center text-neutral-400 text-sm font-medium border border-primary-800/30">+{order.orderItems.length - 4}</div>
                          )}
                        </div>
                      </div>

                      {/* Order Total */}
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-1">Rp{order.totalPrice.toLocaleString()}</div>
                        <div className="text-sm text-neutral-400">
                          {order.orderItems.length} item{order.orderItems.length !== 1 ? '' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl border border-primary-900/30">
            <EmptyState
              icon={<ShoppingBag className="h-12 w-12 md:h-16 md:w-16 text-neutral-500" />}
              title="Belum ada pesanan"
              description="Anda belum melakukan pemesanan. Mulai jelajahi koleksi parfum mewah kami untuk menemukan aroma sempurna Anda."
              actionText="Jelajahi Parfum"
              actionLink="/products"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
