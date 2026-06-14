import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Book } from 'lucide-react';

const allBooks = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', rating: 4.8, category: 'Pengembangan Diri', cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 2, title: 'Laskar Pelangi', author: 'Andrea Hirata', rating: 4.9, category: 'Fiksi', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 3, title: 'Dune', author: 'Frank Herbert', rating: 4.7, category: 'Fiksi Ilmiah', cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 4, title: 'The Midnight Library', author: 'Matt Haig', rating: 4.6, category: 'Fiksi', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 5, title: 'Sapiens', author: 'Yuval Noah Harari', rating: 4.8, category: 'Sejarah', cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 6, title: 'Pride and Prejudice', author: 'Jane Austen', rating: 4.7, category: 'Fiksi Klasik', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600' },
];

const categories = ['Semua', 'Fiksi', 'Fiksi Ilmiah', 'Pengembangan Diri', 'Sejarah', 'Fiksi Klasik'];

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              placeholder="Cari judul, penulis..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredBooks.map(book => (
          <Link key={book.id} to={`/book/${book.id}`} className="group">
            <div className="glass-card rounded-2xl p-4 transition-transform duration-300 group-hover:-translate-y-2 h-full flex flex-col">
              <div className="aspect-[2/3] rounded-xl overflow-hidden mb-4 relative">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
                <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">{book.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Book className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>Tidak ada buku yang sesuai dengan pencarian Anda.</p>
        </div>
      )}
    </div>
  );
}
