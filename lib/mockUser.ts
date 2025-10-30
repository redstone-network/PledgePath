export type UserActivity = {
  id: string;
  text: string;
  timestamp: string;
};

export type UserPledge = {
  id: string; // reference id to feed item
  title: string;
  amount: number;
  type: "project" | "demand";
  timestamp: string;
};

export type UserItem = {
  id: string;
  title: string;
  createdAt: string;
};

export type MockUser = {
  wallet: string;
  balance: number;
  pledgeScore: number;
  joinDate: string;
  activities: UserActivity[];
  pledges: UserPledge[];
  created: UserItem[];
  badges: string[];
};

export const mockUser: MockUser = {
  wallet: "5HsQw7...1abc",
  balance: 24.37,
  pledgeScore: 72,
  joinDate: "2024-12-11",
  activities: [
    { id: "a1", text: "You pledged 2 SOL to Composable DeFi SDK", timestamp: "2h ago" },
    { id: "a2", text: "You submitted a Demand: Cross-chain NFT Indexer", timestamp: "1d ago" },
    { id: "a3", text: "You pledged 0.5 SOL to CLI for Wallet Automation", timestamp: "3d ago" },
  ],
  pledges: [
    { id: "p1", title: "Composable DeFi SDK", amount: 2, type: "project", timestamp: "2h ago" },
    { id: "d2", title: "CLI for Wallet Automation", amount: 0.5, type: "demand", timestamp: "3d ago" },
  ],
  created: [
    { id: "d1", title: "Cross-chain NFT Indexer", createdAt: "2025-10-28" },
  ],
  badges: ["Early Adopter", "Top Backer"],
};
