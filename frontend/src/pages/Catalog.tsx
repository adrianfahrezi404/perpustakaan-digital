import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Book, Loader2 } from 'lucide-react';
import api from '../lib/api';
import type { Book as BookType, Category } from '../lib/types';

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [books, setBooks] = useState<BookType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories on mount
  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data.data)).catch(console.error);
  }, []);

  // Fetch books when search or category changes
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const params: Record<string, string | number> = {};
        if (searchTerm) params.search = searchTerm;
        if (selectedCategoryId) params.category_id = selectedCategoryId;
        
        const res = await api.get('/books', { params });
        setBooks(res.data.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [searchTerm, selectedCategoryId]);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setSearchTerm(searchInput);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif hidden md:block">Katalog Buku</h1>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Ketik lalu Enter..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchSubmit}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:bg-muted transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
        <button
          onClick={() => setSelectedCategoryId(null)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategoryId === null 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-card border border-border text-foreground hover:bg-muted'
          }`}
        >
          Semua
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategoryId === category.id 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map(book => (
            <Link key={book.id} to={`/book/${book.id}`} className="group">
              <div className="glass-card rounded-2xl p-4 transition-transform duration-300 group-hover:-translate-y-2 h-full flex flex-col">
                <div className="aspect-[2/3] rounded-xl overflow-hidden mb-4 relative">
                  <img src={book.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600'} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-primary/80 px-3 py-1.5 rounded-full backdrop-blur-sm">Lihat Detail</span>
                </div>
              </div>
              <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors flex-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{book.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-foreground">{book.rating}</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">{book.category?.name || 'Umum'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!isLoading && books.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Book className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>Tidak ada buku yang sesuai dengan pencarian Anda.</p>
        </div>
      )}
    </div>
  );
}
