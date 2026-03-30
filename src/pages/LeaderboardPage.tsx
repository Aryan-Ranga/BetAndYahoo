import { motion } from 'motion/react';
import { Trophy, TrendingUp, Target, Flame, Medal, Crown, Award } from 'lucide-react';
import { leaderboardData } from '../data/mockData';

export default function LeaderboardPage() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5" style={{ color: '#FFD700' }} />;
      case 2: return <Medal className="w-5 h-5" style={{ color: '#C0C0C0' }} />;
      case 3: return <Award className="w-5 h-5" style={{ color: '#CD7F32' }} />;
      default: return <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--color-on-surface-variant)' }}>#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 215, 0, 0.02))';
      case 2: return 'linear-gradient(135deg, rgba(192, 192, 192, 0.06), rgba(192, 192, 192, 0.01))';
      case 3: return 'linear-gradient(135deg, rgba(205, 127, 50, 0.06), rgba(205, 127, 50, 0.01))';
      default: return 'transparent';
    }
  };

  return (
    <div className="pb-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <Trophy className="w-7 h-7" style={{ color: 'var(--color-tertiary)' }} />
          <h1 className="font-display font-bold text-3xl" style={{ color: 'var(--color-on-surface)' }}>
            Leaderboard
          </h1>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          Top meme market traders ranked by total profit
        </p>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        {leaderboardData.slice(0, 3).map((entry, i) => {
          const order = [1, 0, 2]; // Display order: 2nd, 1st, 3rd
          const idx = order[i];
          const trader = leaderboardData[idx];
          const heights = ['h-56', 'h-48', 'h-44'];
          const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];

          return (
            <motion.div
              key={trader.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={`flex flex-col items-center justify-end ${heights[idx]} rounded-xl p-4`}
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                background: getRankBg(trader.rank),
              }}
            >
              <div className="relative mb-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    backgroundColor: 'var(--color-surface-container-highest)',
                    boxShadow: `0 0 20px ${colors[idx]}33`,
                  }}
                >
                  {trader.user.avatar}
                </div>
                <div
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    backgroundColor: colors[idx],
                    color: '#000',
                  }}
                >
                  {trader.rank}
                </div>
              </div>
              <span className="font-display font-bold text-sm mb-1" style={{ color: 'var(--color-on-surface)' }}>
                {trader.user.name}
              </span>
              <span className="text-lg font-bold tabular-nums" style={{ color: 'var(--color-primary)' }}>
                ${(trader.profit / 1000).toFixed(1)}K
              </span>
              <span className="text-[10px] mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                {trader.winRate}% Win Rate
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        <div className="p-4">
          <h2 className="font-display font-bold text-lg" style={{ color: 'var(--color-on-surface)' }}>
            All Traders
          </h2>
        </div>

        <div className="space-y-0">
          {leaderboardData.map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.04 }}
              className="flex items-center gap-4 px-4 py-3 transition-colors cursor-pointer"
              style={{
                background: getRankBg(entry.rank),
                borderBottom: '1px solid rgba(59, 74, 68, 0.08)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-container)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
            >
              {/* Rank */}
              <div className="w-8 flex items-center justify-center">
                {getRankIcon(entry.rank)}
              </div>

              {/* Avatar + Name */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-surface-container-highest)' }}
                >
                  {entry.user.avatar}
                </div>
                <span className="font-medium text-sm truncate" style={{ color: 'var(--color-on-surface)' }}>
                  {entry.user.name}
                </span>
              </div>

              {/* Stats */}
              <div className="hidden sm:flex items-center gap-6">
                <div className="text-right">
                  <div className="label-uppercase mb-0.5" style={{ color: 'var(--color-on-surface-variant)' }}>Profit</div>
                  <div className="text-sm font-bold tabular-nums" style={{ color: 'var(--color-primary)' }}>
                    +${(entry.profit / 1000).toFixed(1)}K
                  </div>
                </div>
                <div className="text-right">
                  <div className="label-uppercase mb-0.5" style={{ color: 'var(--color-on-surface-variant)' }}>Win Rate</div>
                  <div className="text-sm font-bold tabular-nums" style={{ color: 'var(--color-on-surface)' }}>
                    {entry.winRate}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="label-uppercase mb-0.5" style={{ color: 'var(--color-on-surface-variant)' }}>Trades</div>
                  <div className="text-sm tabular-nums" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {entry.totalTrades.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="label-uppercase mb-0.5" style={{ color: 'var(--color-on-surface-variant)' }}>Streak</div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Flame className="w-3 h-3" style={{ color: 'var(--color-tertiary)' }} />
                    <span style={{ color: 'var(--color-tertiary)' }}>{entry.streak}</span>
                  </div>
                </div>
              </div>

              {/* Mobile compact stats */}
              <div className="sm:hidden text-right">
                <div className="text-sm font-bold tabular-nums" style={{ color: 'var(--color-primary)' }}>
                  +${(entry.profit / 1000).toFixed(1)}K
                </div>
                <div className="text-[10px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {entry.winRate}% WR
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
