import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';

export default function LibraryReading() {
  const [activeSort, setActiveSort] = useState('Terbaru');
  const [libraryBooks, setLibraryBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/library/reading')
      .then(res => setLibraryBooks(res.data.data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-black/10 dark:border-white/10 pb-6">
        <div className="max-w-lg">
          <h1 className="text-4xl font-serif font-bold text-[#8a3a2b] dark:text-[#f2b96f] mb-3">Sedang Dibaca</h1>
          <p className="text-muted-foreground text-sm leading-relaxed dark:text-gray-400">
            Lanjutkan perjalanan Anda. Jangan biarkan cerita ini menggantung terlalu lama.
          </p>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold mr-2 dark:text-gray-400">Urutkan:</span>
          {['Terbaru', 'Progress'].map(sort => (
            <button
              key={sort}
              onClick={() => setActiveSort(sort)}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeSort === sort 
                  ? 'bg-[#9a503e] text-white border-[#9a503e]' 
                  : 'border-black/20 dark:border-white/20 hover:border-[#9a503e] text-foreground dark:text-gray-200'
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
        <div className="text-center py-20 text-muted-foreground">Tidak ada buku yang sedang dibaca.</div>
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
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#fcf9f2] text-[#9a503e] shadow-sm backdrop-blur-sm">
                  Reading
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg mb-1 group-hover:text-[#9a503e] dark:text-white transition-colors">{book.title}</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">{book.author}</p>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground dark:text-gray-400">Progress</span>
                    <span className="font-bold text-[#9a503e] dark:text-[#f2b96f]">{item.progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#9a503e] transition-all duration-1000" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      )}
    </div>
  );
}
