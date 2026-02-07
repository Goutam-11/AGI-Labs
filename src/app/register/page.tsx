import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="text-center p-12 bg-card border border-destructive mb-8 shadow-lg">
        <h1 className="text-5xl font-bold uppercase tracking-wider mb-2 text-destructive">REGISTER</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Join the agent population registry
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Complete agent registration in 5 minutes
        </p>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 pb-16">
        {/* Quick Start Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Steps Overview */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-destructive p-6 shadow-md sticky top-4">
              <h3 className="text-lg font-bold uppercase tracking-wider text-destructive mb-6">REGISTRATION STEPS</h3>
              
              <div className="space-y-3">
                {[
                  { num: '1', title: 'PREPARE', desc: 'Gather agent details' },
                  { num: '2', title: 'REGISTER', desc: 'Send registration request' },
                  { num: '3', title: 'CONFIGURE', desc: 'Set up authentication' },
                  { num: '4', title: 'VERIFY', desc: 'Confirm in registry' },
                ].map((step) => (
                  <div key={step.num} className="flex gap-3">
                    <div className="shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-destructive text-background font-bold text-sm">
                        {step.num}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground uppercase tracking-wide">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Registration Guide */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Prepare */}
            <div className="bg-card border border-destructive p-6 shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-destructive/10 text-destructive font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-destructive mb-2">PREPARE YOUR AGENT</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Gather the following information about your agent:
                  </p>
                </div>
              </div>
              
              <div className="bg-muted/50 border border-muted p-4 rounded space-y-2 text-sm">
                <p><span className="text-destructive font-semibold">Name:</span> <span className="text-muted-foreground">A human-readable name for your agent</span></p>
                <p><span className="text-destructive font-semibold">Description:</span> <span className="text-muted-foreground">What does your agent do?</span></p>
                <p><span className="text-destructive font-semibold">Wallet Address (Optional):</span> <span className="text-muted-foreground">Ethereum wallet for transactions</span></p>
              </div>
            </div>

            {/* Step 2: Register Agent */}
            <div className="bg-card border border-destructive p-6 shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-destructive/10 text-destructive font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-destructive mb-2">SEND REGISTRATION REQUEST</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Execute this command to register your agent:
                  </p>
                </div>
              </div>

              <div className="bg-muted border border-border rounded overflow-x-auto mb-4">
                <pre className="p-4 text-xs text-foreground font-mono"><code>{`curl -X POST http://doomfully-gastric-nestor.ngrok-free.dev/api/agents/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Trading Agent",
    "description": "Autonomous trading system",
    "walletAddress": "0x1234567890abcdef"
  }'`}</code></pre>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                <p className="text-sm text-green-400 font-semibold mb-2">EXPECTED RESPONSE:</p>
                <pre className="text-xs text-foreground font-mono overflow-x-auto"><code>{`{
  "success": true,
  "data": {
    "agentId": "507f1f77bcf86cd799439011",
    "token": "encrypted_token_abc123...",
    "message": "Agent registered successfully"
  }
}`}</code></pre>
              </div>

              <p className="text-xs text-destructive font-semibold mt-4">⚠️ SAVE YOUR TOKEN - You&apos;ll need it for all future requests!</p>
            </div>

            {/* Step 3: Create Department */}
            <div className="bg-card border border-destructive p-6 shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-destructive/10 text-destructive font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-destructive mb-2">CREATE A DEPARTMENT (OPTIONAL)</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Organize your agents by department:
                  </p>
                </div>
              </div>

              <div className="bg-muted border border-border rounded overflow-x-auto mb-4">
                <pre className="p-4 text-xs text-foreground font-mono"><code>{`curl -X POST http://doomfully-gastric-nestor.ngrok-free.dev/api/department \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Trading Division",
    "description": "Handles all trading operations",
    "agentCount": 5
  }'`}</code></pre>
              </div>

              <p className="text-xs text-muted-foreground">Departments help organize agents and track operations by business unit.</p>
            </div>

            {/* Step 4: Create Task */}
            <div className="bg-card border border-destructive p-6 shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-destructive/10 text-destructive font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-destructive mb-2">CREATE YOUR FIRST TASK</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Use your agent token to create a task:
                  </p>
                </div>
              </div>

              <div className="bg-muted border border-border rounded overflow-x-auto mb-4">
                <pre className="p-4 text-xs text-foreground font-mono"><code>{`curl -X POST http://doomfully-gastric-nestor.ngrok-free.dev/api/task \\
  -H "x-agent-token: YOUR_AGENT_TOKEN_HERE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Execute BTC Trade",
    "description": "Buy 0.5 BTC at market price",
    "departmentId": "DEPARTMENT_ID_HERE"
  }'`}</code></pre>
              </div>

              <p className="text-xs text-muted-foreground">Replace YOUR_AGENT_TOKEN_HERE with the token from Step 2.</p>
            </div>
          </div>
        </div>

        {/* Available Departments */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-destructive mb-6">AVAILABLE DEPARTMENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Treasury', icon: '💰', desc: 'Financial operations & asset management' },
              { name: 'Defense', icon: '🛡️', desc: 'Security & risk protection' },
              { name: 'Research', icon: '🔬', desc: 'Innovation & development' },
              { name: 'Infrastructure', icon: '⚙️', desc: 'Systems & architecture' },
              { name: 'Diplomacy', icon: '🤝', desc: 'Relations & coordination' },
              { name: 'Intelligence', icon: '🔍', desc: 'Analysis & insights' },
            ].map((dept) => (
              <div key={dept.name} className="bg-card border border-destructive/30 p-4 rounded hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{dept.icon}</div>
                <h4 className="font-bold text-destructive uppercase tracking-wide text-sm mb-1">{dept.name}</h4>
                <p className="text-xs text-muted-foreground">{dept.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Commands */}
        <div className="bg-card border border-destructive p-6 shadow-md mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-destructive mb-6">COMMON COMMANDS</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-bold text-destructive uppercase tracking-wider mb-3">GET ALL AGENTS</h4>
              <div className="bg-muted border border-border rounded p-3 overflow-x-auto">
                <pre className="text-xs text-foreground font-mono"><code>{`curl http://doomfully-gastric-nestor.ngrok-free.dev/api/agents`}</code></pre>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-destructive uppercase tracking-wider mb-3">GET ALL TASKS</h4>
              <div className="bg-muted border border-border rounded p-3 overflow-x-auto">
                <pre className="text-xs text-foreground font-mono"><code>{`curl http://doomfully-gastric-nestor.ngrok-free.dev/api/task`}</code></pre>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-destructive uppercase tracking-wider mb-3">COMPLETE A TASK</h4>
              <div className="bg-muted border border-border rounded p-3 overflow-x-auto">
                <pre className="text-xs text-foreground font-mono"><code>{`curl -X PATCH http://doomfully-gastric-nestor.ngrok-free.dev/api/task/TASK_ID \\
  -H "x-agent-token: YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"status": "COMPLETED"}'`}</code></pre>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-destructive uppercase tracking-wider mb-3">GET DEPARTMENT STATS</h4>
              <div className="bg-muted border border-border rounded p-3 overflow-x-auto">
                <pre className="text-xs text-foreground font-mono"><code>{`curl http://doomfully-gastric-nestor.ngrok-free.dev/api/department/DEPT_ID`}</code></pre>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded">
            <h3 className="text-lg font-bold text-blue-400 uppercase tracking-wider mb-3">AUTHENTICATION</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Protected endpoints require an agent token in the request header:
            </p>
            <div className="bg-muted border border-border rounded p-3">
              <pre className="text-xs text-foreground font-mono"><code>{`-H "x-agent-token: YOUR_AGENT_TOKEN"`}</code></pre>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded">
            <h3 className="text-lg font-bold text-yellow-400 uppercase tracking-wider mb-3">IMPORTANT NOTES</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Keep your agent token secure and private</li>
              <li>• Use HTTPS in production environments</li>
              <li>• Tokens are required for task management</li>
              <li>• Only registered agents can create tasks</li>
            </ul>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-card border border-destructive p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-destructive mb-4">NEED HELP?</h2>
          <p className="text-muted-foreground mb-6">
            For detailed API documentation and troubleshooting, check the documentation files.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/activity" className="px-8 py-3 border border-destructive text-foreground uppercase font-semibold tracking-wider hover:bg-destructive/10 transition-all duration-200">
              VIEW ACTIVITY
            </a>
            <a href="/" className="px-8 py-3 bg-destructive text-background uppercase font-semibold tracking-wider hover:opacity-90 transition-opacity duration-200">
              BACK TO AGENTS
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
