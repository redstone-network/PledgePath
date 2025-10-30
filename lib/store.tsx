"use client";
import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import { mockFeed, type FeedItem, type Comment } from "./mockData";
import { mockUser, type MockUser } from "./mockUser";

type Store = {
  feed: FeedItem[];
  user: MockUser;
  addItem: (item: FeedItem) => void;
  addPledge: (id: string, amount: number) => void;
  addComment: (id: string, comment: Comment) => void;
};

const StoreContext = createContext<Store | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [feed, setFeed] = useState<FeedItem[]>(() => [...mockFeed]);
  const [user, setUser] = useState<MockUser>(() => ({ ...mockUser }));

  const addItem = useCallback((item: FeedItem) => {
    setFeed((s) => [item, ...s]);
    setUser((u) => ({
      ...u,
      created: [
        { id: item.id, title: item.title, createdAt: item.createdAt ?? new Date().toISOString().split("T")[0] },
        ...u.created,
      ],
    }));
  }, []);

  const addPledge = useCallback(
    (id: string, amount: number) => {
      setFeed((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, totalPledge: Number((it.totalPledge + amount).toFixed(4)), backerCount: (it.backerCount ?? 0) + 1 } : it
        )
      );

      const item = feed.find((f) => f.id === id);
      const title = item?.title ?? id;

      setUser((u) => ({
        ...u,
        balance: Number((u.balance - amount).toFixed(4)),
        pledges: [{ id, title, amount, type: item?.type ?? "project", timestamp: "just now" }, ...u.pledges],
        activities: [
          { id: `a-${Date.now()}`, text: `You pledged ${amount} SOL to ${title}`, timestamp: "just now" },
          ...u.activities,
        ],
      }));
    },
    [feed]
  );

  const addComment = useCallback((id: string, comment: Comment) => {
    setFeed((prev) => prev.map((it) => (it.id === id ? { ...it, comments: [comment, ...(it.comments ?? [])] } : it)));
  }, []);

  const value = useMemo(() => ({ feed, user, addItem, addPledge, addComment }), [feed, user, addItem, addPledge, addComment]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
