import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, ArrowLeft, Star, Sparkles, Award, Shield } from 'lucide-react';
import axios from 'axios';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/products/${id}`);
        setProduct(response.data.data);

        // After getting the product, fetch related products
        if (response.data.data.category) {
          fetchRelatedProducts(response.data.data.category, id);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, apiUrl]);

  const fetchRelatedProducts = async (category: string, currentProductId: string) => {
    try {
      const response = await axios.get(`${apiUrl}/api/products?category=${category}&limit=4`);
      // Filter out the current product
      const filtered = response.data.data.filter((p: Product) => p._id !== currentProductId);
      setRelatedProducts(filtered.slice(0, 4)); // Limit to 4 products
    } catch (error) {
      console.error('Error fetching related products:', error);
      setRelatedProducts([]);
    }
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
    const imageIndex = parseInt(product?._id.slice(-1) || '0', 16) % perfumeImages.length;
    return perfumeImages[imageIndex];
  };

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (value: number) => {
    if (!product) return;

    if (value < 1) {
      setQuantity(1);
    } else if (value > product.inStock) {
      setQuantity(product.inStock);
    } else {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg';
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryNames: { [key: string]: string } = {
      men: 'Parfum Pria',
      women: 'Parfum Wanita',
     
    };
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 to-dark-900">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-16 text-center bg-gradient-to-br from-dark-950 to-dark-900 min-h-screen flex items-center justify-center">
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-4">Parfum Tidak Ditemukan</h2>
          <p className="mb-6 text-neutral-300">Maaf, kami tidak dapat menemukan parfum yang Anda cari.</p>
          <Link to="/products" className="btn-primary">
            Kembali ke 
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-10 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 min-h-screen">
      <div className="container-custom">
        {/* Back button */}
        <Link to="/products" className="flex items-center text-neutral-300 hover:text-primary-400 mb-6 transition-colors group">
          <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Koleksi
        </Link>

        {/* Product Detail */}
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-2xl overflow-hidden border border-primary-900/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-dark-700 to-dark-800 rounded-2xl overflow-hidden border border-primary-900/20">
                <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" onError={handleImageError} loading="lazy" />
                {product.inStock < 1 && (
                  <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-2xl">
                    <span className="text-white font-semibold text-lg bg-red-600/80 px-4 py-2 rounded-full">Stok Habis</span>
                  </div>
                )}
                {product.isFeatured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg">
                    <Sparkles className="h-4 w-4 mr-1" />
                    Unggulan
                  </div>
                )}
              </div>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gradient-to-br from-primary-900/30 to-primary-800/20 rounded-xl border border-primary-800/30">
                  <Award className="h-6 w-6 text-primary-400 mx-auto mb-1" />
                  <p className="text-xs font-medium text-neutral-300">Asli</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-primary-900/30 to-primary-800/20 rounded-xl border border-primary-800/30">
                  <Shield className="h-6 w-6 text-primary-400 mx-auto mb-1" />
                  <p className="text-xs font-medium text-neutral-300">Terjamin</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-primary-900/30 to-primary-800/20 rounded-xl border border-primary-800/30">
                  <Sparkles className="h-6 w-6 text-primary-400 mx-auto mb-1" />
                  <p className="text-xs font-medium text-neutral-300">Premium</p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 text-white">
              
              <div>
                <h3 className="text-lg font-heading font-semibold mb-3 text-primary-400">Deskripsi</h3>
                <p className="text-neutral-300 leading-relaxed">{product.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-heading font-semibold mb-3 text-primary-400">Koleksi</h3>
                <span className="inline-flex items-center bg-gradient-to-r from-primary-900/50 to-primary-800/30 px-4 py-2 rounded-full text-sm font-medium text-primary-300 border border-primary-700/50">
                  <Sparkles className="h-4 w-4 mr-2" />
                  {getCategoryDisplayName(product.category)}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-heading font-semibold mb-3 text-primary-400">Ketersediaan</h3>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`font-medium ${product.inStock > 0 ? 'text-green-400' : 'text-red-400'}`}>{product.inStock > 0 ? `Tersedia (${product.inStock} stok)` : 'Stok Habis'}</span>
                </div>
              </div>

              {product.inStock > 0 && (
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-3 text-primary-400">Jumlah</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border-2 border-primary-700/50 rounded-xl overflow-hidden bg-dark-800">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className={`p-3 ${quantity <= 1 ? 'bg-dark-700 text-neutral-500' : 'bg-dark-800 text-neutral-300 hover:bg-dark-700'} transition-colors`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <input
                        type="number"
                        min="1"
                        max={product.inStock}
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                        className="w-16 text-center py-3 border-0 focus:ring-0 font-medium bg-dark-800 text-white"
                      />

                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= product.inStock}
                        className={`p-3 ${quantity >= product.inStock ? 'bg-dark-700 text-neutral-500' : 'bg-dark-800 text-neutral-300 hover:bg-dark-700'} transition-colors`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <span className="text-sm text-neutral-400">
                      Total: <span className="font-semibold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">{formatRupiah(product.price * quantity)}</span>
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.inStock < 1}
                  className={`btn flex-1 py-4 px-6 text-lg font-semibold rounded-xl ${product.inStock > 0 ? 'btn-primary shadow-lg' : 'bg-neutral-600 cursor-not-allowed text-white'}`}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Tambah ke Keranjang
                </button>

                <Link to="/cart" className="btn border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 py-4 px-6 text-lg font-semibold text-center flex-1 rounded-xl transition-colors">
                  Lihat Keranjang
                </Link>
              </div>

              {/* Additional info */}
              <div className="bg-gradient-to-br from-dark-700/50 to-primary-900/20 p-4 rounded-xl border border-primary-800/30">
                <h4 className="font-semibold mb-2 text-primary-400">Mengapa Memilih Artalis?</h4>
                <ul className="text-sm text-neutral-300 space-y-1">
                  <li>• Parfum mewah asli terjamin</li>
                  <li>• Pengiriman cepat & aman</li>
                  <li>• Garansi pengembalian 30 hari</li>
                  <li>• Konsultasi parfum ahli</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center text-white">
              Anda Mungkin Juga <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Menyukai</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related._id}
                  to={`/products/${related._id}`}
                  className="product-card group bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl overflow-hidden border border-primary-900/30 hover:border-primary-700/50 transition-all"
                >
                  <div className="relative aspect-square bg-gradient-to-br from-dark-700 to-dark-800 rounded-xl overflow-hidden">
                    <img src={getImageUrl(related.image)} alt={related.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onError={handleImageError} loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-sm md:text-base mb-1 line-clamp-1 group-hover:text-primary-400 transition-colors text-white">{related.name}</h3>
                    <p className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent font-bold text-lg">{formatRupiah(related.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
