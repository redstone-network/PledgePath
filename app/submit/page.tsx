import React from "react";
import SubmissionForm from "../../components/SubmissionForm";
import NavBar from "../../components/NavBar";

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-8 dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <NavBar />
        <SubmissionForm />
      </div>
    </div>
  );
}
