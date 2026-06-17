import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Edit, Trash2, Plus, CheckCircle, AlertTriangle, X, Loader2 } from 'lucide-react';
import api from '../../lib/api';

export default function CatalogManagement() {
  const [searchParams] = useSearchParams();
  const globalSearch = searchParams.get('q') || '';

  const [books, setBooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, action: 'Hapus' | '', id: number | null}>({ isOpen: false, action: '', id: null });
  const [saveConfirmModal, setSaveConfirmModal] = useState(false);
  const [formModal, setFormModal] = useState<{isOpen: boolean, mode: 'Tambah' | 'Edit', data: any}>({ isOpen: false, mode: 'Tambah', data: null });
  const [successToast, setSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Form State
  const [formData, setFormData] = useState<{
    title: string; author: string; isbn: string; category_id: string; type: string; stock: number; pages: number; price: number; synopsis: string; publisher: string; publish_year: string; cover_link: string; cover_file: File | null;
  }>({
    title: '', author: '', isbn: '', category_id: '', type: 'fisik', stock: 0, pages: 0, price: 0, synopsis: '', publisher: '', publish_year: '', cover_link: '', cover_file: null
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const booksRes = await api.get('/admin/books', { params: { search: globalSearch } }).catch(e => {
        console.error('Books fetch error:', e);
        return { data: { data: [] } };
      });
      
      const catRes = await api.get('/categories').catch(e => {
        console.error('Categories fetch error:', e);
        return { data: { data: [] } };
      });

      // Safely extract arrays handling different axios wrapper possibilities
      const booksArr = Array.isArray(booksRes?.data?.data) ? booksRes.data.data : Array.isArray(booksRes?.data) ? booksRes.data : [];
      const catsArr = Array.isArray(catRes?.data?.data) ? catRes.data.data : Array.isArray(catRes?.data) ? catRes.data : [];

      setBooks(booksArr);
      setCategories(catsArr);
    } catch (error) {
      console.error('Unexpected error during fetch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { fetchData(); }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [globalSearch]);

  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setSuccessToast(true);
  };

  const handleDelete = async () => {
    if (confirmModal.id) {
      try {
        await api.delete(`/admin/books/${confirmModal.id}`);
        setBooks(books.filter(b => b.id !== confirmModal.id));
        showToast('Buku berhasil dihapus!');
      } catch (error) {
        console.error(error);
      }
    }
    setConfirmModal({ isOpen: false, action: '', id: null });
  };

  const generateISBN = () => {
    const r = () => Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `978-623-${r()}-${r()}-${Math.floor(Math.random() * 10)}`;
  };

  const openForm = (mode: 'Tambah' | 'Edit', book: any = null) => {
    if (mode === 'Edit' && book) {
      setFormData({
        title: book.title, author: book.author, isbn: book.isbn || '', category_id: book.category?.id || '',
        type: book.type, stock: book.stock, pages: book.pages, price: book.price, synopsis: book.synopsis || '',
        publisher: book.publisher || '', publish_year: book.publish_year || '',
        cover_link: book.cover && book.cover.startsWith('http') ? book.cover : '',
        cover_file: null
      });
    } else {
      setFormData({ title: '', author: '', isbn: generateISBN(), category_id: categories[0]?.id || '', type: 'fisik', stock: 0, pages: 0, price: 0, synopsis: '', publisher: '', publish_year: '', cover_link: '', cover_file: null });
    }
    setFormModal({ isOpen: true, mode, data: book });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveConfirmModal(true);
  };

  const executeSubmit = async () => {
    try {
      const fd = new FormData();
      Object.keys(formData).forEach(key => {
        const val = (formData as any)[key];
        if (val !== null && val !== '') {
          if (key === 'cover_file') {
            fd.append('cover', val);
          } else {
            fd.append(key, val);
          }
        }
      });
      
      if (formModal.mode === 'Tambah') {
        await api.post('/admin/books', fd);
        showToast('Buku berhasil ditambahkan!', 'success');
      } else {
        // Laravel PUT method with FormData requires _method=PUT
        fd.append('_method', 'PUT');
        await api.post(`/admin/books/${formModal.data.id}`, fd);
        showToast('Buku berhasil diperbarui!', 'success');
      }
      setFormModal({ isOpen: false, mode: 'Tambah', data: null });
      setSaveConfirmModal(false);
      fetchData();
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Gagal menyimpan buku. Periksa input Anda.';
      showToast(errorMessage, 'error');
      setSaveConfirmModal(false);
    }
  };

  return (
    <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm relative min-h-[500px]">
      {/* Toast Notification */}
      {successToast && (
        <div className={`absolute top-4 right-4 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-top-2 fade-in z-50 border ${
          toastType === 'success' 
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' 
            : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
        }`}>
          {toastType === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <div>
            <p className="font-semibold text-sm">{toastType === 'success' ? 'Berhasil' : 'Gagal'}</p>
            <p className="text-xs opacity-90">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {formModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl max-w-2xl w-full mx-auto border border-[#e8dac5] dark:border-white/10 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-[#1a1a1a] dark:text-white text-xl">{formModal.mode} Buku</h3>
              <button onClick={() => setFormModal({ isOpen: false, mode: 'Tambah', data: null })} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Judul Buku</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-black/20 dark:border-white/10 focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Penulis</label>
                  <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-black/20 dark:border-white/10 focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Kategori</label>
                  <select value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-[#1a1a1a] dark:text-white dark:border-white/10 focus:ring-1 focus:ring-primary">
                    <option value="" className="dark:bg-[#1a1a1a] dark:text-white">Pilih Kategori</option>
                    {(categories || []).map(c => <option key={c.id} value={c.id} className="dark:bg-[#1a1a1a] dark:text-white">{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">ISBN</label>
                  <input type="text" value={formData.isbn} onChange={e => setFormData({...formData, isbn: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-black/20 dark:border-white/10 focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Stok Fisik</label>
                  <input type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-black/20 dark:border-white/10 focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Jumlah Halaman</label>
                  <input type="number" min="0" value={formData.pages} onChange={e => setFormData({...formData, pages: parseInt(e.target.value)})} className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-black/20 dark:border-white/10 focus:ring-1 focus:ring-primary" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground">Upload Cover Gambar (Opsional)</label>
                  <input type="file" accept="image/*" onChange={e => setFormData({...formData, cover_file: e.target.files?.[0] || null})} className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-black/20 dark:border-white/10 focus:ring-1 focus:ring-primary text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground">Atau Link URL Gambar Cover (Opsional)</label>
                  <input type="text" placeholder="https://example.com/image.jpg" value={formData.cover_link} onChange={e => setFormData({...formData, cover_link: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-black/20 dark:border-white/10 focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setFormModal({ isOpen: false, mode: 'Tambah', data: null })} className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/5">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-white hover:bg-primary/90">Simpan Buku</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Save Confirmation Modal */}
      {saveConfirmModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#fcf7ef] text-[#1a1a1a] flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white text-lg">Konfirmasi Simpan</h3>
                <p className="text-sm text-gray-400 mt-1">Yakin menyimpan data buku ini?</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setSaveConfirmModal(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/5">Batal</button>
              <button onClick={executeSubmit} className="px-4 py-2 rounded-xl text-sm font-medium bg-[#fcf7ef] text-[#1a1a1a] hover:bg-[#e8dac5]">Ya, Lanjutkan</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 border border-[#e8dac5] dark:border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">Konfirmasi Hapus</h3>
                <p className="text-sm text-muted-foreground mt-1">Yakin hapus buku ini? Tidak dapat dibatalkan.</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setConfirmModal({ isOpen: false, action: '', id: null })} className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/5">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-serif font-bold text-[#1a1a1a] dark:text-white">Manajemen Katalog</h2>
        <button onClick={() => openForm('Tambah')} className="flex items-center gap-2 bg-[#9a503e] hover:bg-[#8a3a2b] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors shrink-0">
          <Plus className="w-4 h-4" /> Tambah Buku
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : books.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">Belum ada buku dalam katalog.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[#e8dac5] dark:border-white/10 text-muted-foreground">
                <th className="py-4 px-4 font-semibold w-16">Cover</th>
                <th className="py-4 px-4 font-semibold">Titel</th>
                <th className="py-4 px-4 font-semibold">Penulis</th>
                <th className="py-4 px-4 font-semibold">Kategori</th>
                <th className="py-4 px-4 font-semibold text-center">Stok</th>
                <th className="py-4 px-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8dac5] dark:divide-white/10">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-white/50 dark:hover:bg-white/5 group">
                  <td className="py-4 px-4">
                    <img src={book.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=150&h=200'} alt={book.title} className="h-20 w-auto max-w-[100px] object-contain rounded shadow border border-[#e8dac5]/50 dark:border-white/10" />
                  </td>
                  <td className="py-4 px-4 font-medium text-foreground">{book.title}</td>
                  <td className="py-4 px-4 text-muted-foreground">{book.author}</td>
                  <td className="py-4 px-4 text-muted-foreground">{book.category?.name || '-'}</td>
                  <td className="py-4 px-4 text-center text-foreground">{book.stock}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openForm('Edit', book)} className="p-1.5 text-primary hover:bg-primary/10 rounded-md"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => setConfirmModal({isOpen: true, action: 'Hapus', id: book.id})} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-md"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
