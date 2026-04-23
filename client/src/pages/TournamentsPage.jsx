import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePlus, HiOutlineCalendar, HiOutlineSearch } from 'react-icons/hi';

const DEMO_TOURNAMENTS = [
  { _id: 'tour1', name: 'test4', startDate: '2026-03-31', endDate: '2026-04-04', teams: [{},{},{} ], organizerId: { name: 'Bhavya' }, status: 'completed' },
  { _id: 'tour2', name: 'rupani', startDate: '2026-03-31', endDate: '2026-04-02', teams: [{},{}], organizerId: { name: 'Bhavya' }, status: 'completed' },
  { _id: 'tour3', name: 'test_3', startDate: '2026-03-11', endDate: '2026-04-04', teams: [{},{}], organizerId: { name: 'Bhavya' }, status: 'completed' },
  { _id: 'tour4', name: 'test_tournament_2', startDate: '2026-03-11', endDate: '2026-04-04', teams: [{},{}], organizerId: { name: 'Bhavya' }, status: 'completed' },
];

const TournamentsPage = () => {
  const [view, setView] = useState('my');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const statusColors = {
    upcoming: 'bg-secondary/10 text-secondary',
    live: 'bg-accent/10 text-accent',
    completed: 'bg-txt-muted/10 text-txt-secondary',
  };

  const filtered = DEMO_TOURNAMENTS.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-txt-primary">Tournaments</h1>
          <div className="flex bg-surface-card rounded-lg border border-surface-border p-1 w-fit">
            {['my', 'other'].map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-5 py-2 rounded-md text-sm font-bold capitalize transition-all ${view === v ? 'bg-primary text-white shadow-md' : 'text-txt-secondary hover:text-primary'}`}>
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
            <input type="text" placeholder="Search tournaments..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} className="input pl-10 h-11 text-base" />
          </div>
          <div className="flex bg-surface-card rounded-lg border border-surface-border p-1">
            {['all', 'upcoming', 'ongoing', 'completed'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition-all ${filter === f ? 'bg-primary text-white shadow-md' : 'text-txt-secondary hover:text-primary'}`}>
                {f === 'ongoing' ? 'Live' : f}
              </button>
            ))}
          </div>
          <button className="btn-primary inline-flex items-center space-x-2 h-10 px-4">
            <HiOutlinePlus /> <span>New Tournament</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(t => (
          <div key={t._id} className="card hover:shadow-card-lg transition-all duration-300 group animate-slide-up relative">
            <Link to={`/tournaments/${t._id}`} className="block">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-txt-primary group-hover:text-primary transition-colors pr-8">{t.name}</h3>
                <span className={`badge ${statusColors[t.status]}`}>{t.status === 'completed' ? 'finished' : t.status}</span>
              </div>
              <div className="space-y-2 text-sm text-txt-secondary">
                <div className="flex items-center space-x-2">
                  <HiOutlineCalendar className="text-txt-muted" />
                  <span>{new Date(t.startDate).toLocaleDateString()} – {new Date(t.endDate).toLocaleDateString()}</span>
                </div>
                <p className="text-txt-muted">{t.teams?.length || 0} teams registered</p>
                <p className="text-txt-muted text-xs">created by: {t.organizerId?.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;