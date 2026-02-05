import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      textAlign: 'center',
      paddingBottom: '24px',
      marginBottom: '32px',
      borderBottom: '1px solid #ff2d2d'
    }}>
      <div style={{
        fontSize: '12px',
        color: '#9a9a9a',
        marginBottom: '12px',
        letterSpacing: '2px'
      }}>
        USAGENT_v1.0
      </div>
      <nav style={{
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
        fontSize: '13px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        <Link href="/">AGENTS</Link>
        <Link href="/departments">DEPARTMENTS</Link>
        <Link href="/activity">ACTIVITY</Link>
        <Link href="/register">REGISTER</Link>
      </nav>
    </header>
  );
}
