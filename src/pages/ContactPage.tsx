import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Sparkles } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const phoneNumber = "6281574606516"; // Your WhatsApp number without '+'
    const { name, email, subject, message } = formData;
    
    // Construct the message for WhatsApp
    const whatsappMessage = `Halo, saya ${name} (${email}). Saya ingin bertanya tentang: ${subject}.\n\nPesan saya: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create the WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Simulate form submission delay (optional, for UX)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Open WhatsApp in a new tab/window
    window.open(whatsappURL, '_blank');

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setLoading(false);
    
    // Provide user feedback that they're being redirected
    alert('Anda akan diarahkan ke WhatsApp untuk mengirim pesan Anda. Pastikan Anda telah mengirim pesan tersebut!');
  };

  return (
    <div className="py-10 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
            Hubungi <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Kami</span>
          </h1>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Ada pertanyaan tentang parfum kami? Kami siap membantu Anda menemukan aroma yang sempurna.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-2xl shadow-xl border border-primary-900/30">
              <h2 className="text-xl font-heading font-semibold mb-6 flex items-center text-white">
                <Sparkles className="h-6 w-6 mr-2 text-primary-400" />
                Mari Terhubung
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-white">Kunjungi Toko Kami</h3>
                    <p className="text-neutral-300 leading-relaxed">
                      Jalan Anyelir VII Blok W4 No.22 RT/RW 04/09 Kel. Kedung Waringin Kec. Tanah Sareal Taman Cimanggu Bogor
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-white">Telepon Kami</h3>
                    <p className="text-neutral-300">
                      +62 815-7460-6516
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-white">Email Kami</h3>
                    <p className="text-neutral-300">
                      artalis.co.id@gmail.com
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Map */}
            <div className="mt-8 bg-gradient-to-br from-dark-800 to-dark-900 p-6 rounded-2xl shadow-xl border border-primary-900/30">
              <h2 className="text-xl font-heading font-semibold mb-4 text-white">Temukan Kami</h2>
              <div className="aspect-video bg-gradient-to-br from-dark-700 to-dark-800 rounded-xl flex items-center justify-center border border-primary-800/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.666986423985!2d106.77978257467664!3d-6.565882664184666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5e5e6e6e6e7%3A0x6a1e3f8b0e7d5e7d!2sJl.%20Anyelir%20VII%20Blok%20W4%20No.22%2C%20Kedung%20Waringin%2C%20Kec.%20Tanah%20Sareal%2C%20Kota%20Bogor%2C%20Jawa%20Barat%2016164!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-md"
              ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-2xl shadow-xl border border-primary-900/30">
            <h2 className="text-xl font-heading font-semibold mb-6 flex items-center text-white">
              <Send className="h-6 w-6 mr-2 text-primary-400" />
              Kirim Pesan
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  Alamat Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan alamat email Anda"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Tentang apa ini?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-primary-700/50 bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ceritakan bagaimana kami bisa membantu Anda..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 flex items-center justify-center text-lg font-semibold rounded-xl"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Mengirim...
                  </div>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Kirim Pesan via WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;