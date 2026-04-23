import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdSportsCricket } from 'react-icons/md';
import { HiOutlinePlus, HiOutlineCollection, HiOutlineUserGroup, HiOutlineChevronDown } from 'react-icons/hi';

// ===== FAKE DEMO DATA =====
const DEMO_USER = { name: 'Bhavya' };

const DEMO_LIVE_MATCHES = [
  {
    _id: 'match1',
    status: 'live',
    venue: 'Wankhede Stadium',
    tournamentId: { name: 'LOCAL SERIES' },
    team1Id: { _id: 't1', teamName: 'Mumbai Indians', logoURL: null },
    team2Id: { _id: 't2', teamName: 'Khaman Dhokla', logoURL: null },
    scores: [
      { teamId: 't1', runs: 90, wickets: 0, overs: '6.2' },
      { teamId: 't2', runs: 0, wickets: 1, overs: '2.1' },
    ],
  },
  {
    _id: 'match2',
    status: 'live',
    venue: 'DY Patil Stadium',
    tournamentId: { name: 'LOCAL SERIES' },
    team1Id: { _id: 't3', teamName: 'Mumbai Indians', logoURL: null },
    team2Id: { _id: 't4', teamName: 'RCB', logoURL: null },
    scores: [
      { teamId: 't3', runs: 11, wickets: 0, overs: '2.0' },
      { teamId: 't4', runs: 22, wickets: 1, overs: '3.0' },
    ],
  },
];

const DEMO_RECENT_MATCHES = [
  {
    _id: 'match3',
    status: 'completed',
    venue: 'Narendra Modi Stadium',
    tournamentId: { name: 'LOCAL SERIES' },
    team1Id: { _id: 't5', teamName: 'CSK', logoURL: null },
    team2Id: { _id: 't6', teamName: 'KKR', logoURL: null },
    resultMessage: 'CSK won by 24 runs',
    scores: [
      { teamId: 't5', runs: 187, wickets: 4, overs: '20.0' },
      { teamId: 't6', runs: 163, wickets: 8, overs: '20.0' },
    ],
  },
  {
    _id: 'match4',
    status: 'completed',
    venue: 'Chinnaswamy Stadium',
    tournamentId: { name: 'LOCAL SERIES' },
    team1Id: { _id: 't7', teamName: 'RCB', logoURL: null },
    team2Id: { _id: 't8', teamName: 'SRH', logoURL: null },
    resultMessage: 'RCB won by 6 wickets',
    scores: [
      { teamId: 't7', runs: 201, wickets: 4, overs: '19.2' },
      { teamId: 't8', runs: 198, wickets: 6, overs: '20.0' },
    ],
  },
  {
    _id: 'match5',
    status: 'completed',
    venue: 'Eden Gardens',
    tournamentId: { name: 'LOCAL SERIES' },
    team1Id: { _id: 't9', teamName: 'KKR', logoURL: null },
    team2Id: { _id: 't10', teamName: 'DC', logoURL: null },
    resultMessage: 'KKR won by 3 wickets',
    scores: [
      { teamId: 't9', runs: 156, wickets: 7, overs: '19.4' },
      { teamId: 't10', runs: 153, wickets: 9, overs: '20.0' },
    ],
  },
];

const DEMO_STATS = { tournaments: 4, teams: 8, matches: 12 };

// ===== SCORE CARD COMPONENT (inline) =====
const ScoreCard = ({ match }) => {
  const s1 = match.scores?.[0];
  const s2 = match.scores?.[1];
  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';

  return (
    <Link to={`/match/${match._id}`}>
      <div className="card hover:shadow-card-lg transition-all border border-surface-border hover:border-primary/20 p-4 cursor-pointer">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-txt-muted font-medium truncate">{match.tournamentId?.name} • {match.venue}</span>
          {isLive ? (
            <span className="flex items-center gap-1 text-[10px] font-black text-accent uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse inline-block"></span>LIVE
            </span>
          ) : (
            <span className="text-[10px] font-bold text-txt-muted uppercase tracking-widest">FINISHED</span>
          )}
        </div>

        {/* Teams & Scores */}
        <div className="space-y-2">
          {/* Team 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
                {match.team1Id?.teamName?.charAt(0)}
              </div>
              <span className="font-bold text-txt-primary text-sm">{match.team1Id?.teamName}</span>
            </div>
            {s1 && (
              <span className="font-black text-txt-primary text-base">
                {s1.runs}<span className="text-txt-muted font-normal">/{s1.wickets}</span>
                <span className="text-xs text-txt-muted font-normal ml-1">({s1.overs} ov)</span>
              </span>
            )}
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm border border-secondary/20">
                {match.team2Id?.teamName?.charAt(0)}
              </div>
              <span className="font-bold text-txt-primary text-sm">{match.team2Id?.teamName}</span>
            </div>
            {s2 && (
              <span className="font-black text-txt-primary text-base">
                {s2.runs}<span className="text-txt-muted font-normal">/{s2.wickets}</span>
                <span className="text-xs text-txt-muted font-normal ml-1">({s2.overs} ov)</span>
              </span>
            )}
          </div>
        </div>

        {/* Result */}
        {isCompleted && match.resultMessage && (
          <div className="mt-3 pt-3 border-t border-surface-border/50 text-center">
            <span className="text-[11px] font-black uppercase tracking-widest text-accent">{match.resultMessage}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

// ===== MAIN DASHBOARD =====
const DashboardPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-txt-primary">
            Welcome back, <span className="text-primary">{DEMO_USER.name}</span> 👋
          </h1>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            className="btn-primary inline-flex items-center space-x-2 shadow-lg shadow-primary/20"
          >
            <HiOutlinePlus className={`text-lg transition-transform ${isDropdownOpen ? 'rotate-45' : ''}`} />
            <span className="font-bold">Quick Actions</span>
            <HiOutlineChevronDown className={`text-sm transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-surface-card border border-surface-border rounded-xl shadow-card-lg z-50 overflow-hidden">
              <Link to="/matches/create" className="flex items-center space-x-3 px-4 py-3 hover:bg-surface-hover hover:text-primary transition-colors border-b border-surface-border/50">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MdSportsCricket className="text-lg" />
                </div>
                <span className="font-semibold text-sm">Create New Match</span>
              </Link>
              <Link to="/teams" className="flex items-center space-x-3 px-4 py-3 hover:bg-surface-hover hover:text-secondary transition-colors border-b border-surface-border/50">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <HiOutlineUserGroup className="text-lg" />
                </div>
                <span className="font-semibold text-sm">Create New Team</span>
              </Link>
              <Link to="/tournaments" className="flex items-center space-x-3 px-4 py-3 hover:bg-surface-hover hover:text-accent transition-colors">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <HiOutlineCollection className="text-lg" />
                </div>
                <span className="font-semibold text-sm">Start Tournament</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center p-4 border border-surface-border">
          <p className="text-3xl font-black text-primary">{DEMO_STATS.tournaments}</p>
          <p className="text-xs text-txt-muted font-bold uppercase tracking-widest mt-1">Tournaments</p>
        </div>
        <div className="card text-center p-4 border border-surface-border">
          <p className="text-3xl font-black text-secondary">{DEMO_STATS.teams}</p>
          <p className="text-xs text-txt-muted font-bold uppercase tracking-widest mt-1">Teams</p>
        </div>
        <div className="card text-center p-4 border border-surface-border">
          <p className="text-3xl font-black text-accent">{DEMO_STATS.matches}</p>
          <p className="text-xs text-txt-muted font-bold uppercase tracking-widest mt-1">Matches</p>
        </div>
      </div>

      {/* LOCAL TOURNAMENTS SECTION */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <MdSportsCricket className="text-2xl text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-txt-primary">Local Tournaments</h2>
            <p className="text-sm text-txt-muted">Matches hosted on this platform</p>
          </div>
          <Link to="/tournaments" className="ml-auto text-primary text-sm font-bold hover:underline">View All →</Link>
        </div>

        {/* Live Matches */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="text-md font-bold text-txt-secondary">Live Matches</h3>
            <span className="flex items-center gap-1 text-[10px] font-black text-accent uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse inline-block"></span>LIVE
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {DEMO_LIVE_MATCHES.map(match => (
              <ScoreCard key={match._id} match={match} />
            ))}
          </div>
        </div>

        {/* Recent Results */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-bold text-txt-secondary">Recent Results</h3>
            <Link to="/fixtures" className="text-secondary text-sm hover:text-secondary font-medium">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {DEMO_RECENT_MATCHES.map(match => (
              <ScoreCard key={match._id} match={match} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;