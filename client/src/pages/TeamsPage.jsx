import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePlus, HiOutlineSearch } from 'react-icons/hi';

const DEMO_TEAMS = [
  { _id: 'team1', teamName: 'Mumbai Indians', players: Array(11).fill({}), tournamentIds: [{ name: 'LOCAL SERIES' }], createdBy: { _id: '123' } },
  { _id: 'team2', teamName: 'Khaman Dhokla', players: Array(11).fill({}), tournamentIds: [{ name: 'LOCAL SERIES' }], createdBy: { _id: '123' } },
  { _id: 'team3', teamName: 'CSK', players: Array(11).fill({}), tournamentIds: [{ name: 'test_tournament_1' }], createdBy: { _id: '123' } },
  { _id: 'team4', teamName: 'KKR', players: Array(11).fill({}), tournamentIds: [{ name: 'test_tournament_1' }], createdBy: { _id: '123' } },
  { _id: 'team5', teamName: 'RCB', players: Array(11).fill({}), tournamentIds: [{ name: 'test_tournament_2' }], createdBy: { _id: '456' } },
  { _id: 'team6', teamName: 'SRH', players: Array(11).fill({}), tournamentIds: [{ name: 'test_tournament_2' }], createdBy: { _id: '456' } },
  { _id: 'team7', teamName: 'DC', players: Array(9).fill({}), tournamentIds: [{ name: 'rupani' }], createdBy: { _id: '456' } },
  { _id: 'team8', teamName: 'PBKS', players: Array(8).fill({}), tournamentIds: [], createdBy: { _id: '456' } },
];

const TeamsPage = () => {
  const [filter, setFilter] = useState('myTeams');
  const [searchQuery, setSearchQuery] = useState('');

  const myTeams = DEMO_TEAMS.filter(t => t.createdBy._id === '123');
  const otherTeams = DEMO_TEAMS.filter(t => t.createdBy._id !== '123');
  const displayTeams = (filter === 'myTeams' ? myTeams : otherTeams)
    .filter(t => t.teamName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-txt-primary">Teams</h1>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
            <input type="text" placeholder="Search teams..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} className="input pl-10 h-10 text-sm" />
          </div>
          <button className="btn-primary inline-flex items-center space-x-2 h-11 px-5">
            <HiOutlinePlus className="text-xl" /> <span className="font-bold">New Team</span>
          </button>
        </div>
      </div>

      <div className="flex bg-surface-card rounded-lg border border-surface-border p-1">
        <button onClick={() => setFilter('myTeams')}
          className={`flex-1 px-4 py-2.5 rounded-md text-sm font-bold transition-all ${filter === 'myTeams' ? 'bg-primary text-white shadow-md' : 'text-txt-secondary hover:text-primary'}`}>
          My Teams
        </button>
        <button onClick={() => setFilter('otherTeams')}
          className={`flex-1 px-4 py-2.5 rounded-md text-sm font-bold transition-all ${filter === 'otherTeams' ? 'bg-primary text-white shadow-md' : 'text-txt-secondary hover:text-primary'}`}>
          Other Teams
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayTeams.map(team => (
          <Link key={team._id} to={`/teams/${team._id}`}>
            <div className="card hover:shadow-card-lg transition-all group border border-surface-border hover:border-primary/20 p-5">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-black border border-primary/20">
                  {team.teamName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-txt-primary group-hover:text-primary">{team.teamName}</h3>
                  <span className="bg-primary/5 text-primary text-xs px-2.5 py-1 rounded-lg border border-primary/10">
                    {team.tournamentIds?.[0]?.name || 'Global Team'}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-surface-border/50 pt-4">
                <span className="text-xs font-black text-txt-secondary uppercase tracking-widest">
                  {team.players.length} Players
                </span>
                <span className="text-xs uppercase font-black tracking-widest text-primary/80 group-hover:text-primary">
                  View Squad →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;