import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  TrendingUp,
  Briefcase,
  Trophy,
  User,
  Flame,
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: TrendingUp, label: 'Trending', path: '/?category=Trending' },
  { icon: Briefcase, label: 'Portfolio', path: '/portfolio' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  { icon: User, label: 'Profile', path: '/profile' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 220 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col"
      style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
    >
      {/* Logo - Clickable to expand/collapse */}
      <div 
        className="flex items-center h-16 px-4 gap-3 cursor-pointer select-none group"
        onClick={onToggle}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #46f1c5, #00d4aa)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Flame className="w-5 h-5" style={{ color: 'var(--color-on-primary)' }} />
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-display font-bold text-xl whitespace-nowrap"
              style={{ color: 'var(--color-on-surface)' }}
            >
              Meme<span style={{ color: 'var(--color-primary)' }}>Bet</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1 px-3 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === '/' && location.pathname === '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <motion.div
                className={`relative flex items-center gap-3 rounded-xl px-3 py-3 cursor-pointer transition-colors duration-200`}
                style={{
                  backgroundColor: isActive
                    ? 'var(--color-surface-container-high)'
                    : hoveredItem === item.path
                    ? 'var(--color-surface-container)'
                    : 'transparent',
                }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                <Icon
                  className="w-5 h-5 flex-shrink-0"
                  style={{
                    color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                  }}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-medium whitespace-nowrap"
                      style={{
                        color: isActive ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)',
                      }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
