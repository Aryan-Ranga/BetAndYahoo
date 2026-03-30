import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Category } from '../types';

const categories: Category[] = [
  'All', 'Trending', 'Breaking', 'New', 'Viral', 'Crypto',
  'Sports', 'Politics', 'Gaming', 'Entertainment', 'AI', 'Animals'
];

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex items-center py-3">
      {/* Left Scroll Button */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 p-1.5 rounded-lg cursor-pointer"
          style={{
            backgroundColor: 'var(--color-surface-container-high)',
            color: 'var(--color-on-surface-variant)',
            boxShadow: '8px 0 16px rgba(10, 14, 20, 0.8)',
          }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Tabs Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-center gap-2 overflow-x-auto hide-scrollbar px-1"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className="relative px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-200"
              style={{
                backgroundColor: isActive
                  ? 'var(--color-surface-bright)'
                  : 'transparent',
                color: isActive
                  ? 'var(--color-on-surface)'
                  : 'var(--color-on-surface-variant)',
              }}
              whileHover={{ backgroundColor: 'var(--color-surface-container-high)' }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute inset-0 rounded-lg"
                  style={{ backgroundColor: 'var(--color-surface-bright)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Right Scroll Button */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 p-1.5 rounded-lg cursor-pointer"
          style={{
            backgroundColor: 'var(--color-surface-container-high)',
            color: 'var(--color-on-surface-variant)',
            boxShadow: '-8px 0 16px rgba(10, 14, 20, 0.8)',
          }}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
