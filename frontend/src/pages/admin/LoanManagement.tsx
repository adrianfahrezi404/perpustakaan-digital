import { useState, useEffect } from 'react';
import { Search, CheckCircle, AlertTriangle, Plus, Loader2, X } from 'lucide-react';
import api from '../../lib/api';

export default function LoanManagement() {
  const [loans, setLoans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, action: string, id: number | null}>({ isOpen: false, action: '', id: null });
  const [formModal, setFormModal] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [users, setUsers] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({ user_id: '', book_id: '', loan_date: '', due_date: '' });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/loans', { params: { search: searchQuery } });
      setLoans(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { fetchData(); }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setSuccessToast(true);
  };

  const handleAction = async () => {
    if (!confirmModal.id) return;
    try {
      if (confirmModal.action === 'Return') {
        await api.post(`/admin/loans/${confirmModal.id}/return`);
        showToast('Buku berhasil dikembalikan');
      } else if (confirmModal.action === 'Bayar Denda') {
        await api.post(`/admin/loans/${confirmModal.id}/pay-fine`);
        showToast('Denda berhasil dibayar');
      }
      fetchData();
    } catch (error) {
      console.error(error);
      alert('Gagal memproses permintaan.');
    } finally {
      setConfirmModal({ isOpen: false, action: '', id: null });
    }
  };

  const openForm = async () => {
    try {
      const [uRes, bRes] = await Promise.all([
        api.get('/admin/members'),
        api.get('/admin/books')
      ]);
      setUsers(uRes.data.data);
      setBooks(bRes.data.data);
      
      const today = new Date().toISOString().split('T')[0];
      const next14Days = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      setFormData({ user_id: '', book_id: '', loan_date: today, due_date: next14Days });
      setFormModal(true);
    } catch (error) {
      console.error(error);
      alert('Gagal memuat data untuk form.');
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/loans', formData);
      showToast('Peminjaman berhasil dibuat');
      setFormModal(false);
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal membuat peminjaman.');
    }
  };

  return (
    <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm relative min-h-[500px]">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-top-2 z-50">
          <CheckCircle className="w-5 h-5" />
          <div>
            <p className="font-semibold text-sm">Berhasil</p>
            <p className="text-xs opacity-90">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 border border-[#e8dac5] dark:border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">Konfirmasi {confirmModal.action}</h3>
                <p className="text-sm text-muted-foreground mt-1">Lanjutkan aksi {confirmModal.action.toLowerCase()}?</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setConfirmModal({isOpen: false, action: '', id: null})} className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted">Batal</button>
              <button onClick={handleAction} className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary/90">Ya, Lanjutkan</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Loan Modal */}
      {formModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl max-w-md w-full border border-[#e8dac5] dark:border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Buat Peminjaman Baru</h3>
              <button onClick={() => setFormModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={submitForm} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Anggota</label>
                <select required value={formData.user_id} onChange={e => setFormData({...formData, user_id: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg bg-transparent border-input focus:ring-1 focus:ring-primary">
                  <option value="">Pilih Anggota</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Buku</label>
                <select required value={formData.book_id} onChange={e => setFormData({...formData, book_id: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg bg-transparent border-input focus:ring-1 focus:ring-primary">
                  <option value="">Pilih Buku</option>
                  {books.map(b => <option key={b.id} value={b.id}>{b.title} ({b.stock} tersedia)</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Tanggal Pinjam</label>
                <input type="date" required value={formData.loan_date} onChange={e => setFormData({...formData, loan_date: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg bg-transparent border-input focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium">Tenggat Waktu</label>
                <input type="date" required value={formData.due_date} onChange={e => setFormData({...formData, due_date: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg bg-transparent border-input focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setFormModal(false)} className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-serif font-bold text-foreground">Loan Management</h2>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari peminjaman..." className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background focus:ring-1 focus:ring-primary" />
            <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
          <button onClick={openForm} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90">
            <Plus className="w-4 h-4" /> Peminjaman Baru
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : loans.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">Tidak ada data peminjaman.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[#e8dac5] dark:border-white/10 text-muted-foreground">
                <th className="py-4 px-4 font-semibold">Buku & Peminjam</th>
                <th className="py-4 px-4 font-semibold">Tanggal Pinjam</th>
                <th className="py-4 px-4 font-semibold">Tenggat</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-4 font-semibold">Denda</th>
                <th className="py-4 px-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8dac5] dark:divide-white/10">
              {loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-foreground">{loan.book?.title}</p>
                      <p className="text-xs text-muted-foreground">{loan.user?.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{new Date(loan.loan_date).toLocaleDateString('id-ID')}</td>
                  <td className="py-4 px-4 text-muted-foreground">{new Date(loan.due_date).toLocaleDateString('id-ID')}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      loan.status === 'kembali' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                      loan.status === 'terlambat' ? 'bg-red-50 text-red-600 border-red-200' : 
                      'bg-amber-50 text-amber-600 border-amber-200'
                    }`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {loan.fine_amount > 0 ? (
                      <span className={loan.fine_paid ? 'text-emerald-600' : 'text-red-600 font-semibold'}>
                        Rp {loan.fine_amount} {loan.fine_paid ? '(Lunas)' : ''}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {loan.status === 'dipinjam' || loan.status === 'terlambat' ? (
                        <button onClick={() => setConfirmModal({isOpen: true, action: 'Return', id: loan.id})} className="text-primary hover:underline text-xs font-medium">Return Buku</button>
                      ) : null}
                      {loan.fine_amount > 0 && !loan.fine_paid ? (
                        <button onClick={() => setConfirmModal({isOpen: true, action: 'Bayar Denda', id: loan.id})} className="text-red-500 hover:underline text-xs font-medium">Bayar Denda</button>
                      ) : null}
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
