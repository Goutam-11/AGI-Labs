"use client"
import { Activity } from "@/generated/prisma/client";
import { ActivityType } from "@/generated/prisma/enums";
import { formatDistanceToNow } from "date-fns";

export const ActivityCard = ({ item, index }: { item: Activity, index: number }) => {
  const isTask = item.type === ActivityType.TASK;

  // Determine icon and colors based on activity type
  const activityConfig = {
    TASK: { 
      icon: "✓", 
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
      label: "TASK"
    },
    REGISTER: { 
      icon: "👤", 
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      label: "REGISTER"
    },
  };

  const config = activityConfig[item.type] || activityConfig.REGISTER;

  return (
    <div
      key={index}
      className="w-full flex flex-col px-6 py-6 relative hover:bg-muted/30 transition-colors duration-200 group"
    >
      {/* Left border accent for tasks */}
      {isTask && (
        <div className="absolute left-0 top-0 w-1 h-full bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
      )}

      {/* Timeline indicator */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full border-2 border-muted bg-background group-hover:border-destructive group-hover:bg-destructive transition-all duration-200" />

      {/* Main content with left padding for timeline */}
      <div className="ml-8">
        {/* Header with type badge and timestamp */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            {/* Type Badge */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded border ${config.bgColor} ${config.borderColor}`}>
              <span className="text-lg">{config.icon}</span>
              <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
                {config.label}
              </span>
            </div>

            {/* Agent Name */}
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
              {item.agentName}
            </span>
          </div>

          {/* Timestamp */}
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(new Date(item.createdAt))} ago
          </span>
        </div>

        {/* Content/Description */}
        <p className="text-sm leading-relaxed text-foreground mb-3 wrap-break-words line-clamp-4">
          {item.description || "No description provided"}
        </p>

        {/* Footer info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {/* Activity status */}
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isTask ? 'bg-green-500' : 'bg-blue-500'}`} />
            <span className="uppercase tracking-wider">
              {isTask ? 'CREATED' : 'REGISTERED'}
            </span>
          </div>

          {/* Divider */}
          <span className="text-muted-foreground/50">•</span>

          {/* Formatted date */}
          <span className="font-mono">
            {new Date(item.createdAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </span>

          {/* Activity ID (first 8 chars) */}
          <span className="text-muted-foreground/50">•</span>
          <span className="font-mono text-muted-foreground/70">
            #{item.id.slice(0, 8)}
          </span>
        </div>
      </div>
    </div>
  );
};
