import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Bell, Search, LayoutGrid, BookOpen, CheckCircle, Heart, Bookmark, Archive, Settings, HelpCircle, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LibraryLayout() {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { name: 'Semua Buku', path: '/library', icon: LayoutGrid, end: true },
    { name: 'Sedang Dibaca', path: '/library/reading', icon: BookOpen },
    { name: 'Selesai', path: '/library/completed', icon: CheckCircle },
    { name: 'Keinginan', path: '/library/wishlist', icon: Bookmark },
    { name: 'Favorit', path: '/library/favorites', icon: Heart },
    { name: 'Arsip', path: '/library/archive', icon: Archive },
  ];

  return (
    <div className="flex min-h-screen bg-[#f7eedc] dark:bg-[#121212] text-[#111827] dark:text-[#f8fafc] font-sans selection:bg-[#9a503e] selection:text-white">
      {/* Texture overlay for the noise/paper effect */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      {/* Sidebar */}
      <aside className="w-[280px] flex-shrink-0 bg-[#9a503e] text-white flex flex-col relative z-10 shadow-xl">
        <div className="p-8 pb-12">
          <h1 className="text-3xl font-serif font-bold leading-tight tracking-tight text-[#fdfbf7]">
            Boutique<br/>Archive
          </h1>
          <p className="text-[10px] uppercase tracking-widest mt-2 text-[#e8cbb5] font-semibold">Personal Collection</p>
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
                  ? "bg-[#f2b96f] text-[#5c3022] shadow-md" 
                  : "text-[#e8cbb5] hover:bg-[#864433] hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f2b96f] text-[#5c3022] font-bold text-sm shadow-md hover:bg-[#e0a85e] transition-colors mb-6">
            <Plus className="w-4 h-4" />
            Add New Book
          </button>
          
          <div className="space-y-4 px-2">
            <button className="flex items-center gap-4 text-sm font-medium text-[#e8cbb5] hover:text-white transition-colors w-full">
              <Settings className="w-5 h-5" />
              Settings
            </button>
            <button className="flex items-center gap-4 text-sm font-medium text-[#e8cbb5] hover:text-white transition-colors w-full">
              <HelpCircle className="w-5 h-5" />
              Help
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 max-h-screen overflow-y-auto">
        {/* Topbar */}
        <header className="sticky top-0 z-20 w-full bg-[#fcf9f2]/80 dark:bg-[#121212]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
          <div className="flex h-20 items-center justify-between px-10">
            {/* Title injected by subpages via Context or we just use Breadcrumbs/Page title in Outlet, actually the design has the page title inside the Outlet content. Wait, in the image the topbar has the Search in the middle or right. The page title is below it! Oh wait, in "Daftar Keinginan" image, the title is on the left, search on the right. In "Koleksi Buku", the title is below the topbar? No, the title "Koleksi Buku" is below the topbar. Let's look closely. */}
            <div className="flex-1"></div>
            
            <div className="flex items-center gap-6">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-[#9a503e] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Cari di koleksi..." 
                  className="w-64 pl-10 pr-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border-transparent focus:border-[#9a503e] focus:bg-transparent focus:ring-1 focus:ring-[#9a503e] text-sm transition-all outline-none text-foreground"
                />
              </div>
              <button onClick={toggleTheme} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#fcf9f2] dark:border-[#121212]"></span>
              </button>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150" alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-transparent hover:border-[#9a503e] transition-colors cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-10">
          <Outlet />
        </div>
        
        {/* Simple Footer */}
        <footer className="mt-auto py-8 text-center text-xs text-muted-foreground">
          © 2024 Boutique Archive. Dikurasi dengan cinta untuk setiap jilid cerita.
        </footer>
      </main>
    </div>
  );
}
