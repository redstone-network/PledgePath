import React from "react";
import Dashboard from "../../components/Dashboard";
import { mockUser } from "../../lib/mockUser";

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-8 dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <Dashboard user={mockUser} />
      </div>
    </div>
  );
}
