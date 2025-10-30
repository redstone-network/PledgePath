"use client";
import React, { useMemo } from "react";
import { useStore } from "../lib/store";

export default function Dashboard() {
  const { user } = useStore();
  const totalPledged = useMemo(() => user.pledges.reduce((s, p) => s + p.amount, 0), [user.pledges]);

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Dashboard</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Overview of your activity, pledges and reputation.</p>
        </div>
        <div>
          <button className="rounded-full bg-gradient-to-r from-purple-600 to-green-400 px-4 py-2 text-sm font-semibold text-white">Edit Profile</button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="col-span-1 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#071014]">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-md bg-gradient-to-br from-purple-600 to-green-400" />
            <div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Connected Wallet</div>
              <div className="font-mono text-sm">{user.wallet}</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Balance</div>
            <div className="text-xl font-semibold">{user.balance.toFixed(2)} SOL</div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">PledgeScore</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-40 rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-green-400" style={{ width: `${user.pledgeScore}%` }} />
              </div>
              <div className="text-sm font-semibold">{user.pledgeScore}</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#071014]">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Activity</h3>
            <div className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {user.activities.map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <div>{a.text}</div>
                  <div className="text-xs text-zinc-500">{a.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#071014]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Portfolio Overview</h3>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Active pledges: {user.pledges.length}</div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Value of Active Pledges</div>
                <div className="text-2xl font-semibold">{totalPledged.toFixed(2)} SOL</div>
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Estimated ROI: —</div>
            </div>

            <div className="mt-4 space-y-2">
              {user.pledges.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-md border border-zinc-100 p-2 dark:border-zinc-800">
                  <div>
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="text-xs text-zinc-500">{p.type.toUpperCase()} · {p.timestamp}</div>
                  </div>
                  <div className="text-sm font-medium">{p.amount} SOL</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#071014]">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Your Items</h3>
          <div className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {user.created.length ? user.created.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-md border border-zinc-100 p-2 dark:border-zinc-800">
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-xs text-zinc-500">Created {c.createdAt}</div>
                </div>
                <a href={`/discover/${c.id}`} className="text-sm text-blue-600">View</a>
              </div>
            )) : <div className="text-sm text-zinc-500">You haven&apos;t created any projects or demands yet.</div>}
          </div>
        </div>

        <aside className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#071014]">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Reputation</h4>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">PledgeScore: {user.pledgeScore}</div>
          <div className="mt-3">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Badges</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.badges.map((b) => (
                <span key={b} className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">{b}</span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
