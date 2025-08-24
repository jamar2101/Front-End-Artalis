import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, ArrowLeft, Truck, CheckCircle, Clock, Sparkles, MapPin, CreditCard } from 'lucide-react';
import axios from 'axios';
import { Order, OrderStatus, PaymentMethod } from '../types';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PaymentInstructions from '../components/payment/PaymentInstructions';

const OrderStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
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
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setOrder(response.data.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id && auth.token) {
      fetchOrder();
    }
  }, [id, auth.token]);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <Clock className="h-6 w-6 text-yellow-400" />;
      case OrderStatus.PROCESSING:
        return <Package className="h-6 w-6 text-blue-400" />;
      case OrderStatus.SHIPPING:
        return <Truck className="h-6 w-6 text-purple-400" />;
      case OrderStatus.DELIVERED:
        return <CheckCircle className="h-6 w-6 text-green-400" />;
      default:
        return <Clock className="h-6 w-6 text-neutral-400" />;
    }
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

  const getPaymentMethodText = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.COD:
        return 'Bayar di Tempat (COD)';
      case PaymentMethod.BANK_MANDIRI:
        return 'Transfer Bank Mandiri';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 to-dark-900">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-custom py-16 text-center bg-gradient-to-br from-dark-950 to-dark-900 min-h-screen flex items-center justify-center">
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-4">Pesanan Tidak Ditemukan</h2>
          <p className="mb-6 text-neutral-300">Maaf, kami tidak dapat menemukan pesanan yang Anda cari.</p>
          <Link to="/order-history" className="btn-primary">
            Lihat Riwayat Pesanan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-10 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 min-h-screen">
      <div className="container-custom">
        <Link to="/order-history" className="flex items-center text-neutral-300 hover:text-primary-400 mb-6 group transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Riwayat Pesanan
        </Link>

        <div className="space-y-8">
          {/* Order Header */}
          <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-2xl overflow-hidden border border-primary-900/30">
            <div className="bg-gradient-to-r from-primary-900/30 to-primary-800/20 p-6 border-b border-primary-800/30">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2 flex items-center text-white">
                    <Sparkles className="h-8 w-8 mr-3 text-primary-400" />
                    Pesanan #{order._id.slice(-8)}
                  </h1>
                  <p className="text-neutral-300">
                    Dipesan pada{' '}
                    {new Date(order.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-2 font-semibold">{getStatusText(order.status)}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Details */}
                <div>
                  <h2 className="text-xl font-heading font-semibold mb-6 flex items-center text-white">
                    <Package className="h-6 w-6 mr-2 text-primary-400" />
                    Item Pesanan
                  </h2>
                  <div className="space-y-4">
                    {order.orderItems.map((item: any) => (
                      <div key={item._id} className="flex items-center p-4 bg-dark-700/50 rounded-xl border border-primary-800/30">
                        <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-dark-600 to-dark-700 rounded-lg overflow-hidden">
                          <img src={getImageUrl(item.product.image)} alt={item.product.name} className="w-full h-full object-cover" onError={handleImageError} />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-semibold text-white">{item.product.name}</h3>
                          <p className="text-sm text-neutral-400">
                            {item.quantity} x Rp{item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="font-bold text-primary-400">Rp{(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-primary-800/30">
                    <div className="space-y-3">
                      <div className="flex justify-between text-neutral-400">
                        <span>Subtotal</span>
                        <span className="text-white">Rp{order.itemsPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Ongkir</span>
                        <span className={order.shippingPrice === 0 ? 'text-green-400 font-medium' : 'text-white'}>{order.shippingPrice === 0 ? 'Gratis' : `Rp${order.shippingPrice.toLocaleString()}`}</span>
                      </div>
                      <div className="flex justify-between font-bold text-xl pt-3 border-t border-primary-800/30">
                        <span className="text-white">Total</span>
                        <span className="text-primary-400">Rp{order.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping & Payment Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-semibold mb-4 flex items-center text-white">
                      <MapPin className="h-6 w-6 mr-2 text-primary-400" />
                      Informasi Pengiriman
                    </h2>
                    <div className="bg-dark-700/50 p-4 rounded-xl border border-primary-800/30">
                      <p className="font-semibold text-white">{order.shippingAddress.fullName}</p>
                      <p className="text-neutral-300 mt-1">{order.shippingAddress.phone}</p>
                      <p className="text-neutral-300 mt-1">{order.shippingAddress.address}</p>
                      <p className="text-neutral-300">
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-heading font-semibold mb-4 flex items-center text-white">
                      <CreditCard className="h-6 w-6 mr-2 text-primary-400" />
                      Metode Pembayaran
                    </h2>
                    <div className="bg-dark-700/50 p-4 rounded-xl border border-primary-800/30">
                      <p className="font-medium text-white">{getPaymentMethodText(order.paymentMethod)}</p>
                      {order.shippingPrice === 0 && order.paymentMethod !== PaymentMethod.COD && <p className="text-green-400 text-sm mt-1">✓ Ongkir gratis sudah termasuk</p>}
                    </div>
                  </div>

                  {order.notes && (
                    <div>
                      <h2 className="text-xl font-heading font-semibold mb-4 text-white">Catatan Pesanan</h2>
                      <div className="bg-dark-700/50 p-4 rounded-xl border border-primary-800/30">
                        <p className="text-neutral-300">{order.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          {order.status === OrderStatus.PENDING && order.paymentMethod !== PaymentMethod.COD && (
            <div>
              <h2 className="text-xl font-heading font-semibold mb-4 flex items-center text-white">
                <CreditCard className="h-6 w-6 mr-2 text-primary-400" />
                Instruksi Pembayaran
              </h2>
              <PaymentInstructions paymentMethod={order.paymentMethod} totalAmount={order.totalPrice} orderId={order._id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
