import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Save, Sparkles, Mail, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfilePage: React.FC = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.user?.name || '',
    email: auth.user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate passwords if attempting to change
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error('Kata sandi baru tidak cocok');
          return;
        }
        if (!formData.currentPassword) {
          toast.error('Kata sandi saat ini diperlukan untuk mengubah kata sandi');
          return;
        }
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.newPassword || undefined
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Profil berhasil diperbarui');
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 md:py-10 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-white">
            Profil <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Saya</span>
          </h1>
          <p className="text-neutral-300">Kelola pengaturan akun Artalis Anda</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-primary-900/30">
            {/* Profile Header */}
            <div className="text-center mb-8 pb-6 border-b border-primary-800/30">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-white">
                Selamat datang kembali, {auth.user?.name?.split(' ')[0]}!
              </h2>
              <p className="text-neutral-400 text-sm">Member sejak {new Date(auth.user?.createdAt || '').toLocaleDateString('id-ID')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-heading font-semibold mb-4 flex items-center text-white">
                  <Sparkles className="h-5 w-5 mr-2 text-primary-400" />
                  Informasi Pribadi
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 pl-10 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 pl-10 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div>
                <h3 className="text-lg font-heading font-semibold mb-4 flex items-center text-white">
                  <Lock className="h-5 w-5 mr-2 text-primary-400" />
                  Ubah Kata Sandi
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-300 mb-2">
                      Kata Sandi Saat Ini
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 pl-10 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Masukkan kata sandi saat ini"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-300 mb-2">
                      Kata Sandi Baru
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 pl-10 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Masukkan kata sandi baru"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-300 mb-2">
                      Konfirmasi Kata Sandi Baru
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 pl-10 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Konfirmasi kata sandi baru"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-primary-800/30">
                <button
                  type="button"
                  onClick={() => navigate('/order-history')}
                  className="btn border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 py-3 px-6 rounded-xl transition-colors"
                >
                  Lihat Riwayat Pesanan
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary py-3 px-6 rounded-xl"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Menyimpan...
                    </div>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;