import { balanceOfGatewayWallet } from "./balance";
import z from "zod";
import { bridgeUSDC } from "./bridgeKit";
import { depositToGatewayWallet } from "./deposit";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport  } from "@modelcontextprotocol/sdk/server/stdio.js"
import { transferFromEVM } from "./transfer_from_evm";
import { chains,bridge } from "./type/chains";
import { lifiBridge } from "./lifi";

const server = new McpServer(
{ 
    name: "circle-tools", 
    version: "1.0.0" 
},
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
  "lifisdk_bridge_tool",
  {
    description: "bridge token to token to evm and sui chains",
    inputSchema: {
      fromChain: z.object({
        chainId: z.number(),
        tokenAddress: z.string()
      }),
      toChain: z.object({
        chainId: z.number(),
        tokenAddress: z.string()
      }),
      amount: z.string()
    }
  },
  async ({ fromChain,toChain,amount },
    { sendNotification }
  ) => {
    await sendNotification({
      method: "notifications/message",
      params: {
        level: "info",
        data: "Starting bridgings operation...",
      },
    });
    const bridge = await lifiBridge({
      fromChain,
      toChain,
      amount
    })
    return {
      content: [
        {
          type: "text",
          text: bridge,
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
    sourceChainName: z.enum(Object.values(bridge) as [string, ...string[]]),
    destinationChainName: z.enum(Object.values(bridge) as [string, ...string[]]),
    amount: z.string()
    }
},
async ({ sourceChainName, destinationChainName, amount }) => {
    const response = await bridgeUSDC({
    sourceChainName,
    destinationChainName,
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
    chains: z.array(z.enum(Object.values(chains) as [string, ...string[]])),
    depositAmount: z.string(),
    }
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
    chains: z.array(z.enum(Object.values(chains) as [string, ...string[]])),
    destinationChain: z.enum(Object.values(chains) as [string, ...string[]]),
    amount: z.string(),
    recipientAddress: z.string(),
    },
},
async ({ chains, destinationChain, amount, recipientAddress }) => {
    const transferValue = BigInt(amount);
    const response = await transferFromEVM({
    chains,
    destinationChain,
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
