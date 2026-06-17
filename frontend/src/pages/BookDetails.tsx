import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, BookOpen, Calendar, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import type { Book, Review } from '../lib/types';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [bookRes, reviewsRes, recsRes] = await Promise.all([
          api.get(`/books/${id}`),
          api.get(`/books/${id}/reviews`),
          api.get(`/books/${id}/recommendations`)
        ]);
        setBook(bookRes.data.data);
        setReviews(reviewsRes.data.data);
        setRecommendations(recsRes.data.data);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
        toast.error('Gagal memuat detail buku.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) fetchData();
  }, [id]);

  const handleBorrow = async () => {
    if (!isAuthenticated) {
      toast.error('Anda harus login terlebih dahulu.');
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await api.post(`/books/${id}/borrow`);
      toast.success('Berhasil meminjam buku!');
      navigate('/library');
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Gagal meminjam buku.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Anda harus login terlebih dahulu.');
      navigate('/login');
      return;
    }
    
    try {
      const res = await api.post(`/books/${id}/wishlist`);
      toast.success(res.data.wishlisted ? 'Ditambahkan ke Keinginan' : 'Dihapus dari Keinginan');
    } catch (error: any) {
      toast.error('Gagal menyimpan ke keinginan.');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  if (!book) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-muted-foreground">Buku tidak ditemukan.</div>;
  }

  return (
    <div className="relative min-h-screen pb-16 overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Cover & Reviews */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Cover Image with large shadow */}
              <img src={book.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600&h=900'} alt={book.title} className="w-full rounded-md shadow-[20px_20px_40px_rgba(0,0,0,0.15)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.5)] object-contain aspect-[2/3] bg-gray-100/50 dark:bg-white/5" />

            {/* Ulasan & Rating Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-bold">Ulasan & Rating</h3>
                <button className="px-5 py-1.5 rounded-full bg-[#b49a66] text-white text-sm font-semibold hover:bg-[#9a8253] transition-colors shadow-sm">Tulis Ulasan</button>
              </div>

              <div className="glass-card rounded-2xl p-6 mb-4 bg-white/60 dark:bg-card/60 backdrop-blur-md">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl font-bold text-foreground mb-1">{book.rating}</span>
                    <div className="flex text-yellow-500 mb-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={cn("w-4 h-4", star <= Math.floor(book.rating) ? "fill-current" : "text-muted")} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">Berdasarkan {book.reviews_count} ulasan</span>
                  </div>
                  
                  {/* Rating Bars */}
                  <div className="flex-1 space-y-2.5">
                    {[
                      { star: 5, pct: 70 },
                      { star: 4, pct: 20 },
                      { star: 3, pct: 5 },
                      { star: 2, pct: 3 },
                      { star: 1, pct: 2 }
                    ].map((item) => (
                      <div key={item.star} className="flex items-center gap-2">
                        <div className="flex items-center gap-1 w-6">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">{item.star}</span>
                        </div>
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${item.pct}%` }}></div>
                        </div>
                        <span className="w-8 text-right text-muted-foreground text-xs">{item.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Cards (Side by side) */}
              <div className="grid grid-cols-2 gap-4">
                {reviews.map(review => (
                  <div key={review.id} className="glass-card rounded-xl p-4 bg-white/60 dark:bg-card/60 backdrop-blur-md">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center font-bold text-primary text-xs">
                        {review.user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground line-clamp-1">{review.user?.name || 'User'}</div>
                        <div className="text-[10px] text-muted-foreground">{new Date(review.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Title, Details, Recommendations */}
          <div className="lg:col-span-8 flex flex-col pt-4 lg:pt-12">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-4 leading-tight text-foreground">
              {book.title}
            </h1>
            <p className="text-2xl text-[#b49a66] font-serif mb-8">{book.author}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-10">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current opacity-50" />
                </div>
                <span className="font-bold text-foreground">{book.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{book.pages} Halaman</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Tahun Terbit: {book.publish_year}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-16">
              <button 
                onClick={handleBorrow}
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-full bg-[#b49a66] text-white font-semibold hover:bg-[#9a8253] transition-all hover:scale-105 shadow-[0_8px_20px_rgba(180,154,102,0.3)] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Pinjam Sekarang'}
              </button>
              <button 
                onClick={handleWishlist}
                className="px-6 py-3.5 rounded-full text-foreground font-medium hover:bg-muted transition-colors flex items-center gap-2 group"
              >
                <Heart className="w-5 h-5 group-hover:fill-current group-hover:text-red-500 transition-colors" />
                Simpan ke Keinginan
              </button>
            </div>

            {/* Rekomendasi Serupa */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl font-bold border-b-2 border-foreground pb-2">Rekomendasi Serupa</h3>
                <div className="flex gap-2">
                  <button className="p-1 text-muted-foreground hover:text-foreground transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                  <button className="p-1 text-muted-foreground hover:text-foreground transition-colors"><ChevronRight className="w-5 h-5" /></button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {recommendations.map(rec => (
                  <Link key={rec.id} to={`/book/${rec.id}`} className="group glass-card rounded-2xl p-3 bg-white/60 dark:bg-card/60 backdrop-blur-md flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <img src={rec.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200&h=300'} alt={rec.title} className="w-full aspect-[2/3] object-contain rounded-xl shadow-md mb-4 bg-gray-100/50 dark:bg-white/5" />
                    <h4 className="font-bold text-sm text-center line-clamp-2 leading-tight mb-1 group-hover:text-primary transition-colors">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground text-center line-clamp-1">{rec.author}</p>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
