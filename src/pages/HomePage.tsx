import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { SlidersHorizontal, Bookmark, BarChart3, Zap } from 'lucide-react';
import CategoryTabs from '../components/CategoryTabs';
import MemeCard from '../components/MemeCard';
import { memeMarkets } from '../data/mockData';
import type { Category } from '../types';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<'volume' | 'newest' | 'ending'>('volume');

  const filteredMemes = useMemo(() => {
    let filtered = memeMarkets;
    if (activeCategory !== 'All') {
      filtered = filtered.filter(
        (m) => m.category === activeCategory || 
               (activeCategory === 'Trending' && m.isHot) ||
               (activeCategory === 'New' && m.isNew)
      );
    }

    switch (sortBy) {
      case 'volume':
        return [...filtered].sort((a, b) => {
          const parseVol = (v: string) => parseFloat(v.replace(/[$,KM]/g, '')) * (v.includes('M') ? 1000000 : v.includes('K') ? 1000 : 1);
          return parseVol(b.volume) - parseVol(a.volume);
        });
      case 'newest':
        return [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'ending':
        return [...filtered].sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
      default:
        return filtered;
    }
  }, [activeCategory, sortBy]);

  return (
    <div>
      {/* Hero Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center gap-6 py-4 mb-2"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
          <span className="label-uppercase" style={{ color: 'var(--color-on-surface-variant)' }}>
            Live Markets
          </span>
          <span className="font-display font-bold text-xl tabular-nums" style={{ color: 'var(--color-on-surface)' }}>
            {memeMarkets.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" style={{ color: 'var(--color-tertiary)' }} />
          <span className="label-uppercase" style={{ color: 'var(--color-on-surface-variant)' }}>
            24h Volume
          </span>
          <span className="font-display font-bold text-xl tabular-nums" style={{ color: 'var(--color-on-surface)' }}>
            $44.1M
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse-live" style={{ backgroundColor: 'var(--color-primary)' }} />
          <span className="label-uppercase" style={{ color: 'var(--color-on-surface-variant)' }}>
            Active Traders
          </span>
          <span className="font-display font-bold text-xl tabular-nums" style={{ color: 'var(--color-on-surface)' }}>
            142K
          </span>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Toolbar */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors"
            style={{
              backgroundColor: 'var(--color-surface-container-high)',
              color: 'var(--color-on-surface-variant)',
            }}
          >
            <SlidersHorizontal className="w-3 h-3" />
            Filter
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors"
            style={{
              backgroundColor: 'var(--color-surface-container-high)',
              color: 'var(--color-on-surface-variant)',
            }}
          >
            <Bookmark className="w-3 h-3" />
            Saved
          </button>
        </div>

        <div className="flex items-center gap-1">
          {[
            { key: 'volume', label: 'Volume' },
            { key: 'newest', label: 'Newest' },
            { key: 'ending', label: 'Ending Soon' },
          ].map((sort) => (
            <button
              key={sort.key}
              onClick={() => setSortBy(sort.key as any)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors"
              style={{
                backgroundColor: sortBy === sort.key ? 'var(--color-surface-bright)' : 'transparent',
                color: sortBy === sort.key ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)',
              }}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      {/* Meme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
        {filteredMemes.map((meme, index) => (
          <MemeCard key={meme.id} meme={meme} index={index} />
        ))}
      </div>

      {/* Empty State */}
      {filteredMemes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <span className="text-4xl mb-4">🤷</span>
          <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--color-on-surface)' }}>
            No memes found
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Try a different category or check back later.
          </p>
        </motion.div>
      )}
    </div>
  );
}
