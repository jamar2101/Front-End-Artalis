import React from 'react';
import { Sparkles, Award, Users, Heart, Star, Shield, Truck, Clock } from 'lucide-react';

// Import semua gambar dari folder src/img
import artalisImg from '../img/artalis.jpg';
import dikaeImg from '../img/foto dikae.jpg';
import dikaJangkungImg from '../img/foto dika jangkung.jpg';
import rapaImg from '../img/foto rapa.jpg';

const AboutPage: React.FC = () => {
  return (
    <div className="py-6 md:py-10 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 min-h-screen">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-white">
            Tentang <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Artalis</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Temukan kisah di balik passion kami terhadap parfum mewah dan komitmen kami untuk menghadirkan aroma terbaik dunia untuk Anda.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-white">
                Kisah <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Kami</span>
              </h2>
              <div className="space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  Artalis Parfume adalah sebuah brand lokal yang bergerak di bidang wewangian, didirikan pada tahun 2024 oleh sekelompok mahasiswa yang memiliki ketertarikan di dunia kreatif dan kewirausahaan. Brand ini hadir sebagai bentuk ekspresi anak muda yang ingin menghadirkan parfum dengan karakter, cerita, dan makna lebih dari sekadar wangi.
                </p>
                <p>
                  Artalis lahir dari keyakinan bahwa parfum bisa menjadi simbol dari perasaan, suasana, hingga versi terbaik diri seseorang. Maka dari itu, setiap varian yang dirilis dirancang dengan pendekatan storytelling yang kuat, agar setiap orang bisa merasa terhubung secara personal dengan aromanya.
                  Dengan kemasan travel-size yang praktis dan harga yang terjangkau, Artalis menyasar generasi muda seperti pelajar, mahasiswa, hingga pekerja aktif yang mobile. Melalui dua varian awalnya, Evlyn dan Equinox, Artalis menampilkan spektrum aroma yang luas dari yang cerah, manis, dan menyenangkan, hingga yang tenang, hangat, dan dalam.
                </p>
                <p>
                  Artalis memasarkan produknya secara online melalui media sosial dan marketplace, serta secara aktif membangun branding yang dekat dengan Gen Z dan milenial. Seluruh konten Artalis mengedepankan pendekatan visual dan narasi yang relatable, emosional, dan otentik.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-dark-700 to-dark-800 rounded-2xl overflow-hidden border border-primary-900/30">
                  <img 
                    src={artalisImg}
                    alt="Koleksi parfum mewah" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">
              Nilai-Nilai <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Kami</span>
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Prinsip-prinsip inti yang memandu segala yang kami lakukan di Artalis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-2xl shadow-xl border border-primary-900/30 hover:border-primary-700/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-center text-white">Keaslian</h3>
              <p className="text-neutral-300 text-center leading-relaxed">
                Setiap parfum dalam koleksi kami dijamin asli, bersumber langsung dari distributor resmi dan rumah parfum terpercaya.
              </p>
            </div>

            <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-2xl shadow-xl border border-primary-900/30 hover:border-primary-700/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-center text-white">Passion</h3>
              <p className="text-neutral-300 text-center leading-relaxed">
                Tim kami terdiri dari para pecinta parfum yang memahami koneksi emosional antara aroma dan memori.
              </p>
            </div>

            <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-2xl shadow-xl border border-primary-900/30 hover:border-primary-700/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-center text-white">Komunitas</h3>
              <p className="text-neutral-300 text-center leading-relaxed">
                Kami percaya dalam membangun hubungan yang langgeng dengan pelanggan dan menciptakan komunitas pecinta parfum.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-2xl shadow-xl border border-primary-900/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white">Misi Kami</h3>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Misi kami adalah menciptakan parfum yang terinspirasi dari kisah dan emosi nyata, menghadirkan aroma yang personal dan bermakna melalui pendekatan storytelling. Kami menghadirkan produk travel-friendly yang sesuai dengan gaya hidup dinamis anak muda, serta terus berinovasi berdasarkan aspirasi dan kebutuhan emosional audiens. Lebih dari sekadar wangi, kami membangun komunitas yang terhubung melalui rasa yang ditinggalkan setiap aroma.
              </p>
            </div>

            <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-2xl shadow-xl border border-primary-900/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white">Visi Kami</h3>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Menjadi game changer di industri parfum lokal maupun global, bukan dengan hanya menciptakan wangi terbaik, tapi membangun koneksi emosional lewat setiap aroma yang kami hadirkan.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">
              Mengapa Memilih <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Artalis</span>?
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Rasakan perbedaan yang membedakan kami dari retailer parfum lainnya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl border border-primary-900/30 hover:border-primary-700/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-heading font-semibold mb-2 text-white">100% Asli</h4>
              <p className="text-sm text-neutral-300">Produk asli terjamin dari sumber resmi</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl border border-primary-900/30 hover:border-primary-700/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-heading font-semibold mb-2 text-white">Pengiriman Cepat</h4>
              <p className="text-sm text-neutral-300">Pengiriman cepat dan aman ke seluruh Indonesia</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl border border-primary-900/30 hover:border-primary-700/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-heading font-semibold mb-2 text-white">Dukungan Ahli</h4>
              <p className="text-sm text-neutral-300">Konsultasi parfum personal dan dukungan</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-xl border border-primary-900/30 hover:border-primary-700/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-heading font-semibold mb-2 text-white">Garansi 30 Hari</h4>
              <p className="text-sm text-neutral-300">Pengembalian mudah dalam 30 hari</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">
              Kenali <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Tim</span> Kami
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Individu-individu passionate di balik Artalis yang membuat perjalanan parfum Anda menjadi luar biasa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-6 rounded-2xl shadow-xl border border-primary-900/30 text-center group hover:border-primary-700/50 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src={dikaeImg} 
                  alt="Andika Arsy" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2 text-white">Andika Arsy</h4>
              <p className="text-primary-400 text-sm mb-3">Owner</p>
            </div>

            <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-6 rounded-2xl shadow-xl border border-primary-900/30 text-center group hover:border-primary-700/50 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src={dikaJangkungImg} 
                  alt="Andika Rafi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2 text-white">Andika Rafi</h4>
              <p className="text-primary-400 text-sm mb-3">CEO</p>
            </div>

            <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-6 rounded-2xl shadow-xl border border-primary-900/30 text-center group hover:border-primary-700/50 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src={rapaImg} 
                  alt="Rafael Faruqi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2 text-white">Rafael Faruqi</h4>
              <p className="text-primary-400 text-sm mb-3">CEO</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-dark-800 to-dark-900 p-12 rounded-2xl shadow-xl border border-primary-900/30">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">
            Siap Menemukan <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Aroma Signature</span> Anda?
          </h2>
          <p className="text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan pelanggan yang puas yang telah menemukan parfum sempurna mereka bersama Artalis. Mulai perjalanan olfaktori Anda hari ini.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl">
              Jelajahi Koleksi
            </a>
            <a href="/contact" className="btn border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 px-8 py-4 text-lg font-semibold rounded-xl transition-colors">
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
