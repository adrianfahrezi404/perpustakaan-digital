import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Search, LayoutDashboard, Book, Users, Calendar, BarChart, Settings, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminLayout() {
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Manajemen Buku', path: '/admin/books', icon: Book },
    { name: 'Data Anggota', path: '/admin/members', icon: Users },
    { name: 'Peminjaman', path: '/admin/loans', icon: Calendar },
    { name: 'Laporan Keuangan', path: '/admin/reports', icon: BarChart },
    { name: 'Pengaturan', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#fcf9f2] dark:bg-[#121212] text-[#111827] dark:text-[#f8fafc] font-sans selection:bg-[#9a503e] selection:text-white">
      {/* Texture overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      {/* Sidebar */}
      <aside className="w-[260px] flex-shrink-0 bg-[#b46b5a] dark:bg-[#1a1a1a] text-white flex flex-col relative z-10 shadow-xl border-r border-[#9a503e] dark:border-[#333333]">
        <div className="p-8 pb-10 flex items-center gap-3">
          <Book className="w-8 h-8 text-[#f2b96f]" />
          <h1 className="text-2xl font-serif font-bold leading-tight text-white">
            Digital Library
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                isActive 
                  ? "bg-[#4a2511] text-white shadow-inner" 
                  : "text-[#f5ebd8] hover:bg-[#9a503e] dark:hover:bg-[#333333] hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 max-h-screen overflow-y-auto">
        {/* Topbar */}
        <header className="sticky top-0 z-20 w-full bg-[#fcf9f2] dark:bg-[#121212] pt-8 px-10 pb-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Cari buku, anggota, atau transaksi..." 
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#e8dac5] dark:border-white/10 bg-white dark:bg-white/5 focus:border-[#9a503e] focus:ring-1 focus:ring-[#9a503e] text-sm outline-none transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-semibold text-foreground">Administrator</span>
                <div className="w-10 h-10 rounded-full bg-[#f2e6db] border border-[#e8dac5] flex items-center justify-center overflow-hidden">
                  <User className="w-6 h-6 text-[#9a503e]" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-10 pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
