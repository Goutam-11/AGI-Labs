import { balanceOfGatewayWallet } from "./balance";
import z from "zod";
import { bridgeUSDC } from "./bridgeKit";
import { depositToGatewayWallet } from "./deposit";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { transferFromEVM } from "./transfer_from_evm";
import { chains, bridge } from "./type/chains";
import http from "node:http";
import { randomUUID } from "node:crypto";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { lifiBridge } from "./lifi";
import { getEnsResolverAddress } from "./ensNameResolve";

const getServer = () => {
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
    "ens_name_resolver_tool",
    {
      description: "Get the resolver address for an ENS name",
      inputSchema: {
        ensName: z.string(),
      }
    },
    async ({ ensName }, { sendNotification }) => {
      await sendNotification({
        method: "notifications/message",
        params: {
          level: "info",
          data: `Starting ens name resolver operation for ${ensName}...`,
        },
      });
      const address = await getEnsResolverAddress(ensName);
      return {
        content: [
          {
            type: "text",
            text: address,
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
    async ({ sendNotification }) => {
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
  return server;
};

// Map to store transports by session ID
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

const httpServer = http.createServer(async (req, res) => {
  if (!req.url?.startsWith("/mcp")) return ((res.statusCode = 404), res.end());
  // The 'data' event is emitted when a chunk of data is received
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;
    let parsedBody;
    if (body && body !== "EOF") parsedBody = JSON.parse(body);
    else parsedBody = body;
    if (sessionId) {
      console.log(`Received MCP request for session: ${sessionId}`);
    } else {
      console.log("Request body:", parsedBody);
    }

    try {
      let transport: StreamableHTTPServerTransport;
      if (sessionId && transports[sessionId]) {
        transport = transports[sessionId];
      } else if (!sessionId && isInitializeRequest(parsedBody)) {
        // New initialization request
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (sessionId) => {
            // Store the transport by session ID when session is initialized
            // This avoids race conditions where requests might come in before the session is stored
            console.log(`Session initialized with ID: ${sessionId}`);
            transports[sessionId] = transport;
          },
        });

        // Set up onclose handler to clean up transport when closed
        transport.onclose = () => {
          const sid = transport.sessionId;
          if (sid && transports[sid]) {
            console.log(
              `Transport closed for session ${sid}, removing from transports map`,
            );
            delete transports[sid];
          }
        };

        // Connect the transport to the MCP server BEFORE handling the request
        // so responses can flow back through the same transport
        const server = getServer();
        await server.connect(transport);

        await transport.handleRequest(req, res, parsedBody);
        return; // Already handled
      } else {
        // Invalid request - no session ID or not initialization request
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end(
          JSON.stringify({
            message: "Invalid Request",
            data: body,
          }),
        );
        return;
      }

      // Handle the request with existing transport - no need to reconnect
      // The existing transport is already connected to the server
      await transport.handleRequest(req, res, parsedBody);
    } catch (error) {
      console.error("Error processing MCP request:", error);
    }
  });
});
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Circle MCP Server (Streamable HTTP) running on port ${PORT}`);
});

// Handle server shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");

  // Close all active transports to properly clean up resources
  for (const sessionId in transports) {
    try {
      console.log(`Closing transport for session ${sessionId}`);
      await transports[sessionId]!.close();
      delete transports[sessionId];
    } catch (error) {
      console.error(`Error closing transport for session ${sessionId}:`, error);
    }
  }
  console.log("Server shutdown complete");
  process.exit(0);
});
