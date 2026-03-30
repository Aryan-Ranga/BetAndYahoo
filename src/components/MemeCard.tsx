import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bookmark, Share2, Users, Clock, Flame, Sparkles } from 'lucide-react';
import type { MemeMarket } from '../types';
import MiniChart from './MiniChart';

interface MemeCardProps {
  meme: MemeMarket;
  index: number;
}

export default function MemeCard({ meme, index }: MemeCardProps) {
  const yesWidth = `${meme.yesPercentage}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/meme/${meme.id}`} className="block">
        <motion.div
          className="card-hover rounded-2xl overflow-hidden cursor-pointer"
          style={{ backgroundColor: 'var(--color-surface-container-low)' }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Image Section */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={meme.image}
              alt={meme.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(16, 20, 26, 0.95) 0%, transparent 60%)',
              }}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {meme.isHot && (
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                    color: '#fff',
                  }}
                >
                  <Flame className="w-3 h-3" /> HOT
                </span>
              )}
              {meme.isNew && (
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'linear-gradient(135deg, #46f1c5, #00d4aa)',
                    color: 'var(--color-on-primary)',
                  }}
                >
                  <Sparkles className="w-3 h-3" /> NEW
                </span>
              )}
            </div>

            {/* Category Badge */}
            <span
              className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{
                backgroundColor: 'rgba(49, 53, 60, 0.8)',
                backdropFilter: 'blur(8px)',
                color: 'var(--color-on-surface-variant)',
              }}
            >
              {meme.category}
            </span>

            {/* Mini Chart Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-50">
              <MiniChart data={meme.priceHistory} />
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h3
              className="font-display font-bold text-sm leading-tight mb-4 line-clamp-2"
              style={{ color: 'var(--color-on-surface)' }}
            >
              {meme.title}
            </h3>

            {/* Outcome Rows */}
            <div className="space-y-2.5 mb-4">
              {meme.outcomes.map((outcome) => (
                <div key={outcome.label} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span
                      className="text-xs font-medium w-6"
                      style={{ color: 'var(--color-on-surface-variant)' }}
                    >
                      {outcome.label}
                    </span>

                    {/* Percentage Bar */}
                    <div className="flex-1 percentage-bar">
                      <div
                        className="percentage-bar-fill"
                        style={{
                          width: outcome.label === 'Yes' ? yesWidth : `${meme.noPercentage}%`,
                          backgroundColor:
                            outcome.label === 'Yes'
                              ? 'var(--color-primary-container)'
                              : 'var(--color-secondary-container)',
                        }}
                      />
                    </div>

                    <span
                      className="text-sm font-bold tabular-nums w-10 text-right"
                      style={{
                        color:
                          outcome.label === 'Yes'
                            ? 'var(--color-primary)'
                            : 'var(--color-secondary)',
                      }}
                    >
                      {outcome.percentage}%
                    </span>
                  </div>

                  {/* Buy Buttons */}
                  <div className="flex gap-1.5">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className="px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer"
                      style={{
                        backgroundColor:
                          outcome.label === 'Yes'
                            ? 'rgba(0, 212, 170, 0.15)'
                            : 'rgba(144, 24, 34, 0.3)',
                        color:
                          outcome.label === 'Yes'
                            ? 'var(--color-primary)'
                            : 'var(--color-secondary)',
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      {outcome.label === 'Yes' ? 'Yes' : 'No'}
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Stats */}
            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(59, 74, 68, 0.1)' }}>
              <div className="flex items-center gap-3">
                <span
                  className="label-uppercase flex items-center gap-1"
                  style={{ color: 'var(--color-on-surface-variant)' }}
                >
                  {meme.volume} Vol.
                </span>
                <span
                  className="label-uppercase flex items-center gap-1"
                  style={{ color: 'var(--color-on-surface-variant)' }}
                >
                  <Users className="w-3 h-3" />
                  {meme.totalBettors.toLocaleString()}
                </span>
                <span
                  className="label-uppercase flex items-center gap-1"
                  style={{ color: 'var(--color-on-surface-variant)' }}
                >
                  <Clock className="w-3 h-3" />
                  {meme.timeRemaining}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 cursor-pointer"
                  style={{ color: 'var(--color-outline)' }}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 cursor-pointer"
                  style={{ color: 'var(--color-outline)' }}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                  <Share2 className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
