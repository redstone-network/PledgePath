"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { mockFeed, type FeedItem } from "../lib/mockData";

export default function SubmissionForm() {
  const router = useRouter();
  const [type, setType] = useState<"project" | "demand">("project");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [category, setCategory] = useState("DeFi");
  const [website, setWebsite] = useState("");
  const [urgency, setUrgency] = useState<number>(3);
  const [initialStake, setInitialStake] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errs: string[] = [];
    if (!title.trim()) errs.push("Title is required");
    if (title.length > 50) errs.push("Title must be 50 characters or less");
    if (!description.trim()) errs.push("Short description is required");
    if (description.length > (type === "project" ? 200 : 300)) errs.push("Description is too long");
    if (type === "demand" && (!initialStake || initialStake <= 0)) errs.push("Initial support stake is required for demands");
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (errs.length) return;
    setSubmitting(true);

    // mock: create new item and push to mockFeed
    const id = `${type[0]}${Date.now()}`;
    const now = new Date().toISOString();
    const item: FeedItem = {
      id,
      type,
      title: title.trim(),
      description: description.trim(),
      fullDescription: fullDescription.trim() || undefined,
      category,
      totalPledge: Number(initialStake) || 0,
      backerCount: initialStake && initialStake > 0 ? 1 : 0,
      timestamp: "just now",
      creator: "you...mock",
      createdAt: now.split("T")[0],
      goal: type === "project" ? undefined : undefined,
      url: website || undefined,
      verified: false,
      comments: [],
    };

    // push into mockFeed (in-memory)
    // Mutate module-level mock feed for prototype (in-memory).
    // In practice the app would call an API / submit on-chain; here we push into the exported mock array.
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockFeed.unshift(item as any);
    } catch (err) {
      console.error("Failed to append mock item", err);
    }

    // simulate wallet signing modal / tx
    await new Promise((res) => setTimeout(res, 800));
    alert(`Submitted ${type} "${item.title}" (mock)`);
    setSubmitting(false);
    // navigate to discover to see created item
    router.push("/discover");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow dark:bg-[#071014]">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Submit Project or Demand</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Fill the form below to submit a new project or a community demand. Submissions require connecting a wallet in the real app; this is a mock.</p>

      <div className="mt-4 flex items-center gap-4">
        <label className="inline-flex items-center gap-2">
          <input type="radio" checked={type === "project"} onChange={() => setType("project")} />
          <span>Submit Project</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="radio" checked={type === "demand"} onChange={() => setType("demand")} />
          <span>Submit Demand</span>
        </label>
      </div>

      <div className="mt-4 grid gap-3">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={50} className="mt-1 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200" />
          <div className="mt-1 text-xs text-zinc-500">Max 50 characters</div>
        </div>

        <div>
          <label className="block text-sm font-medium">Short Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={type === "project" ? 200 : 300} className="mt-1 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200" />
          <div className="mt-1 text-xs text-zinc-500">{type === "project" ? "Max 200 characters" : "Max 300 characters"}</div>
        </div>

        <div>
          <label className="block text-sm font-medium">Full Description (optional)</label>
          <textarea value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200">
              <option>DeFi</option>
              <option>NFT</option>
              <option>GameFi</option>
              <option>Infrastructure</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Website (optional)</label>
            <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" className="mt-1 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200" />
          </div>
        </div>

        {type === "demand" ? (
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Urgency (1-5)</label>
              <input type="range" min={1} max={5} value={urgency} onChange={(e) => setUrgency(Number(e.target.value))} className="mt-1 w-full" />
              <div className="mt-1 text-xs text-zinc-500">Urgency: {urgency}</div>
            </div>
            <div>
              <label className="block text-sm font-medium">Initial Support Stake (SOL)</label>
              <input type="number" min={0} step={0.01} value={initialStake} onChange={(e) => setInitialStake(Number(e.target.value))} className="mt-1 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200" />
              <div className="mt-1 text-xs text-zinc-500">A stake is required to post a demand (mock).</div>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <label className="block text-sm font-medium">Initial Pledge (optional)</label>
            <input type="number" min={0} step={0.01} value={initialStake} onChange={(e) => setInitialStake(Number(e.target.value))} className="mt-1 w-40 rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-[#071014] dark:text-zinc-200" />
          </div>
        )}

        {errors.length ? (
          <div className="mt-2 rounded-md bg-red-50 p-3 text-sm text-red-700">
            <ul>
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-4 flex items-center justify-end gap-3">
          <button type="button" onClick={() => {
            // reset
            setTitle(""); setDescription(""); setFullDescription(""); setWebsite(""); setInitialStake(0); setUrgency(3);
          }} className="rounded-md border px-3 py-2 text-sm">Reset</button>
          <button type="submit" disabled={submitting} className="rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background" style={{ background: "#0f1724", color: "#fff" }}>{submitting ? "Submitting..." : "Submit"}</button>
        </div>
      </div>
    </form>
  );
}
