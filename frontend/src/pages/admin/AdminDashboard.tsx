import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import api from '../../lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [popularBooks, setPopularBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, trendsRes, booksRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/loan-trends'),
          api.get('/admin/popular-books')
        ]);
        setStats(statsRes.data.data);
        setTrends(trendsRes.data.data);
        setPopularBooks(booksRes.data.data);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] rounded-2xl border border-[#e8dac5] dark:border-white/10 overflow-hidden shadow-sm">
          <div className="bg-[#8a3a2b] dark:bg-[#4a2511] px-5 py-3">
            <h3 className="text-white font-medium">Total Buku</h3>
          </div>
          <div className="p-5">
            <p className="text-4xl font-serif font-bold text-[#1a1a1a] dark:text-gray-900">{stats?.total_books || 0}</p>
          </div>
        </div>
        
        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] rounded-2xl border border-[#e8dac5] dark:border-white/10 overflow-hidden shadow-sm">
          <div className="bg-[#8a3a2b] dark:bg-[#4a2511] px-5 py-3">
            <h3 className="text-white font-medium">Anggota Aktif</h3>
          </div>
          <div className="p-5">
            <p className="text-4xl font-serif font-bold text-[#1a1a1a] dark:text-gray-900">{stats?.total_members || 0}</p>
          </div>
        </div>

        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] rounded-2xl border border-[#e8dac5] dark:border-white/10 overflow-hidden shadow-sm">
          <div className="bg-[#8a3a2b] dark:bg-[#4a2511] px-5 py-3">
            <h3 className="text-white font-medium">Buku Dipinjam</h3>
          </div>
          <div className="p-5">
            <p className="text-4xl font-serif font-bold text-[#1a1a1a] dark:text-gray-900">{stats?.active_loans || 0}</p>
          </div>
        </div>

        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] rounded-2xl border border-[#e8dac5] dark:border-white/10 overflow-hidden shadow-sm">
          <div className="bg-[#8a3a2b] dark:bg-[#4a2511] px-5 py-3">
            <h3 className="text-white font-medium">Pendapatan Bulan Ini</h3>
          </div>
          <div className="p-5">
            <p className="text-3xl font-serif font-bold text-[#1a1a1a] dark:text-gray-900">{formatRupiah(stats?.monthly_revenue || 0)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f] mb-2">Tren Peminjaman</h2>
          <p className="text-muted-foreground dark:text-gray-400 text-sm mb-8">Data 6 bulan terakhir.</p>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f2b96f" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f2b96f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', color: '#1a1a1a' }}
                />
                <Area type="monotone" dataKey="loans" name="Peminjaman" stroke="#d97736" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Books */}
        <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f] mb-6">Buku Terpopuler</h2>
          
          <div className="bg-[#f2e6db] dark:bg-[#2a2a2a] rounded-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 border-b border-[#e8dac5] dark:border-white/10">
              <span className="font-semibold text-sm text-[#8a3a2b] dark:text-[#f2b96f]">Buku & Judul</span>
              <span className="font-semibold text-sm text-[#8a3a2b] dark:text-[#f2b96f]">Status</span>
            </div>
            <div className="divide-y divide-[#e8dac5] dark:divide-white/10">
              {popularBooks.map((book) => (
                <div key={book.id} className="grid grid-cols-[1fr_auto] gap-4 p-4 items-center hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <img src={book.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=100&h=150'} alt={book.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                    <div>
                      <h4 className="font-semibold text-[#1a1a1a] dark:text-white line-clamp-1">{book.title}</h4>
                      <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">Status: {book.status}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    book.status === 'tersedia' 
                      ? 'bg-[#fcf9f2] text-[#8a3a2b] border-[#8a3a2b]' 
                      : 'bg-[#9a503e] text-white border-[#9a503e]'
                  }`}>
                    {book.status === 'tersedia' ? 'Tersedia' : book.status === 'dipinjam' ? 'Dipinjam' : 'Habis'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
