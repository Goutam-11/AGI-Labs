import { AgentPage } from '@/components/AgentPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AgentsPage({ params }: PageProps) {
  const { id } = await params;
  return <AgentPage id={id} />;
  
}
