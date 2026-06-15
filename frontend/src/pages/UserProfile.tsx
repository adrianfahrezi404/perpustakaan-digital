import { BookOpen, Heart, User, Award, PenTool, Book, FileText, CheckCircle, Star, Plus, Trophy, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../lib/api';

// Map icon names to lucide components
const IconMap: Record<string, any> = {
  BookOpen, Heart, User, Award, PenTool, Book, FileText, CheckCircle, Star, Plus, Trophy
};

export default function UserProfile() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/profile')
      .then(res => setData(res.data.data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  if (!data) return null;

  const { user, stats, activities, badges } = data;

  const displayStats = [
    { label: 'Books Read', value: stats.books_read || 0, icon: BookOpen },
    { label: 'Favorites', value: stats.favorites || 0, icon: Heart },
    { label: 'Following', value: stats.following || 0, icon: User },
  ];

  return (
    <div className="min-h-screen">
      {/* Banner / Header */}
      {/* Simulating marble texture with a very light gray/white background and subtle gradient */}
      <div className="h-48 w-full bg-gradient-to-r from-white via-gray-100 to-white border-b border-border shadow-sm relative overflow-hidden">
        {/* Subtle decorative elements to mimic texture */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Profile Info */}
        <div className="flex flex-col items-center -mt-16 mb-16 relative z-10">
          <div className="w-32 h-32 rounded-full border-4 border-[#f7eedc] dark:border-background shadow-lg mb-4 flex items-center justify-center bg-primary/20 text-primary text-4xl font-bold overflow-hidden">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{user.name.charAt(0)}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-1">{user.name}</h1>
          <p className="text-[#b49a66] font-serif italic text-lg">{user.tagline || 'Pecinta Literatur'}</p>
        </div>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 max-w-6xl mx-auto pb-20">
          
          {/* Column 1: My Library Stats */}
          <div>
            <h2 className="text-xl font-bold font-serif mb-6 border-b border-border/50 pb-2">My Library Stats</h2>
            <div className="space-y-6">
              {displayStats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <stat.icon className="w-5 h-5 text-[#b49a66]" />
                  <div>
                    <span className="text-muted-foreground">{stat.label}:</span>{' '}
                    <span className="font-semibold text-foreground">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Recent Activities */}
          <div>
            <h2 className="text-xl font-bold font-serif mb-6 border-b border-border/50 pb-2">Recent Activities</h2>
            <div className="relative border-l border-border/50 ml-3 space-y-8">
              {activities.length > 0 ? activities.map((activity: any) => {
                const Icon = activity.icon ? (IconMap[activity.icon] || CheckCircle) : CheckCircle;
                return (
                  <div key={activity.id} className="relative pl-8">
                    {/* Timeline Node */}
                    <div className="absolute -left-3 top-0 bg-[#f7eedc] dark:bg-background p-1">
                      <Icon className="w-4 h-4 text-[#b49a66]" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground mb-1">{activity.description}</p>
                      <span className="text-xs text-muted-foreground">{new Date(activity.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              }) : <p className="text-muted-foreground pl-4 text-sm">Belum ada aktivitas.</p>}
            </div>
          </div>

          {/* Column 3: Achieved Badges */}
          <div>
            <h2 className="text-xl font-bold font-serif mb-6 border-b border-border/50 pb-2">Achieved Badges</h2>
            <div className="grid grid-cols-2 gap-8">
              {badges.length > 0 ? badges.map((badge: any) => {
                const Icon = badge.icon ? (IconMap[badge.icon] || Award) : Award;
                return (
                  <div key={badge.id} className="flex flex-col items-center text-center group">
                    <div className="w-14 h-14 rounded-full border border-[#b49a66]/30 flex items-center justify-center mb-3 group-hover:bg-[#b49a66]/10 transition-colors">
                      <Icon className="w-6 h-6 text-[#b49a66]" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-foreground max-w-[80px]">{badge.name}</span>
                  </div>
                );
              }) : <p className="text-muted-foreground text-sm col-span-2">Belum ada lencana.</p>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
