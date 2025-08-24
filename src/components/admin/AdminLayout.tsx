import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, LayoutDashboard, ShoppingBag, Package, LogOut, Menu, X, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 text-white fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 lg:w-72 flex flex-col shadow-2xl lg:relative lg:translate-x-0`}
      >
        {/* Sidebar header */}
        <div className="p-4 lg:p-6 flex items-center justify-between border-b border-dark-700">
          <Link to="/admin" className="flex items-center group">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-primary-400 group-hover:text-primary-300 transition-colors" />
              <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-lg group-hover:bg-primary-300/30 transition-all"></div>
            </div>
            <span className="ml-3 text-lg lg:text-xl font-heading font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Artalis Admin</span>
          </Link>
          <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-dark-700 lg:hidden transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar content */}
        <nav className="flex-1 px-3 lg:px-4 py-4 space-y-2 overflow-y-auto">
          <Link
            to="/admin"
            className={`flex items-center p-3 lg:p-4 rounded-xl transition-all duration-200 text-sm lg:text-base ${isActive('/admin') ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' : 'hover:bg-dark-700/50'}`}
          >
            <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
            <span className="ml-3 font-medium">Dashboard</span>
          </Link>
          <Link
            to="/admin/products"
            className={`flex items-center p-3 lg:p-4 rounded-xl transition-all duration-200 text-sm lg:text-base ${
              isActive('/admin/products') ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' : 'hover:bg-dark-700/50'
            }`}
          >
            <ShoppingBag className="h-5 w-5 flex-shrink-0" />
            <span className="ml-3 font-medium">Parfum</span>
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center p-3 lg:p-4 rounded-xl transition-all duration-200 text-sm lg:text-base ${
              isActive('/admin/orders') ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' : 'hover:bg-dark-700/50'
            }`}
          >
            <Package className="h-5 w-5 flex-shrink-0" />
            <span className="ml-3 font-medium">Pesanan</span>
          </Link>
        </nav>

        {/* Sidebar footer */}
        <div className="p-3 lg:p-4 border-t border-dark-700 space-y-2">
          <button onClick={handleLogout} className="flex items-center p-3 w-full rounded-xl hover:bg-red-600/20 transition-colors text-red-400 hover:text-red-300 text-sm lg:text-base">
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className="ml-3 font-medium">Keluar</span>
          </button>

          <Link to="/" className="flex items-center p-3 rounded-xl hover:bg-dark-700/50 transition-colors text-sm lg:text-base">
            <ArrowLeft className="h-5 w-5 flex-shrink-0" />
            <span className="ml-3 font-medium">Kembali ke Toko</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Topbar */}
        <header className="bg-white shadow-sm z-10 border-b border-neutral-200 lg:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center">
              <div className="text-right">
                <p className="text-sm font-medium text-neutral-800">Admin Artalis</p>
                <p className="text-xs text-neutral-500">Kelola toko parfum mewah</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-50 p-4 lg:p-8 pt-4 lg:pt-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
    </div>
  );
};

export default AdminLayout;
