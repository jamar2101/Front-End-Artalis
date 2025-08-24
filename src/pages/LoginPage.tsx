import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, LogIn, Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state, or default to home
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      // Error handling is done in AuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-primary-400/10 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-600/20 rounded-full blur-lg animate-float" style={{animationDelay: '4s'}}></div>

      <div className="max-w-md w-full space-y-8 bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-2xl shadow-2xl border border-primary-900/30 relative z-10">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center group">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-primary-400 group-hover:text-primary-300 transition-colors" />
              <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-lg group-hover:bg-primary-300/30 transition-all"></div>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-heading font-bold text-white">Selamat Datang Kembali!</h2>
          <p className="mt-2 text-neutral-400">
            Masuk ke akun Artalis Anda
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                Alamat Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 pl-10 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan email Anda"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pl-10 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan kata sandi Anda"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 flex items-center justify-center text-lg font-semibold rounded-xl"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Masuk...
              </div>
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Masuk
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-neutral-400">
              Belum punya akun?{' '}
              <Link to="/register" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;