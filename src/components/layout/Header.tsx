import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { auth, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="relative">
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-primary-500 group-hover:text-primary-600 transition-colors" />
            <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-lg group-hover:bg-primary-600/30 transition-all"></div>
          </div>
          <span className="ml-2 text-lg md:text-xl font-heading font-bold luxury-text-gradient">Artalis</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <Link to="/" className="nav-link font-medium hover:text-primary-500 transition-colors relative group">
            Beranda
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/products" className="nav-link font-medium hover:text-primary-500 transition-colors relative group">
            Parfum
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/about" className="nav-link font-medium hover:text-primary-500 transition-colors relative group">
            Tentang
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/contact" className="nav-link font-medium hover:text-primary-500 transition-colors relative group">
            Kontak
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Right Side - Cart & Auth */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 group">
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-neutral-700 group-hover:text-primary-500 transition-colors" />
            {cart.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center rounded-full text-[10px] lg:text-xs font-bold shadow-lg">
                {cart.totalItems > 99 ? '99+' : cart.totalItems}
              </span>
            )}
          </Link>

          {/* User Menu - Desktop */}
          <div className="hidden lg:flex items-center relative">
            {auth.user ? (
              <>
                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2 hover:text-primary-500 transition-colors p-2 rounded-lg hover:bg-primary-50">
                  <span className="font-medium text-sm lg:text-base">{auth.user.name.split(' ')[0]}</span>
                  <User className="h-4 w-4 lg:h-5 lg:w-5" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 z-50 animate-fade-in border border-neutral-200 overflow-hidden">
                    {auth.user.isAdmin && (
                      <Link to="/admin" className="block px-4 py-3 text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors">
                        Dashboard Admin
                      </Link>
                    )}
                    <Link to="/profile" className="block px-4 py-3 text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors">
                      Profil
                    </Link>
                    <Link to="/order-history" className="block px-4 py-3 text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors">
                      Riwayat Pesanan
                    </Link>
                    <div className="border-t border-neutral-100 my-1"></div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors">
                      <LogOut className="h-4 w-4 mr-2" />
                      Keluar
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn border border-primary-500 text-primary-500 hover:bg-primary-50 py-2 px-4 text-sm font-medium">
                  Masuk
                </Link>
                <Link to="/register" className="btn-primary py-2 px-4 text-sm font-medium">
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 lg:hidden rounded-lg hover:bg-neutral-100 transition-colors">
            {isMobileMenuOpen ? <X className="h-5 w-5 text-neutral-700" /> : <Menu className="h-5 w-5 text-neutral-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t mt-2 animate-slide-down shadow-lg">
          <div className="container-custom py-4 flex flex-col space-y-1">
            <Link to="/" className="py-3 px-3 font-medium hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors">
              Beranda
            </Link>
            <Link to="/products" className="py-3 px-3 font-medium hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors">
              Parfum
            </Link>
            <Link to="/about" className="py-3 px-3 font-medium hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors">
              Tentang
            </Link>
            <Link to="/contact" className="py-3 px-3 font-medium hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors">
              Kontak
            </Link>

            <div className="border-t my-3"></div>

            {auth.user ? (
              <>
                <div className="py-2 px-3">
                  <span className="font-medium text-neutral-800">Hai, {auth.user.name.split(' ')[0]}</span>
                </div>
                {auth.user.isAdmin && (
                  <Link to="/admin" className="py-3 px-3 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors">
                    Dashboard Admin
                  </Link>
                )}
                <Link to="/profile" className="py-3 px-3 hover:bg-neutral-50 rounded-lg transition-colors">
                  Profil
                </Link>
                <Link to="/order-history" className="py-3 px-3 hover:bg-neutral-50 rounded-lg transition-colors">
                  Riwayat Pesanan
                </Link>
                <button onClick={handleLogout} className="py-3 px-3 text-left text-red-600 flex items-center hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                <Link to="/login" className="btn border border-primary-500 text-primary-500 hover:bg-primary-50 text-center py-3 text-sm">
                  Masuk
                </Link>
                <Link to="/register" className="btn-primary text-center py-3 text-sm">
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close profile menu */}
      {isProfileMenuOpen && <div className="fixed inset-0 z-10" onClick={() => setIsProfileMenuOpen(false)}></div>}
    </header>
  );
};

export default Header;
