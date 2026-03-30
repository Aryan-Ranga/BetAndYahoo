import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MemeDetailPage from './pages/MemeDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import LeaderboardPage from './pages/LeaderboardPage';

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-surface)' }}>
        {/* Sidebar */}
        <Sidebar 
          collapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />

        {/* Main Content */}
        <div 
          className="flex-1 transition-all duration-300" 
          style={{ marginLeft: isSidebarCollapsed ? '72px' : '220px' }}
        >
          <Navbar />
          <main className="px-4 lg:px-8 py-4 max-w-[1400px] mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/meme/:id" element={<MemeDetailPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
