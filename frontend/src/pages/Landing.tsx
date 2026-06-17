import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Star, BookOpen, Microscope, Building, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import type { Book, Category } from '../lib/types';

export default function Landing() {
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, catsRes] = await Promise.all([
          api.get('/books/popular'),
          api.get('/categories')
        ]);
        setPopularBooks(booksRes.data.data);
        setCategories(catsRes.data.data);
      } catch (error) {
        console.error('Error fetching landing data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat data...</div>;
  }

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background -z-10" />
        {/* Glow effects for dark mode */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 hidden dark:block" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10 hidden dark:block" />
        
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 tracking-tight dark:text-glow">
            Jendela Dunia Literasi
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Jelajahi ribuan koleksi buku digital dan fisik. Baca di mana saja, kapan saja dengan pengalaman yang elegan dan nyaman.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="px-8 py-3 rounded-full bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a] font-medium hover:scale-105 hover:shadow-lg transition-all">
              Daftar Sekarang
            </Link>
            <Link to="/catalog" className="px-8 py-3 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] dark:border-white dark:text-white font-medium hover:bg-[#1a1a1a]/5 dark:hover:bg-white/10 transition-all hover:scale-105">
              Jelajahi Katalog
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Books */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-serif">Buku Populer</h2>
          <div className="flex gap-3">
            <button className="p-3 rounded-full border-2 border-[#e8dac5] dark:border-white/20 hover:bg-[#9a503e] hover:border-[#9a503e] hover:text-white transition-all group shadow-sm text-muted-foreground"><ChevronLeft className="w-6 h-6 stroke-[2.5]" /></button>
            <button className="p-3 rounded-full border-2 border-[#e8dac5] dark:border-white/20 hover:bg-[#9a503e] hover:border-[#9a503e] hover:text-white transition-all group shadow-sm text-muted-foreground"><ChevronRight className="w-6 h-6 stroke-[2.5]" /></button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularBooks.map(book => (
            <Link key={book.id} to={`/book/${book.id}`} className="group">
              <div className="glass-card rounded-2xl p-4 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="aspect-[2/3] rounded-xl overflow-hidden mb-4 relative">
                  <img src={book.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600'} alt={book.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium bg-primary/80 px-4 py-2 rounded-full backdrop-blur-sm">Lihat Detail</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">{book.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                <div className="flex items-center gap-1 text-accent">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium text-foreground">{book.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold font-serif mb-8">Jelajahi Kategori</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(category => (
            <Link key={category.id} to={`/catalog?category=${category.name}`} className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-[#9a503e]/10 transition-colors group border border-[#e8dac5] dark:border-white/10">
              <div className="p-4 bg-white dark:bg-white/5 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                {category.icon === 'book' ? <BookOpen className="w-8 h-8 text-[#9a503e]" /> : 
                 category.icon === 'microscope' ? <Microscope className="w-8 h-8 text-[#9a503e]" /> :
                 category.icon === 'building' ? <Building className="w-8 h-8 text-[#9a503e]" /> :
                 category.icon === 'user' ? <User className="w-8 h-8 text-[#9a503e]" /> :
                 <BookOpen className="w-8 h-8 text-[#9a503e]" />}
              </div>
              <span className="font-medium text-lg text-[#1a1a1a] dark:text-white">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mt-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-accent p-12 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Mulai Membaca Sekarang</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">Bergabunglah dengan ribuan pembaca lainnya dan nikmati akses tak terbatas ke koleksi literatur terbaik dunia.</p>
            <Link to="/login" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-[#9a503e] font-bold text-lg hover:scale-105 hover:shadow-xl hover:bg-gray-50 transition-all border-2 border-white/20">
              Masuk ke Perpustakaan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
