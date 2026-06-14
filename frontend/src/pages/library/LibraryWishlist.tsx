import { Heart, Trash2, ShoppingBag, Plus } from 'lucide-react';

const wishlistBooks = [
  { id: 1, title: 'The Art of Stillness', author: 'Pico Iyer', price: '245.000', category: 'FILSAFAT', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=400' },
  { id: 2, title: 'Curating Life', author: 'Alain de Botton', price: '189.000', category: 'LIFESTYLE', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300&h=400' },
  { id: 3, title: 'Bentuk & Ruang', author: 'Francis D.K. Ching', price: '520.000', category: 'ARSITEKTUR', cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=300&h=400' },
  { id: 4, title: 'Manual Tipografi', author: 'Jan Tschichold', price: '312.000', category: 'DESAIN', cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=400' },
];

export default function LibraryWishlist() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-black/10 dark:border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f] mb-1">Daftar Keinginan</h1>
          <p className="text-muted-foreground text-sm dark:text-gray-400">Buku-buku yang menunggu gilirannya untuk dibaca.</p>
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-transparent dark:border dark:border-[#f2b96f] text-foreground dark:text-[#f2b96f] border border-[#e8dac5] px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm dark:shadow-none hover:bg-black/5 dark:hover:bg-[#f2b96f]/10 transition-colors">
          Beli Semua (Rp 295.000)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {wishlistBooks.map(book => (
          <div key={book.id} className="bg-[#fdf9f4] dark:bg-[#f2b96f] rounded-2xl p-4 shadow-sm dark:shadow-md border border-[#e8dac5] dark:border-white/10 transition-transform hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_10px_30px_rgba(242,185,111,0.2)]">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 shadow-sm">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-[#9a503e] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                Rp {book.price}
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#b49a66] dark:text-[#5c3022] bg-[#f5ebd8] dark:bg-[#1a1a1a]/10 px-2 py-1 rounded-md">{book.category}</span>
              <button className="text-muted-foreground dark:text-[#8a3a2b] hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-serif font-bold text-lg leading-tight mb-1 dark:text-[#1a1a1a]">{book.title}</h3>
            <p className="text-sm text-muted-foreground dark:text-[#333333] italic mb-6">{book.author}</p>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#b46b5a] dark:bg-[#1a1a1a] text-white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#9a503e] dark:hover:bg-[#333333] transition-colors">
                Tambah ke Tas
              </button>
              <button className="p-2.5 border border-[#e8dac5] dark:border-[#1a1a1a]/20 dark:text-[#1a1a1a] rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-[#1a1a1a]/10 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {/* Add more placeholder */}
        <div className="border-2 border-dashed border-[#e8dac5] dark:border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="w-12 h-12 bg-[#f5ebd8] text-[#9a503e] rounded-full flex items-center justify-center mb-4">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg mb-2 dark:text-white">Cari Buku Lain</h3>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">Belum menemukan yang dicari? Jelajahi katalog lengkap kami.</p>
          <button className="text-[#9a503e] text-sm font-bold hover:underline flex items-center gap-1">
            Mulai Eksplorasi &rarr;
          </button>
        </div>
      </div>

      {/* Checkout Footer Card */}
      <div className="sticky bottom-8 bg-[#fdfbf7]/90 dark:bg-[#121212]/90 backdrop-blur-md rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#e8dac5] dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
        <div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1 block">Total Est. Harga</span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-serif font-bold text-[#8a3a2b]">Rp 1.266.000</h3>
            <span className="text-sm text-muted-foreground font-medium">(4 Buku)</span>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-3 text-[#8a3a2b] font-bold text-sm hover:bg-[#8a3a2b]/5 rounded-xl transition-colors">
            Bagikan Daftar
          </button>
          <button className="flex-1 md:flex-none flex justify-center items-center gap-2 px-8 py-3 bg-[#9a503e] text-white rounded-xl text-sm font-bold shadow-[0_5px_15px_rgba(154,80,62,0.3)] hover:bg-[#8a3a2b] hover:-translate-y-0.5 transition-all">
            <ShoppingBag className="w-4 h-4" />
            Beli Semua Keinginan
          </button>
        </div>
      </div>
    </div>
  );
}
