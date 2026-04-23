import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineCalendar } from 'react-icons/hi';

const DEMO_MATCHES = [
  {
    _id: 'm1', status: 'live', venue: 'Wankhede Stadium',
    matchDate: '2026-04-23T14:00:00',
    tournamentId: { name: 'LOCAL SERIES' },
    team1Id: { _id: 't1', teamName: 'Mumbai Indians' },
    team2Id: { _id: 't2', teamName: 'Khaman Dhokla' },
    scores: [
      { teamId: 't1', runs: 90, wickets: 0, overs: '6.2' },
      { teamId: 't2', runs: 0, wickets: 1, overs: '2.1' },
    ],
  },
  {
    _id: 'm2', status: 'live', venue: 'DY Patil Stadium',
    matchDate: '2026-04-23T14:00:00',
    tournamentId: { name: 'LOCAL SERIES' },
    team1Id: { _id: 't3', teamName: 'Mumbai Indians' },
    team2Id: { _id: 't4', teamName: 'RCB' },
    scores: [
      { teamId: 't3', runs: 11, wickets: 0, overs: '2.0' },
      { teamId: 't4', runs: 22, wickets: 1, overs: '3.0' },
    ],
  },
  {
    _id: 'm3', status: 'completed', venue: 'Narendra Modi Stadium',
    matchDate: '2026-04-20T14:00:00',
    tournamentId: { name: 'LOCAL SERIES' },
    team1Id: { _id: 't5', teamName: 'CSK' },
    team2Id: { _id: 't6', teamName: 'KKR' },
    resultMessage: 'CSK won by 24 runs',
    scores: [
      { teamId: 't5', runs: 187, wickets: 4, overs: '20.0' },
      { teamId: 't6', runs: 163, wickets: 8, overs: '20.0' },
    ],
  },
  {
    _id: 'm4', status: 'completed', venue: 'Chinnaswamy Stadium',
    matchDate: '2026-04-19T18:00:00',
    tournamentId: { name: 'LOCAL SERIES' },
    team1Id: { _id: 't7', teamName: 'RCB' },
    team2Id: { _id: 't8', teamName: 'SRH' },
    resultMessage: 'RCB won by 6 wickets',
    scores: [
      { teamId: 't7', runs: 201, wickets: 4, overs: '19.2' },
      { teamId: 't8', runs: 198, wickets: 6, overs: '20.0' },
    ],
  },
  {
    _id: 'm5', status: 'scheduled', venue: 'Eden Gardens',
    matchDate: '2026-04-25T14:00:00',
    tournamentId: { name: 'LOCAL SERIES' },
    team1Id: { _id: 't9', teamName: 'KKR' },
    team2Id: { _id: 't10', teamName: 'DC' },
    scores: [],
  },
  {
    _id: 'm6', status: 'scheduled', venue: 'PCA Stadium',
    matchDate: '2026-04-26T18:00:00',
    tournamentId: { name: 'LOCAL SERIES' },
    team1Id: { _id: 't11', teamName: 'PBKS' },
    team2Id: { _id: 't12', teamName: 'GT' },
    scores: [],
  },
];

const FixturesPage = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? DEMO_MATCHES : DEMO_MATCHES.filter(m => m.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <HiOutlineCalendar className="text-2xl text-primary" />
          <h1 className="text-2xl font-bold text-txt-primary">Fixtures & Results</h1>
        </div>
        <div className="flex bg-surface-card rounded-lg border border-surface-border p-1">
          {['all', 'scheduled', 'live', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${filter === f ? 'bg-primary text-white shadow-sm' : 'text-txt-secondary hover:text-primary'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((match, idx) => {
          const matchDate = new Date(match.matchDate);
          const s1 = match.scores?.[0];
          const s2 = match.scores?.[1];
          return (
            <div key={match._id} className="flex flex-col md:flex-row gap-4 md:items-stretch group">
              <div className="md:w-[140px] flex-shrink-0 flex flex-col items-start pt-2">
                <div className="border border-accent/40 text-accent text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-widest mb-2">
                  MATCH {idx + 1}
                </div>
                <h3 className="text-base font-black text-txt-primary uppercase">
                  {matchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </h3>
                <p className="text-xs text-txt-muted">{matchDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
              </div>

              <Link to={`/match/${match._id}`} className="flex-1 bg-surface-card border border-surface-border rounded-xl p-5 hover:shadow-card-lg hover:border-primary/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-txt-muted">{match.venue}</span>
                  {match.status === 'live' ? (
                    <span className="flex items-center gap-1 text-[10px] font-black text-accent uppercase">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>LIVE
                    </span>
                  ) : (
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${match.status === 'completed' ? 'text-txt-muted' : 'text-secondary'}`}>
                      {match.status}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                      {match.team1Id.teamName.charAt(0)}
                    </div>
                    <span className="font-bold text-txt-primary">{match.team1Id.teamName}</span>
                  </div>
                  {match.status !== 'scheduled' && s1 && s2 ? (
                    <div className="flex items-center gap-4 px-4">
                      <span className="font-black text-xl text-txt-primary">{s1.runs}<span className="text-txt-muted text-base">/{s1.wickets}</span></span>
                      <span className="text-txt-muted font-bold">-</span>
                      <span className="font-black text-xl text-txt-primary">{s2.runs}<span className="text-txt-muted text-base">/{s2.wickets}</span></span>
                    </div>
                  ) : (
                    <span className="font-black text-txt-muted text-xl px-4">V/S</span>
                  )}
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <span className="font-bold text-txt-primary">{match.team2Id.teamName}</span>
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold border border-secondary/20">
                      {match.team2Id.teamName.charAt(0)}
                    </div>
                  </div>
                </div>
                {match.resultMessage && (
                  <div className="mt-4 pt-3 border-t border-surface-border/50 text-center">
                    <span className="text-[11px] font-black uppercase tracking-widest text-accent">{match.resultMessage}</span>
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FixturesPage;