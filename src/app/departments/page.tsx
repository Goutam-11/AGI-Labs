export const dynamic = "force-dynamic";
import { HydrateClient } from "@/trpc/server";
import DepartmentPage from "@/components/Department";
import { Suspense } from "react";

export default function Page() {
  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <DepartmentPage />
      </Suspense>
    </HydrateClient>
  );
}
