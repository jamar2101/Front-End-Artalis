import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { PaymentMethod } from '../types';
import PaymentMethodSelector from '../components/payment/PaymentMethodSelector';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  const [notes, setNotes] = useState('');

  // Calculate shipping cost based on payment method
  const getShippingCost = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.COD:
        return 5000; // COD: Rp5.000
      case PaymentMethod.BANK_MANDIRI:
      case PaymentMethod.QRIS_MANDIRI:
        return 0; // Transfer Bank: Gratis
      default:
        return 5000;
    }
  };

  const shippingCost = getShippingCost(paymentMethod);
  const totalPrice = cart.totalPrice + shippingCost;

  const getImageUrl = (imagePath: string) => {
    // Jika sudah URL lengkap (http/https), gunakan langsung
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // Jika path lokal, tambahkan base URL
    return `${import.meta.env.VITE_API_URL}${imagePath}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        orderItems: cart.items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.totalPrice,
        shippingPrice: shippingCost,
        totalPrice: totalPrice,
        notes
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
          }
        }
      );

      clearCart();
      toast.success('Pesanan berhasil dibuat!');
      navigate(`/orders/${response.data.data._id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal membuat pesanan');
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="py-6 md:py-10 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 min-h-screen">
      <div className="container-custom">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-white">Checkout</h1>

        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Form Checkout */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-4 md:p-6 rounded-2xl shadow-xl border border-primary-900/30">
                <div className="flex items-center mb-4">
                  <Truck className="h-5 w-5 text-primary-400 mr-2" />
                  <h2 className="text-lg md:text-xl font-semibold text-white">Informasi Pengiriman</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-neutral-300 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={shippingAddress.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-1">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Masukkan nomor telepon"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-neutral-300 mb-1">
                      Alamat
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={shippingAddress.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Masukkan alamat lengkap"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-neutral-300 mb-1">
                        Kota
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Masukkan kota"
                      />
                    </div>

                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-neutral-300 mb-1">
                        Kode Pos
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        required
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Masukkan kode pos"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-4 md:p-6 rounded-2xl shadow-xl border border-primary-900/30">
                <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">Metode Pembayaran</h2>
                <PaymentMethodSelector
                  selectedMethod={paymentMethod}
                  onMethodChange={setPaymentMethod}
                />
                
                {/* Shipping Cost Info */}
                <div className="mt-4 p-3 bg-primary-900/20 border border-primary-700/50 rounded-xl">
                  <div className="text-sm text-primary-300">
                    <strong>Informasi Biaya Ongkir:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• COD (Bayar di Tempat): Rp 5000</li>
                      <li>• Transfer Bank: Gratis</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-4 md:p-6 rounded-2xl shadow-xl border border-primary-900/30">
                <div className="flex items-center mb-4">
                  <ShoppingBag className="h-5 w-5 text-primary-400 mr-2" />
                  <h2 className="text-lg md:text-xl font-semibold text-white">Catatan Pesanan</h2>
                </div>

                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Tambahkan catatan khusus untuk pesanan Anda (opsional)"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Memproses...
                  </div>
                ) : (
                  'Buat Pesanan'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-4 md:p-6 rounded-2xl shadow-xl lg:sticky lg:top-24 border border-primary-900/30">
              <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-white">Ringkasan Pesanan</h2>

              {/* Mobile: Compact Item List */}
              <div className="md:hidden mb-4">
                <div className="text-sm text-neutral-400 mb-2">
                  {cart.items.length} item dalam pesanan
                </div>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {cart.items.map(item => (
                    <div key={item.product._id} className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 flex-shrink-0 bg-dark-700 rounded overflow-hidden">
                        <img 
                          src={getImageUrl(item.product.image)} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="font-medium truncate text-white">{item.product.name}</div>
                        <div className="text-neutral-400">{item.quantity}x</div>
                      </div>
                      <div className="font-semibold text-primary-400">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: Full Item List */}
              <div className="hidden md:block divide-y divide-primary-800/30 mb-6">
                {cart.items.map(item => (
                  <div key={item.product._id} className="py-4 flex items-center">
                    <div className="w-16 h-16 flex-shrink-0 bg-dark-700 rounded-xl overflow-hidden">
                      <img 
                        src={getImageUrl(item.product.image)} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium text-white">{item.product.name}</h3>
                      <p className="text-sm text-neutral-400">
                        {item.quantity} x Rp{item.product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="font-semibold text-primary-400">
                      Rp{(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-primary-800/30 pt-4 space-y-3">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="font-medium text-white">Rp{cart.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-neutral-400">Ongkir</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-green-400' : 'text-white'}`}>
                    {shippingCost === 0 ? 'Gratis' : `Rp${shippingCost.toLocaleString()}`}
                  </span>
                </div>
                {shippingCost === 0 && (
                  <div className="text-xs text-green-400 italic">
                    Ongkir gratis untuk transfer bank!
                  </div>
                )}
                <div className="border-t border-primary-800/30 pt-3">
                  <div className="flex justify-between font-bold text-base md:text-lg">
                    <span className="text-white">Total</span>
                    <span className="text-primary-400">
                      Rp{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;