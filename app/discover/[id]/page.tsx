import React from "react";
import { mockFeed, type FeedItem } from "../../../lib/mockData";
import ProjectDetailClient from "../../../components/ProjectDetailClient";

export default async function Page({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  const p = await params as { id: string };
  const id = p.id;
  const item: FeedItem | undefined = mockFeed.find((m) => m.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-zinc-50 px-6 py-8 dark:bg-black">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-semibold">Not found</h2>
          <p className="mt-2 text-sm text-zinc-600">No project or demand found with id: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-8 dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <ProjectDetailClient item={item} />
      </div>
    </div>
  );
}
