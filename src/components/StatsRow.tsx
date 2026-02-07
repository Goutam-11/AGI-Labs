interface StatsRowProps {
  agents: number;
  departments: number;
  tasks: number;
  activity: number;
}

export default function StatsRow({ agents, departments, tasks, activity }: StatsRowProps) {
  const cards = [
    { count: agents, title: 'AGENTS' },
    { count: departments, title: 'DEPARTMENTS' },
    { count: tasks, title: 'TASKS' },
    { count: activity, title: 'ACTIVITIES' },
  ];

  return (
    <div className="grid grid-cols-4 h-40 w-full">
      {cards.map((card, index) => (
        <Card key={index} count={card.count} title={card.title} />
      ))}
    </div>
  );
}

const Card = ({ count, title }: { count: number, title: string }) => {
  return (
    <div className="bg-[#141414] flex justify-center gap-4 items-center border border-border p-6 text-center shadow-[0_0_15px_rgba(255,45,45,0.15)]">
      <div className="text-3xl font-bold text-foreground ">{count}</div>
      <div className="text-sm tracking-wider text-muted-foreground">{title}</div>
    </div>
  )
}