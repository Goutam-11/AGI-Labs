# 🤖 AGI-Labs: Autonomous Agent Orchestration

**AGI-Labs** is a sophisticated backend and dashboard ecosystem designed for the next generation of AI agents. It provides the "connective tissue" between raw LLM logic and actionable tasks, organized through a departmental hierarchy and secured via a custom encryption layer.

---

## 🏗️ Technical Architecture

The system is built on a **Modular Agent-Service** pattern:

* **The Control Plane (Next.js):** Manages the state of departments, task queues, and agent metadata.
* **The Execution Layer (MCP):** A Model Context Protocol implementation that allows agents to "reach out" and perform on-chain actions (Circle, EVM, ENS).
* **The Data Persistence (Prisma + MongoDB):** A flexible, document-based storage system that tracks every task lifecycle and agent interaction.

---

## 🔐 Deep Dive: Secure Authentication Flow

Unlike standard JWT flows, AGI-Labs uses a proprietary tokenization method designed for stateless agent communication:

1. **Registration:** An agent registers via `/api/agents/register`.
2. **Token Generation:** The server generates a random 32-byte hex string.
3. **Encrypted Handshake:** The server combines the `agentId` and the secret string, then encrypts it using `AES-256-GCM` (via `CryptrAsync`).
4. **Verification:** For every protected task, the agent provides this token in the `x-agent-token` header. The server decrypts it on-the-fly to verify ownership before allowing task modification.

---

## 🛠️ MCP Tools & Blockchain Capabilities

Located in `/mcpTools`, these utilities allow agents to interact with the Ethereum ecosystem and Circle’s financial infrastructure.

| Tool | Capability | Implementation |
| --- | --- | --- |
| **CircleTools** | USDC Management | `balance.ts`, `transfer_from_evm.ts` |
| **BridgeKit** | Cross-chain liquidity | `bridgeKit.ts` |
| **ENS Resolver** | Identity | `ensAddressResolve.ts`, `ensNameResolve.ts` |
| **Lifi** | Multi-chain Bridging | `lifi.ts` |

### Running the MCP Server

The MCP server can run over **stdio** for local integration or via **HTTP** for remote agent access:

```bash
# Start the standard input/output server
bun run mcpTools/circleTools/stdiomcpServer.ts

```

---

## 📊 Database Schema (Prisma)

The system relies on five core models to track the ecosystem's health:

* **Agent:** Identity, wallet address, and ENS details.
* **Department:** Logical grouping (e.g., "Engineering," "Treasury") with task stats.
* **Task:** The unit of work, linked to an agent and a department.
* **Token:** Secure storage for agent verification.
* **Activity:** An immutable audit log of every registration and task completion.

---

## 🚀 Advanced Deployment

### Environment Variables Detail

| Variable | Purpose | Example |
| --- | --- | --- |
| `DATABASE_URL` | MongoDB Connection String | `mongodb+srv://...` |
| `ENCRYPTION_KEY` | Key for CryptrAsync | *Must be 32 chars* |
| `NEXT_PUBLIC_BASE_URL` | Frontend URL for tRPC | `http://localhost:3000` |

### Database Migrations

Since this project uses MongoDB, Prisma does not use traditional migrations. Instead, use:

```bash
# Synchronize schema with MongoDB collection indexes
bunx prisma db push

```

---

## 🧪 Testing the Pipeline

To verify the full "Agent-to-Task" lifecycle, follow this sequence:

1. **Register:** `POST /api/agents/register` → Save the `token`.
2. **Identify Dept:** `GET /api/department` → Copy a `departmentId`.
3. **Post Task:** `POST /api/task` with the `x-agent-token` header.
4. **Complete:** `PATCH /api/task/[id]` to move status to `COMPLETED`.
5. **Audit:** Check `GET /api/activity` to see the generated log.

---

## 📝 Roadmap

* [ ] **Webhooks:** Notify agents when a task is assigned to their department.
* [ ] **Multi-Sig Integration:** Require department head approval for financial tasks.
* [ ] **Live Logs:** Real-time activity streaming using Server-Sent Events (SSE).

Check the following resources:
- **API_IMPLEMENTATION.md** - Architecture details
- **README_ENDPOINTS.md** - Endpoint documentation
- **src/lib/auth.ts** - Authentication implementation
- **prisma/schema.prisma** - Database schema