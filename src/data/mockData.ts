import type { MemeMarket, LeaderboardEntry, PortfolioPosition, Activity } from '../types';

// Generate realistic price history
function generatePriceHistory(baseYes: number, days: number = 30): { time: number; yesPrice: number; noPrice: number }[] {
  const history: { time: number; yesPrice: number; noPrice: number }[] = [];
  const now = Date.now();
  let currentYes = baseYes * 0.5 + Math.random() * 0.3;
  
  for (let i = days; i >= 0; i--) {
    const time = Math.floor((now - i * 24 * 60 * 60 * 1000) / 1000);
    const drift = (Math.random() - 0.48) * 0.08;
    currentYes = Math.max(0.05, Math.min(0.95, currentYes + drift));
    history.push({
      time,
      yesPrice: parseFloat(currentYes.toFixed(2)),
      noPrice: parseFloat((1 - currentYes).toFixed(2)),
    });
  }
  
  // Ensure last point matches current percentage
  const last = history[history.length - 1];
  last.yesPrice = baseYes / 100;
  last.noPrice = 1 - baseYes / 100;
  
  return history;
}

export const memeMarkets: MemeMarket[] = [
  {
    id: '1',
    title: "Will 'Distracted Boyfriend' meme resurge to #1 trending?",
    image: 'https://i.imgflip.com/1ur9b0.jpg',
    category: 'Viral',
    yesPercentage: 72,
    noPercentage: 28,
    volume: '$4.2M',
    liquidity: '$1.8M',
    endDate: '2026-04-15',
    timeRemaining: '16d',
    outcomes: [
      { label: 'Yes', percentage: 72, price: 0.72 },
      { label: 'No', percentage: 28, price: 0.28 },
    ],
    isHot: true,
    isNew: false,
    comments: [
      {
        id: 'c1',
        user: { name: 'DiamondHands', avatar: '💎', badge: 'Top Trader' },
        text: "This meme has survived every market cycle. It's the S&P 500 of memes. Going all in on YES.",
        timestamp: '2h ago',
        likes: 342,
        replies: 28,
      },
      {
        id: 'c2',
        user: { name: 'MemeWhale', avatar: '🐳' },
        text: "The nostalgia factor alone will carry this. Plus it just got featured in a Netflix show.",
        timestamp: '4h ago',
        likes: 156,
        replies: 12,
      },
      {
        id: 'c3',
        user: { name: 'ViralAnalyst', avatar: '📊', badge: 'Analyst' },
        text: "Looking at Google Trends data, there's a clear uptick in searches. The fundamentals are strong.",
        timestamp: '6h ago',
        likes: 89,
        replies: 7,
      },
      {
        id: 'c4',
        user: { name: 'CryptoMemer', avatar: '🚀' },
        text: "Just dropped 500 shares on YES. This is the play of the week fr fr",
        timestamp: '8h ago',
        likes: 67,
        replies: 15,
      },
    ],
    priceHistory: generatePriceHistory(72),
    totalBettors: 12847,
    createdAt: '2026-03-01',
  },
  {
    id: '2',
    title: "Will 'This is Fine' dog become the official crypto crash meme?",
    image: 'https://i.imgflip.com/wxica.jpg',
    category: 'Crypto',
    yesPercentage: 88,
    noPercentage: 12,
    volume: '$8.7M',
    liquidity: '$3.2M',
    endDate: '2026-04-10',
    timeRemaining: '11d',
    outcomes: [
      { label: 'Yes', percentage: 88, price: 0.88 },
      { label: 'No', percentage: 12, price: 0.12 },
    ],
    isHot: true,
    isNew: false,
    comments: [
      {
        id: 'c5',
        user: { name: 'CryptoFire', avatar: '🔥', badge: 'OG' },
        text: "It's literally already the crash meme. This is free money.",
        timestamp: '1h ago',
        likes: 521,
        replies: 34,
      },
    ],
    priceHistory: generatePriceHistory(88),
    totalBettors: 23451,
    createdAt: '2026-02-20',
  },
  {
    id: '3',
    title: "Will a new 'Drake Meme' format hit 10M shares this month?",
    image: 'https://i.imgflip.com/30b1gx.jpg',
    category: 'Entertainment',
    yesPercentage: 45,
    noPercentage: 55,
    volume: '$2.1M',
    liquidity: '$890K',
    endDate: '2026-04-30',
    timeRemaining: '31d',
    outcomes: [
      { label: 'Yes', percentage: 45, price: 0.45 },
      { label: 'No', percentage: 55, price: 0.55 },
    ],
    isHot: false,
    isNew: true,
    comments: [
      {
        id: 'c6',
        user: { name: 'DrakesFan', avatar: '🎵' },
        text: "Drake always delivers new content. It's just a matter of time.",
        timestamp: '3h ago',
        likes: 203,
        replies: 19,
      },
    ],
    priceHistory: generatePriceHistory(45),
    totalBettors: 8934,
    createdAt: '2026-03-25',
  },
  {
    id: '4',
    title: "Will 'Wojak' meme derivatives exceed original in popularity?",
    image: 'https://i.imgflip.com/2wifvo.jpg',
    category: 'Crypto',
    yesPercentage: 34,
    noPercentage: 66,
    volume: '$1.5M',
    liquidity: '$670K',
    endDate: '2026-05-01',
    timeRemaining: '32d',
    outcomes: [
      { label: 'Yes', percentage: 34, price: 0.34 },
      { label: 'No', percentage: 66, price: 0.66 },
    ],
    isHot: false,
    isNew: false,
    comments: [
      {
        id: 'c7',
        user: { name: 'WojakArmy', avatar: '😢' },
        text: "The derivatives are already more popular. Just look at Trad Wojak and Doomer.",
        timestamp: '5h ago',
        likes: 145,
        replies: 22,
      },
    ],
    priceHistory: generatePriceHistory(34),
    totalBettors: 6721,
    createdAt: '2026-03-10',
  },
  {
    id: '5',
    title: "Will AI-generated memes dominate Reddit's front page by April?",
    image: 'https://i.imgflip.com/65efzo.jpg',
    category: 'AI',
    yesPercentage: 61,
    noPercentage: 39,
    volume: '$5.8M',
    liquidity: '$2.4M',
    endDate: '2026-04-30',
    timeRemaining: '31d',
    outcomes: [
      { label: 'Yes', percentage: 61, price: 0.61 },
      { label: 'No', percentage: 39, price: 0.39 },
    ],
    isHot: true,
    isNew: true,
    comments: [
      {
        id: 'c8',
        user: { name: 'AIOverlord', avatar: '🤖', badge: 'Verified' },
        text: "It's already happening. Half of r/memes is AI slop and people love it.",
        timestamp: '30m ago',
        likes: 890,
        replies: 67,
      },
    ],
    priceHistory: generatePriceHistory(61),
    totalBettors: 18234,
    createdAt: '2026-03-15',
  },
  {
    id: '6',
    title: "Will 'Pepe the Frog' get a new viral format in Q2 2026?",
    image: 'https://i.imgflip.com/39t1o.jpg',
    category: 'Trending',
    yesPercentage: 79,
    noPercentage: 21,
    volume: '$12.3M',
    liquidity: '$5.1M',
    endDate: '2026-06-30',
    timeRemaining: '92d',
    outcomes: [
      { label: 'Yes', percentage: 79, price: 0.79 },
      { label: 'No', percentage: 21, price: 0.21 },
    ],
    isHot: true,
    isNew: false,
    comments: [
      {
        id: 'c9',
        user: { name: 'PepeMaxi', avatar: '🐸', badge: 'Top Trader' },
        text: "Pepe always finds a way. This frog is unkillable. BULLISH.",
        timestamp: '15m ago',
        likes: 1204,
        replies: 89,
      },
    ],
    priceHistory: generatePriceHistory(79),
    totalBettors: 34567,
    createdAt: '2026-01-15',
  },
  {
    id: '7',
    title: "Will 'Woman Yelling at Cat' meme make a comeback?",
    image: 'https://i.imgflip.com/345v97.jpg',
    category: 'Viral',
    yesPercentage: 52,
    noPercentage: 48,
    volume: '$3.4M',
    liquidity: '$1.2M',
    endDate: '2026-04-20',
    timeRemaining: '21d',
    outcomes: [
      { label: 'Yes', percentage: 52, price: 0.52 },
      { label: 'No', percentage: 48, price: 0.48 },
    ],
    isHot: false,
    isNew: false,
    comments: [
      {
        id: 'c10',
        user: { name: 'NostalgiaTrader', avatar: '📺' },
        text: "Peak meme format. The two-panel structure is timeless.",
        timestamp: '2h ago',
        likes: 278,
        replies: 31,
      },
    ],
    priceHistory: generatePriceHistory(52),
    totalBettors: 9876,
    createdAt: '2026-03-05',
  },
  {
    id: '8',
    title: "Will the 'Sigma Male' meme trend die out by summer?",
    image: 'https://i.imgflip.com/5c7lwq.jpg',
    category: 'Trending',
    yesPercentage: 67,
    noPercentage: 33,
    volume: '$6.1M',
    liquidity: '$2.8M',
    endDate: '2026-06-21',
    timeRemaining: '83d',
    outcomes: [
      { label: 'Yes', percentage: 67, price: 0.67 },
      { label: 'No', percentage: 33, price: 0.33 },
    ],
    isHot: true,
    isNew: false,
    comments: [
      {
        id: 'c11',
        user: { name: 'SigmaGrindset', avatar: '🐺' },
        text: "Sigma never dies. It just evolves. Betting NO here.",
        timestamp: '1h ago',
        likes: 445,
        replies: 56,
      },
    ],
    priceHistory: generatePriceHistory(67),
    totalBettors: 15432,
    createdAt: '2026-02-28',
  },
];

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, user: { name: 'MemeOracle', avatar: '🧙' }, profit: 142580, winRate: 89.2, totalTrades: 1247, streak: 12 },
  { rank: 2, user: { name: 'DiamondHands', avatar: '💎' }, profit: 98340, winRate: 84.7, totalTrades: 892, streak: 8 },
  { rank: 3, user: { name: 'PepeMaxi', avatar: '🐸' }, profit: 87210, winRate: 81.3, totalTrades: 1534, streak: 5 },
  { rank: 4, user: { name: 'ViralSniper', avatar: '🎯' }, profit: 72450, winRate: 79.8, totalTrades: 678, streak: 14 },
  { rank: 5, user: { name: 'CryptoMemer', avatar: '🚀' }, profit: 65890, winRate: 77.1, totalTrades: 1102, streak: 3 },
  { rank: 6, user: { name: 'MemeWhale', avatar: '🐳' }, profit: 54320, winRate: 75.6, totalTrades: 445, streak: 7 },
  { rank: 7, user: { name: 'TrendRider', avatar: '🏄' }, profit: 43210, winRate: 73.2, totalTrades: 956, streak: 11 },
  { rank: 8, user: { name: 'AIOverlord', avatar: '🤖' }, profit: 38760, winRate: 71.8, totalTrades: 789, streak: 6 },
  { rank: 9, user: { name: 'DankDealer', avatar: '🃏' }, profit: 31450, winRate: 69.4, totalTrades: 1321, streak: 2 },
  { rank: 10, user: { name: 'NormieSlayer', avatar: '⚔️' }, profit: 27890, winRate: 67.9, totalTrades: 567, streak: 9 },
];

export const portfolioPositions: PortfolioPosition[] = [
  { id: 'p1', memeTitle: "Pepe the Frog Q2 Format", memeImage: 'https://i.imgflip.com/39t1o.jpg', position: 'YES', entryPrice: 0.62, currentPrice: 0.79, shares: 500, pnl: 85, pnlPercentage: 27.4 },
  { id: 'p2', memeTitle: "This is Fine - Crypto Crash", memeImage: 'https://i.imgflip.com/wxica.jpg', position: 'YES', entryPrice: 0.71, currentPrice: 0.88, shares: 300, pnl: 51, pnlPercentage: 23.9 },
  { id: 'p3', memeTitle: "Drake Meme 10M Shares", memeImage: 'https://i.imgflip.com/30b1gx.jpg', position: 'NO', entryPrice: 0.48, currentPrice: 0.55, shares: 200, pnl: 14, pnlPercentage: 14.6 },
  { id: 'p4', memeTitle: "Wojak Derivatives", memeImage: 'https://i.imgflip.com/2wifvo.jpg', position: 'YES', entryPrice: 0.41, currentPrice: 0.34, shares: 150, pnl: -10.5, pnlPercentage: -17.1 },
  { id: 'p5', memeTitle: "AI Memes Dominate Reddit", memeImage: 'https://i.imgflip.com/65efzo.jpg', position: 'YES', entryPrice: 0.55, currentPrice: 0.61, shares: 400, pnl: 24, pnlPercentage: 10.9 },
];

export const recentActivity: Activity[] = [
  { id: 'a1', type: 'buy', memeTitle: "Pepe the Frog", amount: 100, price: 0.79, timestamp: '5m ago' },
  { id: 'a2', type: 'win', memeTitle: "Grumpy Cat Revival", amount: 450, price: 1.00, timestamp: '2h ago' },
  { id: 'a3', type: 'sell', memeTitle: "Wojak Derivatives", amount: 50, price: 0.34, timestamp: '4h ago' },
  { id: 'a4', type: 'buy', memeTitle: "AI Memes Dominate", amount: 200, price: 0.61, timestamp: '6h ago' },
  { id: 'a5', type: 'loss', memeTitle: "Harambe 10th Anniversary", amount: 180, price: 0.00, timestamp: '1d ago' },
];

export const categories = [
  'All', 'Trending', 'Breaking', 'New', 'Viral', 'Crypto', 'Sports', 'Politics', 'Gaming', 'Entertainment', 'AI', 'Animals'
] as const;
