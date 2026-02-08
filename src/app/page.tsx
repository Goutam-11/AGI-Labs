export const dynamic = "force-dynamic";
import { HydrateClient } from "@/trpc/server";
import Home from "@/components/Agents"
import { Suspense } from "react";
export default function Page() {
  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <Home/>
      </Suspense>
    </HydrateClient>
  );
}
