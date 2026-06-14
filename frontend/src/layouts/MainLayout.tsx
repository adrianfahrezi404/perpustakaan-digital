import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, BookOpen, User } from 'lucide-react';

export default function MainLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-serif">Perpustakaan Digital</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Beranda</Link>
            <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">Katalog</Link>
            <Link to="/my-library" className="text-sm font-medium hover:text-primary transition-colors">Koleksi Saya</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition-colors">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/login" className="p-2 rounded-full hover:bg-muted transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-8 bg-muted/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; 2026 Perpustakaan Digital. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
