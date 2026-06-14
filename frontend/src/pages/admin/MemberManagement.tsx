import { Search, UserPlus } from 'lucide-react';

const members = [
  { id: 'LIB-001234', name: 'Siti Aminah', email: 'siti.aminah@email.com', status: 'Aktif', joinDate: '12 Jan 2023', avatar: 'https://i.pravatar.cc/150?u=siti' },
  { id: 'LIB-001235', name: 'Budi Santoso', email: 'budi.santoso@email.com', status: 'Tidak Aktif', joinDate: '15 Feb 2023', avatar: 'https://i.pravatar.cc/150?u=budi' },
  { id: 'LIB-001236', name: 'Rina Kartika', email: 'rina.kartika@email.com', status: 'Aktif', joinDate: '20 Mar 2023', avatar: 'https://i.pravatar.cc/150?u=rina' },
  { id: 'LIB-001237', name: 'Andi Wijaya', email: 'andi.wijaya@email.com', status: 'Aktif', joinDate: '05 Apr 2023', avatar: 'https://i.pravatar.cc/150?u=andi' },
  { id: 'LIB-001238', name: 'Lestari Dewi', email: 'lestari.dewi@email.com', status: 'Tidak Aktif', joinDate: '18 May 2023', avatar: 'https://i.pravatar.cc/150?u=lestari' },
];

export default function MemberManagement() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f]">Pengelolaan Anggota</h2>
          <p className="text-muted-foreground dark:text-gray-400 mt-1">Panel Admin Perpustakaan Digital</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-9 pr-4 py-2 rounded-full border border-[#e8dac5] dark:border-white/10 bg-white dark:bg-[#1e1e1e] focus:outline-none focus:ring-1 focus:ring-[#9a503e] text-sm"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#9a503e] hover:bg-[#8a3a2b] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap shadow-md">
            <UserPlus className="w-4 h-4" />
            Tambah Anggota
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] rounded-2xl border border-[#e8dac5] dark:border-white/10 p-6 flex-1 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#8a3a2b] dark:bg-[#4a2511]"></div>
          <h3 className="text-sm font-semibold text-muted-foreground dark:text-[#4a2511]">Total Anggota</h3>
          <p className="text-4xl font-serif font-bold text-[#1a1a1a] mt-2">2,543</p>
          <p className="text-xs text-muted-foreground dark:text-[#4a2511]/80 mt-1">Perpustakaan Digital</p>
        </div>
        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] rounded-2xl border border-[#e8dac5] dark:border-white/10 p-6 flex-1 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#8a3a2b] dark:bg-[#4a2511]"></div>
          <h3 className="text-sm font-semibold text-muted-foreground dark:text-[#4a2511]">Anggota Baru Bulan Ini</h3>
          <p className="text-4xl font-serif font-bold text-[#1a1a1a] mt-2">127</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-800 font-medium mt-1">+12% dari bulan lalu</p>
        </div>
        <div className="flex-1"></div>
      </div>

      {/* Table */}
      <div className="bg-[#fcf7ef] dark:bg-[#1e1e1e] rounded-3xl border border-[#e8dac5] dark:border-white/10 p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[#e8dac5] dark:border-white/10 text-[#8a3a2b] dark:text-[#f2b96f]">
                <th className="py-4 px-4 font-semibold">Profil</th>
                <th className="py-4 px-4 font-semibold">ID Anggota</th>
                <th className="py-4 px-4 font-semibold">Email</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-4 font-semibold">Tanggal Bergabung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8dac5] dark:divide-white/10">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-[#e8dac5] dark:border-white/10 shadow-sm" />
                      <span className="font-semibold text-[#1a1a1a] dark:text-white">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-muted-foreground dark:text-gray-400">{member.id}</td>
                  <td className="py-4 px-4 text-muted-foreground dark:text-gray-400">{member.email}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      member.status === 'Aktif' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' 
                        : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground dark:text-gray-400 font-medium">{member.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground border-t border-[#e8dac5] dark:border-white/10 pt-4">
          <span>Menampilkan 1-5 dari 2543 data</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 rounded-md hover:bg-white/50 dark:hover:bg-white/5 text-[#8a3a2b] dark:text-[#f2b96f]">Sebelumnya</button>
            <button className="px-3 py-1.5 rounded-md bg-[#8a3a2b] text-white">1</button>
            <button className="px-3 py-1.5 rounded-md hover:bg-white/50 dark:hover:bg-white/5">2</button>
            <button className="px-3 py-1.5 rounded-md hover:bg-white/50 dark:hover:bg-white/5">3</button>
            <span className="px-2 py-1.5">...</span>
            <button className="px-3 py-1.5 rounded-md hover:bg-white/50 dark:hover:bg-white/5">50</button>
            <button className="px-3 py-1.5 rounded-md bg-[#f2e6db] dark:bg-[#2a2a2a] text-[#8a3a2b] dark:text-[#f2b96f] shadow-sm">Berikutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
}
