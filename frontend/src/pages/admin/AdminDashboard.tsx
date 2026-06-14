import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 65 },
  { name: 'May', value: 85 },
  { name: 'Jun', value: 110 },
];

const popularBooks = [
  { id: 1, title: 'Laskar Pelangi', status: 'Tersedia', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=100&h=150' },
  { id: 2, title: 'Harry Potter', status: 'Dipinjam', cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=100&h=150' },
  { id: 3, title: 'Bumi Manusia', status: 'Tersedia', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=100&h=150' },
  { id: 4, title: 'Dilan 1990', status: 'Dipinjam', cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=100&h=150' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] rounded-2xl border border-[#e8dac5] dark:border-white/10 overflow-hidden shadow-sm">
          <div className="bg-[#8a3a2b] dark:bg-[#4a2511] px-5 py-3">
            <h3 className="text-white font-medium">Total Buku</h3>
          </div>
          <div className="p-5">
            <p className="text-4xl font-serif font-bold text-[#1a1a1a]">12,500</p>
          </div>
        </div>
        
        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] rounded-2xl border border-[#e8dac5] dark:border-white/10 overflow-hidden shadow-sm">
          <div className="bg-[#8a3a2b] dark:bg-[#4a2511] px-5 py-3">
            <h3 className="text-white font-medium">Anggota Aktif</h3>
          </div>
          <div className="p-5">
            <p className="text-4xl font-serif font-bold text-[#1a1a1a]">8,420</p>
          </div>
        </div>

        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] rounded-2xl border border-[#e8dac5] dark:border-white/10 overflow-hidden shadow-sm">
          <div className="bg-[#8a3a2b] dark:bg-[#4a2511] px-5 py-3">
            <h3 className="text-white font-medium">Buku Dipinjam</h3>
          </div>
          <div className="p-5">
            <p className="text-4xl font-serif font-bold text-[#1a1a1a]">1,150</p>
          </div>
        </div>

        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] rounded-2xl border border-[#e8dac5] dark:border-white/10 overflow-hidden shadow-sm">
          <div className="bg-[#8a3a2b] dark:bg-[#4a2511] px-5 py-3">
            <h3 className="text-white font-medium">Pendapatan Bulan Ini</h3>
          </div>
          <div className="p-5">
            <p className="text-3xl font-serif font-bold text-[#1a1a1a]">Rp 35.500.000</p>
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
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f2b96f" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f2b96f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', color: '#1a1a1a' }}
                />
                <Area type="monotone" dataKey="value" stroke="#d97736" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
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
                    <img src={book.cover} alt={book.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                    <div>
                      <h4 className="font-semibold text-[#1a1a1a] dark:text-white line-clamp-1">{book.title}</h4>
                      <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">Status: {book.status}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    book.status === 'Tersedia' 
                      ? 'bg-[#fcf9f2] text-[#8a3a2b] border-[#8a3a2b]' 
                      : 'bg-[#9a503e] text-white border-[#9a503e]'
                  }`}>
                    {book.status}
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
