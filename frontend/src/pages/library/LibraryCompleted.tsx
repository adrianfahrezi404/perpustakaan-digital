import { BookOpen, Calendar, Star, Share2, Plus } from 'lucide-react';

const completedBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', rating: 5, date: '12 Jan', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=450', reviewed: false },
  { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', rating: 4, date: '05 Jan', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300&h=450', reviewed: false },
  { id: 3, title: 'Meditations', author: 'Marcus Aurelius', rating: 5, date: '28 Des', cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=300&h=450', reviewed: true },
  { id: 4, title: 'Moby Dick', author: 'Herman Melville', rating: 4, date: '15 Des', cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=450', reviewed: false },
];

export default function LibraryCompleted() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-black/10 dark:border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f] mb-1">Koleksi Selesai</h1>
          <p className="text-muted-foreground text-sm dark:text-gray-400">Merayakan setiap cerita yang telah mencapai halaman akhirnya.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#8a3a2b] dark:bg-transparent dark:border dark:border-[#f2b96f] text-white dark:text-[#f2b96f] px-5 py-2.5 rounded-lg text-sm font-bold shadow-md dark:shadow-none hover:bg-[#722f23] dark:hover:bg-[#f2b96f]/10 transition-colors">
          <Share2 className="w-4 h-4" />
          Bagikan Pencapaian
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] p-6 rounded-2xl border border-[#e8dac5] dark:border-white/10 flex items-center gap-6 shadow-sm dark:shadow-md">
          <div className="w-12 h-12 rounded-full bg-[#f2e6db] dark:bg-[#1a1a1a]/10 flex items-center justify-center text-[#8a3a2b] dark:text-[#1a1a1a] flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground dark:text-[#333333] mb-1 block">Total Diselesaikan</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-[#8a3a2b] dark:text-[#1a1a1a]">124</span>
              <span className="text-sm font-medium text-muted-foreground dark:text-[#1a1a1a]">Buku</span>
            </div>
          </div>
        </div>

        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] p-6 rounded-2xl border border-[#e8dac5] dark:border-white/10 flex items-center gap-6 shadow-sm dark:shadow-md">
          <div className="w-12 h-12 rounded-full bg-[#f2e6db] dark:bg-[#1a1a1a]/10 flex items-center justify-center text-[#8a3a2b] dark:text-[#1a1a1a] flex-shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground dark:text-[#333333] mb-1 block">Tahun Ini</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-[#8a3a2b] dark:text-[#1a1a1a]">18</span>
              <span className="text-sm font-medium text-muted-foreground dark:text-[#1a1a1a]">Buku</span>
            </div>
          </div>
        </div>

        <div className="bg-[#fcf7ef] dark:bg-[#f2b96f] p-6 rounded-2xl border border-[#e8dac5] dark:border-white/10 flex items-center gap-6 shadow-sm dark:shadow-md">
          <div className="w-12 h-12 rounded-full bg-[#f2e6db] dark:bg-[#1a1a1a]/10 flex items-center justify-center text-[#8a3a2b] dark:text-[#1a1a1a] flex-shrink-0">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground dark:text-[#333333] mb-1 block">Rata-rata Rating</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-[#8a3a2b] dark:text-[#1a1a1a]">4.8</span>
              <span className="text-sm font-medium text-muted-foreground dark:text-[#1a1a1a]">Skor</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-black/10 dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold text-[#b49a66] uppercase tracking-wider mb-2 block">Terbaru Diselesaikan</span>
          <h2 className="text-2xl font-serif font-bold text-foreground">Arsip Bacaan</h2>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="px-5 py-2 rounded-full border border-black/20 text-sm font-medium hover:bg-black/5 transition-colors">Semua Genre</button>
          <button className="px-5 py-2 rounded-full border border-black/20 text-sm font-medium hover:bg-black/5 transition-colors">Tahun Baca</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {completedBooks.map(book => (
          <div key={book.id} className="group">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(154,80,62,0.2)] cursor-pointer">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
              
              <div className="absolute top-0 left-0 w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <button className="bg-white/90 text-[#8a3a2b] px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  Lihat Detail
                </button>
              </div>
            </div>
            
            <div className="flex text-[#f2b96f] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < book.rating ? 'fill-current' : 'text-muted-foreground opacity-30'}`} />
              ))}
            </div>

            <h3 className="font-serif font-bold text-lg leading-tight mb-1 dark:text-white">{book.title}</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4 border-b border-black/10 dark:border-white/10 pb-4">{book.author}</p>
            
            <div className="flex items-center justify-between">
              {book.reviewed ? (
                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full flex items-center gap-1">
                  &#10003; Sudah Direview
                </span>
              ) : (
                <button className="text-xs font-bold text-[#8a3a2b] hover:underline flex items-center gap-1">
                  ✎ Tulis Review
                </button>
              )}
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 border-2 border-dashed border-[#e8dac5] dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center relative">
        <div className="absolute -top-6 bg-[#9a503e] text-white p-3 rounded-full shadow-lg">
          <Plus className="w-6 h-6" />
        </div>
        <BookOpen className="w-12 h-12 text-[#e8dac5] mb-4" />
        <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">Teruslah membaca untuk mengisi rak koleksimu.</p>
        <button className="text-[#8a3a2b] font-bold text-sm hover:underline flex items-center gap-1">
          Eksplorasi Katalog Baru &rarr;
        </button>
      </div>
    </div>
  );
}
