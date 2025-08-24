import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/cart/CartItem';
import EmptyState from '../components/ui/EmptyState';

const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();

  // Default shipping cost (will be updated in checkout based on payment method)
  const defaultShippingCost = 15000;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="py-6 md:py-10 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-white">
            Keranjang <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Belanja</span> Anda
          </h1>
          <p className="text-neutral-300">Tinjau parfum pilihan Anda sebelum checkout</p>
        </div>

        {cart.items.length > 0 ? (
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl overflow-hidden border border-primary-900/30">
                {/* Header - Desktop */}
                <div className="hidden md:flex justify-between items-center p-6 border-b border-primary-800/30 bg-gradient-to-r from-primary-900/30 to-primary-800/20">
                  <h2 className="text-lg md:text-xl font-heading font-semibold flex items-center text-white">
                    <Sparkles className="h-5 w-5 mr-2 text-primary-400" />
                    Item Keranjang ({cart.totalItems})
                  </h2>
                  <button onClick={clearCart} className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors px-3 py-1 rounded-lg hover:bg-red-900/20">
                    Kosongkan Keranjang
                  </button>
                </div>

                {/* Header - Mobile */}
                <div className="md:hidden p-4 border-b border-primary-800/30 bg-gradient-to-r from-primary-900/30 to-primary-800/20">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-heading font-semibold flex items-center text-white">
                      <Sparkles className="h-4 w-4 mr-2 text-primary-400" />
                      Keranjang ({cart.totalItems})
                    </h2>
                    <button onClick={clearCart} className="text-red-400 hover:text-red-300 text-sm font-medium">
                      Kosongkan
                    </button>
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-primary-800/30">
                  {cart.items.map((item) => (
                    <CartItem key={item.product._id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl p-6 lg:sticky lg:top-24 border border-primary-900/30">
                <h2 className="text-lg md:text-xl font-heading font-semibold mb-6 flex items-center text-white">
                  <ShoppingCart className="h-5 w-5 mr-2 text-primary-400" />
                  Ringkasan Pesanan
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-neutral-400">Subtotal</span>
                    <span className="font-medium text-white">{formatRupiah(cart.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-neutral-400">Ongkir</span>
                    <span className="font-medium text-white">{formatRupiah(defaultShippingCost)}</span>
                  </div>
                  <div className="text-xs text-neutral-400 italic bg-primary-900/20 p-2 rounded-lg border border-primary-800/30">* Biaya ongkir final akan disesuaikan berdasarkan metode pembayaran</div>
                  <div className="border-t border-primary-800/30 pt-4">
                    <div className="flex justify-between font-bold text-lg md:text-xl">
                      <span className="text-white">Total</span>
                      <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">{formatRupiah(cart.totalPrice + defaultShippingCost)}</span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="btn-primary w-full flex items-center justify-center py-4 mb-4 text-lg font-semibold rounded-xl">
                  Lanjut ke Checkout
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>

                <div className="text-center">
                  <Link to="/products" className="text-primary-400 hover:text-primary-300 font-medium text-sm md:text-base transition-colors">
                    Lanjut Belanja
                  </Link>
                </div>

                {/* Security badges */}
                <div className="mt-6 pt-6 border-t border-primary-800/30">
                  <div className="text-center">
                    <p className="text-xs text-neutral-400 mb-2">Checkout Aman</p>
                    <div className="flex justify-center space-x-2">
                      <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">SSL</div>
                      <div className="w-8 h-5 bg-gradient-to-r from-green-600 to-green-700 rounded text-white text-xs flex items-center justify-center font-bold">256</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl border border-primary-900/30">
            <EmptyState
              icon={<ShoppingCart className="h-12 w-12 md:h-16 md:w-16 text-neutral-500" />}
              title="Keranjang Anda kosong"
              description="Temukan koleksi parfum mewah kami dan temukan aroma sempurna Anda."
              actionText="Jelajahi Parfum"
              actionLink="/products"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
