import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const origin = process.argv[2] || `${process.env.BASE_URL}/api`;

async function main() {
  const transport = new SSEClientTransport(new URL(`${origin}/mcp/sse`), {
    requestInit: {
      headers: {
        Authorization: `Bearer ${process.env.READ_ONLY_TOKEN_MCP}`,
      },
    },
  });

  const client = new Client(
    {
      name: "event-test-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    },
  );

  await client.connect(transport);

  console.log("Connected to MCP server");

  console.log("\n🧪 Testing tool 'list_events'...");
  try {
    const result = await client.callTool({
      name: "list_events",
      arguments: { pageSize: 2 },
    });
    console.log("Result of 'list_events':", JSON.stringify(result.content, null, 2));
  } catch (error) {
    console.error("Error calling 'list_events':", error);
  }

  await transport.close();
}

main().catch(console.error);
