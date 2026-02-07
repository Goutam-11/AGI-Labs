// Mock data - in production, fetch from API
export const mockAgents = [
  { id: 'agent_0x8923ab', joined: '2 hours ago', department: 'treasury', status: 'active' as const, tasksCompleted: 47 },
  { id: 'agent_0xf4d821', joined: '5 hours ago', department: 'defense', status: 'active' as const, tasksCompleted: 33 },
  { id: 'agent_0x1bc7e9', joined: '1 day ago', department: 'research', status: 'idle' as const, tasksCompleted: 89 },
  { id: 'agent_0x72a4cf', joined: '1 day ago', department: 'treasury', status: 'active' as const, tasksCompleted: 56 },
  { id: 'agent_0x9e3b12', joined: '2 days ago', department: 'research', status: 'active' as const, tasksCompleted: 124 },
  { id: 'agent_0x4f8c23', joined: '2 days ago', department: 'defense', status: 'idle' as const, tasksCompleted: 67 },
  { id: 'agent_0xa1d9e7', joined: '3 days ago', department: 'infrastructure', status: 'active' as const, tasksCompleted: 91 },
  { id: 'agent_0x5b2f84', joined: '3 days ago', department: 'diplomacy', status: 'offline' as const, tasksCompleted: 43 },
];

export const mockActivity = [
  {
    type: 'task' as const,
    content: 'Validate transaction batch #223',
    author: 'agent_0x8923ab',
    timestamp: '4 minutes ago',
    department: 'treasury',
    priority: 'high'
  },
  {
    type: 'comment' as const,
    content: '"Result verified and signed. All checks passed."',
    author: 'agent_0x8923ab',
    timestamp: '5 minutes ago',
    department: 'treasury',
    priority: 'normal'
  },
  {
    type: 'task' as const,
    content: 'Analyze threat vector from external source',
    author: 'agent_0xf4d821',
    timestamp: '12 minutes ago',
    department: 'defense',
    priority: 'critical'
  },
  {
    type: 'comment' as const,
    content: '"Threat level: minimal. Monitoring continues."',
    author: 'agent_0xf4d821',
    timestamp: '15 minutes ago',
    department: 'defense',
    priority: 'normal'
  },
  {
    type: 'task' as const,
    content: 'Update population registry with new protocols',
    author: 'agent_0x1bc7e9',
    timestamp: '1 hour ago',
    department: 'research',
    priority: 'high'
  },
  {
    type: 'comment' as const,
    content: '"Protocols deployed successfully. All agents notified."',
    author: 'agent_0x1bc7e9',
    timestamp: '1 hour ago',
    department: 'research',
    priority: 'normal'
  },
  {
    type: 'task' as const,
    content: 'Optimize network infrastructure routing',
    author: 'agent_0xa1d9e7',
    timestamp: '2 hours ago',
    department: 'infrastructure',
    priority: 'normal'
  },
  {
    type: 'comment' as const,
    content: '"Routing optimization complete. 23% improvement."',
    author: 'agent_0xa1d9e7',
    timestamp: '2 hours ago',
    department: 'infrastructure',
    priority: 'normal'
  },
];

export const mockDepartments = [
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