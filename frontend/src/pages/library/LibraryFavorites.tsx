import { Heart, Star, LayoutGrid, List, Plus } from 'lucide-react';

const favoriteBooks = [
  { id: 1, title: 'The Philosophy of Art', author: 'Julian Young', rating: 4.8, cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=300&h=450' },
  { id: 2, title: 'Design as Art', author: 'Bruno Munari', rating: 4.9, cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=450' },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', rating: 5.0, cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300&h=450' },
  { id: 4, title: 'Silent Spring', author: 'Rachel Carson', rating: 4.7, cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=450' },
  { id: 5, title: 'Meditations', author: 'Marcus Aurelius', rating: 4.9, cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=300&h=450' },
];

export default function LibraryFavorites() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-black/10 dark:border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f] mb-1">Favorit</h1>
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#b49a66] bg-[#f5ebd8] dark:bg-white/10 dark:text-[#f2b96f] px-3 py-1.5 rounded-full">Curated List</span>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f] mb-4">Favorit Saya</h2>
            <p className="text-muted-foreground text-sm leading-relaxed dark:text-gray-400">
              Sebuah antologi dari karya-karya yang membentuk pemikiran, menginspirasi jiwa, dan mendefinisikan estetika perpustakaan pribadi Anda.
            </p>
          </div>
          <button className="px-6 py-3 bg-[#8a3a2b] dark:bg-[#1a1a1a] text-white rounded-xl text-sm font-bold shadow-md dark:shadow-none dark:border dark:border-[#333333] hover:bg-[#722f23] dark:hover:bg-[#333333] transition-colors flex-shrink-0">
            Lihat Analitik Koleksi
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#f2b96f] p-6 rounded-2xl shadow-sm dark:shadow-md border border-black/5 dark:border-white/10 flex flex-col justify-center relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <Heart className="w-6 h-6 text-[#8a3a2b] dark:text-[#1a1a1a]" />
              <span className="text-[10px] bg-[#f5ebd8] dark:bg-[#1a1a1a]/10 text-[#8a3a2b] dark:text-[#1a1a1a] font-bold px-2 py-1 rounded">+12% Bulan Ini</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground dark:text-[#333333] mb-1">Total Favorit</span>
            <div className="text-3xl font-serif font-bold text-foreground dark:text-[#1a1a1a]">42 Buku</div>
          </div>
          
          <div className="bg-white dark:bg-[#f2b96f] p-6 rounded-2xl shadow-sm dark:shadow-md border border-black/5 dark:border-white/10 flex flex-col justify-center">
            <div className="flex mb-4">
               <Star className="w-6 h-6 text-[#f2b96f] dark:text-[#1a1a1a]" />
               {/* Decorative circles */}
               <div className="flex -ml-2">
                 <div className="w-6 h-6 rounded-full bg-[#e8dac5] dark:bg-[#1a1a1a]/20 border-2 border-white dark:border-[#f2b96f]"></div>
                 <div className="w-6 h-6 rounded-full bg-[#f2b96f] dark:bg-[#1a1a1a]/50 border-2 border-white dark:border-[#f2b96f] -ml-2"></div>
                 <div className="w-6 h-6 rounded-full bg-[#b46b5a] dark:bg-[#1a1a1a] border-2 border-white dark:border-[#f2b96f] -ml-2"></div>
               </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground dark:text-[#333333] mb-1">Penulis Teratas</span>
            <div className="text-2xl font-serif font-bold text-foreground dark:text-[#1a1a1a]">Haruki Murakami</div>
          </div>

          <div className="bg-[#9a503e] p-6 rounded-2xl shadow-md text-white flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1 block">Target Membaca</span>
              <p className="text-sm font-medium leading-relaxed mb-4">Anda telah menyelesaikan 85% dari target bacaan favorit tahun ini.</p>
              <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#f2b96f]" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 border-4 border-white/10 rounded-xl rotate-12"></div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-2xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f]">Koleksi Terpilih</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
            <button className="hover:text-[#8a3a2b] transition-colors"><LayoutGrid className="w-5 h-5" /></button>
            <button className="hover:text-[#8a3a2b] transition-colors"><List className="w-5 h-5" /></button>
            <span className="text-black/20 dark:text-white/20">|</span>
            <span className="font-bold cursor-pointer">Urutkan: Terbaru Ditambah ▾</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {favoriteBooks.map(book => (
            <div key={book.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(154,80,62,0.2)]">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#8a3a2b] hover:bg-[#8a3a2b] hover:text-white transition-colors shadow-sm">
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
              <h4 className="font-bold text-sm leading-tight mb-1 group-hover:text-[#8a3a2b] dark:group-hover:text-[#f2b96f] transition-colors line-clamp-1 dark:text-white">{book.title}</h4>
              <p className="text-xs text-muted-foreground dark:text-gray-400 mb-2 line-clamp-1">{book.author}</p>
              <div className="flex items-center gap-1 text-[#f2b96f]">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-bold text-foreground dark:text-[#f8fafc]">{book.rating}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-2 border-dashed border-[#e8dac5] dark:border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
          <button className="w-12 h-12 bg-[#f5ebd8] text-[#9a503e] rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform shadow-sm">
            <Plus className="w-6 h-6" />
          </button>
          <h3 className="font-serif font-bold text-lg mb-2 dark:text-white">Tambahkan Favorit Baru</h3>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Temukan buku yang berkesan bagi Anda dan simpan di koleksi terpilih ini.</p>
        </div>
      </div>
    </div>
  );
}
