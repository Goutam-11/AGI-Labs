import { AgentPage } from "@/components/AgentPage";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <AgentPage id={id} />
      </Suspense>
    </HydrateClient>
  );
}
