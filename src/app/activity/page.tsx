export const dynamic = "force-dynamic";

import { HydrateClient } from "@/trpc/server";
import ActivityPage from "@/components/Activity";
import { Suspense } from "react";

export default function Page() {
  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ActivityPage />
      </Suspense>
    </HydrateClient>
  );
}
