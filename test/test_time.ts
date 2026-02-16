import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const origin = process.argv[2] || `${process.env.BASE_URL}/api`;

async function main() {
  //console.log(new URL(`${origin}/mcp/sse`))
  const transport = new SSEClientTransport(new URL(`${origin}/mcp/sse`), {
    requestInit: {
      headers: {
        Authorization: `Bearer ${process.env.READ_ONLY_TOKEN_MCP}`,
      },
    },
  });

  const client = new Client(
    {
      name: "time-test-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    },
  );

  await client.connect(transport);

  console.log("Connected to MCP server");

  console.log("\n🧪 Testing tool 'get_current_time'...");
  try {
    const result = await client.callTool({
      name: "get_current_time_and_date",
      arguments: { timezone: 'Africa/Douala' },
    });
    console.log("Result of 'get_current_time':", JSON.stringify(result.content, null, 2));
  } catch (error) {
    console.error("Error calling 'get_current_time':", error);
  }

  await transport.close();
}

main().catch(console.error);
