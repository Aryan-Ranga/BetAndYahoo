import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronRight,
  Clock,
  Users,
  BarChart3,
  Droplets,
  Share2,
  Bookmark,
  TrendingUp,
  TrendingDown,
  ExternalLink,
} from 'lucide-react';
import PriceChart from '../components/PriceChart';
import CommentSection from '../components/CommentSection';
import { memeMarkets } from '../data/mockData';

export default function MemeDetailPage() {
  const { id } = useParams();
  const meme = memeMarkets.find((m) => m.id === id);
  const [betAmount, setBetAmount] = useState('10');
  const [selectedSide, setSelectedSide] = useState<'yes' | 'no'>('yes');
  const [timeframe, setTimeframe] = useState('1M');

  if (!meme) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="text-6xl mb-4">🤔</span>
        <h2 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--color-on-surface)' }}>
          Market not found
        </h2>
        <Link to="/" className="text-sm underline" style={{ color: 'var(--color-primary)' }}>
          Back to markets
        </Link>
      </div>
    );
  }

  const relatedMemes = memeMarkets.filter((m) => m.id !== id).slice(0, 4);
  const estimatedShares = betAmount ? (parseFloat(betAmount) / (selectedSide === 'yes' ? meme.outcomes[0].price : meme.outcomes[1].price)).toFixed(1) : '0';
  const potentialPayout = betAmount ? (parseFloat(estimatedShares)).toFixed(2) : '0';

  return (
    <div className="pb-8">
      {/* Breadcrumbs */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-1 text-xs mb-6 py-2"
        style={{ color: 'var(--color-on-surface-variant)' }}
      >
        <Link to="/" className="hover:underline" style={{ color: 'var(--color-primary)' }}>Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span>Markets</span>
        <ChevronRight className="w-3 h-3" />
        <span style={{ color: 'var(--color-on-surface)' }}>{meme.category}</span>
      </motion.nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <img
                src={meme.image}
                alt={meme.title}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      color: 'var(--color-on-surface-variant)',
                    }}
                  >
                    {meme.category}
                  </span>
                  {meme.isHot && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', color: '#fff' }}
                    >
                      🔥 HOT
                    </span>
                  )}
                </div>
                <h1 className="font-display font-bold text-2xl leading-tight" style={{ color: 'var(--color-on-surface)' }}>
                  {meme.title}
                </h1>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-4">
              {[
                { icon: BarChart3, label: 'VOLUME', value: meme.volume },
                { icon: Droplets, label: 'LIQUIDITY', value: meme.liquidity },
                { icon: Users, label: 'BETTORS', value: meme.totalBettors.toLocaleString() },
                { icon: Clock, label: 'ENDS IN', value: meme.timeRemaining },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon className="w-3.5 h-3.5" style={{ color: 'var(--color-outline)' }} />
                  <span className="label-uppercase" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {stat.label}
                  </span>
                  <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--color-on-surface)' }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Odds - Big Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-4"
          >
            <div
              className="flex-1 p-4 rounded-xl text-center"
              style={{ backgroundColor: 'rgba(0, 212, 170, 0.08)' }}
            >
              <div className="label-uppercase mb-1" style={{ color: 'var(--color-primary-dim)' }}>Yes</div>
              <div className="font-display font-bold text-4xl tabular-nums" style={{ color: 'var(--color-primary)' }}>
                {meme.yesPercentage}%
              </div>
              <div className="text-sm tabular-nums mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                ${meme.outcomes[0].price.toFixed(2)}
              </div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" style={{ color: 'var(--color-primary)' }} />
                <span className="text-xs" style={{ color: 'var(--color-primary)' }}>+3.2%</span>
              </div>
            </div>
            <div
              className="flex-1 p-4 rounded-xl text-center"
              style={{ backgroundColor: 'rgba(144, 24, 34, 0.15)' }}
            >
              <div className="label-uppercase mb-1" style={{ color: 'var(--color-secondary)' }}>No</div>
              <div className="font-display font-bold text-4xl tabular-nums" style={{ color: 'var(--color-secondary)' }}>
                {meme.noPercentage}%
              </div>
              <div className="text-sm tabular-nums mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                ${meme.outcomes[1].price.toFixed(2)}
              </div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingDown className="w-3 h-3" style={{ color: 'var(--color-secondary)' }} />
                <span className="text-xs" style={{ color: 'var(--color-secondary)' }}>-3.2%</span>
              </div>
            </div>
          </motion.div>

          {/* Price Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl p-4"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm" style={{ color: 'var(--color-on-surface)' }}>
                Price History
              </h3>
              <div className="flex gap-1">
                {['1H', '1D', '1W', '1M', 'ALL'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-colors"
                    style={{
                      backgroundColor: timeframe === tf ? 'var(--color-surface-bright)' : 'transparent',
                      color: timeframe === tf ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)',
                    }}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <PriceChart data={meme.priceHistory} height={350} />
          </motion.div>

          {/* Comments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl p-4"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}
          >
            <CommentSection comments={meme.comments} />
          </motion.div>
        </div>

        {/* Sidebar - 1/3 */}
        <div className="space-y-4">
          {/* Betting Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-20 rounded-xl p-4 space-y-4"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}
          >
            <h3 className="font-display font-bold text-sm" style={{ color: 'var(--color-on-surface)' }}>
              Place Your Bet
            </h3>

            {/* Side Selection */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSide('yes')}
                className="flex-1 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all"
                style={{
                  backgroundColor: selectedSide === 'yes' ? 'var(--color-primary-container)' : 'rgba(0, 212, 170, 0.08)',
                  color: selectedSide === 'yes' ? 'var(--color-on-primary-container)' : 'var(--color-primary)',
                  boxShadow: selectedSide === 'yes' ? 'var(--shadow-glow-primary)' : 'none',
                }}
              >
                Yes {meme.yesPercentage}¢
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSide('no')}
                className="flex-1 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all"
                style={{
                  backgroundColor: selectedSide === 'no' ? 'var(--color-secondary-container)' : 'rgba(144, 24, 34, 0.15)',
                  color: selectedSide === 'no' ? '#fff' : 'var(--color-secondary)',
                  boxShadow: selectedSide === 'no' ? 'var(--shadow-glow-secondary)' : 'none',
                }}
              >
                No {meme.noPercentage}¢
              </motion.button>
            </div>

            {/* Amount Input */}
            <div>
              <label className="label-uppercase mb-2 block" style={{ color: 'var(--color-on-surface-variant)' }}>
                Amount
              </label>
              <div
                className="flex items-center rounded-xl overflow-hidden"
                style={{ backgroundColor: 'var(--color-surface-container-highest)' }}
              >
                <span className="pl-3 text-sm font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>$</span>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="flex-1 bg-transparent py-3 px-2 text-sm font-bold outline-none tabular-nums"
                  style={{ color: 'var(--color-on-surface)' }}
                  placeholder="0.00"
                />
              </div>
              <div className="flex gap-1 mt-2">
                {['5', '10', '25', '50', '100'].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setBetAmount(amt)}
                    className="flex-1 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-colors"
                    style={{
                      backgroundColor: betAmount === amt ? 'var(--color-surface-bright)' : 'var(--color-surface-container)',
                      color: 'var(--color-on-surface-variant)',
                    }}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimate */}
            <div className="space-y-2 py-3" style={{ borderTop: '1px solid rgba(59, 74, 68, 0.15)', borderBottom: '1px solid rgba(59, 74, 68, 0.15)' }}>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--color-on-surface-variant)' }}>Est. Shares</span>
                <span className="font-bold tabular-nums" style={{ color: 'var(--color-on-surface)' }}>{estimatedShares}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--color-on-surface-variant)' }}>Potential Payout</span>
                <span className="font-bold tabular-nums" style={{ color: 'var(--color-primary)' }}>${potentialPayout}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--color-on-surface-variant)' }}>Avg. Price</span>
                <span className="font-bold tabular-nums" style={{ color: 'var(--color-on-surface)' }}>
                  ${selectedSide === 'yes' ? meme.outcomes[0].price.toFixed(2) : meme.outcomes[1].price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Buy Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 rounded-xl font-bold text-sm cursor-pointer"
              style={{
                background: selectedSide === 'yes'
                  ? 'linear-gradient(135deg, #46f1c5, #00d4aa)'
                  : 'linear-gradient(135deg, #ffb3b0, #901822)',
                color: selectedSide === 'yes' ? 'var(--color-on-primary)' : '#fff',
              }}
            >
              Buy {selectedSide === 'yes' ? 'Yes' : 'No'} — ${betAmount || '0'}
            </motion.button>

            {/* Share / Bookmark */}
            <div className="flex gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium cursor-pointer"
                style={{ backgroundColor: 'var(--color-surface-container)', color: 'var(--color-on-surface-variant)' }}
              >
                <Bookmark className="w-3.5 h-3.5" /> Save
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium cursor-pointer"
                style={{ backgroundColor: 'var(--color-surface-container)', color: 'var(--color-on-surface-variant)' }}
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
          </motion.div>

          {/* Related Markets */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-xl p-4"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}
          >
            <h3 className="font-display font-bold text-sm mb-3" style={{ color: 'var(--color-on-surface)' }}>
              Related Markets
            </h3>
            <div className="space-y-2">
              {relatedMemes.map((related) => (
                <Link key={related.id} to={`/meme/${related.id}`}>
                  <div
                    className="flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-container)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <img src={related.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: 'var(--color-on-surface)' }}>
                        {related.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold tabular-nums" style={{ color: 'var(--color-primary)' }}>
                          Yes {related.yesPercentage}%
                        </span>
                        <span className="text-[10px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                          {related.volume}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3" style={{ color: 'var(--color-outline)' }} />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
