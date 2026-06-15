import { useState, useEffect } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';

export default function LibraryAllBooks() {
  const [activeSort, setActiveSort] = useState('Terbaru');
  const [libraryBooks, setLibraryBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/library/books')
      .then(res => setLibraryBooks(res.data.data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-black/10 dark:border-white/10 pb-6">
        <div className="max-w-lg">
          <h1 className="text-4xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f] mb-3">Koleksi Buku</h1>
          <p className="text-muted-foreground text-sm leading-relaxed dark:text-gray-400">
            Temukan harta karun intelektual Anda dalam satu ruang yang dikurasi dengan penuh perhatian.
          </p>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold mr-2">Urutkan:</span>
          {['Terbaru', 'A-Z', 'Penulis'].map(sort => (
            <button
              key={sort}
              onClick={() => setActiveSort(sort)}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeSort === sort 
                  ? 'bg-[#9a503e] text-white border-[#9a503e]' 
                  : 'border-black/20 dark:border-white/20 hover:border-[#9a503e] text-foreground'
              }`}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Buku */}
      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
      ) : libraryBooks.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">Belum ada buku di perpustakaan Anda.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {libraryBooks.map(item => {
            const book = item.book;
            return (
              <Link key={item.id} to={`/book/${book.id}`} className="group cursor-pointer">
            <div className="relative aspect-[3/4] mb-5 rounded-md overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(154,80,62,0.2)]">
              <img src={book.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=500'} alt={book.title} className="w-full h-full object-cover" />
              
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  item.status === 'reading' ? 'bg-[#fcf9f2] text-[#9a503e]' :
                  item.status === 'completed' ? 'bg-[#f2e6db] text-[#5c3022]' :
                  item.status === 'archive' ? 'bg-[#e5e7eb] text-gray-700' :
                  'bg-white text-black'
                } shadow-sm backdrop-blur-sm`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg mb-1 group-hover:text-[#9a503e] dark:text-white transition-colors">{book.title}</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">{book.author}</p>

              {item.status === 'reading' && (
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground dark:text-gray-400">Progress</span>
                    <span className="font-bold text-[#9a503e] dark:text-[#f2b96f]">{item.progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#9a503e]" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              )}

              {item.status === 'completed' && (
                <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-2">
                  <span className="text-xs text-muted-foreground">Rating</span>
                  <div className="flex text-[#f2b96f]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < (item.rating || 0) ? 'fill-current' : 'text-muted-foreground opacity-30'}`} />
                    ))}
                  </div>
                </div>
              )}

              {item.status === 'wishlist' && (
                <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-2">
                  <span className="text-xs text-muted-foreground">Not started</span>
                  <span className="text-xs text-muted-foreground">0%</span>
                </div>
              )}

              {item.status === 'archive' && (
                <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-2">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <span className="text-xs text-muted-foreground italic">Archived</span>
                </div>
              )}
            </div>
          </Link>
          );
        })}
      </div>
      )}
    </div>
  );
}
