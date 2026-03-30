import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Award,
} from 'lucide-react';
import { portfolioPositions, recentActivity } from '../data/mockData';

export default function PortfolioPage() {
  const totalValue = portfolioPositions.reduce(
    (acc, pos) => acc + pos.currentPrice * pos.shares,
    0
  );
  const totalPnl = portfolioPositions.reduce((acc, pos) => acc + pos.pnl, 0);
  const totalPnlPercentage = ((totalPnl / (totalValue - totalPnl)) * 100).toFixed(1);

  return (
    <div className="pb-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display font-bold text-3xl mb-1" style={{ color: 'var(--color-on-surface)' }}>
          Portfolio
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
          Track your positions and performance
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            label: 'Portfolio Value',
            value: `$${totalValue.toFixed(2)}`,
            icon: DollarSign,
            change: `+${totalPnlPercentage}%`,
            positive: true,
          },
          {
            label: 'Total P&L',
            value: `$${totalPnl.toFixed(2)}`,
            icon: totalPnl >= 0 ? TrendingUp : TrendingDown,
            change: `${totalPnl >= 0 ? '+' : ''}${totalPnlPercentage}%`,
            positive: totalPnl >= 0,
          },
          {
            label: 'Active Positions',
            value: portfolioPositions.length.toString(),
            icon: BarChart3,
            change: '+2 today',
            positive: true,
          },
          {
            label: 'Win Rate',
            value: '76.4%',
            icon: Award,
            change: '+2.1%',
            positive: true,
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
            className="p-4 rounded-xl"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="label-uppercase" style={{ color: 'var(--color-on-surface-variant)' }}>
                {stat.label}
              </span>
              <stat.icon className="w-4 h-4" style={{ color: 'var(--color-outline)' }} />
            </div>
            <div className="font-display font-bold text-2xl tabular-nums mb-1" style={{ color: 'var(--color-on-surface)' }}>
              {stat.value}
            </div>
            <div
              className="flex items-center gap-1 text-xs font-medium"
              style={{ color: stat.positive ? 'var(--color-primary)' : 'var(--color-secondary)' }}
            >
              {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {stat.change}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Active Positions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-display font-bold text-lg" style={{ color: 'var(--color-on-surface)' }}>
            Active Positions
          </h2>
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: 'var(--color-surface-container-high)', color: 'var(--color-on-surface-variant)' }}
          >
            {portfolioPositions.length} open
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                {['Market', 'Position', 'Entry', 'Current', 'Shares', 'P&L'].map((header) => (
                  <th
                    key={header}
                    className="label-uppercase text-left px-4 py-3"
                    style={{ color: 'var(--color-on-surface-variant)' }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {portfolioPositions.map((pos, index) => (
                <motion.tr
                  key={pos.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="transition-colors cursor-pointer"
                  style={{ borderBottom: '1px solid rgba(59, 74, 68, 0.1)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-container)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={pos.memeImage} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      <span className="text-sm font-medium truncate max-w-[200px]" style={{ color: 'var(--color-on-surface)' }}>
                        {pos.memeTitle}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-bold"
                      style={{
                        backgroundColor: pos.position === 'YES' ? 'rgba(0, 212, 170, 0.15)' : 'rgba(144, 24, 34, 0.3)',
                        color: pos.position === 'YES' ? 'var(--color-primary)' : 'var(--color-secondary)',
                      }}
                    >
                      {pos.position}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm tabular-nums" style={{ color: 'var(--color-on-surface-variant)' }}>
                    ${pos.entryPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium tabular-nums" style={{ color: 'var(--color-on-surface)' }}>
                    ${pos.currentPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm tabular-nums" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {pos.shares}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span
                        className="text-sm font-bold tabular-nums"
                        style={{ color: pos.pnl >= 0 ? 'var(--color-primary)' : 'var(--color-secondary)' }}
                      >
                        {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
                      </span>
                      <span
                        className="text-[10px] tabular-nums"
                        style={{ color: pos.pnlPercentage >= 0 ? 'var(--color-primary)' : 'var(--color-secondary)' }}
                      >
                        {pos.pnlPercentage >= 0 ? '+' : ''}{pos.pnlPercentage}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-xl p-4"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        <h2 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--color-on-surface)' }}>
          Recent Activity
        </h2>
        <div className="space-y-2">
          {recentActivity.map((activity, index) => {
            const iconMap = {
              buy: ShoppingCart,
              sell: ArrowUpRight,
              win: Award,
              loss: ArrowDownRight,
            };
            const colorMap = {
              buy: 'var(--color-primary)',
              sell: 'var(--color-tertiary)',
              win: 'var(--color-primary)',
              loss: 'var(--color-secondary)',
            };
            const bgMap = {
              buy: 'rgba(0, 212, 170, 0.1)',
              sell: 'rgba(255, 206, 166, 0.1)',
              win: 'rgba(0, 212, 170, 0.1)',
              loss: 'rgba(144, 24, 34, 0.15)',
            };
            const Icon = iconMap[activity.type];

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-container)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: bgMap[activity.type] }}
                >
                  <Icon className="w-4 h-4" style={{ color: colorMap[activity.type] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--color-on-surface)' }}>
                    <span className="capitalize">{activity.type}</span> — {activity.memeTitle}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {activity.timestamp}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className="text-sm font-bold tabular-nums"
                    style={{
                      color: activity.type === 'loss' ? 'var(--color-secondary)' : 'var(--color-on-surface)',
                    }}
                  >
                    {activity.type === 'loss' ? '-' : ''}${activity.amount.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
