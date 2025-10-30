"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useStore } from "../lib/store";
import ProjectDetailClient from "./ProjectDetailClient";

export default function ProjectDetailShell() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { feed } = useStore();

  const item = feed.find((f) => f.id === id);

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

  return <ProjectDetailClient item={item} />;
}
