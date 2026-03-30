import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Bell, LogIn, UserPlus, Flame } from 'lucide-react';

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 gap-4"
      style={{
        backgroundColor: 'rgba(16, 20, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(59, 74, 68, 0.15)',
      }}
    >
      {/* Left - Logo (mobile only) */}
      <Link to="/" className="lg:hidden flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #46f1c5, #00d4aa)' }}
        >
          <Flame className="w-4 h-4" style={{ color: 'var(--color-on-primary)' }} />
        </div>
        <span className="font-display font-bold text-lg" style={{ color: 'var(--color-on-surface)' }}>
          Meme<span style={{ color: 'var(--color-primary)' }}>Bet</span>
        </span>
      </Link>

      {/* Center - Search */}
      <div className="flex-1 max-w-xl mx-auto">
        <motion.div
          className="relative flex items-center rounded-xl overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: 'var(--color-surface-container-highest)',
            boxShadow: searchFocused ? '0 0 0 2px rgba(70, 241, 197, 0.4)' : 'none',
          }}
          animate={{ scale: searchFocused ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Search className="w-4 h-4 ml-4 flex-shrink-0" style={{ color: 'var(--color-outline)' }} />
          <input
            type="text"
            placeholder="Search meme markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full bg-transparent py-2.5 px-3 text-sm outline-none"
            style={{
              color: 'var(--color-on-surface)',
              fontFamily: 'var(--font-body)',
            }}
            id="search-input"
          />
          <kbd
            className="hidden sm:flex items-center px-2 py-0.5 mr-3 rounded text-[10px] font-medium"
            style={{
              backgroundColor: 'var(--color-surface-container)',
              color: 'var(--color-on-surface-variant)',
            }}
          >
            /
          </kbd>
        </motion.div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-xl transition-colors cursor-pointer"
          style={{ color: 'var(--color-on-surface-variant)' }}
          id="notifications-btn"
        >
          <Bell className="w-5 h-5" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-primary)' }}
          />
        </motion.button>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          style={{
            backgroundColor: 'var(--color-surface-container-high)',
            color: 'var(--color-on-surface)',
          }}
          id="login-btn"
        >
          <LogIn className="w-4 h-4" />
          Log In
        </motion.button>

        {/* Sign Up Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #46f1c5, #00d4aa)',
            color: 'var(--color-on-primary)',
          }}
          id="signup-btn"
        >
          <UserPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Up</span>
        </motion.button>
      </div>
    </motion.header>
  );
}
