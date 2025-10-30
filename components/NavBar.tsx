"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavBar() {
  const path = usePathname() || "/";

  const links = [
    { href: "/discover", label: "Discover" },
    { href: "/submit", label: "Submit" },
  ];

  return (
    <nav className="mb-6 rounded-md bg-white/60 px-4 py-3 shadow-sm backdrop-blur-sm dark:bg-[#071014]/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-bold text-zinc-900 dark:text-zinc-50">PledgePath</Link>
          <div className="ml-4 flex gap-2">
            {links.map((l) => {
              const active = path.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={
                    "rounded-md px-3 py-1 text-sm font-medium " +
                    (active ? "bg-foreground text-background" : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-[#0b1216]")
                  }
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Mock wallet: 42.1234 SOL</div>
          <Link
            href="/dashboard"
            className={
              "rounded-md px-3 py-1 text-sm font-medium " +
              (path.startsWith("/dashboard") ? "bg-foreground text-background" : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-[#0b1216]")
            }
          >
            User Info
          </Link>
        </div>
      </div>
    </nav>
  );
}
