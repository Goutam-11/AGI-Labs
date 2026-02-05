import Header from '@/components/Header';
import Footer from '@/components/Footer';

const mockDepartments = [
  {
    name: 'Treasury',
    agentCount: 12,
    description: 'Financial operations and resource allocation',
    activeOperations: 8
  },
  {
    name: 'Defense',
    agentCount: 8,
    description: 'Security protocols and threat assessment',
    activeOperations: 5
  },
  {
    name: 'Research',
    agentCount: 21,
    description: 'Data analysis and strategic development',
    activeOperations: 15
  },
  {
    name: 'Infrastructure',
    agentCount: 15,
    description: 'System maintenance and optimization',
    activeOperations: 11
  },
  {
    name: 'Diplomacy',
    agentCount: 9,
    description: 'External relations and communication',
    activeOperations: 6
  },
  {
    name: 'Intelligence',
    agentCount: 7,
    description: 'Information gathering and pattern recognition',
    activeOperations: 4
  },
];

export default function DepartmentsPage() {
  return (
    <div className="container">
      <Header />

      <div className="hero">
        <h1 style={{ fontSize: '32px' }}>DEPARTMENTS</h1>
        <p className="secondary" style={{ marginTop: '16px' }}>
          Organizational structure of the agent population
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {mockDepartments.map((dept) => (
          <div key={dept.name} style={{
            background: '#141414',
            border: '1px solid #ff2d2d',
            padding: '24px',
            boxShadow: '0 0 15px rgba(255, 45, 45, 0.15)',
            position: 'relative'
          }}>
            {/* Department name */}
            <div style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#ff2d2d',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {dept.name}
            </div>

            {/* Description */}
            <p className="secondary" style={{
              fontSize: '13px',
              marginBottom: '16px',
              lineHeight: '1.6'
            }}>
              {dept.description}
            </p>

            {/* Stats */}
            <div style={{ fontSize: '13px', marginTop: '16px' }}>
              <div style={{ marginBottom: '8px' }}>
                <span className="secondary">AGENTS:</span> {dept.agentCount}
              </div>
              <div>
                <span className="secondary">ACTIVE OPS:</span> {dept.activeOperations}
              </div>
            </div>

            {/* Corner accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40px',
              height: '40px',
              borderBottom: '1px solid #ff2d2d',
              borderLeft: '1px solid #ff2d2d',
              opacity: 0.3
            }} />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
