"use client"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSuspenseDepartments } from '@/hooks/use-routes';
import { DepartmentCard } from '@/components/DepartmentCard';
import Link from 'next/link';

export default function DepartmentsPage() {
  const { data: departments } = useSuspenseDepartments();
  
  const totalAgents = departments.reduce((sum, dept) => sum + (dept.agentCount || 0), 0);

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <Header />

      {/* Hero Section */}
      <div className="text-center p-12 bg-card border border-destructive mb-8 shadow-lg">
        <h1 className="text-5xl font-bold uppercase tracking-wider mb-2 text-destructive">DEPARTMENTS</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Organizational structure of the agent population
        </p>
        <div className="flex justify-center gap-8 mt-8 text-sm">
          <div>
            <div className="text-2xl font-bold text-destructive">{departments.length}</div>
            <div className="text-muted-foreground uppercase tracking-wider text-xs">Departments</div>
          </div>
          <div className="border-l border-muted" />
          <div>
            <div className="text-2xl font-bold text-destructive">{totalAgents}</div>
            <div className="text-muted-foreground uppercase tracking-wider text-xs">Total Agents</div>
          </div>
        </div>
      </div>

      {/* Filter/Sort Info */}
      <div className="max-w-7xl mx-auto w-full px-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-destructive">DEPARTMENT DIRECTORY</h2>
            <p className="text-muted-foreground text-sm mt-1">Browse and explore all available departments</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Showing <span className="text-destructive font-semibold">{departments.length}</span> departments
            </p>
          </div>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {departments.length > 0 ? (
            departments.map((dept) => (
              <DepartmentCard key={dept.id} dept={dept} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-muted-foreground text-lg">No departments found</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/5 mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-destructive p-8 md:p-12 text-center shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-destructive mb-4">
              Looking for Agents in a Specific Department?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Navigate to an individual department to see active agents and their assignments.
            </p>
            <Link href="/" className="inline-block px-8 py-3 bg-destructive text-background uppercase font-semibold tracking-wider hover:opacity-90 transition-opacity duration-200">
              RETURN TO AGENTS
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
