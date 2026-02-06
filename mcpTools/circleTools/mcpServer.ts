import { balanceOfGatewayWallet } from "./balance";
import { BridgeChain } from "@circle-fin/bridge-kit";
import z from "zod";
import { bridgeUSDC } from "./bridgeKit";
import { depositToGatewayWallet } from "./deposit";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { transferFromEVM } from "./transfer_from_evm";
import { chains } from "./config";
import http from "node:http"
import { randomUUID } from "node:crypto";

const server = new McpServer({
  name: "circle-tools-remote",
  version: "1.0.0",
},
  {
    capabilities: {
      logging: {}
  }
})


server.registerTool(
  "balance_of_gateway_wallet",
  {
    description: "Get the balance of the gateway wallet provided by circle",
  },
  async ({sendNotification}) => {
    await sendNotification({
      method: "notifications/message",
      params: {
        level: "info",
        data: "Starting bridge operation..."
      }
    })
    const balance = await balanceOfGatewayWallet();
    return {
      content: [
        {
          type: "text",
          text: balance
        }
      ]
    }
  }
)

server.registerTool(
  "bridge_usdc",
  {
    description: "Bridge USDC from EVM to EVM chain using circle bidge kit",
    inputSchema: {
      sourceChainName: z.enum(BridgeChain),
      destinationChainName: z.enum(BridgeChain),
      amount: z.string()
    }
  },
  async ({ sourceChainName, destinationChainName, amount }) => {
    const response = await bridgeUSDC({
      sourceChainName,
      destinationChainName,
      amount
    })
    return {
      content: [
        {
          type: "text",
          text: response
        }
      ]
    }
  }
)

server.registerTool(
  "deposit_to_gateway_wallet",
  {
    description: "Deposit USDC to the gateway wallet provided by circle",
    inputSchema: {
      chains: z.array(z.enum(chains)),
      depositAmount: z.string("Amount in wei encoded as a string")
    }
  },
  async ({ chains, depositAmount }) => {
    const amount = BigInt(depositAmount);
    const response = await depositToGatewayWallet({
      chains,
      depositAmount: amount
    });
    return {
      content: [
        {
          type: "text",
          text: response
        }
      ]
    }
  }
)

server.registerTool(
  "transfer_from_evm",
  {
    description: "Transfer USDC from EVM to EVM chain using circle sdk",
    inputSchema: {
      chains: z.array(z.enum(chains)),
      destinationChain: z.enum(chains),
      amount: z.string("Amount in wei encoded as a string"),
      recipientAddress: z.string("Address of the recipient")
    }
  },
  async ({ chains, destinationChain, amount, recipientAddress }) => {
    const transferValue = BigInt(amount);
    const response = await transferFromEVM({
      chains,
      destinationChain,
      transferValue,
      recipientAddress
    });
    return {
      content: [
        {
          type: "text",
          text: response
        }
      ]
    }
  }
)



const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => randomUUID()
});

await server.connect(transport);

const httpServer = http.createServer(async (req, res) => {
  // Check if the URL matches your MCP endpoint
  if (req.url?.startsWith("/mcp")) {
    // you can log the requests if you want to test
    await transport.handleRequest(req, res);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

httpServer.listen(3000, () => {
  console.log("Circle MCP Server (Streamable HTTP) running on port 3000");
});