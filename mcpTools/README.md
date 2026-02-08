## Circle & Li.Fi MCP Suite

This project implements a dual-interface **Model Context Protocol (MCP)** server designed for the Circle ecosystem and Li.Fi's cross-chain aggregation. It enables AI models to perform complex on-chain operations—including intent-based transfers, bridging, and identity resolution—through a simple natural language interface.

---

### 🏛 Architecture & Deployment

The suite provides two entry points using the same core logic:

* **Stdio Server:** The standard for local environments like **Claude Desktop**. It communicates over standard input/output.
* **HTTP Server:** A **Streamable HTTP** transport (defaulting to Port 5000). Ideal for web integrations or remote server setups where a persistent process is required.

---

### 🛠 Core Toolset

#### **Circle Gateway & Intents**

* **`balance_of_gateway_wallet`**: Queries the Circle Gateway API to aggregate USDC balances across all supported testnet domains (Sepolia, Base, Avalanche, etc.).
* **`transfer_from_evm`**: A high-level tool for cross-chain USDC movement. It generates **EIP-712** burn intents, requests Circle attestation, and executes the mint on the destination chain.
* **`deposit_to_gateway_wallet`**: Handles the on-chain workflow of `approve` (ERC-20) and `deposit` into the Circle Gateway contract.

#### **Liquidity & Bridging**

* **`bridge_usdc`**: Uses the **Circle Bridge Kit** and Viem adapters for native, high-security USDC transfers between EVM chains.
* **`lifisdk_bridge_tool`**: Provides access to the **Li.Fi SDK**, allowing for general token-to-token swaps and bridges across EVM chains (Arbitrum, Polygon, Optimism) and Sui.

#### **Identity Resolution**

* **`ens_address_tool` / `ens_name_tool**`: Powered by `@ensdomains/ensjs` to resolve human-readable `.eth` names to `0x` addresses and vice-versa.

---

### ⚙️ Configuration & Installation

**1. Environment Setup**
Create a `.env` file in your root directory:

```bash
EVM_PRIVATE_KEY=0x... # The account that will sign transactions and intents
WALLET_ADDRESS=0x...   # Your public address for Li.Fi quote routing
PORT=5000              # Port for the HTTP transport variant

```

**2. Install & Build**

```bash
npm install
npm run build

```

---

### 🔌 Client Integration

#### **Claude Desktop**

To use this with Claude, update your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "circle-tools": {
      "command": "node",
      "args": ["/absolute/path/to/dist/stdiomcpServer.js"],
      "env": {
        "EVM_PRIVATE_KEY": "your_private_key_here"
      }
    }
  }
}

```

#### **Programmatic HTTP**

Start the server:

```bash
node dist/mcpServer.js

```

The server will be available at `http://localhost:5000/mcp`.

---

### ⛓ Supported Networks

The suite supports a wide range of testnets for development:

* **Ethereum:** Sepolia
* **L2s:** Base Sepolia, Arbitrum, Optimism
* **Emerging:** Sei Testnet, Sonic Testnet, Worldchain Sepolia, Hyperliquid EVM

---
