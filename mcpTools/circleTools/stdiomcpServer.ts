import { balanceOfGatewayWallet } from "./balance";
import { BridgeChain } from "@circle-fin/bridge-kit";
import z from "zod";
import { bridgeUSDC } from "./bridgeKit";
import { depositToGatewayWallet } from "./deposit";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport  } from "@modelcontextprotocol/sdk/server/stdio.js"
import { transferFromEVM } from "./transfer_from_evm";
import { chains } from "./config";
import http from "node:http";
import { randomUUID } from "node:crypto";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";

// Convert enums to arrays for Zod
const chainValues = Object.values(chains) as [string, ...string[]];
const bridgeChainValues = Object.values(BridgeChain) as [string, ...string[]];


const server = new McpServer(
{ name: "circle-tools", version: "1.0.0" },
{
    capabilities: { logging: {} },
},
);

server.registerTool(
"balance_of_gateway_wallet",
{
    description: "Get the balance of the gateway wallet provided by circle",
},
async ({ sendNotification }) => {
    await sendNotification({
    method: "notifications/message",
    params: {
        level: "info",
        data: "Starting balance operation...",
    },
    });
    const balance = await balanceOfGatewayWallet();
    return {
    content: [
        {
        type: "text",
        text: balance,
        },
    ],
    };
},
);

server.registerTool(
"bridge_usdc",
{
    description: "Bridge USDC from EVM to EVM chain using circle bidge kit",
    inputSchema: {
    sourceChainName: z.enum(bridgeChainValues).describe("Source chain name"),
    destinationChainName: z.enum(bridgeChainValues).describe("Destination chain name"),
    amount: z.string().describe("Amount in string example -- '1' USD"),
    },
},
async ({ sourceChainName, destinationChainName, amount }) => {
    
    const response = await bridgeUSDC({
    sourceChainName: sourceChainName as any,
    destinationChainName: destinationChainName as any,
    amount,
    });
    return {
    content: [
        {
        type: "text",
        text: response,
        },
    ],
    };
},
);

server.registerTool(
"deposit_to_gateway_wallet",
{
    description: "Deposit USDC to the gateway wallet provided by circle",
    inputSchema: {
    chains: z.array(z.enum(chainValues)).describe("List of chains to deposit to"),
    depositAmount: z.string().describe("Amount in wei encoded as a string")
    },
},
async ({ chains, depositAmount }) => {
    const amount = BigInt(depositAmount);
    const response = await depositToGatewayWallet({
    chains,
    depositAmount: amount,
    });
    return {
    content: [
        {
        type: "text",
        text: response,
        },
    ],
    };
},
);

server.registerTool(
"transfer_from_evm",
{
    description: "Transfer USDC from EVM to EVM chain using circle sdk",
    inputSchema: {
    chains: z.array(z.enum(chainValues)).describe("List of chains to transfer from"),
    destinationChain: z.enum(chainValues).describe("Destination chain name"),
    amount: z.string().describe("Amount in wei encoded as a string"),
    recipientAddress: z.string().describe("Address of the recipient"),
    },
},
async ({ chains, destinationChain, amount, recipientAddress }) => {
    const transferValue = BigInt(amount);
    const response = await transferFromEVM({
    chains,
    destinationChain: destinationChain as any,
    transferValue,
    recipientAddress,
    });
    return {
    content: [
        {
        type: "text",
        text: response,
        },
    ],
    };
},
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Circle MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
