import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const userData = await login({ email, password });
      toast.success('Login berhasil!');
      if (userData?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/library');
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Gagal masuk. Periksa email dan kata sandi Anda.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Image Side (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-primary/10 dark:bg-black/40 mix-blend-overlay z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200&h=1600" 
          alt="Classic Library" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative overflow-hidden">
        
        {/* Dark mode glowing background elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10 hidden dark:block"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -z-10 hidden dark:block"></div>

        <div className="w-full max-w-md glass-card md:bg-transparent md:border-none md:shadow-none p-8 md:p-0 rounded-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Selamat Datang Kembali</h1>
            <p className="text-muted-foreground">Silakan masuk untuk mengakses perpustakaan digital Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Alamat Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Masukkan alamat email Anda"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Kata Sandi</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Masukkan kata sandi Anda"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-transform hover:scale-[1.02] shadow-lg shadow-primary/20 disabled:opacity-70 flex justify-center items-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
             <p className="text-sm text-muted-foreground">
               Belum punya akun? <Link to="/register" className="text-primary font-medium hover:underline">Daftar di sini</Link>
             </p>
          </div>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Atau masuk dengan</span>
            </div>
          </div>

          <div className="mt-6 flex gap-4 justify-center">
            <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors bg-card">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            </button>
            <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors bg-card">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Lupa Kata Sandi?</a>
            <a href="#" className="hover:text-foreground">Kebijakan Privasi</a>
          </div>

        </div>
      </div>
    </div>
  );
}
