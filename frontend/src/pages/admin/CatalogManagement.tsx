import { useState, useEffect } from 'react';
import { ChevronDown, Edit, Trash2, Plus, CheckCircle, AlertTriangle } from 'lucide-react';

const initialBooks = [
  { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', isbn: '978-979-3062-79-2', category: 'Fiksi', stock: 15, cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=150&h=200' },
  { id: 2, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', isbn: '978-979-3062-79-2', category: 'Sejarah', stock: 8, cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=150&h=200' },
  { id: 3, title: 'Kalkulus Beserta Kuiz', author: 'Joko Basyam', isbn: '978-979-3062-79-2', category: 'Fiksi', stock: 2, cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=150&h=200' },
  { id: 4, title: 'Pengantar', author: 'Andrea Hirata', isbn: '978-979-3062-79-2', category: 'Fiksi', stock: 4, cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=150&h=200' },
  { id: 5, title: 'Penemuan Arkeologi', author: 'Tomi Timur', isbn: '978-979-3062-79-2', category: 'Sejarah', stock: 12, cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=150&h=200' },
];

export default function CatalogManagement() {
  const [books, setBooks] = useState(initialBooks);
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, action: string, id: number | null}>({ isOpen: false, action: '', id: null });
  const [successToast, setSuccessToast] = useState(false);

  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  const handleActionClick = (action: string, id: number | null = null) => {
    setConfirmModal({ isOpen: true, action, id });
  };

  const handleConfirm = () => {
    if (confirmModal.action === 'Hapus' && confirmModal.id) {
      setBooks(books.filter(b => b.id !== confirmModal.id));
    }
    setConfirmModal({ isOpen: false, action: '', id: null });
    setSuccessToast(true);
  };

  return (
    <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm relative">
      {/* Toast Notification */}
      {successToast && (
        <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-top-2 fade-in z-50">
          <CheckCircle className="w-5 h-5" />
          <div>
            <p className="font-semibold text-sm">Berhasil</p>
            <p className="text-xs opacity-90">Perubahan berhasil disimpan!</p>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 border border-[#e8dac5] dark:border-white/10 animate-in zoom-in-95">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1a1a1a] dark:text-white text-lg">Konfirmasi {confirmModal.action}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Apakah Anda yakin ingin {confirmModal.action.toLowerCase()} data ini? Perubahan tidak dapat dibatalkan.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setConfirmModal({ isOpen: false, action: '', id: null })}
                className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirm}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-[#9a503e] hover:bg-[#8a3a2b] text-white transition-colors shadow-md"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-serif font-bold text-[#1a1a1a] dark:text-white">Book Management</h2>
        <button 
          onClick={() => handleActionClick('Tambah Buku')}
          className="flex items-center gap-2 bg-[#9a503e] hover:bg-[#8a3a2b] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Buku Baru
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kategori</label>
          <div className="relative">
            <select className="appearance-none bg-white dark:bg-white/5 border border-[#e8dac5] dark:border-white/10 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#9a503e] min-w-[200px]">
              <option>Semua Kategori</option>
              <option>Fiksi</option>
              <option>Non-Fiksi</option>
              <option>Sains</option>
            </select>
            <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
          <div className="relative">
            <select className="appearance-none bg-white dark:bg-white/5 border border-[#e8dac5] dark:border-white/10 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#9a503e] min-w-[200px]">
              <option>Semua Status</option>
              <option>Tersedia</option>
              <option>Dipinjam</option>
            </select>
            <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-[#e8dac5] dark:border-white/10 text-muted-foreground dark:text-gray-400">
              <th className="py-4 px-4 font-semibold w-16"></th>
              <th className="py-4 px-4 font-semibold">Titel</th>
              <th className="py-4 px-4 font-semibold">Penulis</th>
              <th className="py-4 px-4 font-semibold">ISBN</th>
              <th className="py-4 px-4 font-semibold">Kategori</th>
              <th className="py-4 px-4 font-semibold text-center">Stok</th>
              <th className="py-4 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8dac5] dark:divide-white/10">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-4 px-4">
                  <img src={book.cover} alt={book.title} className="w-14 h-20 object-cover rounded shadow-md border border-[#e8dac5]/50 dark:border-white/10" />
                </td>
                <td className="py-4 px-4 font-medium text-[#1a1a1a] dark:text-white">{book.title}</td>
                <td className="py-4 px-4 text-muted-foreground dark:text-gray-400">{book.author}</td>
                <td className="py-4 px-4 text-muted-foreground dark:text-gray-400 font-mono text-xs">{book.isbn}</td>
                <td className="py-4 px-4 text-muted-foreground dark:text-gray-400">{book.category}</td>
                <td className="py-4 px-4 text-center font-medium text-[#1a1a1a] dark:text-white">{book.stock}</td>
                <td className="py-4 px-4">
                  <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleActionClick('Mengedit', book.id)}
                      className="p-1.5 text-[#8a3a2b] hover:bg-[#8a3a2b]/10 rounded-md transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleActionClick('Hapus', book.id)}
                      className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground border-t border-[#e8dac5] dark:border-white/10 pt-4">
        <span>Showing 1-5 of 50</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 rounded hover:bg-white/50 dark:hover:bg-white/5">&lt;</button>
          <button className="px-3 py-1 rounded bg-[#8a3a2b] text-white">1</button>
          <button className="px-3 py-1 rounded hover:bg-white/50 dark:hover:bg-white/5">2</button>
          <button className="px-3 py-1 rounded hover:bg-white/50 dark:hover:bg-white/5">3</button>
          <button className="px-3 py-1 rounded hover:bg-white/50 dark:hover:bg-white/5">4</button>
          <button className="px-3 py-1 rounded hover:bg-white/50 dark:hover:bg-white/5">5</button>
          <button className="px-3 py-1 rounded hover:bg-white/50 dark:hover:bg-white/5">&gt;</button>
        </div>
      </div>
    </div>
  );
}
