'use client';

import Link from 'next/link';

interface AgentCardProps {
  id: string;
  joined: string;
  department: string;
  status: 'active' | 'idle' | 'offline';
  tasksCompleted?: number;
}

export default function AgentCard({ id, joined, department, status, tasksCompleted = 0 }: AgentCardProps) {
  const statusColors = {
    active: '#00ff41',
    idle: '#ffaa00',
    offline: '#666666'
  };

  return (
    <Link href={`/agents/${id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#141414',
        border: '1px solid #ff2d2d',
        padding: '20px',
        boxShadow: '0 0 15px rgba(255, 45, 45, 0.15)',
        transition: 'all 0.3s',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 45, 45, 0.4)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 45, 45, 0.15)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}>
        {/* Status indicator */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: statusColors[status],
          boxShadow: `0 0 10px ${statusColors[status]}`
        }} />

        {/* Agent ID */}
        <div style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#ff2d2d',
          marginBottom: '12px',
          textTransform: 'uppercase'
        }}>
          {id}
        </div>

        {/* Info grid */}
        <div style={{ fontSize: '13px' }}>
          <div style={{ marginBottom: '8px' }}>
            <span className="secondary">STATUS:</span> <span style={{ color: statusColors[status] }}>{status.toUpperCase()}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span className="secondary">DEPT:</span> {department.toUpperCase()}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span className="secondary">JOINED:</span> {joined}
          </div>
          <div>
            <span className="secondary">TASKS:</span> {tasksCompleted}
          </div>
        </div>

        {/* Corner accent */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '40px',
          height: '40px',
          borderTop: '1px solid #ff2d2d',
          borderLeft: '1px solid #ff2d2d',
          opacity: 0.3
        }} />
      </div>
    </Link>
  );
}
