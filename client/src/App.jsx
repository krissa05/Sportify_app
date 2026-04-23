import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDetailPage from './pages/TournamentDetailPage';
import TeamsPage from './pages/TeamsPage';
import TeamDetailPage from './pages/TeamDetailPage';
import CreateMatchPage from './pages/CreateMatchPage';
import LiveScoringPage from './pages/LiveScoringPage';
import MatchViewerPage from './pages/MatchViewerPage';
import MatchSummaryPage from './pages/MatchSummaryPage';
import PointsTablePage from './pages/PointsTablePage';
import FixturesPage from './pages/FixturesPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tournaments" element={<TournamentsPage />} />
              <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/teams/:id" element={<TeamDetailPage />} />
              <Route path="/matches/create" element={<CreateMatchPage />} />
              <Route path="/match/:id" element={<MatchViewerPage />} />
              <Route path="/match/:id/summary" element={<MatchSummaryPage />} />
              <Route path="/match/:id/score" element={<LiveScoringPage />} />
              <Route path="/fixtures" element={<FixturesPage />} />
              <Route path="/points" element={<PointsTablePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;