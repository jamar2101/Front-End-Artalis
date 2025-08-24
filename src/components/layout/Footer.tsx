import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center group mb-6">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-lg group-hover:bg-primary-300/30 transition-all"></div>
              </div>
              <span className="ml-3 text-xl font-heading font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Artalis
              </span>
            </Link>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Temukan seni parfum mewah. Koleksi parfum premium pilihan kami menangkap esensi keanggunan dan kecanggihan, dibuat untuk mereka yang menghargai hal-hal terbaik dalam hidup.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-dark-800">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-dark-800">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-dark-800">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6 text-white">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2"></span>
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-neutral-300 hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2"></span>
                  Parfum
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2"></span>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2"></span>
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-neutral-300 hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2"></span>
                  Buat Akun
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6 text-white">Koleksi</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=men" className="text-neutral-300 hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2"></span>
                  Parfum Pria
                </Link>
              </li>
              <li>
                <Link to="/products?category=women" className="text-neutral-300 hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2"></span>
                  Parfum Wanita
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6 text-white">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 text-primary-400 mt-1 mr-3 flex-shrink-0 group-hover:text-primary-300 transition-colors" />
                <span className="text-neutral-300 group-hover:text-neutral-200 transition-colors">
                  Jalan Anyelir VII Blok W4 No.22 RT/RW 04/09 Kel. Kedung Waringin Kec. Tanah Sareal Taman Cimanggu Bogor
                </span>
              </li>
              <li className="flex items-start group">
                <Phone className="h-5 w-5 text-primary-400 mt-1 mr-3 flex-shrink-0 group-hover:text-primary-300 transition-colors" />
                <span className="text-neutral-300 group-hover:text-neutral-200 transition-colors">+62 21 1234-5678</span>
              </li>
              <li className="flex items-start group">
                <Mail className="h-5 w-5 text-primary-400 mt-1 mr-3 flex-shrink-0 group-hover:text-primary-300 transition-colors" />
                <span className="text-neutral-300 group-hover:text-neutral-200 transition-colors">artalis.co.id@gmail</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Artalis. Semua hak dilindungi.
            </p>
            <div className="flex items-center text-neutral-400 text-sm">
              <span>Dibuat dengan</span>
              <Heart className="h-4 w-4 mx-1 text-primary-400" />
              <span>untuk para pecinta parfum</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;