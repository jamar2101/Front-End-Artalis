import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const getImageUrl = (imagePath: string) => {
    // Jika sudah URL lengkap (http/https), gunakan langsung
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // Jika path lokal dari upload, tambahkan base URL
    if (imagePath.startsWith('/uploads/')) {
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

    // Use product ID to consistently assign the same image
    const imageIndex = parseInt(product._id.slice(-1), 16) % perfumeImages.length;
    return perfumeImages[imageIndex];
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg';
  };

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card group block bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-200">
        <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={handleImageError} loading="lazy" />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {product.inStock < 1 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-semibold text-xs bg-black/50 px-2 lg:px-3 py-1 rounded-full">Stok Habis</span>
          </div>
        )}

        {product.isFeatured && (
          <div className="absolute top-2 lg:top-3 left-2 lg:left-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs px-2 lg:px-3 py-1 rounded-full flex items-center shadow-lg">
            <Sparkles className="h-3 w-3 mr-1" />
            Unggulan
          </div>
        )}

        {/* Quick add to cart button - appears on hover */}
        <button
          onClick={handleAddToCart}
          disabled={product.inStock < 1}
          className={`absolute bottom-2 lg:bottom-3 right-2 lg:right-3 p-2 rounded-full transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${
            product.inStock > 0 ? 'bg-white text-primary-600 hover:bg-primary-50 shadow-lg' : 'bg-neutral-300 cursor-not-allowed text-neutral-500'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-3 lg:p-4">
        <div className="mb-3">
          <h3 className="font-heading font-semibold text-sm lg:text-base line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight mb-2">{product.name}</h3>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary-600 text-base lg:text-lg">{formatRupiah(product.price)}</span>

           
          </div>
        </div>

        <p className="text-xs text-neutral-600 line-clamp-2 mb-3 lg:mb-4 leading-relaxed hidden lg:block">{product.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full truncate">{product.inStock > 0 ? `${product.inStock} tersedia` : 'Stok habis'}</span>

          {/* Category badge */}
          <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full font-medium hidden sm:inline">{product.category}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
