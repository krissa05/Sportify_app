import { useState } from 'react';
import { HiOutlineChartBar } from 'react-icons/hi';

const DEMO_TOURNAMENTS = [
  { _id: 'tour1', name: 'test_tournament_1' },
  { _id: 'tour2', name: 'test_tournament_2' },
];

const DEMO_POINTS = {
  tour1: [
    { teamId: '1', teamName: 'kkr', played: 3, won: 2, lost: 1, tied: 0, points: 4 },
    { teamId: '2', teamName: 'mumbai Indians', played: 5, won: 2, lost: 3, tied: 0, points: 4 },
    { teamId: '3', teamName: 'LSG', played: 1, won: 1, lost: 0, tied: 0, points: 2 },
    { teamId: '4', teamName: 'Unknown', played: 0, won: 0, lost: 0, tied: 0, points: 0 },
    { teamId: '5', teamName: 'SRH', played: 0, won: 0, lost: 0, tied: 0, points: 0 },
    { teamId: '6', teamName: 'A', played: 0, won: 0, lost: 0, tied: 0, points: 0 },
    { teamId: '7', teamName: 'cy', played: 0, won: 0, lost: 0, tied: 0, points: 0 },
    { teamId: '8', teamName: 'xyzzzz', played: 0, won: 0, lost: 0, tied: 0, points: 0 },
  ],
  tour2: [
    { teamId: '9', teamName: 'CSK', played: 4, won: 3, lost: 1, tied: 0, points: 6 },
    { teamId: '10', teamName: 'RCB', played: 4, won: 2, lost: 2, tied: 0, points: 4 },
    { teamId: '11', teamName: 'MI', played: 4, won: 1, lost: 3, tied: 0, points: 2 },
    { teamId: '12', teamName: 'DC', played: 4, won: 0, lost: 4, tied: 0, points: 0 },
  ],
};

const PointsTablePage = () => {
  const [selectedTournament, setSelectedTournament] = useState('tour1');
  const pointsTable = DEMO_POINTS[selectedTournament] || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <HiOutlineChartBar className="text-2xl text-primary" />
          <h1 className="text-2xl font-bold text-txt-primary">Points Table</h1>
        </div>
        <select value={selectedTournament} onChange={e => setSelectedTournament(e.target.value)} className="input w-64">
          {DEMO_TOURNAMENTS.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left px-6 py-4 text-sm font-semibold">#</th>
                <th className="text-left px-6 py-4 text-sm font-semibold">Team</th>
                <th className="text-center px-4 py-4 text-sm font-semibold">P</th>
                <th className="text-center px-4 py-4 text-sm font-semibold">W</th>
                <th className="text-center px-4 py-4 text-sm font-semibold">L</th>
                <th className="text-center px-4 py-4 text-sm font-semibold">T</th>
                <th className="text-center px-4 py-4 text-sm font-semibold">Pts</th>
              </tr>
            </thead>
            <tbody>
              {pointsTable.map((team, idx) => (
                <tr key={team.teamId} className={`border-b border-surface-border hover:bg-surface transition-colors ${idx === 0 ? 'bg-accent/5' : ''} ${idx < 2 ? 'border-l-4 border-l-accent' : ''}`}>
                  <td className="px-6 py-4 font-bold text-txt-primary">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {team.teamName?.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-txt-primary">{team.teamName}</span>
                    </div>
                  </td>
                  <td className="text-center px-4 py-4 text-txt-secondary">{team.played}</td>
                  <td className="text-center px-4 py-4 text-accent font-semibold">{team.won}</td>
                  <td className="text-center px-4 py-4 text-danger font-semibold">{team.lost}</td>
                  <td className="text-center px-4 py-4 text-warning font-semibold">{team.tied}</td>
                  <td className="text-center px-4 py-4">
                    <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">{team.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PointsTablePage;