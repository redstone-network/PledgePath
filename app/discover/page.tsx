"use client";
import React, { useMemo, useState } from "react";
import Filters from "../../components/Filters";
import ProjectCard from "../../components/ProjectCard";
import type { FeedItem } from "../../lib/mockData";
import { useStore } from "../../lib/store";
import NavBar from "../../components/NavBar";

export default function DiscoverPage() {
  const { feed, addPledge } = useStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [tab, setTab] = useState<"projects" | "demands">("projects");
  const [pledgeTarget, setPledgeTarget] = useState<FeedItem | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState<number>(1);

  const items = useMemo(() => {
    let list = feed.filter((f) => (tab === "projects" ? f.type === "project" : f.type === "demand"));
    if (category !== "all") list = list.filter((l) => l.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q));
    }
    if (sort === "mostPledged") {
      list = list.sort((a, b) => b.totalPledge - a.totalPledge);
    }
    return list;
  }, [feed, search, category, sort, tab]);

  function handlePledge(item: FeedItem) {
    setPledgeTarget(item);
    setPledgeAmount(1);
  }

  function confirmPledge() {
    if (!pledgeTarget) return;
    // update store
    addPledge(pledgeTarget.id, pledgeAmount);
    alert(`Pledged ${pledgeAmount} SOL to ${pledgeTarget.title} (mock)`);
    setPledgeTarget(null);
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-8 dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <NavBar />
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Discovery Feed</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Browse recent projects and community demands. Pledge to surface high-value work.</p>
          </div>
          <div>
            <button className="rounded-full bg-gradient-to-r from-purple-600 to-green-400 px-4 py-2 text-sm font-semibold text-white">Submit</button>
          </div>
        </header>

        <Filters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          tab={tab}
          setTab={setTab}
        />

        <main className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <ProjectCard key={item.id} item={item} onPledge={handlePledge} />
          ))}
        </main>

        {items.length === 0 ? <p className="mt-6 text-center text-sm text-zinc-500">No results</p> : null}
      </div>

      {/* Pledge Modal (simple) */}
      {pledgeTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-[#071014]">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Pledge to {pledgeTarget.title}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Enter the amount of SOL you want to pledge (mock).</p>
            <div className="mt-4 flex items-center gap-3">
              <input
                type="number"
                min={0.01}
                step={0.01}
                value={pledgeAmount}
                onChange={(e) => setPledgeAmount(Number(e.target.value))}
                className="w-36 rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200"
              />
              <div className="flex gap-2">
                <button onClick={() => setPledgeTarget(null)} className="rounded-md border px-3 py-2 text-sm">Cancel</button>
                <button onClick={confirmPledge} className="rounded-md bg-foreground px-3 py-2 text-sm font-semibold text-background" style={{ background: "#0f1724", color: "#fff" }}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
