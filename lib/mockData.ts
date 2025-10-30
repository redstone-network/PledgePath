export type FeedItem = {
  id: string;
  type: "project" | "demand";
  title: string;
  description: string;
  category: string;
  totalPledge: number;
  backerCount: number;
  timestamp: string;
  urgency?: number;
};

export const mockFeed: FeedItem[] = [
  {
    id: "p1",
    type: "project",
    title: "Composable DeFi SDK",
    description: "A developer-first SDK to compose DeFi primitives across protocols.",
    category: "DeFi",
    totalPledge: 12.5,
    backerCount: 42,
    timestamp: "2h ago",
  },
  {
    id: "p2",
    type: "project",
    title: "On-chain Identity Wallet",
    description: "Privacy-preserving on-chain identity layers for dApps.",
    category: "Infrastructure",
    totalPledge: 8,
    backerCount: 18,
    timestamp: "1d ago",
  },
  {
    id: "d1",
    type: "demand",
    title: "Cross-chain NFT Indexer",
    description: "Need an indexer that aggregates NFT metadata across chains.",
    category: "NFT",
    totalPledge: 6,
    backerCount: 12,
    timestamp: "4h ago",
    urgency: 4,
  },
  {
    id: "p3",
    type: "project",
    title: "Mobile GameFi Protocol",
    description: "Lightweight on-ramp for game developers to add tokens & rewards.",
    category: "GameFi",
    totalPledge: 3.2,
    backerCount: 7,
    timestamp: "3d ago",
  },
  {
    id: "d2",
    type: "demand",
    title: "CLI for Wallet Automation",
    description: "A secure CLI to automate common wallet workflows for power users.",
    category: "Infrastructure",
    totalPledge: 1.5,
    backerCount: 5,
    timestamp: "6h ago",
    urgency: 2,
  },
];
