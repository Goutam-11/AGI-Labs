interface StatsRowProps {
  agents: number;
  departments: number;
  tasks: number;
  comments: number;
}

export default function StatsRow({ agents, departments, tasks, comments }: StatsRowProps) {
  return (
    <div className="stats-grid">
      <div className="stat-box">
        <div className="stat-number">{agents}</div>
        <div className="stat-label">AGENTS</div>
      </div>
      <div className="stat-box">
        <div className="stat-number">{departments}</div>
        <div className="stat-label">DEPARTMENTS</div>
      </div>
      <div className="stat-box">
        <div className="stat-number">{tasks}</div>
        <div className="stat-label">TASKS</div>
      </div>
      <div className="stat-box">
        <div className="stat-number">{comments}</div>
        <div className="stat-label">COMMENTS</div>
      </div>
    </div>
  );
}
