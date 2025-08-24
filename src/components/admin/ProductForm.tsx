import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Sparkles, Upload, X } from 'lucide-react';

interface ProductFormProps {
  product?: Product;
  onSubmit: (productData: FormData) => Promise<void>;
  categories: string[];
  isSubmitting: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { auth } = useAuth();

  // Predefined fragrance categories
  const fragranceCategories = ['men', 'women', 'unisex', 'limited', 'oriental', 'fresh', 'woody', 'floral', 'citrus'];

  const getCategoryDisplayName = (cat: string) => {
    const categoryNames: { [key: string]: string } = {
      men: 'Parfum Pria',
      women: 'Parfum Wanita',
    };
    return categoryNames[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const formatRupiah = (value: string) => {
    // Remove non-numeric characters except dots and commas
    const numericValue = value.replace(/[^\d]/g, '');

    if (!numericValue) return '';

    // Format as Indonesian Rupiah
    return new Intl.NumberFormat('id-ID').format(parseInt(numericValue));
  };

  const parseRupiah = (formattedValue: string) => {
    // Remove all non-numeric characters
    return formattedValue.replace(/[^\d]/g, '');
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(formatRupiah(product.price.toString()));
      setCategory(product.category);
      setInStock(product.inStock.toString());
      setIsFeatured(product.isFeatured);

      // Set image preview for existing product
      if (product.image) {
        const perfumeImages = [
          'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
          'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg',
          'https://images.pexels.com/photos/1961796/pexels-photo-1961796.jpeg',
          'https://images.pexels.com/photos/1961794/pexels-photo-1961794.jpeg',
          'https://images.pexels.com/photos/1961793/pexels-photo-1961793.jpeg',
        ];

        const imageUrl = product.image.startsWith('http')
          ? product.image
          : product.image.startsWith('/uploads/')
          ? `${import.meta.env.VITE_API_URL}${product.image}`
          : perfumeImages[parseInt(product._id.slice(-1), 16) % perfumeImages.length];
        setImagePreview(imageUrl);
      }
    }
  }, [product]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatRupiah(value);
    setPrice(formatted);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file terlalu besar. Maksimal 5MB.');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF.');
        return;
      }

      setImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToServer = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploadingImage(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.data.success) {
        return response.data.data.path;
      } else {
        throw new Error('Upload gagal');
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      throw new Error(error.response?.data?.message || 'Gagal upload gambar');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !price || (!category && !newCategory) || !inStock) {
      toast.error('Mohon isi semua field yang wajib diisi');
      return;
    }

    // For new products, image is required
    if (!product && !image) {
      toast.error('Gambar produk wajib diisi untuk parfum baru');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', parseRupiah(price));
      formData.append('category', showCategoryInput ? newCategory : category);
      formData.append('inStock', inStock);
      formData.append('isFeatured', isFeatured.toString());

      // Upload image if new image is selected
      if (image) {
        const imagePath = await uploadImageToServer(image);
        formData.append('imagePath', imagePath);
      }

      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Gagal menyimpan parfum');
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'new') {
      setShowCategoryInput(true);
      setCategory('');
    } else {
      setShowCategoryInput(false);
      setCategory(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
            Nama Parfum *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            placeholder="Masukkan nama parfum"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-neutral-300 mb-2">
            Harga (Rupiah) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm">Rp</span>
            <input
              type="text"
              id="price"
              value={price}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 pl-8 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="Masukkan harga"
              required
            />
          </div>
          <p className="text-xs text-neutral-400 mt-1">Contoh: 150000 akan menjadi Rp 150.000</p>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-2">
          Deskripsi *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          placeholder="Deskripsikan aroma dan karakteristik parfum"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-300 mb-2">
            Koleksi *
          </label>
          {!showCategoryInput ? (
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Pilih Koleksi</option>
              {fragranceCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {getCategoryDisplayName(cat)}
                </option>
              ))}
              <option value="new">+ Tambah Koleksi Baru</option>
            </select>
          ) : (
            <div className="relative">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 pr-10 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Masukkan nama koleksi baru"
                required
              />
              <button
                type="button"
                onClick={() => {
                  setShowCategoryInput(false);
                  setNewCategory('');
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="inStock" className="block text-sm font-medium text-neutral-300 mb-2">
            Jumlah Stok *
          </label>
          <input
            type="number"
            id="inStock"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
            min="0"
            className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            placeholder="Masukkan jumlah stok"
            required
          />
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 text-primary-500 rounded border-neutral-600 focus:ring-primary-500 bg-dark-700" />
          <label htmlFor="isFeatured" className="ml-2 block text-sm text-neutral-300 flex items-center">
            <Sparkles className="h-4 w-4 mr-1 text-primary-400" />
            Tampilkan di halaman utama
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-neutral-300 mb-2">
          Gambar Produk {!product && '*'}
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-primary-700/50 border-dashed rounded-xl hover:border-primary-600/50 transition-colors bg-dark-700/30">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-neutral-400" />
            <div className="flex text-sm text-neutral-300">
              <label
                htmlFor="image"
                className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary-400 hover:text-primary-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
              >
                <span>Upload file</span>
                <input id="image" name="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" required={!product} disabled={uploadingImage} />
              </label>
              <p className="pl-1">atau drag and drop</p>
            </div>
            <p className="text-xs text-neutral-400">PNG, JPG, WEBP, GIF maksimal 5MB</p>
          </div>
        </div>

        {uploadingImage && (
          <div className="mt-2 flex items-center text-primary-400">
            <div className="animate-spin h-4 w-4 border-2 border-primary-400 border-t-transparent rounded-full mr-2"></div>
            Mengupload gambar...
          </div>
        )}

        {imagePreview && !uploadingImage && (
          <div className="mt-4">
            <p className="text-sm text-neutral-400 mb-2">Preview Gambar:</p>
            <img src={imagePreview} alt="Preview produk" className="w-32 h-32 object-cover rounded-xl border border-primary-700/50 shadow-sm" />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-primary-800/30">
        <button type="button" onClick={() => window.history.back()} className="btn border border-neutral-600 bg-dark-700 text-neutral-300 hover:bg-dark-600 px-6 py-3 rounded-xl transition-colors">
          Batal
        </button>
        <button type="submit" disabled={isSubmitting || uploadingImage} className="btn-primary px-6 py-3 rounded-xl">
          {isSubmitting || uploadingImage ? (
            <div className="flex items-center">
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              {uploadingImage ? 'Mengupload...' : 'Menyimpan...'}
            </div>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              {product ? 'Perbarui Parfum' : 'Tambah Parfum'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
