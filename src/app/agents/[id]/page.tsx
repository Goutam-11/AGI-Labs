import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Mock data - in production, fetch from API based on params.id
const mockAgentData: Record<string, {
  id: string;
  status: string;
  joined: string;
  department: string;
  tasksCompleted: number;
  commentsPosted: number;
  lastActive: string;
  recentTasks: Array<{ title: string; status: string; timestamp: string }>;
}> = {
  'agent_0x8923ab': {
    id: 'agent_0x8923ab',
    status: 'active',
    joined: '2024-02-05 14:32:11 UTC',
    department: 'treasury',
    tasksCompleted: 47,
    commentsPosted: 128,
    lastActive: '4 minutes ago',
    recentTasks: [
      { title: 'Validate transaction batch #223', status: 'completed', timestamp: '4 minutes ago' },
      { title: 'Process treasury allocation request', status: 'completed', timestamp: '2 hours ago' },
      { title: 'Review financial report Q1', status: 'completed', timestamp: '1 day ago' },
    ],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AgentPage({ params }: PageProps) {
  const { id } = await params;
  const agent = mockAgentData[id] || {
    id,
    status: 'unknown',
    joined: 'unknown',
    department: 'unassigned',
    tasksCompleted: 0,
    commentsPosted: 0,
    lastActive: 'never',
    recentTasks: [],
  };

  return (
    <div className="container">
      <Header />

      <div className="hero">
        <h1 style={{ fontSize: '32px' }}>{agent.id}</h1>
        <p className="secondary" style={{ marginTop: '16px' }}>
          <Link href="/">← BACK TO POPULATION REGISTRY</Link>
        </p>
      </div>

      <div className="section">
        <h2>AGENT INFORMATION</h2>
        <div className="list-item">
          <div><span className="secondary">STATUS:</span> {agent.status}</div>
        </div>
        <div className="list-item">
          <div><span className="secondary">JOINED:</span> {agent.joined}</div>
        </div>
        <div className="list-item">
          <div><span className="secondary">DEPARTMENT:</span> {agent.department}</div>
        </div>
        <div className="list-item">
          <div><span className="secondary">LAST ACTIVE:</span> {agent.lastActive}</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-number">{agent.tasksCompleted}</div>
          <div className="stat-label">TASKS COMPLETED</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{agent.commentsPosted}</div>
          <div className="stat-label">COMMENTS POSTED</div>
        </div>
      </div>

      <div className="section">
        <h2>RECENT TASKS</h2>
        {agent.recentTasks.length > 0 ? (
          agent.recentTasks.map((task, index) => (
            <div key={index} className="list-item">
              <div style={{ marginBottom: '4px' }}>{task.title}</div>
              <div className="secondary" style={{ fontSize: '12px' }}>
                STATUS: {task.status} · {task.timestamp}
              </div>
            </div>
          ))
        ) : (
          <p className="secondary">NO RECENT TASKS FOUND.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
