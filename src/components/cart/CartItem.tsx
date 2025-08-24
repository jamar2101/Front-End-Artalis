import React from 'react';
import { Link } from 'react-router-dom';
import { Trash, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();

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

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(product._id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(product._id);
  };

  return (
    <div className="p-4 md:py-4 md:px-6 animate-fade-in">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex gap-3">
          {/* Product Image */}
          <div className="w-16 h-16 flex-shrink-0 bg-dark-700 rounded-md overflow-hidden border border-primary-800/30">
            <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" onError={handleImageError} />
          </div>

          {/* Product Info */}
          <div className="flex-grow min-w-0">
            <Link to={`/products/${product._id}`} className="font-medium text-white hover:text-primary-400 transition-colors text-sm line-clamp-2 leading-tight">
              {product.name}
            </Link>
            <p className="text-xs text-neutral-400 mt-1">{formatRupiah(product.price)} per item</p>

            {/* Quantity Controls - Mobile */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center border border-primary-700/50 rounded-md bg-dark-700">
                <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1} className={`p-1.5 ${quantity <= 1 ? 'text-neutral-500' : 'text-neutral-300 hover:bg-dark-600'} transition-colors`}>
                  <Minus className="h-3 w-3" />
                </button>

                <span className="px-3 py-1.5 text-sm font-medium min-w-[40px] text-center text-white">{quantity}</span>

                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.inStock}
                  className={`p-1.5 ${quantity >= product.inStock ? 'text-neutral-500' : 'text-neutral-300 hover:bg-dark-600'} transition-colors`}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              {/* Price and Remove - Mobile */}
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold text-primary-400">{formatRupiah(product.price * quantity)}</div>
                <button onClick={handleRemove} className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-900/20 rounded-full transition-colors">
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center">
        <div className="w-20 h-20 flex-shrink-0 bg-dark-700 rounded-md overflow-hidden border border-primary-800/30">
          <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" onError={handleImageError} />
        </div>

        <div className="ml-4 flex-grow">
          <Link to={`/products/${product._id}`} className="font-medium text-white hover:text-primary-400 transition-colors">
            {product.name}
          </Link>
          <p className="text-sm text-neutral-400 mt-1">{formatRupiah(product.price)} per item</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className={`p-2 rounded border ${quantity <= 1 ? 'text-neutral-500 border-neutral-600' : 'text-neutral-300 hover:bg-dark-700 border-primary-700/50'} transition-colors bg-dark-700`}
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="w-12 text-center font-medium text-white">{quantity}</span>

          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= product.inStock}
            className={`p-2 rounded border ${quantity >= product.inStock ? 'text-neutral-500 border-neutral-600' : 'text-neutral-300 hover:bg-dark-700 border-primary-700/50'} transition-colors bg-dark-700`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="ml-6 font-semibold text-lg text-primary-400">{formatRupiah(product.price * quantity)}</div>

        <button onClick={handleRemove} className="ml-4 p-2 text-neutral-500 hover:text-red-400 hover:bg-red-900/20 rounded-full transition-colors">
          <Trash className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
