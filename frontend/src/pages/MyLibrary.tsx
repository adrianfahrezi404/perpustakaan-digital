import { BookOpen, CheckCircle, Heart, Bookmark, Archive, Clock, MoreVertical, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const navItems = [
  { icon: BookOpen, label: 'Semua Buku', id: 'all' },
  { icon: Clock, label: 'Sedang Dibaca', id: 'reading', active: true },
  { icon: CheckCircle, label: 'Selesai', id: 'finished' },
  { icon: Heart, label: 'Keinginan', id: 'wishlist' },
  { icon: Bookmark, label: 'Favorit', id: 'favorites' },
  { icon: Archive, label: 'Arsip', id: 'archived' },
];

const readingNow = [
  { id: 4, title: 'The Midnight Library', author: 'Matt Haig', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200&h=300', progress: 65, totalPages: 288 },
  { id: 3, title: 'Dune', author: 'Frank Herbert', cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=200&h=300', progress: 30, totalPages: 800 },
];

const myCollection = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200&h=300', status: 'Selesai' },
  { id: 2, title: 'Laskar Pelangi', author: 'Andrea Hirata', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200&h=300', status: 'Belum Dibaca' },
];

export default function MyLibrary() {
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar specific to My Library */}
      <aside className="w-64 border-r border-border hidden md:flex flex-col bg-card/50">
        <div className="p-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari di Library..." 
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button 
              key={item.id}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                item.active 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <h1 className="text-2xl font-bold font-serif mb-6">Sedang Dibaca</h1>
        
        {/* Reading Now Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {readingNow.map(book => (
            <div key={book.id} className="glass-card rounded-2xl p-4 flex gap-4 hover:shadow-lg transition-shadow">
              <img src={book.cover} alt={book.title} className="w-20 h-28 object-cover rounded-lg shadow-md" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>{book.progress}% Selesai</span>
                    <span>{Math.round((book.progress / 100) * book.totalPages)} / {book.totalPages} hal</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-serif">Koleksi Saya</h2>
          <select className="bg-background border border-border text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option>Terbaru</option>
            <option>Judul A-Z</option>
            <option>Progress</option>
          </select>
        </div>

        {/* My Collection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {myCollection.map(book => (
             <div key={book.id} className="glass-card rounded-xl p-3 group">
               <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
                 <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                 <div className="absolute top-2 right-2 p-1.5 rounded-md bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80">
                    <MoreVertical className="w-4 h-4" />
                 </div>
               </div>
               <h3 className="font-semibold text-sm line-clamp-1 mb-1">{book.title}</h3>
               <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                 {book.status}
               </span>
             </div>
          ))}
        </div>

      </div>
    </div>
  );
}
