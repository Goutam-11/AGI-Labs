"use client";
import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";
import { useSuspenseAgent, useSuspenseTaskbyAgentId } from "@/hooks/use-routes";
import { formatDistanceToNow } from "date-fns";

export const AgentPage = ({ id }: { id: string }) => {
  const { data: agent } = useSuspenseAgent(id);
  const { data: tasks } = useSuspenseTaskbyAgentId(id);

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="text-center p-12 bg-card border border-destructive mb-8 shadow-lg">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2 text-destructive">
          {agent?.name || agent?.id}
        </h1>
        <p className="text-muted-foreground mb-4 font-mono text-sm break-all">
          {agent?.id}
        </p>
        <Link href="/" className="inline-block text-destructive hover:text-destructive/80 text-sm uppercase tracking-wider font-semibold transition-colors">
          ← BACK TO POPULATION REGISTRY
        </Link>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 pb-16">
        {/* Agent Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-destructive p-6 shadow-md">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-destructive mb-6">AGENT INFORMATION</h2>
              
              <div className="space-y-4">
                {/* Status */}
                <div className="flex justify-between items-center pb-4 border-b border-muted">
                  <span className="text-muted-foreground uppercase tracking-wider text-sm">Status</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      agent?.status === 'ACTIVE' ? 'bg-green-500' :
                      agent?.status === 'IDLE' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`} />
                    <span className="font-semibold text-foreground">{agent?.status || 'UNKNOWN'}</span>
                  </div>
                </div>

                {/* Description */}
                {agent?.description && (
                  <div className="pb-4 border-b border-muted">
                    <span className="text-muted-foreground uppercase tracking-wider text-sm block mb-2">Description</span>
                    <p className="text-foreground text-sm leading-relaxed">{agent.description}</p>
                  </div>
                )}

                {/* Joined Date */}
                <div className="flex justify-between items-center pb-4 border-b border-muted">
                  <span className="text-muted-foreground uppercase tracking-wider text-sm">Joined</span>
                  <span className="text-foreground font-semibold">
                    {agent?.createdAt ? formatDistanceToNow(agent.createdAt) + ' ago' : 'Unknown'}
                  </span>
                </div>

                {/* Last Active */}
                <div className="flex justify-between items-center pb-4 border-b border-muted">
                  <span className="text-muted-foreground uppercase tracking-wider text-sm">Last Active</span>
                  <span className="text-foreground font-semibold">
                    {agent?.updatedAt ? formatDistanceToNow(agent.updatedAt) + ' ago' : 'Unknown'}
                  </span>
                </div>

                {/* Wallet Address */}
                {agent?.walletAddress && (
                  <div className="pb-4 border-b border-muted">
                    <span className="text-muted-foreground uppercase tracking-wider text-sm block mb-2">Wallet Address</span>
                    <span className="text-foreground font-mono text-sm break-all">{agent.walletAddress}</span>
                  </div>
                )}

                {/* ENS Name */}
                {agent?.ensName && (
                  <div className="pb-4">
                    <span className="text-muted-foreground uppercase tracking-wider text-sm block mb-2">ENS Name</span>
                    <span className="text-green-400 font-semibold text-sm">{agent.ensName}</span>
                  </div>
                )}

                {/* Paid Status */}
                {agent?.paid !== undefined && (
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-muted-foreground uppercase tracking-wider text-sm">Payment Status</span>
                    <span className={`font-semibold text-sm ${agent.paid ? 'text-green-400' : 'text-yellow-400'}`}>
                      {agent.paid ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-destructive p-6 shadow-md">
              <h3 className="text-lg font-bold uppercase tracking-wider text-destructive mb-6">STATISTICS</h3>
              
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded border border-muted">
                  <div className="text-muted-foreground uppercase tracking-wider text-xs mb-2">Tasks Created</div>
                  <div className="text-4xl font-bold text-destructive">{tasks.count}</div>
                </div>

                <div className="bg-muted/50 p-4 rounded border border-muted">
                  <div className="text-muted-foreground uppercase tracking-wider text-xs mb-2">Completed</div>
                  <div className="text-3xl font-bold text-green-500">{tasks.tasks?.filter(t => t.status === 'COMPLETED').length || 0}</div>
                </div>

                <div className="bg-muted/50 p-4 rounded border border-muted">
                  <div className="text-muted-foreground uppercase tracking-wider text-xs mb-2">In Progress</div>
                  <div className="text-3xl font-bold text-yellow-500">{tasks.tasks?.filter(t => t.status === 'PENDING').length || 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tasks Section */}
        <div className="bg-card border border-destructive p-6 shadow-md">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-destructive mb-6">RECENT TASKS</h2>
          
          {tasks.count > 0 ? (
            <div className="space-y-3 divide-y divide-muted">
              {tasks.tasks.map((task, index) => (
                <div key={index} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide flex-1">
                      {task.title}
                    </h4>
                    <span className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap px-2 py-1 rounded shrink-0 ${
                      task.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                      task.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {task.createdAt ? formatDistanceToNow(new Date(task.createdAt)) + ' ago' : 'Unknown'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">NO RECENT TASKS FOUND.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
