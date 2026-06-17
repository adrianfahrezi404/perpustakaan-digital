import { useState, useEffect } from 'react';
import { Search, Shield, User, CheckCircle, Ban, AlertTriangle, Plus, Loader2, X } from 'lucide-react';
import api from '../../lib/api';

export default function MemberManagement() {
  const [members, setMembers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, action: string, id: number | null}>({ isOpen: false, action: '', id: null });
  const [formModal, setFormModal] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [membersRes, statsRes] = await Promise.all([
        api.get('/admin/members', { params: { search: searchQuery } }),
        api.get('/admin/member-stats')
      ]);
      setMembers(membersRes.data.data);
      setStats(statsRes.data.data);
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
      if (confirmModal.action === 'Nonaktifkan') {
        await api.post(`/admin/members/${confirmModal.id}/deactivate`);
        showToast('Member berhasil dinonaktifkan');
      } else if (confirmModal.action === 'Aktifkan') {
        await api.post(`/admin/members/${confirmModal.id}/activate`);
        showToast('Member berhasil diaktifkan');
      }
      fetchData();
    } catch (error) {
      console.error(error);
      alert('Gagal memproses permintaan.');
    } finally {
      setConfirmModal({ isOpen: false, action: '', id: null });
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/members', formData);
      showToast('Anggota baru berhasil ditambahkan');
      setFormModal(false);
      setFormData({ name: '', email: '', password: '' });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Gagal menambahkan anggota.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-4 right-4 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-top-2 z-50">
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
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">Konfirmasi {confirmModal.action}</h3>
                <p className="text-sm text-muted-foreground mt-1">Yakin {confirmModal.action.toLowerCase()} member ini?</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setConfirmModal({isOpen: false, action: '', id: null})} className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted">Batal</button>
              <button onClick={handleAction} className={`px-4 py-2 rounded-xl text-sm font-medium text-white ${confirmModal.action === 'Nonaktifkan' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>Ya, Lanjutkan</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {formModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl max-w-md w-full border border-[#e8dac5] dark:border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Tambah Anggota Baru</h3>
              <button onClick={() => setFormModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nama Lengkap</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg bg-transparent border-input focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg bg-transparent border-input focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium">Password Sementara</label>
                <input type="text" required minLength={8} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded-lg bg-transparent border-input focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setFormModal(false)} className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-2xl border border-[#e8dac5] dark:border-white/10 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center"><User className="w-6 h-6" /></div>
            <div><p className="text-sm text-muted-foreground">Total Anggota</p><p className="text-2xl font-serif font-bold">{stats?.total || 0}</p></div>
          </div>
        </div>
        <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-2xl border border-[#e8dac5] dark:border-white/10 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center"><CheckCircle className="w-6 h-6" /></div>
            <div><p className="text-sm text-muted-foreground">Anggota Aktif</p><p className="text-2xl font-serif font-bold">{stats?.active || 0}</p></div>
          </div>
        </div>
        <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-2xl border border-[#e8dac5] dark:border-white/10 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center"><Ban className="w-6 h-6" /></div>
            <div><p className="text-sm text-muted-foreground">Non-Aktif</p><p className="text-2xl font-serif font-bold">{stats?.inactive || 0}</p></div>
          </div>
        </div>
        <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-2xl border border-[#e8dac5] dark:border-white/10 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#9a503e]/10 text-[#9a503e] flex items-center justify-center"><Shield className="w-6 h-6" /></div>
            <div><p className="text-sm text-muted-foreground">Baru Bulan Ini</p><p className="text-2xl font-serif font-bold">{stats?.new_this_month || 0}</p></div>
          </div>
        </div>
      </div>

      <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-serif font-bold text-foreground">Member Management</h2>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari nama, email, ID..." className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background focus:ring-1 focus:ring-primary" />
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <button onClick={() => setFormModal(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90">
              <Plus className="w-4 h-4" /> Anggota Baru
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : members.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">Tidak ada anggota ditemukan.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-[#e8dac5] dark:border-white/10 text-muted-foreground">
                  <th className="py-4 px-4 font-semibold">Member Info</th>
                  <th className="py-4 px-4 font-semibold">Member ID</th>
                  <th className="py-4 px-4 font-semibold">Bergabung</th>
                  <th className="py-4 px-4 font-semibold text-center">Status</th>
                  <th className="py-4 px-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8dac5] dark:divide-white/10">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150'} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-muted-foreground">{member.member_id}</td>
                    <td className="py-4 px-4 text-muted-foreground">{new Date(member.created_at).toLocaleDateString('id-ID')}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${member.is_active ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                        {member.is_active ? 'Aktif' : 'Non-Aktif'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {member.is_active ? (
                          <button onClick={() => setConfirmModal({isOpen: true, action: 'Nonaktifkan', id: member.id})} className="text-red-500 hover:text-red-700 text-xs font-medium px-3 py-1 rounded bg-red-50 hover:bg-red-100">Nonaktifkan</button>
                        ) : (
                          <button onClick={() => setConfirmModal({isOpen: true, action: 'Aktifkan', id: member.id})} className="text-emerald-600 hover:text-emerald-700 text-xs font-medium px-3 py-1 rounded bg-emerald-50 hover:bg-emerald-100">Aktifkan</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
