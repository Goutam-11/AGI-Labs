const url = "http://localhost:5000/mcp"
async function initialize() {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream",

    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize", // Or use "tools/call" for bridging
      params: {
        "protocolVersion": "2024-11-05",
        "capabilities": {},
        "clientInfo": { "name": "test-client", "version": "1.0.0" }
      }
    }),
  })
  
  // 1. EXTRACT THE SESSION ID
    const sessionId = response.headers.get("mcp-session-id");
    
    if (!sessionId) {
      console.error("❌ Failed to get mcp-session-id from server");
      return null;
    }
  
    console.log(`🔑 Obtained Session ID: ${sessionId}`);
  
    // We still need to consume the body to complete the request
    if (response.body) {
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      const { value } = await reader.read();
      // Optional: Log the init result
      console.log("📥 Init Response:", value?.trim());
    }
  
    return sessionId;
}

async function streamMcpToolCall(sessionId:string,method: string, params:object) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream",
      "mcp-session-id": sessionId

    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: method, // Or use "tools/call" for bridging
      params: params
    }),
  });

  if (!response.body) {
    console.error("No response body available for streaming.");
    return;
  }

  // Create a reader to consume the stream chunks
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

  console.log("--- Stream Started ---");

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    // Process the raw SSE chunk (which may contain multiple lines)
    const lines = value.split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const jsonString = line.replace("data: ", "").trim();
        try {
          const parsed = JSON.parse(jsonString);
          console.log("📥 Received Event:", JSON.stringify(parsed, null, 2));
          
          // If this is a final result, you can break or handle it
          if (parsed.result) {
            console.log("✅ Final result reached.");
          }
        } catch (err) {
          console.error("Error parsing stream chunk:", jsonString," Error:",err);
        }
      } else if (line.startsWith("event: ")) {
        console.log("🔔 Event Type:", line.replace("event: ", "").trim());
      }
    }
  }

  console.log("--- Stream Closed ---");
}

const method = "tools/call";
const params = {
  name: "bridge_usdc",
  arguments: {
    sourceChainName: "Arc_Testnet",
    destinationChainName: "Base_Sepolia",
    amount: "1"
  }
};
// const method = "tools/list";
// const params = {
//   // name: "bridge_usdc",
//   // arguments: {
//   //   sourceChainName: "Arc_Testnet",
//   //   destianationChainName: "",
//   //   amount: "1"
//   // }
// };

// 2. CHAIN THE FUNCTIONS
async function runTest() {
  const sessionId = await initialize();
  
  if (sessionId) {
      await streamMcpToolCall(sessionId,method,params);
    }
  else {
    console.log("❌ Session ID not available in header.");
    }
    
}

runTest().catch(console.error);
// 
