import { useState } from 'react';
import { Search } from 'lucide-react';

const loans = [
  { id: 1, borrower: 'Budi Santoso', title: 'The Great Gatsby', loanDate: '10 Mei 2024', dueDate: '24 Mei 2024', status: 'Terlambat' },
  { id: 2, borrower: 'Siti Aminah', title: 'Pride and Prejudice', loanDate: '12 Mei 2024', dueDate: '26 Mei 2024', status: 'Kembali' },
  { id: 3, borrower: 'Ahmad Fauzi', title: '1984', loanDate: '15 Mei 2024', dueDate: '29 Mei 2024', status: 'Dipinjam' },
  { id: 4, borrower: 'Dewi Lestari', title: 'To Kill a Mockingbird', loanDate: '08 Mei 2024', dueDate: '22 Mei 2024', status: 'Terlambat' },
  { id: 5, borrower: 'Rina Wijaya', title: 'Moby Dick', loanDate: '14 Mei 2024', dueDate: '28 Mei 2024', status: 'Dipinjam' },
];

export default function LoanManagement() {
  const [activeTab, setActiveTab] = useState('Semua');

  return (
    <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-4xl font-serif font-bold text-[#1a1a1a] dark:text-white">Peminjaman</h2>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e8dac5] dark:border-white/10 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#9a503e] text-sm"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#4a2511] hover:bg-[#3d1e0d] dark:bg-[#f2b96f] dark:hover:bg-[#e0a85d] dark:text-[#1a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap shadow-md">
            Tambah Peminjaman
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {['Semua', 'Sedang Dipinjam', 'Terlambat'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ${
              activeTab === tab 
                ? (tab === 'Terlambat' ? 'bg-[#9a503e] text-white' : 'bg-[#f2b96f] text-[#4a2511]') 
                : 'bg-white dark:bg-white/5 text-muted-foreground hover:bg-gray-50 border border-[#e8dac5] dark:border-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-[#e8dac5] dark:border-white/10 text-muted-foreground dark:text-gray-400">
              <th className="py-4 px-4 font-semibold">Peminjam</th>
              <th className="py-4 px-4 font-semibold">Judul Buku</th>
              <th className="py-4 px-4 font-semibold">Tanggal Pinjam</th>
              <th className="py-4 px-4 font-semibold">Tenggat Waktu</th>
              <th className="py-4 px-4 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8dac5] dark:divide-white/10">
            {loans.filter(l => activeTab === 'Semua' || (activeTab === 'Sedang Dipinjam' && l.status === 'Dipinjam') || (activeTab === 'Terlambat' && l.status === 'Terlambat')).map((loan) => (
              <tr key={loan.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-4 px-4 font-semibold text-[#1a1a1a] dark:text-white">{loan.borrower}</td>
                <td className="py-4 px-4 font-medium text-[#1a1a1a] dark:text-white">{loan.title}</td>
                <td className="py-4 px-4 text-muted-foreground dark:text-gray-400">{loan.loanDate}</td>
                <td className="py-4 px-4 text-muted-foreground dark:text-gray-400">{loan.dueDate}</td>
                <td className="py-4 px-4 flex justify-center">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm w-24 text-center ${
                    loan.status === 'Terlambat' ? 'bg-[#9a503e] text-white' :
                    loan.status === 'Kembali' ? 'bg-[#f2b96f] text-[#4a2511]' :
                    'bg-[#e8dac5] text-[#4a2511] dark:bg-white/10 dark:text-white'
                  }`}>
                    {loan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded border border-[#e8dac5] dark:border-white/10 flex items-center justify-center bg-white dark:bg-white/5 text-muted-foreground hover:bg-gray-50">&lt;</button>
          <button className="w-8 h-8 rounded bg-[#4a2511] dark:bg-[#f2b96f] dark:text-[#4a2511] text-white font-medium flex items-center justify-center shadow-md">1</button>
          <button className="w-8 h-8 rounded border border-[#e8dac5] dark:border-white/10 flex items-center justify-center bg-white dark:bg-white/5 hover:bg-gray-50 text-muted-foreground">&gt;</button>
        </div>
      </div>
    </div>
  );
}
