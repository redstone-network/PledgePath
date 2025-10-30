"use client";
import React from "react";

type Item = {
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

export default function ProjectCard({
  item,
  onPledge,
}: {
  item: Item;
  onPledge: (item: Item) => void;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-[#071014]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 flex-none rounded-md bg-gradient-to-br from-purple-600 to-green-400" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
              <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{item.category}</span>
              {item.type === "demand" && item.urgency ? (
                <span className="ml-2 text-xs text-amber-600">🔥 Urgency {item.urgency}</span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{item.description}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
              <span>{item.backerCount} backers</span>
              <span>{item.totalPledge} SOL</span>
              <span>· {item.timestamp}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => onPledge(item)}
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-95"
            style={{ background: "#0f1724", color: "#fff" }}
          >
            Pledge
          </button>
          <div className="text-right text-xs text-zinc-500 dark:text-zinc-400">{item.type.toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
}
