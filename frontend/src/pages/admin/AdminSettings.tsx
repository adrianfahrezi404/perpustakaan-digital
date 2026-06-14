import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function AdminSettings() {
  const [confirmModal, setConfirmModal] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  const handleSave = () => {
    setConfirmModal(false);
    setSuccessToast(true);
  };

  return (
    <div className="space-y-8 max-w-5xl relative">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-4 right-4 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-top-2 fade-in z-50">
          <CheckCircle className="w-5 h-5" />
          <div>
            <p className="font-semibold text-sm">Berhasil</p>
            <p className="text-xs opacity-90">Perubahan berhasil disimpan!</p>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 border border-[#e8dac5] dark:border-white/10 animate-in zoom-in-95">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1a1a1a] dark:text-white text-lg">Simpan Perubahan</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Apakah Anda yakin ingin menyimpan semua perubahan pengaturan ini?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-[#9a503e] hover:bg-[#8a3a2b] text-white transition-colors shadow-md"
              >
                Ya, Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-4xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f]">Pengaturan Sistem</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column */}
        <div className="space-y-8">
          <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-[#1a1a1a] dark:text-white mb-6">Profil Perpustakaan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1.5">Nama Perpustakaan</label>
                <input type="text" defaultValue="Pustaka Hangat Digital" className="w-full px-4 py-2.5 rounded-xl border border-[#e8dac5] dark:border-white/10 bg-white dark:bg-white/5 focus:ring-1 focus:ring-[#9a503e] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1.5">Alamat</label>
                <input type="text" defaultValue="Jl. Pencerahan No. 45, Kota Lama" className="w-full px-4 py-2.5 rounded-xl border border-[#e8dac5] dark:border-white/10 bg-white dark:bg-white/5 focus:ring-1 focus:ring-[#9a503e] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1.5">Email Kontak</label>
                <input type="email" defaultValue="info@pustakahangat.com" className="w-full px-4 py-2.5 rounded-xl border border-[#e8dac5] dark:border-white/10 bg-white dark:bg-white/5 focus:ring-1 focus:ring-[#9a503e] outline-none text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-[#1a1a1a] dark:text-white mb-6">Integrasi Pembayaran</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">Gateway Pembayaran (e.g., Stripe/Midtrans)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-600 font-bold">Aktif</span>
                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">Bayar di Tempat (COD)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-bold">Nonaktif</span>
                  <div className="w-10 h-5 bg-[#e8dac5] dark:bg-gray-600 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1.5 mt-2">Penyedia Gateway</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-[#e8dac5] dark:border-white/10 bg-white dark:bg-white/5 focus:ring-1 focus:ring-[#9a503e] outline-none text-sm">
                  <option>Midtrans</option>
                  <option>Stripe</option>
                  <option>PayPal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1.5">API Key</label>
                <input type="password" defaultValue="sk_test_123456789" className="w-full px-4 py-2.5 rounded-xl border border-[#e8dac5] dark:border-white/10 bg-white dark:bg-white/5 focus:ring-1 focus:ring-[#9a503e] outline-none text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-[#1a1a1a] dark:text-white mb-6">Konfigurasi Peminjaman</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm">Izinkan Peminjaman Mandiri</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-600 font-bold">Aktif</span>
                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1.5">Maksimal Buku</label>
                <input type="number" defaultValue="3" className="w-full px-4 py-2.5 rounded-xl border border-[#e8dac5] dark:border-white/10 bg-white dark:bg-white/5 focus:ring-1 focus:ring-[#9a503e] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1.5">Durasi Peminjaman (Hari)</label>
                <input type="number" defaultValue="14" className="w-full px-4 py-2.5 rounded-xl border border-[#e8dac5] dark:border-white/10 bg-white dark:bg-white/5 focus:ring-1 focus:ring-[#9a503e] outline-none text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-[#1a1a1a] dark:text-white mb-6">Keamanan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1.5">Kata Sandi Admin</label>
                <input type="password" defaultValue="********" className="w-full px-4 py-2.5 rounded-xl border border-[#e8dac5] dark:border-white/10 bg-white dark:bg-white/5 focus:ring-1 focus:ring-[#9a503e] outline-none text-sm font-mono tracking-widest" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-1.5">Frekuensi Pencadangan Otomatis</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-[#e8dac5] dark:border-white/10 bg-white dark:bg-white/5 focus:ring-1 focus:ring-[#9a503e] outline-none text-sm">
                  <option>Setiap Hari</option>
                  <option>Setiap Minggu</option>
                  <option>Setiap Bulan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              onClick={() => setConfirmModal(true)}
              className="bg-gradient-to-b from-[#a35e4d] to-[#8a3a2b] hover:from-[#8a3a2b] hover:to-[#763022] text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg shadow-[#8a3a2b]/20 transition-all active:scale-95"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
