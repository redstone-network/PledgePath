import dynamic from "next/dynamic";

const ProjectDetailShell = dynamic(() => import("../../../components/ProjectDetailShell"), { ssr: false });

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-8 dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <ProjectDetailShell />
      </div>
    </div>
  );
}
