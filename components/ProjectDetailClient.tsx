"use client";
import React, { useMemo, useState } from "react";
import type { FeedItem, Comment } from "../lib/mockData";

export default function ProjectDetailClient({ item }: { item: FeedItem }) {
  const [pledgeAmount, setPledgeAmount] = useState<number>(0);
  const [hasPledged, setHasPledged] = useState(false);
  const [localPledge, setLocalPledge] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>(item.comments ?? []);
  const [newComment, setNewComment] = useState("");

  const progress = useMemo(() => {
    if (!item.goal) return null;
    return Math.min(100, Math.round((item.totalPledge / item.goal) * 100));
  }, [item.totalPledge, item.goal]);

  // openPledge removed (not used) to avoid lint unused warning

  function confirmPledge() {
    if (pledgeAmount <= 0) return;
    // mock: add to local state
    setLocalPledge((p) => p + pledgeAmount);
    setHasPledged(true);
    alert(`Mock: pledged ${pledgeAmount} SOL to ${item.title}`);
  }

  function addComment() {
    if (!newComment.trim()) return;
    const c: Comment = {
      id: `lc-${Date.now()}`,
      author: "you...mock",
      text: newComment.trim(),
      timestamp: "now",
    };
    setComments((s) => [c, ...s]);
    setNewComment("");
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-lg bg-white p-6 shadow dark:bg-[#071014]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h1>
            <div className="mt-2 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <span>By <span className="font-mono text-xs">{item.creator ?? "—"}</span></span>
              {item.verified ? <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs text-green-800">Audited</span> : null}
              <span>· {item.createdAt}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Pledged</div>
            <div className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{(item.totalPledge + localPledge).toFixed(2)} SOL</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{item.backerCount + (hasPledged ? 1 : 0)} backers</div>
          </div>
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{item.fullDescription ?? item.description}</p>
            <div className="mt-4 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="rounded-md bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-900">{item.category}</div>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600">Website</a>
              ) : null}
            </div>

            {item.goal ? (
              <div className="mt-4">
                <div className="mb-1 text-xs text-zinc-500">Progress toward goal ({item.totalPledge + localPledge}/{item.goal} SOL)</div>
                <div className="h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-green-400" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : null}
          </div>

          <aside className="rounded-md border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-[#041018]">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Pledge</div>
            <div className="mt-2 flex items-center gap-2">
              <input
                aria-label="pledge amount"
                type="number"
                min={0.01}
                step={0.01}
                value={pledgeAmount}
                onChange={(e) => setPledgeAmount(Number(e.target.value))}
                className="w-28 rounded-md border border-zinc-200 px-2 py-1 text-sm dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200"
              />
              <button onClick={confirmPledge} className="rounded-md bg-foreground px-3 py-1 text-sm font-semibold text-background" style={{ background: "#0f1724", color: "#fff" }}>Pledge</button>
            </div>

            <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">You pledged: <span className="font-semibold">{hasPledged ? `${pledgeAmount} SOL` : `—`}</span></div>
          </aside>
        </section>

        <section className="mt-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Discussion</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Comments are visible to supporters (mock behavior).</p>

          {hasPledged ? (
            <div className="mt-4">
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment" className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200" />
              <div className="mt-2 flex justify-end">
                <button onClick={addComment} className="rounded-md bg-purple-600 px-3 py-1 text-sm font-medium text-white">Post</button>
              </div>
            </div>
          ) : (
            <div className="mt-4 text-sm text-zinc-500">You need to pledge to view and participate in the discussion (mock rule).</div>
          )}

          <div className="mt-4 space-y-3">
            {(comments.length > 0 && hasPledged) ? comments.map((c) => (
              <div key={c.id} className="rounded-md border border-zinc-100 p-3 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-mono text-zinc-700 dark:text-zinc-300">{c.author}</div>
                  <div className="text-xs text-zinc-500">{c.timestamp}</div>
                </div>
                <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{c.text}</div>
              </div>
            )) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
