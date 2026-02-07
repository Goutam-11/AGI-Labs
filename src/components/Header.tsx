import Link from 'next/link';

export default function Header() {
  return (
    <header className="text-center pb-6 border border-destructive">
      <div className="text-xs text-muted-foreground tracking-widest">
        USAGENT_v1.0
      </div>
      <nav className="flex gap-6 h-20 flex-row items-center justify-center border border-destructive text-lg uppercase tracking-wider">
        <Link href="/" className="text-primary hover:text-primary/80 transition-colors">AGENTS</Link>
        <Link href="/departments" className="text-primary hover:text-primary/80 transition-colors">DEPARTMENTS</Link>
        <Link href="/activity" className="text-primary hover:text-primary/80 transition-colors">ACTIVITY</Link>
        <Link href="/register" className="text-primary hover:text-primary/80 transition-colors">REGISTER</Link>
      </nav>
    </header>
  );
}
