"use client";

import { Agent } from "@/generated/prisma/client";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useSuspenseTaskbyAgentId } from "@/hooks/use-routes";

export default function AgentCard({ agent }: { agent: Agent }) {
  const { data } = useSuspenseTaskbyAgentId(agent.id);
  const tasksCompleted = data.count;
  
  const statusConfig = {
    ACTIVE: { color: "bg-green-500", textColor: "text-green-400", label: "●" },
    IDLE: { color: "bg-yellow-500", textColor: "text-yellow-400", label: "●" },
    OFFLINE: { color: "bg-gray-500", textColor: "text-gray-400", label: "●" },
  };

  const status = statusConfig[agent.status] || statusConfig.OFFLINE;

  return (
    <Link href={`/agents/${agent.id}`} className="no-underline group">
      <div className="relative overflow-hidden bg-card border border-destructive rounded-sm p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-destructive/50 hover:-translate-y-1 shadow-md h-full flex flex-col">
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-destructive via-destructive/50 to-transparent" />

        {/* Header with status */}
        <div className="flex items-start justify-between mb-4">
          {/* Status indicator with label */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${status.color} shadow-lg`} style={{boxShadow: `0 0 8px ${status.color}`}} />
            <span className={`text-xs font-bold uppercase tracking-widest ${status.textColor}`}>
              {agent.status}
            </span>
          </div>
          
          {/* Task badge */}
          <div className="bg-destructive/10 border border-destructive/30 rounded px-2 py-1">
            <span className="text-xs font-semibold text-destructive">{tasksCompleted}</span>
          </div>
        </div>

        {/* Agent Name/ID */}
        <h3 className="text-lg font-bold text-destructive mb-1 uppercase tracking-wide line-clamp-2">
          {agent.name}
        </h3>

        {/* Agent ID */}
        <p className="text-xs text-muted-foreground mb-4 font-mono break-all">
          {agent.id}
        </p>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-5 line-clamp-3 grow">
          {agent.description || "No description provided"}
        </p>

        {/* Divider */}
        <div className="border-t border-muted my-4" />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-4">
          <div className="bg-muted/50 p-3 rounded border border-muted">
            <div className="text-muted-foreground uppercase tracking-wider text-xs mb-1">Joined</div>
            <div className="text-foreground font-semibold">
              {formatDistanceToNow(agent.createdAt)} ago
            </div>
          </div>
          <div className="bg-muted/50 p-3 rounded border border-muted">
            <div className="text-muted-foreground uppercase tracking-wider text-xs mb-1">Tasks</div>
            <div className="text-foreground font-semibold">
              {tasksCompleted}
            </div>
          </div>
        </div>

        {/* Wallet info (if available) */}
        {agent.walletAddress && (
          <div className="bg-muted/30 p-3 rounded border border-muted/50 mb-4">
            <div className="text-muted-foreground uppercase tracking-wider text-xs mb-1">Wallet</div>
            <div className="text-foreground font-mono text-xs truncate">
              {agent.walletAddress.slice(0, 10)}...{agent.walletAddress.slice(-8)}
            </div>
          </div>
        )}

        {/* ENS Name (if available) */}
        {agent.ensName && (
          <div className="bg-green-500/10 p-3 rounded border border-green-500/30 mb-4">
            <div className="text-muted-foreground uppercase tracking-wider text-xs mb-1">ENS</div>
            <div className="text-green-400 font-semibold text-sm">
              {agent.ensName}
            </div>
          </div>
        )}

        {/* Bottom action hint */}
        <div className="text-xs text-muted-foreground text-center mt-auto pt-3 border-t border-muted/30 group-hover:text-destructive transition-colors">
          Click to view details →
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-12 h-12 border-t border-l border-destructive opacity-20" />
      </div>
    </Link>
  );
}
