import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Floating elements */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-4">404</div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <Sparkles className="h-8 w-8 text-primary-400 animate-pulse" />
          </div>
          <div className="absolute bottom-0 right-1/4 transform translate-x-4 translate-y-2">
            <Sparkles className="h-6 w-6 text-primary-500 animate-pulse" style={{animationDelay: '1s'}} />
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-neutral-300 mb-8 leading-relaxed">
          Oops! Parfum yang Anda cari sepertinya telah menguap. 
          Mari kembali ke koleksi mewah kami.
        </p>
        
        <div className="space-y-4">
          <Link to="/" className="btn-primary inline-flex items-center px-6 py-3 rounded-xl shadow-lg">
            <Home className="h-5 w-5 mr-2" />
            Kembali ke Beranda
          </Link>
          
          <div className="text-center">
            <Link to="/products" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Atau jelajahi parfum kami
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center space-x-8 opacity-30">
          <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;