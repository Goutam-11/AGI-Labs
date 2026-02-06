async function streamMcpToolCall() {
  const response = await fetch("http://localhost:3000/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream",
      "mcp-session-id": "81f7323a-3cd9-40a3-b8e7-3f4082e2115d"

    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call", // Or use "tools/call" for bridging
      params: {
        "name": "balance_of_gateway_wallet",
        "arguments": {}
      }
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
        } catch (e) {
          console.error("Error parsing stream chunk:", jsonString);
        }
      } else if (line.startsWith("event: ")) {
        console.log("🔔 Event Type:", line.replace("event: ", "").trim());
      }
    }
  }

  console.log("--- Stream Closed ---");
}

streamMcpToolCall().catch(console.error);