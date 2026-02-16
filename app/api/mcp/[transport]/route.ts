import { createMcpHandler, withMcpAuth } from "mcp-handler";
import { registerBlogTools } from "@/server/mcp/tools/blog";
import { registerForumTools } from "@/server/mcp/tools/forum";
import { registerUserTools } from "@/server/mcp/tools/user";
import { registerUnsplashTools } from "@/server/mcp/tools/unsplash";
import { registerTimeTools } from "@/server/mcp/tools/time";
import { registerEventTools } from "@/server/mcp/tools/event";
import { verifyToken } from "@/server/mcp/auth";

// Define the MCP Handler
const handler = createMcpHandler(
  (server) => {
    // Register Modular Tools
    registerBlogTools(server);
    registerForumTools(server);
    registerUserTools(server);
    registerUnsplashTools(server);
    registerTimeTools(server);
    registerEventTools(server);
  },
  {
    capabilities: {
      experimental: {
        auth: {
          type: "bearer",
          required: true,
        },
      },
    },
  },
  {
    streamableHttpEndpoint: "/mcp",
    sseEndpoint: "/sse",
    sseMessageEndpoint: "/message",
    basePath: "/api/mcp",
    maxDuration: 60,
    redisUrl: process.env.REDIS_URL,
  },
);

// Create the auth handler with required scopes
const authHandler = withMcpAuth(handler, verifyToken, {
  required: true,
  requiredScopes: ["read:messages"],
  resourceMetadataPath: "/.well-known/oauth-protected-resource",
});

// Export the handler for both GET and POST methods
export { authHandler as GET, authHandler as POST };