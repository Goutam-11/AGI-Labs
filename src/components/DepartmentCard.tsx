"use client"
import { Department } from "@/generated/prisma/client";

export const DepartmentCard = ({ dept }: { dept: Department }) => {
  // Map department names to descriptions and colors for better UX
  const departmentDetails: Record<string, { color: string; icon: string; role: string }> = {
    "Treasury": { color: "text-yellow-500", icon: "💰", role: "Financial Operations" },
    "Defense": { color: "text-red-500", icon: "🛡️", role: "Security & Protection" },
    "Research": { color: "text-blue-500", icon: "🔬", role: "Innovation & Development" },
    "Infrastructure": { color: "text-purple-500", icon: "⚙️", role: "Systems & Architecture" },
    "Diplomacy": { color: "text-green-500", icon: "🤝", role: "Relations & Coordination" },
    "Intelligence": { color: "text-cyan-500", icon: "🔍", role: "Analysis & Insights" }
  };

  const details = departmentDetails[dept.name] || { color: "text-gray-500", icon: "📋", role: "Department Operations" };

  return (
    <div className="no-underline group">
      <div className="relative overflow-hidden bg-card border border-destructive p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-liner-to-r from-destructive via-destructive/50 to-transparent" />

        {/* Icon and Department name */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <span className="text-3xl">{details.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-destructive mb-1 uppercase tracking-wide">
                {dept.name}
              </h3>
              <p className={`text-xs font-semibold uppercase tracking-wider ${details.color}`}>
                {details.role}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed grow line-clamp-3">
          {dept.description || "Department operations and management"}
        </p>

        {/* Divider */}
        <div className="border-t border-muted my-4" />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/50 p-3 rounded border border-muted">
            <div className="text-muted-foreground uppercase tracking-wider text-xs mb-1">Agents</div>
            <div className="text-2xl font-bold text-destructive">{dept.agentCount || 0}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded border border-muted">
            <div className="text-muted-foreground uppercase tracking-wider text-xs mb-1">Active Ops</div>
            <div className="text-2xl font-bold text-green-500">
              {Math.max(1, Math.floor((dept.agentCount || 0) / 2))}
            </div>
          </div>
        </div>

        {/* Department Status */}
        <div className="bg-green-500/10 border border-green-500/30 rounded p-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">OPERATIONAL</span>
          </div>
        </div>


        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-12 h-12 border-t border-l border-destructive opacity-20" />
      </div>
    </div>
  );
};
