import { useState, useEffect } from 'react';
import { PenTool, MapPin, Mail, Calendar, Share2, Clock, Star, BookOpen, History, Library, ChevronRight, Users, Activity, Loader2 } from 'lucide-react';
import api from '../lib/api';

export default function UserProfile() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const fetchProfile = () => {
    api.get('/profile')
      .then(res => setData(res.data.data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append('avatar', file);

    try {
      await api.post('/profile/avatar', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchProfile();
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      alert('Gagal mengunggah foto profil.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Gagal memuat profil. Pastikan Anda sudah login.</div>;
  }

  const { user, stats, activities } = data;

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  // Fallback data for visual presentation since API might not have everything from the screenshot yet
  const userTagline = user.tagline || 'Professional Curator & Avid Reader';
  const userBio = '"Archiving memories between the pages of forgotten classics and contemporary masterpieces."';
  const interests = ['Science Fiction', 'Fantasy', 'Historical Fiction', 'Non-Fiction', 'Literary Fiction', 'Philosophy'];

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-16">
          <label className={`relative shrink-0 w-40 h-40 rounded-full p-2 border border-border flex items-center justify-center cursor-pointer group ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="w-full h-full rounded-full overflow-hidden bg-muted">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-serif text-primary/50 bg-primary/10">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              {isUploading ? <Loader2 className="w-8 h-8 animate-spin text-white" /> : <PenTool className="w-8 h-8 text-white" />}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={isUploading} />
          </label>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold font-serif text-foreground mb-2">{user.name}</h1>
                <p className="text-xl text-[#9f5b41] dark:text-[#c4775d] font-semibold mb-3">{userTagline}</p>
                <p className="text-muted-foreground italic max-w-2xl text-lg leading-relaxed">{userBio}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button className="px-6 py-2.5 bg-[#9f5b41] hover:bg-[#864c35] text-white rounded-lg font-medium transition-colors shadow-sm">
                  Edit Profile
                </button>
                <button className="p-2.5 bg-card hover:bg-muted border border-border rounded-lg text-foreground transition-colors shadow-sm">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#9f5b41] dark:text-[#c4775d]" /> Jakarta, Indonesia</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#9f5b41] dark:text-[#c4775d]" /> {user.email}</div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#9f5b41] dark:text-[#c4775d]" /> Member since {joinDate}</div>
            </div>
          </div>
        </div>

        {/* Reading Insights */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-[#9f5b41] dark:text-[#c4775d]" />
            <h2 className="text-2xl font-bold font-serif">Reading Insights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Goal Card */}
            <div className="bg-[#f9f7f4] dark:bg-black/20 border border-[#eeebe5] dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-border dark:text-white/10" strokeWidth="8" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#9f5b41" strokeWidth="8" strokeDasharray="283" strokeDashoffset="42" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">85%</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-1">Annual Goal</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{stats?.books_read || 42} of 50 books finished</p>
            </div>

            {/* Time Card */}
            <div className="bg-[#f9f7f4] dark:bg-black/20 border border-[#eeebe5] dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#faebe6] dark:bg-[#9f5b41]/20 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-[#9f5b41] dark:text-[#c4775d]" />
              </div>
              <h3 className="text-3xl font-bold font-serif text-foreground mb-2">160h 30m</h3>
              <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground mb-4">Total Read Time</p>
              <div className="w-full h-1.5 bg-border dark:bg-white/10 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-[#9f5b41] rounded-full"></div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">+12% from last month</p>
            </div>

            {/* Rating Card */}
            <div className="bg-[#f9f7f4] dark:bg-black/20 border border-[#eeebe5] dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#fdf2df] dark:bg-yellow-900/30 flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-500" fill="currentColor" />
              </div>
              <h3 className="text-3xl font-bold font-serif text-foreground mb-2">4.8/5.0</h3>
              <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground mb-4">Average Rating</p>
              <div className="flex gap-1.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-5 h-5 ${i === 5 ? 'text-yellow-600/40 dark:text-yellow-500/40' : 'text-yellow-600 dark:text-yellow-500'}`} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-[#9f5b41] dark:text-[#c4775d]" />
                <h2 className="text-2xl font-bold font-serif">Professional Interests</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, idx) => (
                  <span key={idx} className="px-5 py-2.5 bg-[#fcefee] dark:bg-[#9f5b41]/10 text-[#9f5b41] dark:text-[#c4775d] font-semibold text-sm rounded-full border border-[#f5d9d7] dark:border-[#9f5b41]/30">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Library className="w-6 h-6 text-[#9f5b41] dark:text-[#c4775d]" />
                <h2 className="text-2xl font-bold font-serif">Curated Collections</h2>
              </div>
              
              <div className="space-y-6">
                {/* Large Featured Card */}
                <div className="bg-[#f9f7f4] dark:bg-black/20 border border-[#eeebe5] dark:border-white/10 rounded-2xl overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-shadow flex flex-col sm:flex-row">
                  <div className="w-full sm:w-2/5 h-48 sm:h-auto bg-muted relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400" alt="Victorian Masters" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="w-full sm:w-3/5 p-8 flex flex-col justify-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2">Featured Series</span>
                    <h3 className="text-2xl font-bold font-serif mb-3 text-foreground group-hover:text-[#9f5b41] transition-colors">The Victorian Masters</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      A deep dive into 19th-century prose, exploring societal shifts and human nature.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {['JD', 'ES', 'TH'].map((initials, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-[#faebe6] border-2 border-[#f9f7f4] flex items-center justify-center text-[10px] font-bold text-[#9f5b41]">
                            {initials}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-[#9f5b41] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore Collection <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Reading Circles */}
                  <div className="bg-[#f9f7f4] dark:bg-black/20 border border-[#eeebe5] dark:border-white/10 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center cursor-pointer hover:bg-[#f3f0ea] dark:hover:bg-white/5 transition-colors">
                    <Users className="w-8 h-8 text-foreground mb-4" />
                    <h3 className="text-xl font-bold font-serif mb-2">Reading Circles</h3>
                    <p className="text-sm text-muted-foreground mb-6">Join 4 active discussions with fellow bibliophiles.</p>
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider mt-auto">48 Active Members</span>
                  </div>

                  {/* Archive Analytics */}
                  <div className="bg-[#f9f7f4] dark:bg-black/20 border border-[#eeebe5] dark:border-white/10 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center cursor-pointer hover:bg-[#f3f0ea] dark:hover:bg-white/5 transition-colors relative overflow-hidden">
                    <Activity className="w-8 h-8 text-[#9f5b41] mb-4" />
                    <h3 className="text-xl font-bold font-serif mb-2">Archive Analytics Pro</h3>
                    <p className="text-sm text-muted-foreground mb-6">Unlock detailed insights into your reading patterns.</p>
                    <button className="px-5 py-2 bg-[#9f5b41] hover:bg-[#864c35] text-white rounded-lg text-sm font-semibold transition-colors mt-auto shadow-sm w-full">
                      Upgrade Account
                    </button>
                    {/* Decorative line mimicking the chart in the image */}
                    <svg className="absolute bottom-[-10px] right-[-10px] w-24 h-24 opacity-10 dark:opacity-20 text-[#9f5b41]" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-[#9f5b41] dark:text-[#c4775d]" />
              <h2 className="text-2xl font-bold font-serif">Recent Activity</h2>
            </div>
            
            <div className="space-y-4">
              {/* Fake activities matching the screenshot style */}
              {[
                { cover: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=150', action: 'Finished', title: 'The Midnight Library', time: '2 hours ago' },
                { cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=150', action: 'Added', title: 'Project Hail Mary', actionSuffix: 'to Wishlist', time: 'Yesterday' },
                { cover: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&q=80&w=150', action: 'Rated', title: 'Dune', actionSuffix: '5 stars', time: '3 days ago' },
              ].map((act, i) => (
                <div key={i} className="flex items-center gap-5 p-4 bg-[#f9f7f4] dark:bg-black/20 border border-[#eeebe5] dark:border-white/10 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-12 h-16 rounded overflow-hidden shadow-sm shrink-0">
                    <img src={act.cover} alt={act.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-foreground text-[15px]">
                      <span className="font-semibold">{act.action}</span>{' '}
                      <span className="text-[#9f5b41] dark:text-[#c4775d] italic font-serif">"{act.title}"</span>{' '}
                      {act.actionSuffix && <span className="font-medium text-muted-foreground">{act.actionSuffix}</span>}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5"><Clock className="w-3 h-3" /> {act.time}</p>
                  </div>
                </div>
              ))}
              
              {/* Map actual activities if available */}
              {activities?.slice(0, 3).map((act: any) => (
                 <div key={act.id} className="flex items-center gap-5 p-4 bg-[#f9f7f4] dark:bg-black/20 border border-[#eeebe5] dark:border-white/10 rounded-xl">
                  <div className="w-12 h-16 rounded overflow-hidden shadow-sm shrink-0 bg-muted flex items-center justify-center">
                     <BookOpen className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-foreground text-[15px]">{act.description}</p>
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5"><Clock className="w-3 h-3" /> {new Date(act.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* A promo block at the bottom right */}
            <div className="mt-8 bg-[#9f5b41] text-white rounded-2xl p-8 relative overflow-hidden shadow-md">
              <div className="relative z-10">
                <Star className="w-8 h-8 text-yellow-300 mb-4" />
                <h3 className="text-2xl font-bold font-serif mb-2">AI-Powered Recommendations</h3>
                <p className="text-white/80 text-sm mb-6 max-w-[250px] leading-relaxed">
                  Based on your love for Sci-Fi and Historical Fiction, we think you'll love these 12 titles.
                </p>
                <button className="px-6 py-2.5 bg-white text-[#9f5b41] font-bold rounded-full text-sm shadow-sm hover:bg-gray-50 transition-colors">
                  See Suggestions
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <Star className="w-64 h-64" fill="currentColor" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
