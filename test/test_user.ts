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
      name: "user-test-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    },
  );

  await client.connect(transport);

  console.log("Connected to MCP server");

  console.log("\n🧪 Testing tool 'list_users'...");
  try {
    const result = await client.callTool({
      name: "list_users",
      arguments: { pageSize: 2 },
    });
    console.log("Result of 'list_users':", JSON.stringify(result.content, null, 2));
  } catch (error) {
    console.error("Error calling 'list_users':", error);
  }

  console.log("\n🧪 Testing tool 'get_leaderboard'...");
  try {
    const result = await client.callTool({
      name: "get_leaderboard",
      arguments: { pageSize: 5 },
    });
    console.log("Result of 'get_leaderboard':", JSON.stringify(result.content, null, 2));
  } catch (error) {
    console.error("Error calling 'get_leaderboard':", error);
  }

  console.log("\n🧪 Testing tool 'get_user_rank'...");
  try {
    // Attempt to get rank for a likely existing user or handle error gracefully
    // Using a dummy username that might not exist, but testing the call structure
    const result = await client.callTool({
      name: "get_user_rank",
      arguments: { username: "asam" }, // Replace with a known username if available in seed
    });
    console.log("Result of 'get_user_rank':", JSON.stringify(result.content, null, 2));
  } catch (error) {
    console.error("Error calling 'get_user_rank':", error); // Expect error if user not found
  }

  await transport.close();
}

main().catch(console.error);
