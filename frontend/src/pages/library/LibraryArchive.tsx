import { Download, Filter } from 'lucide-react';

const archivedBooks = [
  { id: 1, title: 'Filosofi Teras', author: 'Henry Manampiring', year: '2023', cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=300&h=400', tags: ['Filsafat', 'Self-Help'] },
  { id: 2, title: 'Atomic Habits', author: 'James Clear', year: '2023', cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300&h=400', tags: ['Psikologi'] },
  { id: 3, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', year: '2022', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=400', tags: ['Sastra', 'Sejarah'] },
  { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', year: '2022', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300&h=400', tags: ['Sejarah'] },
];

export default function LibraryArchive() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 border-b border-black/10 dark:border-white/10 pb-6">
        <h1 className="text-2xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f]">Arsip Perpustakaan</h1>
      </div>

      <div className="bg-[#fbf6ef] dark:bg-[#f2b96f] rounded-3xl p-8 md:p-10 shadow-sm border border-[#e8dac5] dark:border-white/10 mb-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="max-w-xl">
          <h2 className="text-3xl font-serif font-bold text-[#8a3a2b] dark:text-[#1a1a1a] mb-4 italic">Menelusuri Jejak Literasi</h2>
          <p className="text-muted-foreground text-sm leading-relaxed dark:text-[#333333]">
            Halaman arsip ini menyimpan memori setiap halaman yang telah dibalik. Refleksi dari perjalanan intelektual Anda yang terkurasi sepanjang waktu.
          </p>
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <button className="flex items-center gap-2 bg-[#8a3a2b] dark:bg-transparent dark:border dark:border-[#1a1a1a] text-white dark:text-[#1a1a1a] px-5 py-2.5 rounded-lg text-sm font-bold shadow-md dark:shadow-none hover:bg-[#722f23] dark:hover:bg-[#1a1a1a]/5 transition-colors">
            <Download className="w-4 h-4" />
            Export Koleksi
          </button>
          <button className="flex items-center gap-2 bg-white dark:bg-white/20 text-foreground dark:text-[#1a1a1a] border border-[#e8dac5] dark:border-[#1a1a1a]/20 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-black/5 dark:hover:bg-white/30 transition-colors">
            <Filter className="w-4 h-4" />
            Filter Tahun
          </button>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        {archivedBooks.map(book => (
          <div key={book.id} className="bg-white dark:bg-[#f2b96f] p-4 rounded-2xl shadow-sm dark:shadow-md border border-black/5 dark:border-white/10 hover:shadow-lg transition-all duration-300 group">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-6 shadow-inner">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-3 right-3 bg-[#b46b5a]/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                Selesai: {book.year}
              </div>
            </div>
            
            <h3 className="font-serif font-bold text-xl mb-1 dark:text-[#1a1a1a]">{book.title}</h3>
            <p className="text-xs font-bold text-muted-foreground dark:text-[#333333] tracking-wider uppercase mb-4">{book.author}</p>
            
            <div className="flex flex-wrap gap-2">
              {book.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-[#f5ebd8] dark:bg-[#1a1a1a]/10 text-[#b49a66] dark:text-[#1a1a1a] px-2 py-1 rounded-md font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Wawasan Arsip */}
      <div className="bg-[#f9f3e9] dark:bg-[#f2b96f] rounded-3xl p-10 border border-[#e8dac5] dark:border-white/10 shadow-sm dark:shadow-md relative overflow-hidden">
        <div className="flex justify-between items-start mb-16 relative z-10">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#8a3a2b] dark:text-[#1a1a1a] mb-2 flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8a3a2b] dark:text-[#1a1a1a]"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              Wawasan Arsip
            </h3>
            <p className="text-sm text-muted-foreground dark:text-[#333333]">Statistik pertumbuhan koleksi Anda per tahun.</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-serif font-bold text-[#8a3a2b] dark:text-[#1a1a1a] mb-1">124</div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground dark:text-[#333333]">Total Buku Diarsipkan</p>
          </div>
        </div>

        {/* Fake chart placeholder */}
        <div className="h-40 flex items-end justify-between gap-2 md:gap-8 px-4 relative z-10">
          {[2019, 2020, 2021, 2022, 2023].map((year, i) => {
            const heights = ['20%', '35%', '50%', '85%', '100%'];
            return (
              <div key={year} className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full bg-[#e8dac5] dark:bg-white/10 rounded-t-lg relative group transition-all duration-300 hover:bg-[#b46b5a]" style={{ height: heights[i] }}>
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#8a3a2b] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {Math.floor(Math.random() * 20 + 10)} Buku
                  </div>
                </div>
                <span className={`text-sm font-bold ${year === 2022 || year === 2023 ? 'text-[#8a3a2b]' : 'text-muted-foreground'}`}>{year}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
