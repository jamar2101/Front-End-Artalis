import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, ShoppingBag, X, ChevronDown, Sparkles } from 'lucide-react';
import axios from 'axios';
import { Product } from '../types';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Get query params
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');

    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchTerm(searchParam);

    // Fetch products based on filters
    fetchProducts(searchParam || '', categoryParam || '');
    
    // Fetch categories
    fetchCategories();
  }, [location.search, apiUrl]);

  const fetchProducts = async (search: string, category: string) => {
    setLoading(true);
    try {
      let url = `${apiUrl}/api/products?`;
      const params = new URLSearchParams();
      
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      
      url += params.toString();
      
      const response = await axios.get(url);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
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
      setCategories([]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateQueryParams(searchTerm, selectedCategory);
    setShowMobileFilters(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateQueryParams(searchTerm, category);
    setShowCategoryFilter(false);
    setShowMobileFilters(false);
  };

  const updateQueryParams = (search: string, category: string) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    navigate(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setShowMobileFilters(false);
    navigate('/products');
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryNames: { [key: string]: string } = {
      'men': "Parfum Pria",
      'women': "Parfum Wanita",
      
    };
    return categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="py-6 md:py-10 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
            Koleksi <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Parfum</span> Mewah
          </h1>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Temukan pilihan parfum premium kami dari rumah parfum terbaik dunia
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-br from-dark-800 to-dark-900 border border-primary-900/30 rounded-xl shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-primary-400" />
              <span className="font-medium text-white">Filter & Cari</span>
            </div>
            <ChevronDown className={`h-5 w-5 text-neutral-400 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Mobile Filters Overlay */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 md:hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-dark-800 to-dark-900 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto border-t border-primary-800/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-heading font-semibold text-white">Filter & Cari</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-dark-700 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-neutral-400" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Cari Parfum
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Masukkan nama parfum..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 pl-10 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                </div>
              </form>

              {/* Mobile Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-300 mb-3">
                  Kategori
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      !selectedCategory 
                        ? 'border-primary-500 bg-primary-900/30 text-primary-300' 
                        : 'border-primary-800/30 hover:bg-dark-700 text-neutral-300'
                    }`}
                  >
                    Semua Parfum
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedCategory === category 
                          ? 'border-primary-500 bg-primary-900/30 text-primary-300' 
                          : 'border-primary-800/30 hover:bg-dark-700 text-neutral-300'
                      }`}
                    >
                      {getCategoryDisplayName(category)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Filter Actions */}
              <div className="flex gap-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 px-4 border border-neutral-600 rounded-lg font-medium hover:bg-dark-700 transition-colors text-neutral-300"
                >
                  Reset Filter
                </button>
                <button
                  onClick={handleSearch}
                  className="flex-1 py-3 px-4 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Search and Filter Bar */}
        <div className="hidden md:block mb-8 bg-gradient-to-br from-dark-800 to-dark-900 p-6 rounded-2xl shadow-xl border border-primary-900/30">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <form onSubmit={handleSearch} className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari parfum sempurna Anda..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 pl-12 text-lg py-3 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
              </div>
            </form>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                  className="btn bg-dark-700 border border-primary-700/50 text-neutral-300 hover:bg-dark-600 flex items-center min-w-[160px] justify-between py-3 px-4 rounded-xl transition-colors"
                >
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-primary-400" />
                    <span className="truncate">
                      {selectedCategory ? getCategoryDisplayName(selectedCategory) : 'Semua Kategori'}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showCategoryFilter ? 'rotate-180' : ''}`} />
                </button>
                
                {showCategoryFilter && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl shadow-2xl overflow-hidden z-20 border border-primary-800/30">
                    <ul className="max-h-64 overflow-y-auto">
                      <li>
                        <button
                          onClick={() => handleCategoryChange('')}
                          className={`px-4 py-3 text-sm w-full text-left hover:bg-dark-700 transition-colors ${!selectedCategory ? 'font-semibold text-primary-400 bg-primary-900/30' : 'text-neutral-300'}`}
                        >
                          Semua Parfum
                        </button>
                      </li>
                      {categories.map(category => (
                        <li key={category}>
                          <button
                            onClick={() => handleCategoryChange(category)}
                            className={`px-4 py-3 text-sm w-full text-left hover:bg-dark-700 transition-colors ${selectedCategory === category ? 'font-semibold text-primary-400 bg-primary-900/30' : 'text-neutral-300'}`}
                          >
                            {getCategoryDisplayName(category)}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="text-primary-400 hover:text-primary-300 text-sm font-medium whitespace-nowrap px-3 py-2 rounded-lg hover:bg-primary-900/20 transition-colors"
                >
                  Hapus Filter
                </button>
              )}
            </div>
          </div>
          
          {/* Active Filters - Desktop */}
          {(searchTerm || selectedCategory) && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm text-neutral-400 font-medium">Filter aktif:</span>
              {searchTerm && (
                <div className="bg-primary-900/30 text-primary-300 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-primary-700/50">
                  <span>Pencarian: "{searchTerm}"</span>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      updateQueryParams('', selectedCategory);
                    }}
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {selectedCategory && (
                <div className="bg-primary-900/30 text-primary-300 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-primary-700/50">
                  <span>{getCategoryDisplayName(selectedCategory)}</span>
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      updateQueryParams(searchTerm, '');
                    }}
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active Filters - Mobile */}
        {(searchTerm || selectedCategory) && (
          <div className="md:hidden mb-4 p-4 bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-primary-900/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-300">Filter Aktif:</span>
              <button
                onClick={clearFilters}
                className="text-xs text-primary-400 hover:text-primary-300 font-medium"
              >
                Hapus Semua
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <div className="bg-primary-900/30 text-primary-300 px-2 py-1 rounded text-xs flex items-center gap-1 border border-primary-700/50">
                  <span>"{searchTerm}"</span>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      updateQueryParams('', selectedCategory);
                    }}
                    className="text-primary-400 hover:text-primary-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {selectedCategory && (
                <div className="bg-primary-900/30 text-primary-300 px-2 py-1 rounded text-xs flex items-center gap-1 border border-primary-700/50">
                  <span>{getCategoryDisplayName(selectedCategory)}</span>
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      updateQueryParams(searchTerm, '');
                    }}
                    className="text-primary-400 hover:text-primary-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Product Listing */}
        {loading ? (
          <div className="py-12 md:py-20 text-center">
            <LoadingSpinner size="large" />
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-neutral-400">
                Menampilkan <span className="font-semibold text-white">{products.length}</span> parfum
              </div>
              <div className="hidden md:block text-sm text-neutral-500">
                Diurutkan berdasarkan relevansi
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl border border-primary-900/30">
            <EmptyState
              icon={<ShoppingBag className="h-12 w-12 text-neutral-500" />}
              title="Tidak ada parfum ditemukan"
              description="Kami tidak dapat menemukan parfum yang sesuai dengan kriteria Anda. Coba sesuaikan filter atau periksa kembali nanti untuk koleksi baru."
              actionText="Hapus Filter"
              onActionClick={clearFilters}
            />
          </div>
        )}
      </div>

      {/* Click outside to close category filter */}
      {showCategoryFilter && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowCategoryFilter(false)}
        ></div>
      )}
    </div>
  );
};

export default ProductsPage;