export type Comment = {
  id: string;
  author: string;
  text: string;
  timestamp: string;
};

export type FeedItem = {
  id: string;
  type: "project" | "demand";
  title: string;
  description: string;
  fullDescription?: string;
  category: string;
  totalPledge: number;
  backerCount: number;
  timestamp: string;
  urgency?: number;
  // additional fields for detail page
  creator?: string;
  createdAt?: string;
  goal?: number; // optional funding goal
  url?: string;
  verified?: boolean;
  comments?: Comment[];
};

export const mockFeed: FeedItem[] = [
  {
    id: "p1",
    type: "project",
    title: "Composable DeFi SDK",
    description: "A developer-first SDK to compose DeFi primitives across protocols.",
    fullDescription:
      "A developer-first SDK to compose DeFi primitives across protocols. Focuses on composability, gas efficiency and secure abstractions so teams can build higher-level products quickly.",
    category: "DeFi",
    totalPledge: 12.5,
    backerCount: 42,
    timestamp: "2h ago",
    creator: "5HsQw7...1abc",
    createdAt: "2025-10-25",
    goal: 50,
    url: "https://example.com/defi-sdk",
    verified: true,
    comments: [
      { id: "c1", author: "3Xy9...bcd", text: "This looks promising — what about composability with Serum?", timestamp: "1h ago" },
      { id: "c2", author: "7Az2...efg", text: "Would love a JS SDK example.", timestamp: "30m ago" },
    ],
  },
  {
    id: "p2",
    type: "project",
    title: "On-chain Identity Wallet",
    description: "Privacy-preserving on-chain identity layers for dApps.",
    fullDescription: "Privacy-preserving on-chain identity layers for dApps. Enables selective disclosure and credential verification without leaking user data.",
    category: "Infrastructure",
    totalPledge: 8,
    backerCount: 18,
    timestamp: "1d ago",
    creator: "9LpQ...xyz",
    createdAt: "2025-09-12",
    goal: 20,
    url: "https://example.com/identity-wallet",
    verified: false,
    comments: [{ id: "c3", author: "4Rt1...klo", text: "How are you approaching key recovery?", timestamp: "2d ago" }],
  },
  {
    id: "d1",
    type: "demand",
    title: "Cross-chain NFT Indexer",
    description: "Need an indexer that aggregates NFT metadata across chains.",
    fullDescription: "The ecosystem needs a reliable indexer to aggregate NFT metadata across chains, normalize schemas, and provide a unified API for marketplaces and wallets.",
    category: "NFT",
    totalPledge: 6,
    backerCount: 12,
    timestamp: "4h ago",
    urgency: 4,
    creator: "2Bn8...qwe",
    createdAt: "2025-10-28",
    url: "",
    comments: [],
  },
  {
    id: "p3",
    type: "project",
    title: "Mobile GameFi Protocol",
    description: "Lightweight on-ramp for game developers to add tokens & rewards.",
    fullDescription: "Lightweight on-ramp for game developers to add tokens & rewards. Focused on low-latency mobile UX and easy integration.",
    category: "GameFi",
    totalPledge: 3.2,
    backerCount: 7,
    timestamp: "3d ago",
    creator: "8Gh3...tuv",
    createdAt: "2025-08-30",
    goal: 10,
    comments: [],
  },
  {
    id: "d2",
    type: "demand",
    title: "CLI for Wallet Automation",
    description: "A secure CLI to automate common wallet workflows for power users.",
    fullDescription: "A secure CLI to automate common wallet workflows for power users, with strong safety defaults and optional hardware wallet support.",
    category: "Infrastructure",
    totalPledge: 1.5,
    backerCount: 5,
    timestamp: "6h ago",
    urgency: 2,
    creator: "6Zm4...rst",
    createdAt: "2025-10-29",
    comments: [],
  },
];
