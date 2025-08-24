import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Star, Sparkles, Award, Truck, Shield } from 'lucide-react';
import axios from 'axios';
import { Product } from '../types';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Ambil produk unggulan terlebih dahulu
        let response = await axios.get(`${apiUrl}/api/products?featured=true&limit=8`);
        let products = response.data.data;

        // Jika produk unggulan kurang dari 4, ambil produk terbaru
        if (products.length < 4) {
          console.log('Featured products kurang dari 4, mengambil produk terbaru...');
          response = await axios.get(`${apiUrl}/api/products?limit=8&sort=newest`);
          products = response.data.data;
        }

        setFeaturedProducts(products.slice(0, 4)); // Batasi maksimal 4 produk
      } catch (error) {
        console.error('Error mengambil produk unggulan:', error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [apiUrl]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-primary-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-600/20 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }}></div>

        <div className="container-custom relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-flex items-center px-3 lg:px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs lg:text-sm font-medium mb-6 border border-white/20">
                <Sparkles className="h-4 w-4 mr-2 text-primary-400" />
                Koleksi Parfum Mewah
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight mb-6">
              Temukan Aroma
              <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Signature Anda</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-neutral-200 mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed px-4 lg:px-0">
              Tenggelamkan diri Anda dalam koleksi parfum mewah pilihan kami. Setiap aroma menceritakan kisah, dibuat dengan bahan-bahan terbaik dari seluruh dunia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 lg:px-0">
              <Link to="/products" className="btn-primary text-center py-3 lg:py-4 px-6 lg:px-8 text-base lg:text-lg font-semibold shadow-xl w-full sm:w-auto">
                Jelajahi Koleksi
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white/10 backdrop-blur-md text-center py-3 lg:py-4 px-6 lg:px-8 text-base lg:text-lg font-semibold w-full sm:w-auto">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4">
              Mengapa Memilih <span className="luxury-text-gradient">Artalis</span>?
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-base lg:text-lg px-4 lg:px-0">Rasakan kemewahan yang didefinisikan ulang dengan komitmen kami terhadap kualitas, keaslian, dan layanan yang luar biasa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="group p-6 lg:p-8 border border-neutral-200 rounded-2xl hover:shadow-xl transition-all duration-300 hover:border-primary-200 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-heading font-semibold mb-4 text-center">Kualitas Premium</h3>
              <p className="text-neutral-600 text-center leading-relaxed text-sm lg:text-base">Bersumber dari rumah parfum terbaik dunia, setiap aroma diautentikasi dan dijamin kualitasnya.</p>
            </div>

            <div className="group p-6 lg:p-8 border border-neutral-200 rounded-2xl hover:shadow-xl transition-all duration-300 hover:border-primary-200 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-heading font-semibold mb-4 text-center">Koleksi Eksklusif</h3>
              <p className="text-neutral-600 text-center leading-relaxed text-sm lg:text-base">Temukan parfum langka dan edisi terbatas yang tidak akan Anda temukan di tempat lain.</p>
            </div>

            <div className="group p-6 lg:p-8 border border-neutral-200 rounded-2xl hover:shadow-xl transition-all duration-300 hover:border-primary-200 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-heading font-semibold mb-4 text-center">Pengiriman Aman</h3>
              <p className="text-neutral-600 text-center leading-relaxed text-sm lg:text-base">Pengiriman cepat, aman, dan kemasan elegan memastikan parfum Anda tiba dalam kondisi sempurna.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-neutral-50 to-primary-50/20">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8 lg:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-2 lg:mb-4">
                Parfum <span className="luxury-text-gradient">Unggulan</span>
              </h2>
              <p className="text-neutral-600 text-base lg:text-lg">Pilihan terbaik dari koleksi mewah kami</p>
            </div>
            <Link to="/products" className="hidden lg:flex items-center text-primary-500 hover:text-primary-600 font-semibold group">
              Lihat Semua
              <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 lg:py-20">
              <LoadingSpinner size="large" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="text-center lg:hidden">
                <Link to="/products" className="btn-primary inline-flex items-center text-sm">
                  Lihat Semua Parfum
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 lg:py-16 bg-white rounded-2xl shadow-sm">
              <ShoppingBag className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg lg:text-xl font-semibold text-neutral-800 mb-2">Segera Hadir</h3>
              <p className="text-neutral-600 mb-6 text-sm lg:text-base">Parfum unggulan kami akan segera tersedia!</p>
              <Link to="/products" className="btn-primary text-sm lg:text-base">
                Jelajahi Semua Produk
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Kata <span className="luxury-text-gradient">Pelanggan</span> Kami
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">Bergabunglah dengan ribuan pelanggan yang puas yang telah menemukan parfum sempurna mereka bersama Artalis.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-white to-primary-50/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100">
              <div className="flex items-center text-primary-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-neutral-700 mb-6 leading-relaxed italic">"Kalau soal spray, enak banget pas disemprot nyebarnya halus dan smooth. Aromanya juga enak banget, cewe banget, dan tahan lama sampai berjam-jam. Botolnya simpel tapi classy, dan praktis buat dibawa kemana-mana."</p>
              
            </div>

            <div className="group p-8 bg-gradient-to-br from-white to-primary-50/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100">
              <div className="flex items-center text-primary-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-neutral-700 mb-6 leading-relaxed italic">"Parfum pertama Artalis, dari botolnya aja udah keliatan elegan banget. Tulisan "Artalis"nya timbul, gokil sih. Engga main-main tampilannya. Dusnya juga menarik, bukan dus polos gitu doang, tapi dikasih warna dan detail yang bikin orang tertarik.</p>
              
            </div>

            <div className="group p-8 bg-gradient-to-br from-white to-primary-50/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100">
              <div className="flex items-center text-primary-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-neutral-700 mb-6 leading-relaxed italic">"Aku suka banget parfumnya. Dari kemasannya aja udah kerasa ekslusif. Desain botolnya simpel tapi engga keliatan murahan. Brandingnya rapih dan detail kecil seperti label atau segel dibuat serius."</p>
              <div className="flex items-center">
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary-400/20 rounded-full blur-xl"></div>

        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Siap Menemukan Parfum Sempurna Anda?</h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-neutral-200 leading-relaxed">Jelajahi koleksi eksklusif parfum mewah kami dan temukan aroma yang mendefinisikan gaya dan kepribadian unik Anda.</p>
            <Link
              to="/products"
              className="inline-flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-xl text-lg"
            >
              Belanja Sekarang
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
