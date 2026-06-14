import { BookOpen, Heart, User, Award, PenTool, Book, FileText, CheckCircle, Star, Plus, Trophy } from 'lucide-react';

export default function UserProfile() {
  const stats = [
    { label: 'Books Read', value: '142', icon: BookOpen },
    { label: 'Favorites', value: '36', icon: Heart },
    { label: 'Following', value: '24', icon: User },
  ];

  const activities = [
    { id: 1, text: "Finished 'Pride and Prejudice' by Jane Austen.", time: "2 hours ago", icon: CheckCircle },
    { id: 2, text: "Reviewed 'Moby Dick' - 5/5 stars. 'A monumental work.'", time: "Yesterday", icon: Star },
    { id: 3, text: "Added 'The Odyssey' to reading list.", time: "3 days ago", icon: Plus },
    { id: 4, text: "Achieved 'Top Reader' Status.", time: "5 days ago", icon: Trophy },
  ];

  const badges = [
    { id: 1, label: 'Literary Connoisseur', icon: Award },
    { id: 2, label: 'Master Reviewer', icon: PenTool },
    { id: 3, label: 'Classic Enthusiast', icon: Book },
    { id: 4, label: 'Golden Quill', icon: FileText },
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
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200" 
            alt="Eleanor Vance" 
            className="w-32 h-32 rounded-full object-cover border-4 border-[#f7eedc] dark:border-background shadow-lg mb-4" 
          />
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-1">Eleanor Vance</h1>
          <p className="text-[#b49a66] font-serif italic text-lg">Lover of Classic Literature</p>
        </div>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 max-w-6xl mx-auto pb-20">
          
          {/* Column 1: My Library Stats */}
          <div>
            <h2 className="text-xl font-bold font-serif mb-6 border-b border-border/50 pb-2">My Library Stats</h2>
            <div className="space-y-6">
              {stats.map((stat, idx) => (
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
              {activities.map((activity) => (
                <div key={activity.id} className="relative pl-8">
                  {/* Timeline Node */}
                  <div className="absolute -left-3 top-0 bg-[#f7eedc] dark:bg-background p-1">
                    <activity.icon className="w-4 h-4 text-[#b49a66]" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground mb-1">{activity.text}</p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Achieved Badges */}
          <div>
            <h2 className="text-xl font-bold font-serif mb-6 border-b border-border/50 pb-2">Achieved Badges</h2>
            <div className="grid grid-cols-2 gap-8">
              {badges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full border border-[#b49a66]/30 flex items-center justify-center mb-3 group-hover:bg-[#b49a66]/10 transition-colors">
                    <badge.icon className="w-6 h-6 text-[#b49a66]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-foreground max-w-[80px]">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
