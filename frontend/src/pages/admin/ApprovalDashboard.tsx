import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function ApprovalDashboard() {
  const [approvals] = useState([
    { id: 1, user: 'Clara Oswald', book: 'Dune', type: 'Reservasi Fisik', date: 'Hari ini, 10:30', status: 'pending' },
    { id: 2, user: 'John Smith', book: 'Atomic Habits', type: 'Akses Digital', date: 'Hari ini, 09:15', status: 'pending' },
    { id: 3, user: 'Anya Sharma', book: 'The Midnight Library', type: 'Pengembalian Fisik', date: 'Kemarin, 16:45', status: 'pending' },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-serif">Persetujuan Peminjaman & Pengembalian</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvals.map(item => (
          <div key={item.id} className="glass-card rounded-2xl p-6 border border-border">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                item.type.includes('Fisik') ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'
              }`}>
                {item.type}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {item.date}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-1">{item.book}</h3>
            <p className="text-sm text-muted-foreground mb-6">Pemohon: <span className="font-medium text-foreground">{item.user}</span></p>
            
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors">
                <CheckCircle className="w-4 h-4" />
                Setujui
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-border text-foreground text-sm font-medium rounded-xl hover:bg-muted transition-colors">
                <XCircle className="w-4 h-4" />
                Tolak
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {approvals.length === 0 && (
        <div className="text-center py-20 text-muted-foreground glass-card rounded-2xl">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-20 text-green-500" />
          <p>Semua permintaan telah diproses.</p>
        </div>
      )}
    </div>
  );
}
