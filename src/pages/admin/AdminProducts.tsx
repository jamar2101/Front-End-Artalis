import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, AlertCircle, Sparkles } from 'lucide-react';
import axios from 'axios';
import { Product } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import ProductForm from '../../components/admin/ProductForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { auth } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/products`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Gagal mengambil data parfum');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/products/categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      };

      // Convert FormData to regular object for JSON
      const productData: any = {};
      formData.forEach((value, key) => {
        productData[key] = value;
      });

      if (editingProduct) {
        await axios.put(`${apiUrl}/api/products/${editingProduct._id}`, productData, config);
        toast.success('Parfum berhasil diperbarui');
      } else {
        const response = await axios.post(`${apiUrl}/api/products`, productData, config);
        console.log('Response:', response.data);
        toast.success('Parfum berhasil ditambahkan');
      }

      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
      fetchCategories();
    } catch (error: any) {
      console.error('Error:', error.response || error);
      const errorMessage = error.response?.data?.message || 'Gagal menyimpan parfum';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus parfum ini?')) {
      return;
    }

    try {
      await axios.delete(`${apiUrl}/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      toast.success('Parfum berhasil dihapus');
      fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal menghapus parfum');
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

    // Use a consistent image based on product ID
    const imageIndex = parseInt(imagePath.slice(-1), 16) % perfumeImages.length;
    return perfumeImages[imageIndex];
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryNames: { [key: string]: string } = {
      men: 'Pria',
      women: 'Wanita',
     
    };
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold mb-2 flex items-center text-white">
            <Sparkles className="h-8 w-8 mr-3 text-primary-400" />
            Kelola Parfum
          </h1>
          <p className="text-neutral-400">Kelola koleksi parfum mewah Anda</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="btn-primary flex items-center px-4 lg:px-6 py-3 rounded-xl text-sm lg:text-base w-full lg:w-auto justify-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Tambah Parfum
        </button>
      </div>

      {showForm ? (
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl p-6 border border-primary-900/30">
          <h2 className="text-lg lg:text-xl font-heading font-semibold mb-6 flex items-center text-white">
            <Sparkles className="h-6 w-6 mr-2 text-primary-400" />
            {editingProduct ? 'Edit Parfum' : 'Tambah Parfum Baru'}
          </h2>
          <ProductForm product={editingProduct} onSubmit={handleSubmit} categories={categories} isSubmitting={submitting} />
        </div>
      ) : (
        <>
          {/* Search Bar */}
          <div className="mb-4 lg:mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari parfum..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 pl-10 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl overflow-hidden border border-primary-900/30">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary-900/30 to-primary-800/20">
                  <tr>
                    <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Parfum</th>
                    <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider hidden md:table-cell">Kategori</th>
                    <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Harga</th>
                    <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider hidden sm:table-cell">Stok</th>
                    <th className="px-3 lg:px-6 py-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider hidden lg:table-cell">Unggulan</th>
                    <th className="px-3 lg:px-6 py-4 text-right text-xs font-medium text-neutral-300 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-800/30">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-dark-700/30 transition-colors">
                      <td className="px-3 lg:px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 lg:h-12 lg:w-12 flex-shrink-0">
                            <img
                              src={getImageUrl(product.image)}
                              alt={product.name}
                              className="h-10 w-10 lg:h-12 lg:w-12 rounded-lg object-cover shadow-sm border border-primary-800/30"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg';
                              }}
                            />
                          </div>
                          <div className="ml-3 lg:ml-4 min-w-0 flex-1">
                            <div className="text-sm font-medium text-white line-clamp-1">{product.name}</div>
                            <div className="text-xs lg:text-sm text-neutral-400 line-clamp-1 hidden lg:block">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-900/30 text-primary-300 border border-primary-700/50">{getCategoryDisplayName(product.category)}</span>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{formatRupiah(product.price)}</td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className={`text-sm font-medium ${product.inStock > 10 ? 'text-green-400' : product.inStock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>{product.inStock} unit</span>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                        {product.isFeatured ? (
                          <span className="text-primary-400 font-medium flex items-center">
                            <Sparkles className="h-4 w-4 mr-1" />
                            Ya
                          </span>
                        ) : (
                          <span className="text-neutral-500">Tidak</span>
                        )}
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-1 lg:space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setShowForm(true);
                            }}
                            className="text-primary-400 hover:text-primary-300 p-2 rounded-lg hover:bg-primary-900/20 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(product._id)} className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-neutral-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Tidak ada parfum ditemukan</h3>
                <p className="text-neutral-400">Coba sesuaikan pencarian atau tambahkan parfum baru.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProducts;
