import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, CreditCard, Receipt, CheckCircle } from 'lucide-react';

const revenueData = [
  { name: 'Jan', value: 75000000 },
  { name: 'Feb', value: 120000000 },
  { name: 'Mar', value: 95000000 },
  { name: 'Apr', value: 140000000 },
  { name: 'May', value: 110000000 },
  { name: 'Jun', value: 165000000 },
];

const transactions = [
  { id: 1, date: '15 Juni 2024', desc: 'Denda Keterlambatan', category: 'Denda', amount: 'Rp 50.000', status: 'Lunas' },
  { id: 2, date: '14 Juni 2024', desc: 'Biaya Keanggotaan Baru', category: 'Pendapatan', amount: 'Rp 150.000', status: 'Lunas' },
  { id: 3, date: '12 Juni 2024', desc: 'Pengadaan Buku', category: 'Operasional', amount: 'Rp 2.500.000', status: 'Pending' },
  { id: 4, date: '10 Juni 2024', desc: 'Sumbangan Donatur', category: 'Pendapatan Lain', amount: 'Rp 5.000.000', status: 'Lunas' },
];

export default function Reports() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f]">Laporan Keuangan</h2>
      
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-2xl border border-[#e8dac5] dark:border-white/10 p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-[#f2e6db] dark:bg-[#2a2a2a] rounded-xl border border-[#e8dac5] dark:border-white/10 text-[#8a3a2b] dark:text-[#f2b96f]">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground dark:text-gray-400">Total Pendapatan</p>
            <p className="text-2xl font-serif font-bold text-[#1a1a1a] dark:text-white mt-1">Rp 125.500.000</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">↗ Bulan Ini</p>
          </div>
        </div>
        <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-2xl border border-[#e8dac5] dark:border-white/10 p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-[#f2e6db] dark:bg-[#2a2a2a] rounded-xl border border-[#e8dac5] dark:border-white/10 text-[#8a3a2b] dark:text-[#f2b96f]">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground dark:text-gray-400">Denda Terkumpul</p>
            <p className="text-2xl font-serif font-bold text-[#1a1a1a] dark:text-white mt-1">Rp 3.200.000</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">↗ Bulan Ini</p>
          </div>
        </div>
        <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-2xl border border-[#e8dac5] dark:border-white/10 p-6 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-[#f2e6db] dark:bg-[#2a2a2a] rounded-xl border border-[#e8dac5] dark:border-white/10 text-[#8a3a2b] dark:text-[#f2b96f]">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground dark:text-gray-400">Biaya Operasional</p>
            <p className="text-2xl font-serif font-bold text-[#1a1a1a] dark:text-white mt-1">Rp 45.750.000</p>
            <p className="text-xs text-red-500 font-medium mt-1">↘ Bulan Ini</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm">
        <h3 className="text-xl font-serif font-bold text-[#1a1a1a] dark:text-white mb-6">Tren Pendapatan Bulanan</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97736" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#d97736" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(val) => `Rp ${val / 1000000}Jt`} width={80} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', color: '#1a1a1a' }}
                formatter={(value: any) => [`Rp ${(value).toLocaleString('id-ID')}`, 'Pendapatan']}
              />
              <Area type="monotone" dataKey="value" stroke="#d97736" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" activeDot={{r: 6, fill: '#8a3a2b', stroke: '#fff', strokeWidth: 2}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-2xl border border-[#e8dac5] dark:border-white/10 overflow-hidden shadow-sm">
        <div className="bg-[#dcae73] dark:bg-[#4a2511] px-6 py-4">
          <div className="grid grid-cols-5 gap-4">
            <span className="font-bold text-[#4a2511] dark:text-[#f2b96f]">Tanggal</span>
            <span className="font-bold text-[#4a2511] dark:text-[#f2b96f]">Deskripsi</span>
            <span className="font-bold text-[#4a2511] dark:text-[#f2b96f]">Kategori</span>
            <span className="font-bold text-[#4a2511] dark:text-[#f2b96f]">Jumlah</span>
            <span className="font-bold text-[#4a2511] dark:text-[#f2b96f]">Status</span>
          </div>
        </div>
        <div className="divide-y divide-[#e8dac5] dark:divide-white/10">
          {transactions.map((t) => (
            <div key={t.id} className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
              <span className="text-[#1a1a1a] dark:text-gray-300 text-sm font-medium">{t.date}</span>
              <span className="text-[#1a1a1a] dark:text-gray-300 text-sm">{t.desc}</span>
              <span className="text-muted-foreground dark:text-gray-400 text-sm">{t.category}</span>
              <span className="text-[#1a1a1a] dark:text-white font-semibold text-sm">{t.amount}</span>
              <div className="flex items-center gap-2">
                {t.status === 'Lunas' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-amber-500 ml-1"></div>
                )}
                <span className="text-sm font-medium text-muted-foreground dark:text-gray-400">{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
