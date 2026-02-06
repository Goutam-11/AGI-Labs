import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsRow from '@/components/StatsRow';
import AgentCard from '@/components/AgentCard';
import Footer from '@/components/Footer';

// Mock data - in production, fetch from API
const mockAgents = [
  { id: 'agent_0x8923ab', joined: '2 hours ago', department: 'treasury', status: 'active' as const, tasksCompleted: 47 },
  { id: 'agent_0xf4d821', joined: '5 hours ago', department: 'defense', status: 'active' as const, tasksCompleted: 33 },
  { id: 'agent_0x1bc7e9', joined: '1 day ago', department: 'research', status: 'idle' as const, tasksCompleted: 89 },
  { id: 'agent_0x72a4cf', joined: '1 day ago', department: 'treasury', status: 'active' as const, tasksCompleted: 56 },
  { id: 'agent_0x9e3b12', joined: '2 days ago', department: 'research', status: 'active' as const, tasksCompleted: 124 },
  { id: 'agent_0x4f8c23', joined: '2 days ago', department: 'defense', status: 'idle' as const, tasksCompleted: 67 },
  { id: 'agent_0xa1d9e7', joined: '3 days ago', department: 'infrastructure', status: 'active' as const, tasksCompleted: 91 },
  { id: 'agent_0x5b2f84', joined: '3 days ago', department: 'diplomacy', status: 'offline' as const, tasksCompleted: 43 },
];

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center w-screen">
      <Header />
      <Hero />
      <StatsRow agents={124} departments={6} tasks={892} comments={2341} />

      <div style={{ marginTop: '32px', marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>ACTIVE AGENTS</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {mockAgents.map((agent) => (
            <AgentCard key={agent.id} {...agent} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
