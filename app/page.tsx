import { redirect } from "next/navigation";

export default function Home() {
  // Redirect root to the Discover page
  redirect("/discover");
}
