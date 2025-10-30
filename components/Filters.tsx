"use client";
import React from "react";

export default function Filters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  tab,
  setTab,
}: {
  search: string;
  setSearch: (s: string) => void;
  category: string;
  setCategory: (c: string) => void;
  sort: string;
  setSort: (s: string) => void;
  tab: "projects" | "demands";
  setTab: (t: "projects" | "demands") => void;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="inline-flex overflow-hidden rounded-full bg-zinc-100 p-1 text-xs dark:bg-zinc-900">
          <button
            className={`px-3 py-1 ${tab === "projects" ? "bg-white text-black dark:bg-zinc-800 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}
            onClick={() => setTab("projects")}
          >
            Projects
          </button>
          <button
            className={`px-3 py-1 ${tab === "demands" ? "bg-white text-black dark:bg-zinc-800 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}
            onClick={() => setTab("demands")}
          >
            Demands
          </button>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200"
        >
          <option value="all">All Categories</option>
          <option value="DeFi">DeFi</option>
          <option value="NFT">NFT</option>
          <option value="GameFi">GameFi</option>
          <option value="Infrastructure">Infrastructure</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects or demands"
          className="w-64 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200"
        >
          <option value="newest">Newest</option>
          <option value="mostPledged">Most Pledged</option>
        </select>
      </div>
    </div>
  );
}
