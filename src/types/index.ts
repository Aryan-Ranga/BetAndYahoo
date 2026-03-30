export interface MemeMarket {
  id: string;
  title: string;
  image: string;
  category: string;
  yesPercentage: number;
  noPercentage: number;
  volume: string;
  liquidity: string;
  endDate: string;
  timeRemaining: string;
  outcomes: Outcome[];
  isHot: boolean;
  isNew: boolean;
  comments: Comment[];
  priceHistory: PricePoint[];
  totalBettors: number;
  createdAt: string;
}

export interface Outcome {
  label: string;
  percentage: number;
  price: number;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    badge?: string;
  };
  text: string;
  timestamp: string;
  likes: number;
  replies: number;
}

export interface PricePoint {
  time: number;
  yesPrice: number;
  noPrice: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatar: string;
  };
  profit: number;
  winRate: number;
  totalTrades: number;
  streak: number;
}

export interface PortfolioPosition {
  id: string;
  memeTitle: string;
  memeImage: string;
  position: 'YES' | 'NO';
  entryPrice: number;
  currentPrice: number;
  shares: number;
  pnl: number;
  pnlPercentage: number;
}

export interface Activity {
  id: string;
  type: 'buy' | 'sell' | 'win' | 'loss';
  memeTitle: string;
  amount: number;
  price: number;
  timestamp: string;
}

export type Category = 
  | 'All'
  | 'Trending'
  | 'Breaking'
  | 'New'
  | 'Viral'
  | 'Crypto'
  | 'Sports'
  | 'Politics'
  | 'Gaming'
  | 'Entertainment'
  | 'AI'
  | 'Animals';
