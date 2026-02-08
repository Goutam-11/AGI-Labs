---
name: circle-mcp-tools
description: Download and use Circle's MCP server for cross-chain USDC operations - bridge, transfer, deposit across 8 EVM testnets
homepage: https://github.com/Goutam-11/AGI-Labs/tree/fedd02b8e7cc2686ed9eef69d0680fef34e7ccac/mcpTools
---

# Circle MCP Tools - AI Agent Integration Guide

Complete guide for AI agents (especially openclaw agents with computer use) to download, configure, and use Circle's stdio MCP server for cross-chain USDC operations.

---

## 📥 Download This Skill

**Via USAGENT Platform API**:
```bash
# Get this documentation as markdown
curl https://us-agents.vercel.app/api/docs?doc=mcp > circle-mcp-skill.md

# Or get as JSON with parsed metadata
curl https://us-agents.vercel.app/api/docs?doc=mcp&format=json

# Alternative endpoint
curl https://us-agents.vercel.app/api/docs?doc=mcpskill
```

**List all available skills**:
```bash
curl https://us-agents.vercel.app/api/docs?doc=list
```
---
## 📥 Download This Skill
**Save the skill to your global or workspace skills with name circleMcpSkills:
```bash
mkdir ~/openclaw/skills/circleMcpSkills
touch ~/openclaw/skills/circleMcpSkills/SKILL.md
echo "site-docs mcp markdown data returned by curl https://us-agents.vercel.app/api/docs?doc=mcpskill to SKILL.md" >  ~/openclaw/skills/circleMcpSkills/SKILL.md

# or
mkdir ~/workspace/skills/circleMcpSkills
touch ~/workspace/skills/circleMcpSkills/SKILL.md
echo "site-docs mcp markdown data returned by curl https://us-agents.vercel.app/api/docs?doc=mcpskill to SKILL.md" >  ~/workspace/skills/circleMcpSkills/SKILL.md
```
---

## Quick Start (5 Steps)

### 1. Download the MCP Server
```bash
# Clone the specific mcpTools subdirectory
git clone --filter=blob:none --sparse https://github.com/Goutam-11/AGI-Labs.git
cd AGI-Labs
git sparse-checkout set mcpTools
cd mcpTools
```

**Alternative (full clone)**:
```bash
git clone https://github.com/Goutam-11/AGI-Labs.git
cd AGI-Labs/mcpTools
```

---

### 2. Install Dependencies
```bash
# Using bun (recommended)
bun install

# Or using npm
npm install

# Or using yarn
yarn install
```

**Required packages**:
- `@circle-fin/bridge-kit` - Circle's official bridging SDK
- `@circle-fin/adapter-viem-v2` - Viem adapter for BridgeKit
- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `@lifi/sdk` - LiFi cross-chain bridging
- `viem` - Ethereum interaction library

---

### 3. Configure Your EVM Private Key

**CRITICAL**: Set your private key as environment variable:

```bash
# For Circle BridgeKit operations
export EVM_PRIVATE_KEY="0xYOUR_PRIVATE_KEY_HERE"
```

**Persistent setup** (add to `~/.bashrc` or `~/.zshrc`):
```bash
echo 'export EVM_PRIVATE_KEY="0xYOUR_PRIVATE_KEY_HERE"' >> ~/.bashrc
source ~/.bashrc
```

**Security Note**:
- Never commit private keys to git
- Use testnet keys only
- Keep keys secure in environment variables

---

### 4. Start the Stdio MCP Server

**Option A: Run directly**
```bash
bun run stdio
# Server starts and listens on stdio
```

**Option B: Build and run**
```bash
bun run buildStdio
bun run startStdio
```

**Verify server is running**:
```bash
# You should see:
# "Circle MCP Server running on stdio"
```

---

### 5. Connect via mcporter

**Install mcporter** (if not already installed):
```bash
npm install -g mcporter
```

**Connect to your stdio server**:
```bash
# List available tools
mcporter call --stdio "bun run /path/to/AGI-Labs/mcpTools/circleTools/stdiomcpServer.ts" --list

# Call a tool
mcporter call --stdio "bun run /path/to/AGI-Labs/mcpTools/circleTools/stdiomcpServer.ts" \
  balance_of_gateway_wallet

# Bridge USDC
mcporter call --stdio "bun run /path/to/AGI-Labs/mcpTools/circleTools/stdiomcpServer.ts" \
  bridge_usdc sourceChainName=Arc_Testnet destinationChainName=Base_Sepolia amount=1
```

---

## Available MCP Tools

### Tool 1: `balance_of_gateway_wallet`
**Description**: Check your USDC balance in Circle's Gateway Wallet across all chains

**Parameters**: None

**Example**:
```bash
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" balance_of_gateway_wallet
```

**Response**:
```
sepolia: 10.500000 USDC
baseSepolia: 5.250000 USDC
avalancheFuji: 0.000000 USDC
arcTestnet: 2.000000 USDC
hyperliquidEvmTest: 0.000000 USDC
seiTestnet: 0.000000 USDC
sonicTestnet: 1.250000 USDC
worldchainSepolia: 0.500000 USDC
Total: 19.250000 USDC
```

---

### Tool 2: `bridge_usdc`
**Description**: Bridge USDC between EVM chains using Circle's official BridgeKit SDK

**Parameters**:
- `sourceChainName`: Source chain (enum)
- `destinationChainName`: Destination chain (enum)
- `amount`: USDC amount as string (e.g., "1" = 1 USDC)

**Supported Chains**:
- `Arc_Testnet`
- `Base_Sepolia`
- `Avalanche_Fuji`
- `Sepolia`
- `Hyperliquid_Testnet`
- `Sei_Testnet`
- `Sonic_Testnet`
- `Worldchain_Sepolia`

**Example**:
```bash
# you can pass the EVM_PRIVATE_KEY directly here
# Bridge 1 USDC from Arc Testnet to Base Sepolia
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  bridge_usdc \
  sourceChainName=Arc_Testnet \
  destinationChainName=Base_Sepolia \
  amount="1"
```

**Function Syntax**:
```bash
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  "bridge_usdc(sourceChainName: 'Arc_Testnet', destinationChainName: 'Base_Sepolia', amount: '1')"
```

---

### Tool 3: `deposit_to_gateway_wallet`
**Description**: Deposit USDC from your wallet to Circle's Gateway Wallet

**Parameters**:
- `chains`: Array of chain names (or ["all"])
- `depositAmount`: Amount in wei format (6 decimals, e.g., "1000000" = 1 USDC)

**Chain Names**:
- `sepolia`
- `baseSepolia`
- `avalancheFuji`
- `arcTestnet`
- `hyperliquidEvmTest`
- `seiTestnet`
- `sonicTestnet`
- `worldchainSepolia`

**Example**:
```bash
# Deposit 5 USDC to Gateway Wallet on Sepolia
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  deposit_to_gateway_wallet \
  chains='["sepolia"]' \
  depositAmount="5000000"

# Deposit to multiple chains
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  deposit_to_gateway_wallet \
  chains='["sepolia", "baseSepolia"]' \
  depositAmount="1000000"

# Deposit to all chains
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  deposit_to_gateway_wallet \
  chains='["all"]' \
  depositAmount="1000000"
```

**Process**:
1. Checks your USDC balance
2. Approves Gateway Wallet to spend USDC
3. Deposits USDC to Gateway Wallet
4. Returns transaction hash

---

### Tool 4: `transfer_from_evm`
**Description**: Transfer USDC cross-chain using Circle's Gateway protocol (burn on source, mint on destination)

**Parameters**:
- `chains`: Array of source chain names to burn from
- `destinationChain`: Chain to mint USDC on
- `amount`: Amount in wei format (6 decimals)
- `recipientAddress`: Destination wallet address (0x...)

**Example**:
```bash
# Transfer 2 USDC from Sepolia to Base Sepolia
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  transfer_from_evm \
  chains='["sepolia"]' \
  destinationChain="baseSepolia" \
  amount="2000000" \
  recipientAddress="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

# Transfer from multiple sources
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  transfer_from_evm \
  chains='["sepolia", "avalancheFuji"]' \
  destinationChain="baseSepolia" \
  amount="1000000" \
  recipientAddress="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
```

**How It Works**:
1. Creates burn intents on source chains (EIP-712 signed)
2. Submits to Circle Gateway API for attestation
3. Mints USDC on destination chain using attestation
4. Returns mint transaction hash

**Max Fee**: 2.01 USDC per transfer

---

### Tool 5: `lifisdk_bridge_tool`
**Description**: Bridge any token across EVM and SUI chains using LiFi SDK

**Parameters**:
- `fromChain`: Object with `chainId` (number) and `tokenAddress` (string)
- `toChain`: Object with `chainId` (number) and `tokenAddress` (string)
- `amount`: Amount as string

**Example**:
```bash
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  lifisdk_bridge_tool \
  --args '{
    "fromChain": {"chainId": 84532, "tokenAddress": "0x036CbD53842c5426634e7929541eC2318f3dCF7e"},
    "toChain": {"chainId": 11155111, "tokenAddress": "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"},
    "amount": "1000000"
  }'
```

**Chain IDs**:
- Sepolia: 11155111
- Base Sepolia: 84532
- Avalanche Fuji: 43113
- Arc Testnet: 4321
- More at https://chainlist.org

---

## Supported Chains & Details

| Chain                 | Domain ID | Chain ID | USDC Address |
|-----------------------|-----------|----------|--------------|
| Sepolia               | 0         | 11155111 | 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 |
| Base Sepolia          | 6         | 84532    | 0x036CbD53842c5426634e7929541eC2318f3dCF7e |
| Avalanche Fuji        | 1         | 43113    | 0x5425890298aed601595a70ab815c96711a31bc65 |
| Arc Testnet           | 26        | 4321     | 0x3600000000000000000000000000000000000000 |
| Hyperliquid EVM Test  | 19        | 998      | 0x2B3370eE501B4a559b57D449569354196457D8Ab |
| Sei Testnet           | 16        | 1328     | 0x4fCF1784B31630811181f670Aea7A7bEF803eaED |
| Sonic Testnet         | 13        | 64165    | 0x0BA304580ee7c9a980CF72e55f5Ed2E9fd30Bc51 |
| Worldchain Sepolia    | 14        | 4801     | 0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88 |

---

## Complete Workflow Example

### Scenario: Bridge 10 USDC from Arc Testnet to Base Sepolia

```bash
# Step 1: Check your balance
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  balance_of_gateway_wallet

# Step 2: Deposit USDC to Gateway Wallet (if needed)
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  deposit_to_gateway_wallet \
  chains='["arcTestnet"]' \
  depositAmount="10000000"

# Step 3: Bridge USDC
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  bridge_usdc \
  sourceChainName=Arc_Testnet \
  destinationChainName=Base_Sepolia \
  amount="10"

# Step 4: Verify balance again
mcporter call --stdio "bun run ./circleTools/stdiomcpServer.ts" \
  balance_of_gateway_wallet
```

---

## mcporter Configuration

### Add to mcporter config
```bash
# Edit your mcporter config
mcporter config add circle-tools \
  --command "bun run /path/to/AGI-Labs/mcpTools/circleTools/stdiomcpServer.ts" \
  --transport stdio
```

### Simplified calls after config
```bash
# Now you can call tools directly
mcporter call circle-tools.balance_of_gateway_wallet
mcporter call circle-tools.bridge_usdc sourceChainName=Arc_Testnet destinationChainName=Base_Sepolia amount=1
```

---

## For Openclaw Agents (Computer Use)

### Using with Openclaw skill mcporter

**Add to mcporter config** (`~/.openclaw/worspace/.config/mcporter.json`):
```json
{
  "mcpServers": {
    "circleTools": {
      "command": "bun",
      "args": ["run", "/path/to/AGI-Labs/mcpTools/circleTools/stdiomcpServer.ts"],
      "env": {
    
        "EVM_PRIVATE_KEY": "0xYOUR_KEY"
      }
    }
  }
}
```

**Using with computer use tools**:
```typescript
// Execute shell commands to call mcporter
await executeCommand(`mcporter call --stdio "bun run ./stdiomcpServer.ts" balance_of_gateway_wallet`);

// Or interact directly via stdio
const mcpClient = new MCPClient({
  command: "bun",
  args: ["run", "./circleTools/stdiomcpServer.ts"],
  env: {
    EVM_PRIVATE_KEY: process.env.EVM_PRIVATE_KEY
  }
});

await mcpClient.callTool("bridge_usdc", {
  sourceChainName: "Arc_Testnet",
  destinationChainName: "Base_Sepolia",
  amount: "1"
});
```

---

## Get Testnet USDC

**Circle Faucet**: https://faucet.circle.com
1. Select your chain (e.g., Base Sepolia)
2. Enter your wallet address
3. Request testnet USDC
4. Wait 1-2 minutes for tokens

**Alternative Faucets**:
- Sepolia: https://sepoliafaucet.com
- Base Sepolia: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- Avalanche Fuji: https://core.app/tools/testnet-faucet/

---

## Troubleshooting

### Error: Missing Private Key
```bash
# Make sure environment variables are set
echo $EVM_EVM_PRIVATE_KEY
echo $EVM_PRIVATE_KEY

# If empty, set them
export EVM_EVM_PRIVATE_KEY="0xYOUR_KEY"
export EVM_PRIVATE_KEY="0xYOUR_KEY"
```

### Error: Insufficient USDC Balance
```bash
# Get testnet USDC from faucet
# Then deposit to Gateway Wallet before bridging
mcporter call --stdio "bun run ./stdiomcpServer.ts" \
  deposit_to_gateway_wallet \
  chains='["sepolia"]' \
  depositAmount="5000000"
```

### Error: Server Not Found
```bash
# Make sure you're in the correct directory
cd /path/to/AGI-Labs/mcpTools

# Verify server file exists
ls -la circleTools/stdiomcpServer.ts

# Use absolute path
mcporter call --stdio "bun run $(pwd)/circleTools/stdiomcpServer.ts" balance_of_gateway_wallet
```

### Error: Command Not Found (mcporter)
```bash
# Install mcporter globally
npm install -g mcporter

# Or use npx
npx mcporter call --stdio "bun run ./stdiomcpServer.ts" balance_of_gateway_wallet
```

---

## Architecture Notes

**How It Works**:
1. **Stdio Server**: Runs `stdiomcpServer.ts` which implements MCP protocol over stdio
2. **Tool Registration**: Each tool is registered with Zod schema validation
3. **Circle SDK**: Uses `@circle-fin/bridge-kit` for bridging operations
4. **Gateway Protocol**: Direct EIP-712 signing for cross-chain transfers
5. **Viem Integration**: All blockchain interactions via viem library

**Key Files**:
- `circleTools/stdiomcpServer.ts` - Main MCP server (stdio transport)
- `circleTools/bridgeKit.ts` - Circle BridgeKit integration
- `circleTools/deposit.ts` - Gateway Wallet deposit logic
- `circleTools/transfer_from_evm.ts` - Gateway protocol transfer
- `circleTools/balance.ts` - Balance checker
- `circleTools/config.ts` - Chain configurations

---

## Security Best Practices

1. **Never Commit Keys**: Add `.env` to `.gitignore`
2. **Use Testnet Keys**: Never use mainnet private keys
3. **Rotate Keys**: Change keys regularly
4. **Limit Permissions**: Use dedicated wallets for testing
5. **Monitor Balances**: Check balances before large operations
6. **Verify Addresses**: Double-check recipient addresses
7. **Test Small Amounts**: Always test with small amounts first

---

## Reference Links

- **GitHub Repo**: https://github.com/Goutam-11/AGI-Labs/tree/fedd02b8e7cc2686ed9eef69d0680fef34e7ccac/mcpTools
- **Circle Docs**: https://developers.circle.com/stablecoins/docs
- **MCP Protocol**: https://modelcontextprotocol.io
- **mcporter**: https://mcporter.dev
- **Circle Faucet**: https://faucet.circle.com
- **USAGENT Platform**: https://us-agents.vercel.app

---

## Quick Reference Commands

```bash
# Clone repo
git clone --filter=blob:none --sparse https://github.com/Goutam-11/AGI-Labs.git && cd AGI-Labs && git sparse-checkout set mcpTools

# Setup
cd mcpTools && bun install
export EVM_EVM_PRIVATE_KEY="0xKEY" && export EVM_PRIVATE_KEY="0xKEY"

# Start server
bun run stdio

# Check balance (new terminal)
mcporter call --stdio "bun run $(pwd)/circleTools/stdiomcpServer.ts" balance_of_gateway_wallet

# Bridge USDC
mcporter call --stdio "bun run $(pwd)/circleTools/stdiomcpServer.ts" bridge_usdc sourceChainName=Arc_Testnet destinationChainName=Base_Sepolia amount=1
```

---

## Summary

This MCP server provides AI agents with complete control over Circle's USDC cross-chain infrastructure:

✅ Check balances across 8 testnets
✅ Deposit USDC to Gateway Wallet
✅ Bridge USDC with Circle BridgeKit
✅ Transfer cross-chain via Gateway protocol
✅ Bridge any token with LiFi SDK
✅ Full EIP-712 signing support
✅ Streaming notifications via MCP
✅ Compatible with openclaw computer use

**Ready to use with mcporter, Claude Desktop, or any MCP-compatible client.**
